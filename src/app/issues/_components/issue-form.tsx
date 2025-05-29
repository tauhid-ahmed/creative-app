"use client";

import { MdeEditor } from "@/app/issues/_components/mde-editor";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ISSUE_FEATURES, ISSUE_STATUSES } from "@/constants";
import { type IssueData } from "@/validationSchemas";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

const IssuesStatus = {
  OPEN: "Open",
  CLOSED: "Closed",
  IN_PROGRESS: "In Progress",
};

export const IssueForm = () => {
  const router = useRouter();
  const form = useForm<IssueData>({
    defaultValues: {
      title: "xs",
      description: "",
      status: "OPEN",
    },
  });

  const onSubmit = async (data: IssueData) => {
    try {
      const response = await fetch("/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (Array.isArray(errorData)) {
          errorData.forEach((err) => {
            form.setError(err.path[0], {
              type: "manual",
              message: err.message,
            });
          });
        } else {
          throw new Error("Unexpected error format from server.");
        }
        return;
      }

      router.push("/issues");
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  return (
    <Container>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="wrapper space-y-4"
      >
        <Label className="flex-">
          <Controller
            name="title"
            control={form.control}
            render={({ field }) => (
              <Input className="h-12" placeholder="Title" {...field} />
            )}
          />
        </Label>
        {form.formState.errors.title?.message && (
          <ErrorMessage message={form.formState.errors.title.message} />
        )}

        <Controller
          name="description"
          control={form.control}
          render={({ field }) => (
            <MdeEditor className="mde-editor" {...field} />
          )}
        />
        {form.formState.errors.description?.message && (
          <ErrorMessage message={form.formState.errors.description.message} />
        )}
        <div className="flex gap-layout">
          <IssueFeature name="Feature" control={form.control} />
          <IssueStatus name="Status" control={form.control} />
          <Button className="ml-auto" size="lg">
            Add new issue
          </Button>
        </div>
      </form>
    </Container>
  );
};

function ErrorMessage({ message }: { message: string }) {
  return <p className="text-destructive text-sm">{message}</p>;
}

function IssueStatus({ name, control }: { name: string; control: any }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger className="h-12!">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {ISSUE_STATUSES.map((status) => (
              <SelectItem value={status} key={status}>
                {IssuesStatus[status]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
}

function IssueFeature({ name, control }: { name: string; control: any }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger className="h-12!">
            <SelectValue placeholder="Feature" />
          </SelectTrigger>
          <SelectContent>
            {ISSUE_FEATURES.map((feature) => (
              <SelectItem key={feature} value={feature}>
                {feature}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
}
