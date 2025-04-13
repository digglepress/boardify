import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
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

import BoardList from "@/components/BoardList";

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

const BoardPage = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data - in a real app, this would be fetched from an API
  const [board, setBoard] = useState<BoardData>({
    id: id || "default-id",
    title: "Product Roadmap",
    isStarred: true,
    visibility: "team",
    background: "linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)",
    members: [
      {
        id: "1",
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      },
      {
        id: "2",
        name: "Jane Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      },
      {
        id: "3",
        name: "Alex Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      },
      {
        id: "4",
        name: "Sarah Williams",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      },
      {
        id: "5",
        name: "Mike Brown",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      },
    ],
  });

  // Mock lists data
  const [lists, setLists] = useState([
    {
      id: "list-1",
      title: "Backlog",
      cards: [
        {
          id: "card-1",
          title: "Research competitor products",
          labels: ["research", "marketing"],
          dueDate: "2023-12-15",
          members: ["1", "3"],
          attachments: 2,
          checklistProgress: { completed: 3, total: 5 },
        },
        {
          id: "card-2",
          title: "Create wireframes for new dashboard",
          labels: ["design"],
          dueDate: "2023-12-10",
          members: ["2"],
          attachments: 1,
          checklistProgress: { completed: 2, total: 3 },
        },
        {
          id: "card-3",
          title: "Review user feedback from beta testing",
          labels: ["feedback", "important"],
          members: ["1", "4", "5"],
          attachments: 5,
          checklistProgress: { completed: 0, total: 4 },
        },
      ],
    },
    {
      id: "list-2",
      title: "In Progress",
      cards: [
        {
          id: "card-4",
          title: "Implement authentication system",
          labels: ["development", "backend"],
          dueDate: "2023-12-05",
          members: ["3"],
          attachments: 0,
          checklistProgress: { completed: 4, total: 8 },
        },
        {
          id: "card-5",
          title: "Design new logo options",
          labels: ["design", "branding"],
          members: ["2", "4"],
          attachments: 3,
          checklistProgress: { completed: 1, total: 1 },
        },
      ],
    },
    {
      id: "list-3",
      title: "Review",
      cards: [
        {
          id: "card-6",
          title: "Code review for payment integration",
          labels: ["development", "important"],
          dueDate: "2023-12-03",
          members: ["1", "3"],
          attachments: 1,
          checklistProgress: { completed: 2, total: 2 },
        },
      ],
    },
    {
      id: "list-4",
      title: "Done",
      cards: [
        {
          id: "card-7",
          title: "Set up CI/CD pipeline",
          labels: ["devops"],
          dueDate: "2023-11-28",
          members: ["3", "5"],
          attachments: 0,
          checklistProgress: { completed: 5, total: 5 },
        },
        {
          id: "card-8",
          title: "Create marketing materials for launch",
          labels: ["marketing"],
          dueDate: "2023-11-25",
          members: ["2", "4"],
          attachments: 7,
          checklistProgress: { completed: 6, total: 6 },
        },
      ],
    },
  ]);

  const toggleStar = () => {
    setBoard({ ...board, isStarred: !board.isStarred });
  };

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

  const handleAddList = () => {
    // In a real app, this would create a new list and update the state
    const newList = {
      id: `list-${lists.length + 1}`,
      title: "New List",
      cards: [],
    };
    setLists([...lists, newList]);
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
        <div className="flex space-x-4 h-full">
          {/* Lists */}
          {lists.map((list) => (
            <BoardList key={list.id} list={list} />
          ))}

          {/* Add new list button */}
          <div className="shrink-0 w-72">
            <Button
              onClick={handleAddList}
              variant="secondary"
              className="w-full h-10 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            >
              <Plus className="h-5 w-5 mr-1" />
              Add another list
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BoardPage;
