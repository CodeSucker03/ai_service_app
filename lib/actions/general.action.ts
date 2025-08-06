"use server";
import { FieldValue } from 'firebase-admin/firestore';
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { feedbackSchema } from "@/constants";


export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript, feedbackId } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
        `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    });

    const feedback = {
      interviewId: interviewId,
      userId: userId,
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths,
      areasForImprovement: object.areasForImprovement,
      finalAssessment: object.finalAssessment,
      createdAt: new Date().toISOString(),
    };

    let feedbackRef;

    if (feedbackId) {
      feedbackRef = db.collection("feedback").doc(feedbackId);
    } else {
      feedbackRef = db.collection("feedback").doc();
    }

    await feedbackRef.set(feedback);

    return { success: true, feedbackId: feedbackRef.id };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return { success: false };
  }
}


export const createCompanion = async (formData: CreateCompanion) => {
    
    try {
        const docRef = await db.collection('companions').add(formData);
    } catch (error: any) {
        throw new Error(error?.message || 'Failed to create a companion');
    }
}


export const getUserCompanions = async (userId: string) => {
  const snapshot = await db
    .collection('companions')
    .where('author', '==', userId)
    .get();

  const companions = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return companions;
};

export const getAllCompanions = async ({ limit = 10, page = 1, subject, topic }: GetAllCompanions) => {
 const collectionRef = db.collection('companions');
  let query: FirebaseFirestore.Query = collectionRef; // Adjust FirestoreQuery type based on your SDK
  // Ensure input topic is lowercase

  let effectiveTopic: string | null = null;
  if (typeof topic === "string") {
    effectiveTopic = topic.toLowerCase();
  } else if (Array.isArray(topic) && topic.length > 0) {
    effectiveTopic = topic[0].toLowerCase();
  }

  // Filter by topic (starts-with, case-insensitive because data and input are lowercase)
  if (effectiveTopic) {
    query = query
      .where('topic', '>=', effectiveTopic) // Assumes 'topic' field in Firestore is already lowercase
      .where('topic', '<=', effectiveTopic + '\uf8ff');
    // When a range filter is used on a field, the first orderBy must be on that same field.
    query = query.orderBy('topic');
  } else {
    // If no topic filter, you might want a default order.
    // For example, order by name or a creation timestamp.
    // If 'topic' is a sensible default sort even without filtering, you can use it.
    query = query.orderBy('topic'); // Or, e.g., orderBy('name') or orderBy('createdAt', 'desc')
  }

  // Pagination: Apply offset first, then limit.
  const calculatedOffset = (page - 1) * limit;
  if (calculatedOffset > 0) {
    query = query.offset(calculatedOffset);
  }
  query = query.limit(limit);

  try {
    const snapshot = await query.get();
    const companions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return companions;
  } catch (error) {
    console.error("Error fetching companions from Firestore:", error);
    // It's good practice to throw or handle the error appropriately
    // Firestore errors can indicate missing indexes, permission issues, etc.
    if (error instanceof Error && error.message.includes("indexes")) {
        console.error(" Firestore query requires an index. Please check the error message for a link to create it in the Firebase console.");
    }
    throw error; // Re-throw the error or return a custom error object
  }
}

export const getCompanion = async (id: string) => {

    const companionDocRef = db.collection('companions').doc(id); // Use db directly

  try {
    const docSnap = await companionDocRef.get(); // Use .get() on the DocumentReference

    if (docSnap.exists) {
      // If the document exists, return its data.
      return docSnap.data();
    } else {
      // Document not found.
      return undefined;
    }
  } catch (error) {
    console.log(error); // Log the error
    return undefined;   // Return undefined on error
  }
}


export const addToSessionHistory = async (companionId: string, userId: string) => {
  const sessionData = {
    companion_id: companionId,
    user_id: userId,
    created_at: FieldValue.serverTimestamp(), // Use Firestore's server-side timestamp
  };

  try {
    // Add a new document with an auto-generated ID to the 'session_history' collection
    const docRef = await db.collection('session_history').add(sessionData);

    // We'll construct an object with the input data and the new document ID.
    // The actual `created_at` value is server-generated and not immediately available
    // without another read, so we won't include it in this immediate return object
    // unless explicitly fetched. The original Supabase code also doesn't show fetching it.
    const returnedObject = {
      id: docRef.id, // The new document's ID from Firestore
      companion_id: companionId,
      user_id: userId,
      // created_at will be a server timestamp in the actual document.

      // For simplicity and to avoid an extra read, we omit it here,
      // but you could fetch the doc if needed: const newDoc = await docRef.get();
    };

    return [returnedObject]; // Return as an array, similar to Supabase

  } catch (error) {
    // Consolidate error handling
    if (error instanceof Error) {
      console.error("Error adding to session history:", error.message);
      throw new Error(error.message); // Re-throw with original message
    }
    console.error("An unknown error occurred while adding to session history:", error);
    throw new Error("An unknown error occurred while adding to session history.");
  }
}

export const getRecentSessions = async (limit = 10, userId: string) => {
  if (!userId) {
    throw new Error("User not authenticated or userId not found.");
  }

  try {
    // 1. Fetch the most recent session history documents for the user.
    const sessionsQuery = db.collection('session_history')
      .where('user_id', '==', userId) // Filter for the current user
      .orderBy('created_at', 'desc') // Order by most recent
      .limit(limit);

    const sessionsSnapshot = await sessionsQuery.get();

    if (sessionsSnapshot.empty) {
      return []; // No recent sessions, return an empty array.
    }

    // 2. For each session, create a promise to fetch the corresponding companion.
    // This avoids the "N+1" problem by running fetches in parallel.
    const companionFetchPromises = sessionsSnapshot.docs.map(sessionDoc => {
      const sessionData = sessionDoc.data();
      if (sessionData.companion_id) {
        // Create a reference to the companion document and return the promise from .get()
        return db.collection('companions').doc(sessionData.companion_id).get();
      }
      return Promise.resolve(null); // Resolve with null if companion_id is missing
    });

    // 3. Execute all the companion fetch promises in parallel.
    const companionSnapshots = await Promise.all(companionFetchPromises);

    // 4. Map the results, filtering out any companions that were not found.
    // The final array will be in the correct order because Promise.all preserves it.
    const recentCompanions = companionSnapshots
      .map(companionSnap => companionSnap?.data()) // Get the data from each snapshot
      .filter(companion => companion !== undefined && companion !== null); // Filter out any nulls or undefined

    return recentCompanions;

  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching recent sessions:", error.message);
      throw new Error(error.message); // Re-throw with original message
    }
    console.error("An unknown error occurred while fetching recent sessions:", error);
    throw new Error("An unknown error occurred while fetching recent sessions.");
  }
};


export async function getInterviewById(id: string): Promise<Interview | null> {
  
  const interview = await db.collection("interviews").doc(id).get();

  return interview.data() as Interview | null;
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  const { interviewId, userId } = params;

  const querySnapshot = await db
    .collection("feedback")
    .where("interviewId", "==", interviewId)
    .where("userId", "==", userId)
    .limit(1)
    .get();

  if (querySnapshot.empty) return null;

  const feedbackDoc = querySnapshot.docs[0];
  return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  if (!userId) {
    throw new Error("userId is required for getLatestInterviews");
  }

  const interviews = await db
    .collection("interviews")
    .orderBy("createdAt", "desc")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function chatBotResponse(requestMessage: string): Promise<string | null> {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat:free",
        messages: [{ role: "user", content: requestMessage }],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const res: string = data.choices[0].message.content;
    return res;
  } catch (error: any) {
    console.error("Error:", error);
    return error?.message || "Unknown error";
  }
}



export async function getInterviewsByUserId(
  userId: string | undefined
): Promise<Interview[] | null> {
  if (!userId) {
    console.warn("getInterviewsByUserId: userId is undefined or empty.");
    return null;
  }

  const snapshot = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

