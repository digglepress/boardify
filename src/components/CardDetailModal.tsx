import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  Paperclip,
  CheckSquare,
  MessageSquare,
  X,
  Edit,
} from "lucide-react";

interface Label {
  id: string;
  text: string;
  color: string;
}

interface Member {
  id: string;
  name: string;
  avatar?: string;
}

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

interface Checklist {
  id: string;
  title: string;
  items: ChecklistItem[];
}

interface CardDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  labels?: Label[];
  dueDate?: Date;
  members?: Member[];
  attachments?: number;
  comments?: number;
  checklist?: Checklist;
  onSave?: (data: any) => void;
}

const CardDetailModal = ({
  open = false,
  onOpenChange,
  id = "card-1",
  title = "Default Card Title",
  description = "",
  coverImage,
  labels = [],
  dueDate,
  members = [],
  attachments = 0,
  comments = 0,
  checklist,
  onSave = () => {},
}: CardDetailModalProps) => {
  const [editingTitle, setEditingTitle] = React.useState(false);
  const [editingDescription, setEditingDescription] = React.useState(false);
  const [cardTitle, setCardTitle] = React.useState(title);
  const [cardDescription, setCardDescription] = React.useState(description);

  // Calculate checklist progress
  const checklistProgress = checklist
    ? Math.round(
        (checklist.items.filter((item) => item.checked).length /
          checklist.items.length) *
          100,
      )
    : 0;

  // Format due date
  const formattedDueDate = dueDate
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(dueDate)
    : null;

  // Check if due date is overdue
  const isOverdue = dueDate ? dueDate < new Date() : false;

  const handleSave = () => {
    onSave({
      id,
      title: cardTitle,
      description: cardDescription,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        {coverImage && (
          <div className="w-full h-48 -mt-6 -mx-6 mb-4 overflow-hidden">
            <img
              src={coverImage}
              alt="Card cover"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <DialogHeader>
          <div className="flex items-start gap-2">
            <div className="flex-1">
              {editingTitle ? (
                <Textarea
                  value={cardTitle}
                  onChange={(e) => setCardTitle(e.target.value)}
                  className="text-xl font-semibold resize-none"
                  onBlur={() => {
                    setEditingTitle(false);
                    handleSave();
                  }}
                  autoFocus
                />
              ) : (
                <DialogTitle
                  className="text-xl font-semibold cursor-pointer flex items-center gap-2 group"
                  onClick={() => setEditingTitle(true)}
                >
                  {cardTitle}
                  <Edit className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </DialogTitle>
              )}
            </div>
          </div>
        </DialogHeader>

        {/* Labels */}
        {labels.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Labels</h4>
            <div className="flex flex-wrap gap-2">
              {labels.map((label) => (
                <Badge
                  key={label.id}
                  className={`px-3 py-1 text-xs font-medium ${label.color} text-white hover:bg-${label.color}-200`}
                >
                  {label.text}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {/* Description */}
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <span>Description</span>
              </h4>
              {editingDescription ? (
                <Textarea
                  value={cardDescription}
                  onChange={(e) => setCardDescription(e.target.value)}
                  className="min-h-[100px] text-sm resize-none"
                  placeholder="Add a more detailed description..."
                  onBlur={() => {
                    setEditingDescription(false);
                    handleSave();
                  }}
                  autoFocus
                />
              ) : (
                <div
                  className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md cursor-pointer min-h-[100px]"
                  onClick={() => setEditingDescription(true)}
                >
                  {cardDescription ? (
                    <p className="text-sm whitespace-pre-wrap">
                      {cardDescription}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400">
                      Add a more detailed description...
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Checklist */}
            {checklist && checklist.items.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <CheckSquare className="h-4 w-4 mr-2" />
                  <span>{checklist.title}</span>
                </h4>
                <div className="space-y-1 mb-2">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      {checklist.items.filter((item) => item.checked).length}/
                      {checklist.items.length}
                    </span>
                    <span>{checklistProgress}%</span>
                  </div>
                  <Progress value={checklistProgress} className="h-2" />
                </div>
                <ul className="space-y-2">
                  {checklist.items.map((item) => (
                    <li key={item.id} className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        className="mt-1"
                        readOnly
                      />
                      <span
                        className={`text-sm ${item.checked ? "line-through text-gray-400" : ""}`}
                      >
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-2">Add to Card</h4>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Dates
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Paperclip className="h-4 w-4 mr-2" />
                  Attachment
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Checklist
                </Button>
              </div>
            </div>

            {/* Due Date */}
            {formattedDueDate && (
              <div>
                <h4 className="text-sm font-medium mb-2">Due Date</h4>
                <div
                  className={`p-2 rounded-md text-sm ${isOverdue ? "bg-red-50 text-red-600" : "bg-gray-50 text-gray-600"}`}
                >
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formattedDueDate}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Members */}
            {members.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Members</h4>
                <div className="flex flex-wrap gap-2">
                  {members.map((member) => (
                    <Avatar key={member.id} className="h-8 w-8">
                      {member.avatar ? (
                        <AvatarImage src={member.avatar} alt={member.name} />
                      ) : (
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {member.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  ))}
                </div>
              </div>
            )}

            {/* Attachments */}
            {attachments > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <Paperclip className="h-4 w-4 mr-2" />
                  <span>Attachments ({attachments})</span>
                </h4>
                <p className="text-sm text-gray-500">View attachments</p>
              </div>
            )}

            {/* Comments */}
            {comments > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  <span>Comments ({comments})</span>
                </h4>
                <p className="text-sm text-gray-500">View comments</p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CardDetailModal;
