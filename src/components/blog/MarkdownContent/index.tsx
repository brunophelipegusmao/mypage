import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownContentProps = {
  content: string;
};

const baseHeadingClasses = "scroll-mt-24 font-semibold tracking-tight text-foreground";
const baseCopyClasses = "text-foreground/84 leading-7";

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className={`${baseHeadingClasses} mt-8 text-3xl`}>{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className={`${baseHeadingClasses} mt-8 text-2xl`}>{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className={`${baseHeadingClasses} mt-7 text-xl`}>{children}</h3>
        ),
        p: ({ children }) => <p className={`${baseCopyClasses} mt-4`}>{children}</p>,
        ul: ({ children }) => (
          <ul className="mt-4 list-disc space-y-2 pl-6 text-foreground/84">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="mt-4 list-decimal space-y-2 pl-6 text-foreground/84">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="pl-1">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="mt-6 border-l-2 border-primary/45 pl-4 italic text-foreground/72">
            {children}
          </blockquote>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-primary underline decoration-primary/35 underline-offset-4 transition-colors hover:text-primary/85"
          >
            {children}
          </a>
        ),
        code: ({ children }) => (
          <code className="rounded-md bg-white/8 px-1.5 py-0.5 font-mono text-[0.92em] text-foreground">
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-black/25 p-4 font-mono text-sm text-foreground">
            {children}
          </pre>
        ),
        hr: () => <hr className="mt-8 border-white/10" />,
        table: ({ children }) => (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border-collapse overflow-hidden rounded-2xl border border-white/10 text-sm text-foreground/84">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-white/6">{children}</thead>,
        th: ({ children }) => (
          <th className="border border-white/10 px-4 py-3 text-left font-medium">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-white/10 px-4 py-3 align-top">
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
