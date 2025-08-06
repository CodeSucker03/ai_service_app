"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
import { subjects } from "@/constants";
import { createCompanion } from "@/lib/actions/general.action";
import { redirect } from "next/navigation";
import { useState } from "react";
import { getCurrentUser } from "@/lib/actions/auth.action";


const CompanionForm =  ({user} : {user : User | null}) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [voice, setVoice] = useState("");
  const [style, setStyle] = useState("");
  const [duration, setDuration] = useState(15); // Default duration

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault(); // Prevent default form submission
    setIsSubmitting(true);
    setError("");

    const values: CreateCompanion = {
      userId: user?.id || "", // Ensure user ID is available
      name,
      subject,
      topic,
      voice,
      style,
      duration: Number(duration), // Ensure duration is a number
    };

    try {
      // This is where you'd call your actual createCompanion function
      // const companion = await createCompanion(values);

      // Mocking createCompanion for this example
      console.log("Submitting values:", values);
      await createCompanion(values);

      // Since createCompanion returns void, assume success if no error is thrown
      alert("Companion created! Would redirect to the companion page.");
    } catch (err) {
      console.error("Error creating companion:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
            flex flex-col gap-4 max-w-lg w-5/6 my-5 mx-auto p-5
            border border-gray-300 rounded-lg bg-amber-50
        "
    >
      <div>
        <label htmlFor="name" className="block mb-1 font-bold text-black">
          Companion name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter the companion name"
          className="w-full p-2 border border-gray-300 rounded text-black"
          required
        />
      </div>

      <div>
        <label htmlFor="subject" className="block mb-1 font-bold">
          Subject
        </label>
        <select
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-black"
          required
        >
          <option value="">Select the subject</option>
          {subjects.map((s) => (
            <option key={s} value={s} className="capitalize">
              {" "}
              {/* Applied capitalize class */}
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="topic" className="block mb-1 font-bold text-black">
          What should the companion help with?
        </label>
        <textarea
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Ex. Derivates & Integrals"
          className="w-full p-2 border border-gray-300 rounded h-20  text-black resize-y" // Added h-20 and resize-y
          required
        />
      </div>

      <div>
        <label htmlFor="voice" className="block mb-1 font-bold text-black">
          Voice
        </label>
        <select
          id="voice"
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-black"
          required
        >
          <option value="">Select the voice</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div>
        <label htmlFor="style" className="block mb-1 font-bold text-black">
          Style
        </label>
        <select
          id="style"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-black"
          required
        >
          <option value="">Select the style</option>
          <option value="formal">Formal</option>
          <option value="casual">Casual</option>
        </select>
      </div>

      <div>
        <label htmlFor="duration" className="block mb-1 font-bold text-black">
          Estimated session duration in minutes
        </label>
        <input
          type="number"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          placeholder="5"
          className="w-full p-2 border border-gray-300 rounded text-black"
          min="1"
          required
        />
      </div>

      {error && (
        <p className="text-red-600 mt-2">
          {" "}
          {/* Mapped from styles.errorMessage */}
          {error}
        </p>
      )}

      <button
        type="submit"
        className="
                w-full py-2 px-4 bg-blue-600 text-white text-base
                border-none rounded cursor-pointer
                hover:bg-blue-700
                disabled:opacity-75 disabled:cursor-not-allowed
            "
        disabled={isSubmitting}
      >
        {isSubmitting ? "Building..." : "Build Your Companion"}
      </button>
    </form>
  );
};

export default CompanionForm;
