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

type FormData = {
  title: string;
  description: string;
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
        <Label>
          <Controller
            name="title"
            control={form.control}
            render={({ field }) => (
              <Input className="h-12" placeholder="Title" {...field} />
            )}
          />
        </Label>
        {form.formState.errors.title?.message && (
          <p className="text-destructive text-sm">
            {form.formState.errors.title?.message}
          </p>
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
          <p className="text-destructive text-sm">
            {form.formState.errors.description?.message}
          </p>
        )}
        <Button size="lg">Add new issue</Button>
      </form>
    </Container>
  );
};
