import { 
  Bold, Italic, Underline, Strikethrough, 
  Heading1, Heading2, Heading3,
  List, ListOrdered, Link2, Image, Quote, Palette,
  AlignLeft, AlignCenter, AlignRight,
  Table, X, Undo, Redo
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function EditorToolbar({ wordCount = 0, charCount = 0, onCommand }) {
  return (
    <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-0">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-1 flex-wrap">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onCommand('bold')}>
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onCommand('italic')}>
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onCommand('underline')}>
            <Underline className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onCommand('strikeThrough')}>
            <Strikethrough className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onCommand('formatBlock', 'h1')}>
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onCommand('formatBlock', 'h2')}>
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onCommand('formatBlock', 'h3')}>
            <Heading3 className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onCommand('insertUnorderedList')}>
            <List className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onCommand('insertOrderedList')}>
            <ListOrdered className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {
            const url = prompt('Enter URL:');
            if (url) onCommand('createLink', url);
          }}>
            <Link2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {
            const url = prompt('Enter image URL:');
            if (url) onCommand('insertImage', url);
          }}>
            <Image className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onCommand('formatBlock', 'blockquote')}>
            <Quote className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {
            const color = prompt('Enter color (hex or name):');
            if (color) onCommand('foreColor', color);
          }}>
            <Palette className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onCommand('justifyLeft')}>
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onCommand('justifyCenter')}>
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onCommand('justifyRight')}>
            <AlignRight className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onCommand('insertHTML', '<table border="1"><tr><td>Cell 1 </td><td>Cell 2</td></tr></table>')}>
            <Table className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onCommand('removeFormat')}>
            <X className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onCommand('undo')}>
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onCommand('redo')}>
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Words</span>
            <span className="font-medium text-foreground">{wordCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Characters</span>
            <span className="font-medium text-foreground">{charCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
