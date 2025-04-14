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
import BoardCard from "./BoardCard";

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
  cards = [],
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
            onDragStart={(e: DragEvent) => onDragStart(e, id, card.id)}
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
