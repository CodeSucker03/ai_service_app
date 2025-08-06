import { getCompanion } from "@/lib/actions/general.action";
import { redirect } from "next/navigation";
import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import { getCurrentUser } from "@/lib/actions/auth.action";
import Agent from "@/components/Agent";
interface CompanionSessionPageProps {
  params: Promise<{ id: string }>;
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params;
  const companion = await getCompanion(id);
  const user = await getCurrentUser(); 

  if (!user) redirect("/sign-in");
  if (!companion) redirect("/companions");

  const { name, subject, topic, duration, style, voice } = companion;

  if (!name) redirect("/companions");

  return (
    <main>
      <article className="flex rounded-border justify-between px-6 pt-12 max-md:flex-col">
        <div className="flex items-center gap-2">
          <div
            className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <Image
              src={`/icons/${subject}.svg`}
              alt={subject}
              width={35}
              height={35}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="subject-badge">{subject}</div>
            </div>
            <p className="text-lg">{topic}</p>
          </div>
        </div>
        <div className="items-start text-2xl max-md:hidden">
          {duration} minutes
        </div>
      </article>

      <Agent 
        companionId={id}
        userName={user.name}
        userId={user.id}
        subject={subject}
        topic={topic}
        name={name}
        voice={voice}
        style={style}
        duration={duration}
      />
    </main>
  );
};

export default CompanionSession;
