import {
  getAllCompanions,
  getRecentSessions,
} from "@/lib/actions/general.action";
import CompanionCard from "@/components/CompanionCard";
import { getSubjectColor } from "@/lib/utils";
import SearchInput from "@/components/SearchInput";
import { getCurrentUser } from "@/lib/actions/auth.action";
import CompanionsList from "@/components/CompanionsList";
import Link from "next/link";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : "";
  const topic = filters.topic ? filters.topic : "";
  const user = await getCurrentUser();
  const companions = await getAllCompanions({ subject, topic, limit: 6 });
  let recentSessionsCompanions;
  if (user?.id) {
    recentSessionsCompanions = await getRecentSessions(6, user?.id);
  }

  return (
    <main className="space-y-6 mt-10 max-sm:mt-20 flex flex-col gap-6">
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h2 className="h4">Companion Library</h2>
        <div className="flex gap-4">
          <SearchInput />
        </div>
      </section>
      <section className="companions-grid">
        {companions.map((companion: Companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>
        <h2 className="h4">Your Companion</h2>

      <section className="flex space-x-2 max-sm:flex-col max-sm:space-x-0 max-sm:space-y-4">
        <CompanionsList
                title="Recently completed sessions"
                companions={recentSessionsCompanions}
                classNames="w-2/3 max-lg:w-full"
            />
        <section className="bg-purple-500 rounded-4xl p-10 w-1/3 max-sm:w-full space-y-2">
            <div className="">Start learning your way.</div>
            <h2 className="text-3xl font-bold">
                Build and Personalize Learning Companion
            </h2>
            <p>Pick a name, subject, voice, & personality — and start learning through voice conversations that feel natural and fun.</p>
            
            <button className="btn-primary">
                <Link href="/companions/new">
                    <p className="text-white">Build a New Companion</p>
                </Link>
            </button>
        </section>
      </section>
    </main>
  );
};

export default CompanionsLibrary;
