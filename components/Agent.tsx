"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { cn, configureAssistant } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { generator, interviewer } from "@/constants";
import {
  addToSessionHistory,
  createFeedback,
} from "@/lib/actions/general.action";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({
  companionId,
  subject,
  topic,
  name,
  userName,
  style,
  voice,
  duration,
  userId,
}: CompanionComponentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      console.log("Call ended");
      if (companionId && userId) {
        // addToSessionHistory(companionId, userId);
      } else {
        console.error("companionId or userId is undefined");
      }
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [newMessage, ...prev]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: Error) => console.log("Error", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, []);

  // const handleGenerateFeedback = async (messages: SavedMessage[]) => {
  //   console.log("handleGenerateFeedback");

  //   const { success, feedbackId: id } = await createFeedback({
  //     interviewId: interviewId!,
  //     userId: userId!,
  //     transcript: messages,
  //     feedbackId,
  //   });

  //   if (success && id) {
  //     router.push(`/interview/${interviewId}/feedback`);
  //   } else {
  //     console.log("Error saving feedback");
  //     router.push("/");
  //   }
  // };

  // if (callStatus === CallStatus.FINISHED) {
  //   if (type === "generate") {
  //     router.push("/");
  //   } else {
  //     handleGenerateFeedback(messages);
  //   }
  // }

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    const assistantOverrides = {
      variableValues: { subject, topic, style, duration },
      clientMessages: ["transcript"],
      serverMessages: [],
    };

    // @ts-expect-error
    vapi.start(configureAssistant(voice, style), assistantOverrides);
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  const toggleMicrophone = () => {
    console.log("Toggle microphone");
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  return (
    <>
      <div className="call-view">
        {/* AI Interviewer Card */}
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="profile-image"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <div className="interviewer-info">
            <h3>{name}</h3>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="flex flex-col items-center gap-2">
          <div className="card-border">
            <div className="card-content">
              <Image
                src="/user-avatar.png"
                alt="profile-image"
                width={539}
                height={539}
                className="rounded-full object-cover size-[120px]"
              />
              <h3>{userName}</h3>
            </div>
          </div>
          {/* Microphone */}
          <div className="space-y-4">
            <button
              className="btn-primary flex items-center justify-center gap-2 rounded-lg py-2 "
              onClick={toggleMicrophone}
              disabled={callStatus !== CallStatus.ACTIVE}
            >
              <Image
                src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
                alt="mic"
                width={36}
                height={36}
              />
              <p className="max-sm:hidden text-black">
                {isMuted ? "Turn on microphone" : "Turn off microphone"}
              </p>
            </button>
            <button
              className={cn(
                "rounded-lg py-2 px-2 cursor-pointer transition-colors w-full text-black",
                callStatus === CallStatus.ACTIVE ? "bg-red-700" : "bg-primary",
                callStatus === CallStatus.CONNECTING && "animate-pulse"
              )}
              onClick={
                callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
              }
            >
              {callStatus === CallStatus.ACTIVE
                ? "End Session"
                : callStatus === CallStatus.CONNECTING
                ? "Connecting"
                : "Start Session"}
            </button>
          </div>
        </div>
      </div>
      {/* // Transcript  */}
      {messages.length > 0 && (
        <section className="transcript">
          <div className="transcript-message no-scrollbar">
            {messages.map((message, index) => {
              if (message.role === "assistant") {
                return (
                  <p key={index} className="max-sm:text-sm">
                    {name.split(" ")[0].replace("/[.,]/g, ", "")}:{" "}
                    {message.content}
                  </p>
                );
              } else {
                return (
                  <p key={index} className="text-primary max-sm:text-sm">
                    {userName}: {message.content}
                  </p>
                );
              }
            })}
          </div>
          <div className="transcript-fade" />
        </section>
      )}
      {/* // Call Button */}
      {/* <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button className="relative btn-call" onClick={() => handleCall()}>
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />

            <span className="relative">
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : ". . ."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect" onClick={() => handleDisconnect()}>
            End
          </button>
        )}
      </div> */}
    </>
  );
};

export default Agent;
