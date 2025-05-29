"use client";

import "@/styles/mde-editor.css";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => <div>Loading</div>,
});

const autofocusNoSpellcheckerOptions = {
  autofocus: true,
  spellChecker: false,
};

export function MdeEditor({ ...props }) {
  return <SimpleMDE {...props} options={autofocusNoSpellcheckerOptions} />;
}
