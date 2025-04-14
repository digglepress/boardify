import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Lock, Users, Globe } from "lucide-react";

interface BackgroundOption {
  type: "color" | "image";
  value: string;
  preview: string;
}

interface CreateBoardModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onCreateBoard: (board: {
    title: string;
    visibility: "private" | "team" | "public";
    background: {
      type: "color" | "image";
      value: string;
    };
  }) => void;
}

const CreateBoardModal: React.FC<CreateBoardModalProps> = ({
  open,
  onOpenChange,
  onCreateBoard,
}) => {
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState<"private" | "team" | "public">(
    "private",
  );
  const [selectedBackground, setSelectedBackground] =
    useState<BackgroundOption>({
      type: "color",
      value: "linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)",
      preview: "linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)",
    });

  const backgroundOptions: BackgroundOption[] = [
    {
      type: "color",
      value: "linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)",
      preview: "linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)",
    },
    {
      type: "color",
      value: "linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)",
      preview: "linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)",
    },
    {
      type: "color",
      value: "linear-gradient(135deg, #FF5F6D 0%, #FFC371 100%)",
      preview: "linear-gradient(135deg, #FF5F6D 0%, #FFC371 100%)",
    },
    {
      type: "image",
      value:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
      preview:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
    },
    {
      type: "image",
      value:
        "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&q=80",
      preview:
        "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&q=80",
    },
    {
      type: "image",
      value:
        "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80",
      preview:
        "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onCreateBoard({
      title: title.trim(),
      visibility,
      background: {
        type: selectedBackground.type,
        value: selectedBackground.value,
      },
    });

    // Reset form
    setTitle("");
    setVisibility("private");
    setSelectedBackground(backgroundOptions[0]);

    // Close modal
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl">Create new board</DialogTitle>
          <DialogDescription>
            Add a new board to organize your projects and tasks.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="board-title">Board title</Label>
            <Input
              id="board-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter board title"
              className="w-full"
              required
              autoFocus
            />
          </div>

          <div className="space-y-3">
            <Label>Visibility</Label>
            <RadioGroup
              value={visibility}
              onValueChange={(value) =>
                setVisibility(value as "private" | "team" | "public")
              }
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50">
                <RadioGroupItem value="private" id="private" />
                <Label
                  htmlFor="private"
                  className="flex flex-1 items-center gap-2 font-normal"
                >
                  <Lock className="h-4 w-4" />
                  <div className="space-y-0.5">
                    <div>Private</div>
                    <div className="text-xs text-muted-foreground">
                      Only you can see and edit this board
                    </div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50">
                <RadioGroupItem value="team" id="team" />
                <Label
                  htmlFor="team"
                  className="flex flex-1 items-center gap-2 font-normal"
                >
                  <Users className="h-4 w-4" />
                  <div className="space-y-0.5">
                    <div>Team</div>
                    <div className="text-xs text-muted-foreground">
                      All team members can see and edit this board
                    </div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50">
                <RadioGroupItem value="public" id="public" />
                <Label
                  htmlFor="public"
                  className="flex flex-1 items-center gap-2 font-normal"
                >
                  <Globe className="h-4 w-4" />
                  <div className="space-y-0.5">
                    <div>Public</div>
                    <div className="text-xs text-muted-foreground">
                      Anyone with the link can see this board
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Background</Label>
            <div className="grid grid-cols-3 gap-2">
              {backgroundOptions.map((bg, index) => (
                <div
                  key={index}
                  className={`h-16 rounded-md cursor-pointer overflow-hidden border-2 ${selectedBackground.value === bg.value ? "border-primary" : "border-transparent"}`}
                  style={{
                    background: bg.preview,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => setSelectedBackground(bg)}
                />
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!title.trim()}>
              Create Board
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBoardModal;
