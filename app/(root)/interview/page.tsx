import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <div className="space-y-6 mt-10 max-sm:mt-20">
      <h3 className="text-center mb-2 ">Interview generation</h3>

      <Agent
        userName={user?.name!}
        userId={user?.id}
        // profileImage={user?.profileURL}
        type="generate"
      />
    </div>
  );
};

export default Page;
