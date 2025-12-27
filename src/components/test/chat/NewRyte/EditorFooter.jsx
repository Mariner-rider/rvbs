import { AtSign, Type, ImageIcon, Table, XSquare, Maximize2, Undo2, Redo2, FileCheck, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function EditorFooter({
  ecognitiveMode = false,
  onExitECognitive = () => { }
}) {
  return (
    <TooltipProvider>
      <div className="border-t bg-card/50 backdrop-blur-sm sticky bottom-0 z-0">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 text-gray-400">
                  <Switch id="auto-complete" disabled />
                  <label htmlFor="auto-complete" className="text-sm font-medium cursor-not-allowed">
                    Auto-complete
                  </label>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="!bg-white">
                <p>Coming Soon</p>
              </TooltipContent>
            </Tooltip>

            <Separator orientation="vertical" className="h-6 mx-1" />

            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-block">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-muted-foreground/50 cursor-not-allowed pointer-events-none"
                    disabled
                  >
                    <AtSign className="h-4 w-4 mr-1" />
                    Cite
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="top" className="!bg-white">
                <p>Coming Soon</p>
              </TooltipContent>
            </Tooltip>

            <Button variant="ghost" size="sm" className="h-8">
              <Type className="h-4 w-4 mr-1" />
              Text
            </Button>

            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-block">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-muted-foreground/50 cursor-not-allowed pointer-events-none"
                    disabled
                  >
                    <FileCheck className="h-4 w-4 mr-1" />
                    Plagiarism Check
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="top" className="!bg-white">
                <p>Coming Soon</p>
              </TooltipContent>
            </Tooltip>

            <Separator orientation="vertical" className="h-6 mx-1" />

            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Table className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <XSquare className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Maximize2 className="h-4 w-4" />
            </Button>
            {/* eCognitive Exit Button (only shown in eCognitive mode) */}
            {ecognitiveMode && (
              <Button
                variant="destructive"
                size="sm"
                className="ml-0 text-zinc-90 bg-transferent hover:bg-white/100"
                onClick={onExitECognitive}
              >
                <LogOut className="mr-0 h-4 w-4 text-zinc-900"  />
                Exit
              </Button>
            )}
            <Separator orientation="vertical" className="h-6 mx-1" />
          </div>


        </div>
      </div>
    </TooltipProvider>
  );
}