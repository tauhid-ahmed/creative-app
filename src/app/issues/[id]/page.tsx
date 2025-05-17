import { db } from "@/db";

type Props = {
  params: {
    id: string;
  };
};

export default async function IssuePage({ params }: Props) {
  const { id } = params;
  const issue = await db.query.issuesTable.findFirst({
    where: (table, { eq }) => eq(table.id, id),
  });
  return (
    <div>
      IssuePage {id} {JSON.stringify(issue)}
    </div>
  );
}
