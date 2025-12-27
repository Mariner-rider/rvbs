import { FileText, Upload, X, Loader2 } from "lucide-react";
import { ScrollArea } from "../../ui/scroll-area";
import { useState, useContext, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { AuthContext } from "@/context/AuthContext";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const PDFViewerPanel = ({ uploadedFile, onFileUpload, sessionId, isDark = false }) => {
  const { isLoggedIn, userToken } = useContext(AuthContext);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [previewContent, setPreviewContent] = useState(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  useEffect(() => {
    if (uploadedFile && uploadedFile.documentId && !uploadedFile.file) {
      loadDocumentPreview();
    } else if (uploadedFile && uploadedFile.file) {
      // Handle local file preview if needed
    } else {
      setPreviewContent(null);
    }
  }, [uploadedFile]);

  const loadDocumentPreview = async () => {
    if (!uploadedFile?.documentId) return;

    setIsLoadingPreview(true);
    setError(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/get-document-content/${uploadedFile.documentId}/`,
        {
          headers: {
            Authorization: `Bearer ${userToken || localStorage.getItem('authToken')}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to load document');
      }

      const data = await response.json();

      if (data.success && data.file_content) {
        const fileExt = uploadedFile.fileName.split('.').pop().toLowerCase();

        // Convert base64 to binary
        const binaryString = atob(data.file_content);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        if (fileExt === 'pdf') {
          // Load PDF preview
          const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;

          const pageImages = [];
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 0.8 });

            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({ canvasContext: context, viewport }).promise;
            pageImages.push(canvas.toDataURL());
          }

          setPreviewContent({ type: "multi-image", content: pageImages });

        } else if (fileExt === 'txt') {
          const text = new TextDecoder().decode(bytes);
          setPreviewContent({ type: "text", content: text });

        } else if (fileExt === 'docx') {
          const result = await mammoth.extractRawText({ arrayBuffer: bytes.buffer });
          setPreviewContent({ type: "text", content: result.value });
        }
      }
    } catch (err) {
      console.error('Failed to load preview:', err);
      setError('Failed to load document preview');
    } finally {
      setIsLoadingPreview(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isLoggedIn || !userToken) {
      setError("Please sign in before uploading a document.");
      return;
    }

    const allowedTypes = [".pdf", ".txt", ".docx"];
    const fileExt = "." + file.name.split(".").pop().toLowerCase();

    if (!allowedTypes.includes(fileExt)) {
      setError(`File type not supported. Allowed: ${allowedTypes.join(", ")}`);
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // Preview generation (same as before)
      if (fileExt === ".pdf") {
        const pdfData = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

        const pageImages = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 0.8 });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({ canvasContext: context, viewport }).promise;
          pageImages.push(canvas.toDataURL());
        }

        setPreviewContent({ type: "multi-image", content: pageImages });
      } else if (fileExt === ".txt") {
        const text = await file.text();
        setPreviewContent({ type: "text", content: text });
      } else if (fileExt === ".docx") {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        setPreviewContent({ type: "text", content: result.value });
      }

      // Upload to backend
      const formData = new FormData();
      formData.append("file", file);
      if (sessionId) formData.append("session_id", sessionId);

      const response = await fetch("http://127.0.0.1:8000/upload-document/", {
        method: "POST",
        headers: { Authorization: `Bearer ${userToken}` },
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");
      const result = await response.json();

      if (result.success) {
        onFileUpload({
          file, 
          documentId: result.document_id,
          sessionId: result.session_id,
          fileName: result.file_name,
        });
      } else {
        setError(result.message || "Upload failed");
      }
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    onFileUpload(null);
    setError(null);
    setPreviewContent(null);
    window.dispatchEvent(new Event("clearChatMessages"));
    window.dispatchEvent(new Event("clearNotes"));
  };

  return (
    <div className={`w-full md:w-[23%] border-r flex flex-col ${
      isDark 
        ? "bg-black border-gray-700 text-white" 
        : "bg-card border-gray-300 text-black"
    }`}>
      {/* Header */}
      <div className={`flex p-[22px] border-b flex-shrink-0 ${
        isDark ? "border-gray-700" : "border-gray-300"
      }`}>
        <FileText className={`h-7 mr-3 ${
          isDark ? "text-blue-400" : "text-blue-500"
        }`} />
        <h2 className="text-lg font-semibold">Paper</h2>
      </div>

      {/* Upload Area */}
      {!uploadedFile && (
        <>
          <div className="p-6 flex-shrink-0">
            <label htmlFor="pdf-upload">
              <div
                className={`border rounded-xl p-3 cursor-pointer flex items-center justify-center w-full transition-colors ${
                  !isLoggedIn
                    ? "opacity-50 cursor-not-allowed"
                    : isDark
                    ? "border-gray-700 hover:bg-gray-900 text-white"
                    : "border-gray-300 hover:bg-gray-50 text-black"
                }`}
              >
                {isUploading ? (
                  <>
                    <Loader2 size={16} className="mr-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={16} className="mr-4" />
                    {isLoggedIn ? "Upload Document" : "Sign in to Upload"}
                  </>
                )}
              </div>
            </label>

            {error && (
              <p className={`mt-2 text-xs text-center ${
                isDark ? "text-red-400" : "text-red-500"
              }`}>
                {error}
              </p>
            )}
          </div>

          <input
            id="pdf-upload"
            type="file"
            accept=".pdf,.txt,.docx"
            onChange={handleFileChange}
            className="hidden"
            disabled={isUploading || !isLoggedIn}
          />
        </>
      )}

      {/* Scroll Preview Area */}
      <div className="flex-1 overflow-hidden">
        {uploadedFile ? (
          <div className="h-full flex flex-col">
            {/* File info - fixed at top */}
            <div className="p-4 pb-2 flex-shrink-0">
              <div className={`rounded-lg p-4 flex items-start gap-3 border ${
                isDark
                  ? "bg-black border-gray-700 text-white"
                  : "bg-white border-border text-black"
              }`}>
                <FileText className={`w-6 h-6 flex-shrink-0 ${
                  isDark ? "text-blue-400" : "text-primary"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${
                    isDark ? "text-white" : "text-foreground"
                  }`}>
                    {uploadedFile.fileName || uploadedFile.file?.name}
                  </p>
                  <p className={`text-xs ${
                    isDark ? "text-gray-400" : "text-muted-foreground"
                  }`}>
                    {uploadedFile.file
                      ? (uploadedFile.file.size / 1024).toFixed(1) + " KB"
                      : "Uploaded"}
                  </p>
                </div>
                <button
                  onClick={handleRemoveFile}
                  className={isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-400 hover:text-gray-600"}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* PDF or Text Preview - scrollable area */}
            <div className="flex-1 px-4 pb-4 overflow-hidden">
              <div className={`rounded-lg border h-full overflow-y-auto ${
                isDark
                  ? "bg-black border-gray-700"
                  : "bg-white border-border"
              }`}>
                {isLoadingPreview ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className={`w-8 h-8 animate-spin ${
                      isDark ? "text-blue-400" : "text-blue-500"
                    }`} />
                  </div>
                ) : previewContent ? (
                  previewContent.type === "multi-image" ? (
                    <div className="flex flex-col gap-4 w-full items-center p-4">
                      {previewContent.content.map((img, index) => (
                        <div
                          key={index}
                          className="relative transition-transform duration-300 hover:scale-[1.03] hover:translate-y-[-5px]"
                        >
                          <img
                            src={img}
                            alt={`Page ${index + 1}`}
                            className={`object-contain w-full border rounded-md shadow-sm ${
                              isDark ? "border-gray-700" : "border-gray-200"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  ) : previewContent.type === "text" ? (
                    <pre className={`text-xs p-4 whitespace-pre-wrap ${
                      isDark ? "text-gray-300" : "text-gray-800"
                    }`}>
                      {previewContent.content}
                    </pre>
                  ) : null
                ) : (
                  <p className={`text-sm p-4 ${
                    isDark ? "text-gray-400" : "text-muted-foreground"
                  }`}>
                    Document loaded
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center px-4 py-12">
            <FileText className={`w-16 h-16 mb-4 ${
              isDark ? "text-gray-700" : "text-gray-200"
            }`} />
            <p className={`text-sm mb-2 ${
              isDark ? "text-gray-400" : "text-muted-foreground"
            }`}>
              No document uploaded
            </p>
            <p className={`text-xs ${
              isDark ? "text-gray-500" : "text-gray-400"
            }`}>
              {isLoggedIn
                ? "Upload a PDF, TXT, or DOCX to get started"
                : "Sign in to upload and preview documents"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};