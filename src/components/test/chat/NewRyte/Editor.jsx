import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { EditorToolbar } from "./EditorToolbar";
import { EditorFooter } from "./EditorFooter";


export function Editor({ generatedContent, ecognitiveMode = false,
  onExitECognitive = () => { } }) {
  const [title, setTitle] = useState("Untitled Document");
  const editorRef = useRef(null);
  const [content, setContent] = useState("");

  const getEditorText = useCallback(() => {
    return editorRef.current?.innerText || "";
  }, []);

  const wordCount = useMemo(() => {
    const text = content;
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  }, [content]);

  const charCount = useMemo(() => content.length, [content]);

  const handleInput = useCallback(() => {
    const text = getEditorText();
    setContent(text);
  }, [getEditorText]);

  const executeCommand = useCallback((command, value) => {
    document.execCommand(command, false, value);
    if (editorRef.current) editorRef.current.focus();
    const text = getEditorText();
    setContent(text);
  }, [getEditorText]);

  useEffect(() => {
    if (generatedContent) {
      setTitle(generatedContent.title || "Untitled Document");

      if (editorRef.current) {
        const rawHTML = marked.parse(generatedContent.content || "");
        const cleanHTML = DOMPurify.sanitize(rawHTML);
        editorRef.current.innerHTML = cleanHTML;
        const text = editorRef.current.innerText || "";
        setContent(text);
      }
    }
  }, [generatedContent]);

  return (
    <div className="flex-1 flex flex-col h-[92vh]">
      <div className="flex-1 flex flex-col">
        <div className="max-w-[63rem] mx-auto w-full flex-1 flex flex-col">
          <div className="px-8 pt-12 pb-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-4xl font-bold bg-transparent border-none outline-none mb-6 text-editor-foreground placeholder:text-muted-foreground"
              placeholder="Untitled"
            />
          </div>

          <EditorToolbar
            wordCount={wordCount}
            charCount={charCount}
            onCommand={executeCommand}
          />

          <div className="px-8 py-6">
            <div
              ref={editorRef}
              contentEditable
              onInput={handleInput}
              className="w-full max-h-[350px] overflow-y-auto text-lg bg-transparent border-none outline-none text-editor-foreground leading-relaxed focus:outline-none prose prose-slate"
              data-placeholder="Start typing..."
              style={{
                minHeight: "350px",
              }}
            />
          </div>

          <EditorFooter
            ecognitiveMode={ecognitiveMode}
            onExitECognitive={onExitECognitive}
          />
        </div>
      </div>
    </div>
  );
}