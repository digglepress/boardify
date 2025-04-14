import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Paperclip,
  CheckSquare,
  MessageSquare,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import CardDetailModal from "./CardDetailModal";

interface Label {
  id: string;
  name: string;
  color: string;
}

interface Member {
  id: string;
  name: string;
  avatar?: string;
}

interface Checklist {
  id: string;
  title: string;
  items: {
    id: string;
    text: string;
    checked: boolean;
  }[];
}

interface BoardCardProps {
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
  onClick?: () => void;
  isDragging?: boolean;
  onCardUpdate?: (cardData: any) => void;
}

const BoardCard = ({
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
  onClick = () => {},
  isDragging = false,
  onCardUpdate = () => {},
}: BoardCardProps) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

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
      }).format(dueDate)
    : null;

  // Check if due date is overdue
  const isOverdue = dueDate ? dueDate < new Date() : false;

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent propagation to parent elements
    e.stopPropagation();

    // Open the detail modal
    setIsDetailModalOpen(true);

    // Call the original onClick handler if provided
    if (onClick) onClick();
  };

  const handleCardUpdate = (data: any) => {
    onCardUpdate({
      ...data,
      id,
    });
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        whileHover={{
          y: -8,
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={`w-full ${isDragging ? "cursor-grabbing" : "cursor-pointer"}`}
      >
        <Card
          className="bg-white border shadow-sm overflow-hidden transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
          onClick={handleCardClick}
        >
          {coverImage && (
            <div className="w-full h-32 overflow-hidden">
              <img
                src={coverImage}
                alt="Card cover"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-3 space-y-3">
            {/* Labels */}
            {labels.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {labels.map((label) => (
                  <Badge
                    key={label.id}
                    className={`px-2 py-0.5 text-xs font-medium bg-${label.color}-100 text-${label.color}-800 hover:bg-${label.color}-200 transition-all duration-300 hover:scale-105`}
                  >
                    {label.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h3 className="text-sm font-medium line-clamp-2">{title}</h3>

            {/* Description Preview (if available) */}
            {description && (
              <p className="text-xs text-gray-500 line-clamp-2">
                {description}
              </p>
            )}

            {/* Checklist Progress */}
            {checklist && checklist.items.length > 0 && (
              <div className="space-y-1">
                <div className="flex items-center text-xs text-gray-500">
                  <CheckSquare className="h-3.5 w-3.5 mr-1.5" />
                  <span>
                    {checklist.items.filter((item) => item.checked).length}/
                    {checklist.items.length}
                  </span>
                </div>
                <Progress value={checklistProgress} className="h-1.5" />
              </div>
            )}

            {/* Card Footer - Due date, attachments, comments, members */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-3">
                {/* Due Date */}
                {formattedDueDate && (
                  <div
                    className={`flex items-center text-xs ${isOverdue ? "text-red-600 bg-red-50 px-1.5 py-0.5 rounded" : "text-gray-600"}`}
                  >
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    <span>{formattedDueDate}</span>
                  </div>
                )}

                {/* Attachments */}
                {attachments > 0 && (
                  <div className="flex items-center text-xs text-gray-600">
                    <Paperclip className="h-3.5 w-3.5 mr-1" />
                    <span>{attachments}</span>
                  </div>
                )}

                {/* Comments */}
                {comments > 0 && (
                  <div className="flex items-center text-xs text-gray-600">
                    <MessageSquare className="h-3.5 w-3.5 mr-1" />
                    <span>{comments}</span>
                  </div>
                )}
              </div>

              {/* Members */}
              {members.length > 0 && (
                <div className="flex -space-x-2">
                  <TooltipProvider>
                    {members.slice(0, 3).map((member, index) => (
                      <Tooltip key={member.id}>
                        <TooltipTrigger asChild>
                          <Avatar className="h-6 w-6 border-2 border-white transition-transform duration-200 hover:scale-110 hover:z-10">
                            {member.avatar ? (
                              <AvatarImage
                                src={member.avatar}
                                alt={member.name}
                              />
                            ) : (
                              <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                                {member.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            )}
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{member.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}

                    {members.length > 3 && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Avatar className="h-6 w-6 border-2 border-white transition-transform duration-200 hover:scale-110 hover:z-10">
                            <AvatarFallback className="text-xs bg-muted text-muted-foreground">
                              +{members.length - 3}
                            </AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{members.length - 3} more members</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </TooltipProvider>
                </div>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Card Detail Modal */}
      <CardDetailModal
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        id={id}
        title={title}
        description={description}
        coverImage={coverImage}
        labels={labels}
        dueDate={dueDate}
        members={members}
        attachments={attachments}
        comments={comments}
        checklist={checklist}
        onSave={handleCardUpdate}
      />
    </>
  );
};

export default BoardCard;
