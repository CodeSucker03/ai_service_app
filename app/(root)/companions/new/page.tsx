import CompanionForm from "@/components/CompanionForm";
import { getCurrentUser, isAuthenticated } from "@/lib/actions/auth.action";

import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const NewCompanion = async () => {
  const isUserAuthenticated = await isAuthenticated();
  const user = await getCurrentUser();
  if (!isUserAuthenticated) redirect("/sign-in");
  let canCreateCompanion = true;
  return (
    <main className="w-full items-center justify-center mt-5">
      {canCreateCompanion ? (
        <article className="w-full gap-4 flex flex-col">
          <h1 className=" font-bold text-xl hidden md:text-center">Companion Builder</h1>

          <CompanionForm user={user} />
        </article>
      ) : (
        <article className="companion-limit">
          <div className="cta-badge">Upgrade your plan</div>
          <h1>You’ve Reached Your Limit</h1>
          <p>
            You’ve reached your companion limit. Upgrade to create more
            companions and premium features.
          </p>
          <Link
            href="/subscription"
            className="btn-primary w-full justify-center"
          >
            Upgrade My Plan
          </Link>
        </article>
      )}
    </main>
  );
};

export default NewCompanion;
