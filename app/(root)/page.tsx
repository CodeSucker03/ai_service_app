import Link from "next/link";
import Image from "next/image";

import InterviewCard from "@/components/InterviewCard";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

import ButtonGradient from "@/public/assets/svg/ButtonGradient";
// import Button from "./components/Button";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import Benefits from "@/components/home/Benefits";
import Collaboration from "@/components/home/Collaboration";
import Services from "@/components/home/Services";
import Pricing from "@/components/home/Pricing";
import Roadmap from "@/components/home/Roadmap";
import Footer from "@/components/home/Footer";
import Button from "@/components/home/Button";

async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <div className="">
      <div className="pt-[4.75rem] space-y-12 lg:pt-14 overflow-hidden">
        <Hero />
        <Benefits />
        <Collaboration />
        <ButtonGradient />
        <Services />
        <Pricing />
        <Roadmap />
        <Footer />
      </div>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2 className="text-color-2">
            Get Interview-Ready with AI-Powered Practice & Feedback
          </h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>

          <Button
            href={"/interview"}
            className={undefined}
            onClick={undefined}
            children={"Start an Interview"}
            px={undefined}
            white={undefined}
            disabled={undefined}
          ></Button>

          {/* <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button> */}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take Interviews</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>There are no interviews available</p>
          )}
        </div>
      </section>
      <div> Hello</div>
    </div>
  );
}

export default Home;
