import { db } from "@/db";
import IssueDeleteButton from "../_components/issue-delete-button";

type Props = {
  params: {
    id: string;
  };
};

export default async function IssuePage({ params }: Props) {
  const { id } = await params;
  const issue = await db.query.issuesTable.findFirst({
    where: (table, { eq }) => eq(table.id, id),
  });
  return (
    <div>
      IssuePage {id} {JSON.stringify(issue)}
      <IssueDeleteButton issueId={id} />
    </div>
  );
}
