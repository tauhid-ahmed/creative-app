"use client";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";
import styles from "./editor.module.css";
import { useForm, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/layout/container";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { type FormData } from "@/validationSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ISSUE_FEATURES, ISSUE_STATUSES } from "@/constants";

const IssuesStatus = {
  OPEN: "Open",
  CLOSED: "Closed",
  IN_PROGRESS: "In Progress",
};

const autofocusNoSpellcheckerOptions = {
  autofocus: true,
  spellChecker: false,
};

export const Editor = () => {
  const router = useRouter();
  const form = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      status: "OPEN",
    },
  });

  const onSubmit = async (data: FormData) => {
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
            <SimpleMDE
              {...field}
              options={autofocusNoSpellcheckerOptions}
              className={styles.container}
            />
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
