import React, { useState, useEffect } from "react";
import { motion, Reorder } from "framer-motion";
import {
  Plus,
  Star,
  MoreHorizontal,
  Users,
  Lock,
  Globe,
  UserPlus,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

import DraggableList from "@/components/DraggableList";

interface BoardMember {
  id: string;
  name: string;
  avatar?: string;
}

interface BoardData {
  id: string;
  title: string;
  isStarred: boolean;
  visibility: "private" | "team" | "public";
  background: string;
  members: BoardMember[];
}

interface List {
  id: string;
  title: string;
  cards: any[];
}

interface BoardDetailProps {
  boardId: string;
  initialData?: BoardData;
  initialLists?: List[];
}

const BoardDetail = ({
  boardId,
  initialData,
  initialLists = [],
}: BoardDetailProps) => {
  // State for board data
  const [board, setBoard] = useState<BoardData>(
    initialData || {
      id: boardId,
      title: "Loading...",
      isStarred: false,
      visibility: "private",
      background: "linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)",
      members: [],
    },
  );

  // State for lists
  const [lists, setLists] = useState<List[]>(initialLists);

  // State for drag and drop
  const [draggedItem, setDraggedItem] = useState<{
    listId: string;
    cardId: string;
  } | null>(null);

  // Toggle star status
  const toggleStar = () => {
    setBoard({ ...board, isStarred: !board.isStarred });
    // In a real app, you would save this to the backend
  };

  // Get visibility icon based on board visibility
  const getVisibilityIcon = () => {
    switch (board.visibility) {
      case "private":
        return <Lock className="h-4 w-4" />;
      case "public":
        return <Globe className="h-4 w-4" />;
      case "team":
        return <Users className="h-4 w-4" />;
      default:
        return <Lock className="h-4 w-4" />;
    }
  };

  // Get visibility text based on board visibility
  const getVisibilityText = () => {
    switch (board.visibility) {
      case "private":
        return "Private";
      case "public":
        return "Public";
      case "team":
        return "Team";
      default:
        return "Private";
    }
  };

  // Add a new list
  const handleAddList = () => {
    const newList = {
      id: `list-${Date.now()}`,
      title: "New List",
      cards: [],
    };
    setLists([...lists, newList]);
    // In a real app, you would save this to the backend
  };

  // Add a card to a list
  const handleAddCard = (
    listId: string,
    cardData: { title: string; description?: string },
  ) => {
    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          cards: [
            ...list.cards,
            {
              id: `card-${Date.now()}`,
              title: cardData.title,
              description: cardData.description || "",
              labels: [],
              members: [],
            },
          ],
        };
      }
      return list;
    });
    setLists(updatedLists);
    // In a real app, you would save this to the backend
  };

  // Edit list title
  const handleEditListTitle = (listId: string, newTitle: string) => {
    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        return { ...list, title: newTitle };
      }
      return list;
    });
    setLists(updatedLists);
    // In a real app, you would save this to the backend
  };

  // Archive a list
  const handleArchiveList = (listId: string) => {
    const updatedLists = lists.filter((list) => list.id !== listId);
    setLists(updatedLists);
    // In a real app, you would save this to the backend
  };

  // Handle drag start
  const handleDragStart = (
    e: React.DragEvent,
    listId: string,
    cardId: string,
  ) => {
    setDraggedItem({ listId, cardId });
    e.dataTransfer.setData("text/plain", JSON.stringify({ listId, cardId }));
    e.dataTransfer.effectAllowed = "move";
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent, listId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent, targetListId: string) => {
    e.preventDefault();

    if (!draggedItem) return;

    const { listId: sourceListId, cardId } = draggedItem;

    // Don't do anything if dropping on the same list
    if (sourceListId === targetListId) return;

    // Find the card in the source list
    const sourceList = lists.find((list) => list.id === sourceListId);
    if (!sourceList) return;

    const card = sourceList.cards.find((card) => card.id === cardId);
    if (!card) return;

    // Remove the card from the source list
    const updatedSourceList = {
      ...sourceList,
      cards: sourceList.cards.filter((card) => card.id !== cardId),
    };

    // Add the card to the target list
    const updatedLists = lists.map((list) => {
      if (list.id === sourceListId) {
        return updatedSourceList;
      }
      if (list.id === targetListId) {
        return {
          ...list,
          cards: [...list.cards, card],
        };
      }
      return list;
    });

    setLists(updatedLists);
    setDraggedItem(null);
    // In a real app, you would save this to the backend
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: board.background,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Board Header */}
      <header className="p-4 flex items-center justify-between bg-black/20 text-white">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">{board.title}</h1>
          <button
            onClick={toggleStar}
            className="p-1.5 rounded hover:bg-white/10 transition-colors"
          >
            <Star
              className={`h-5 w-5 ${board.isStarred ? "fill-yellow-400 text-yellow-400" : "text-white"}`}
            />
          </button>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 flex items-center space-x-1 h-8"
            >
              {getVisibilityIcon()}
              <span>{getVisibilityText()}</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Board members */}
          <div className="flex -space-x-2 mr-2">
            {board.members.slice(0, 5).map((member) => (
              <TooltipProvider key={member.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar className="h-8 w-8 border-2 border-white/20">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{member.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
            {board.members.length > 5 && (
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-medium text-white">
                +{board.members.length - 5}
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10 h-8"
          >
            <UserPlus className="h-4 w-4 mr-1" />
            Share
          </Button>

          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="h-8 px-3 py-1 rounded bg-white/10 text-white placeholder-white/60 text-sm focus:outline-none focus:ring-1 focus:ring-white/30 w-40"
            />
            <Search className="h-4 w-4 absolute right-2 top-2 text-white/60" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 h-8 w-8"
              >
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Board settings</DropdownMenuItem>
              <DropdownMenuItem>Change background</DropdownMenuItem>
              <DropdownMenuItem>Copy board</DropdownMenuItem>
              <DropdownMenuItem>Archive board</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Board Content */}
      <main className="flex-1 p-4 overflow-x-auto">
        <Reorder.Group
          axis="x"
          values={lists}
          onReorder={setLists}
          className="flex space-x-4 h-full min-h-[600px] pb-4"
        >
          {/* Lists */}
          {lists.map((list) => (
            <Reorder.Item key={list.id} value={list} className="touch-none">
              <DraggableList
                id={list.id}
                title={list.title}
                cards={list.cards}
                onAddCard={handleAddCard}
                onEditListTitle={handleEditListTitle}
                onArchiveList={handleArchiveList}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />
            </Reorder.Item>
          ))}

          {/* Add new list button */}
          <div className="shrink-0 w-72 h-fit">
            <Button
              onClick={handleAddList}
              variant="secondary"
              className="w-full h-10 bg-white/10 hover:bg-white/20 text-gray flex items-center justify-center"
            >
              <Plus className="h-5 w-5 mr-1" />
              Add another list
            </Button>
          </div>
        </Reorder.Group>
      </main>
    </div>
  );
};

export default BoardDetail;
