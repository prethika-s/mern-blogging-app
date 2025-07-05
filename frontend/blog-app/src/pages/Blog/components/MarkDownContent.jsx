import React, { useState } from "react";
import { LuCopy, LuCheck, LuCode } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

export const MarkdownContent = ({ content = "" }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = async (code, index) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const codeString = String(children).replace(/\n$/, "");
            const index = node?.position?.start?.line || Math.random();

            return !inline && match ? (
              <div className="relative group">
                <SyntaxHighlighter
                  language={match[1]}
                  style={oneLight}
                  PreTag="div"
                  customStyle={{
                    borderRadius: "0.5rem",
                    padding: "1rem",
                    fontSize: "0.9rem",
                  }}
                  {...props}
                >
                  {codeString}
                </SyntaxHighlighter>
                <button
                  className="absolute top-2 right-2 bg-white border rounded px-2 py-1 text-sm shadow hover:bg-gray-100 transition-all flex items-center gap-1"
                  onClick={() => handleCopy(codeString, index)}
                >
                  {copiedIndex === index ? <LuCheck /> : <LuCopy />}
                  {copiedIndex === index ? "Copied" : "Copy"}
                </button>
              </div>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;
