import React, { useRef, useState } from 'react';
import { cn } from '../../lib/utils';

export const FileUploadButton = React.forwardRef(({
  onFileSelect,
  accept,
  className,
  placeholder = "No file chosen",
  ...props
}, ref) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file ? file.name : null);
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className={cn("relative", className)}>
      <input
        ref={ref || inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        {...props}
      />
      <div className="flex h-10 w-full rounded-md border border-input bg-background overflow-hidden">
        <button
          type="button"
          onClick={handleButtonClick}
          className="px-4 py-2 bg-muted/50 hover:bg-muted/70 text-foreground text-sm font-medium border-r border-input transition-colors"
        >
          Choose File
        </button>
        <div className="flex-1 px-3 py-2 text-sm text-muted-foreground bg-muted/20 flex items-center">
          {selectedFile || placeholder}
        </div>
      </div>
    </div>
  );
});

FileUploadButton.displayName = "FileUploadButton";
