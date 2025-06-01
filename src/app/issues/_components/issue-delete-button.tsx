"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

type Props = { issueId: string } & React.PropsWithChildren;

export default function IssueDeleteButton({ issueId }: Props) {
  const [open, setOpen] = useState(false);
  const issueDelete = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("alert");
    setOpen(false);
  };
  return (
    <>
      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)}>IssueDeleteButton</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogTrigger asChild>
            <Button onClick={issueDelete} className="bg-rose-500">
              IssueDeleteButton
            </Button>
          </DialogTrigger>
        </DialogContent>
      </Dialog>
    </>
  );
}
