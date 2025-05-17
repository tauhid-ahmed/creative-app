import type { Components } from "react-markdown";

export const prose: Components = {
  h1: ({ children, ...props }) => (
    <h1 className="text-4xl font-bold my-6 border-b pb-2" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-3xl font-semibold my-5 border-b pb-1" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-2xl font-semibold my-4" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="text-xl font-medium my-3" {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, ...props }) => (
    <h5 className="text-lg font-medium my-2" {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, ...props }) => (
    <h6 className="text-base font-medium my-1" {...props}>
      {children}
    </h6>
  ),
  p: ({ children, ...props }) => (
    <p className="text-base leading-relaxed mb-3" {...props}>
      {children}
    </p>
  ),
  a: ({ children, ...props }) => (
    <a
      className="text-blue-600 hover:underline underline-offset-2"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc list-inside mb-3" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal list-inside mb-3" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="ml-4 mb-1" {...props}>
      {children}
    </li>
  ),
  code: ({ children, ...props }) => (
    <pre className="bg-muted rounded-md p-4 overflow-x-auto">
      <code className="text-sm font-mono" {...props}>
        {children}
      </code>
    </pre>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-muted-foreground my-4"
      {...props}
    >
      {children}
    </blockquote>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
  hr: (props) => (
    <hr className="my-6 border-gray-300 dark:border-gray-700" {...props} />
  ),
  del: ({ children, ...props }) => (
    <del className="line-through" {...props}>
      {children}
    </del>
  ),
};
