import React, { useState } from "react";
import { PlusIcon, MoreHorizontalIcon, XIcon } from "lucide-react";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MainBoardCard from "./BoardCard";

interface CardType {
  id: string;
  title: string;
  description?: string;
  labels?: { color: string; text: string }[];
  dueDate?: Date;
  members?: { id: string; name: string; avatar: string }[];
  attachments?: number;
  checklistItems?: { total: number; completed: number };
  coverImage?: string;
}

// Create a simplified BoardCard component directly in this file
const BoardCard: React.FC<CardType> = ({
  title = "Card Title",
  description,
  labels = [],
  dueDate,
  members = [],
  attachments,
  checklistItems,
  coverImage,
}) => {
  return (
    <Card className="bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      {coverImage && (
        <div className="h-32 overflow-hidden rounded-t-md">
          <img
            src={coverImage}
            alt="Card cover"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardContent className="p-3 space-y-2">
        {labels.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {labels.map((label, index) => (
              <span
                key={index}
                className={`${label.color} text-white text-xs px-2 py-0.5 rounded`}
              >
                {label.text}
              </span>
            ))}
          </div>
        )}
        <h4 className="font-medium text-sm">{title}</h4>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-2">
          <div className="flex items-center space-x-2">
            {dueDate && (
              <span className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                {dueDate.toLocaleDateString()}
              </span>
            )}
            {attachments && <span>{attachments} 📎</span>}
            {checklistItems && (
              <span>
                {checklistItems.completed}/{checklistItems.total} ✓
              </span>
            )}
          </div>

          {members.length > 0 && (
            <div className="flex -space-x-2">
              {members.map((member) => (
                <img
                  key={member.id}
                  src={member.avatar}
                  alt={member.name}
                  className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-700"
                  title={member.name}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface BoardListProps {
  id: string;
  title: string;
  cards?: CardType[];
  onAddCard?: (
    listId: string,
    cardData: { title: string; description?: string },
  ) => void;
  onEditListTitle?: (listId: string, newTitle: string) => void;
  onArchiveList?: (listId: string) => void;
  onDragStart?: (e: React.DragEvent, listId: string, cardId: string) => void;
  onDragOver?: (e: React.DragEvent, listId: string) => void;
  onDrop?: (e: React.DragEvent, listId: string) => void;
}

const BoardList: React.FC<BoardListProps> = ({
  id = "list-1",
  title = "To Do",
  cards = [
    {
      id: "card-1",
      title: "Research competitors",
      description: "Look into main competitors and their features",
      labels: [{ color: "bg-blue-500", name: "Research" }],
      dueDate: new Date(Date.now() + 86400000 * 3), // 3 days from now
      members: [
        {
          id: "user-1",
          name: "John Doe",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
        },
      ],
      attachments: 2,
      checklistItems: { total: 5, completed: 2 },
    },
    {
      id: "card-2",
      title: "Design homepage mockup",
      coverImage:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80",
      labels: [{ color: "bg-green-500", name: "Design" }],
      members: [
        {
          id: "user-1",
          name: "John Doe",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
        },
        {
          id: "user-2",
          name: "Jane Smith",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
        },
      ],
    },
  ],
  onAddCard = () => {},
  onEditListTitle = () => {},
  onArchiveList = () => {},
  onDragStart = () => {},
  onDragOver = () => {},
  onDrop = () => {},
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [listTitle, setListTitle] = useState(title);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardDescription, setNewCardDescription] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    if (listTitle.trim() !== title) {
      onEditListTitle(id, listTitle);
    }
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTitleBlur();
    }
  };

  const handleAddCardSubmit = () => {
    if (newCardTitle.trim()) {
      onAddCard(id, {
        title: newCardTitle,
        description: newCardDescription,
      });
      setNewCardTitle("");
      setNewCardDescription("");
      setIsAddingCard(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    onDragOver(e, id);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDrop(e, id);
  };

  return (
    <div
      className="flex flex-col w-[280px] min-w-[280px] max-h-[800px] bg-gray-100 dark:bg-gray-800 rounded-md shadow-sm"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* List Header */}
      <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700">
        {isEditingTitle ? (
          <Input
            value={listTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            className="h-7 text-sm font-medium"
            autoFocus
          />
        ) : (
          <h3
            className="text-sm font-medium px-2 py-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            onClick={() => setIsEditingTitle(true)}
          >
            {listTitle}
          </h3>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsEditingTitle(true)}>
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onArchiveList(id)}>
              Archive List
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Cards Container */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            draggable
            onDragStart={(e) => onDragStart(e, id, card.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <BoardCard
              id={card.id}
              title={card.title}
              description={card.description}
              labels={card.labels}
              dueDate={card.dueDate}
              members={card.members}
              attachments={card.attachments}
              checklistItems={card.checklistItems}
              coverImage={card.coverImage}
            />
            <MainBoardCard
              id={card.id}
              title={card.title}
              description={card.description}
              labels={card.labels}
              dueDate={card.dueDate}
              members={card.members}
              attachments={card.attachments}
              checklistItems={card.checklistItems}
              coverImage={card.coverImage}
            />
          </motion.div>
        ))}

        {/* Add Card Form */}
        {isAddingCard && (
          <Card className="p-2">
            <CardContent className="p-0 space-y-2">
              <Textarea
                placeholder="Enter card title..."
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                className="min-h-[60px] text-sm resize-none"
                autoFocus
              />
              <Textarea
                placeholder="Add a description... (optional)"
                value={newCardDescription}
                onChange={(e) => setNewCardDescription(e.target.value)}
                className="min-h-[60px] text-sm resize-none"
              />
              <div className="flex justify-between">
                <Button size="sm" onClick={handleAddCardSubmit}>
                  Add Card
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setIsAddingCard(false);
                    setNewCardTitle("");
                    setNewCardDescription("");
                  }}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Card Button */}
      {!isAddingCard && (
        <div className="p-2 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
            onClick={() => setIsAddingCard(true)}
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add a card
          </Button>
        </div>
      )}
    </div>
  );
};

export default BoardList;
