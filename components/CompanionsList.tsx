
import {cn, getSubjectColor} from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface CompanionsListProps {
    title: string;
    companions?: Companion[];
    classNames?: string;
}

const CompanionsList = ({ title, companions, classNames }: CompanionsListProps) => {
    return (
        <article className={cn('companion-list', classNames)}>
            <h2 className="font-bold text-3xl">{title}</h2>

         <table className="w-full border-collapse">
  <thead>
    <tr>
      <th className="text-lg text-left w-2/3 py-4 px-2">Lessons</th>
      <th className="text-lg text-left py-4 px-2">Subject</th>
      <th className="text-lg text-right py-4 px-2">Duration</th>
    </tr>
  </thead>
  <tbody>
    {companions?.map(({ id, subject, name, topic, duration }) => (
      <tr key={id} className="border-t">
        <td className="py-4 px-2">
          <Link href={`/companions/${id}`}>
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
                <p className="font-bold text-2xl">{name}</p>
                <p className="text-lg">{topic}</p>
              </div>
            </div>
          </Link>
        </td>
        <td className="py-4 px-2">
          <div className="subject-badge w-fit max-md:hidden">{subject}</div>
          <div
            className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <Image
              src={`/icons/${subject}.svg`}
              alt={subject}
              width={18}
              height={18}
            />
          </div>
        </td>
        <td className="py-4 px-2 text-right">
          <div className="flex items-center gap-2 w-full justify-end">
            <p className="text-2xl">
              {duration} <span className="max-md:hidden">mins</span>
            </p>
            <Image
              src="/clock.svg"
              alt="minutes"
              width={24}
              height={24}
              className="max-md:hidden"
            />
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>

        </article>
    )
}

export default CompanionsList;