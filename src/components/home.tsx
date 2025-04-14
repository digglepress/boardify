import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Search, Star, Settings, Bell, User, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import BoardGrid from "./BoardGrid";
import CreateBoardModal from "./CreateBoardModal";

interface Board {
  id: string;
  title: string;
  background: string;
  isStarred: boolean;
  visibility: "private" | "team" | "public";
  lastModified: Date;
}

const Home = () => {
  const navigate = useNavigate();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Mock data for boards
  const [boards, setBoards] = useState<Board[]>([
    {
      id: "1",
      title: "Product Roadmap",
      background:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
      isStarred: true,
      visibility: "team",
      lastModified: new Date("2023-09-15"),
    },
    {
      id: "2",
      title: "Marketing Campaign",
      background:
        "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&q=80",
      isStarred: false,
      visibility: "private",
      lastModified: new Date("2023-09-10"),
    },
    {
      id: "3",
      title: "Design System",
      background:
        "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80",
      isStarred: true,
      visibility: "public",
      lastModified: new Date("2023-09-05"),
    },
  ]);

  const toggleStar = (boardId: string) => {
    setBoards(
      boards.map((board) =>
        board.id === boardId
          ? { ...board, isStarred: !board.isStarred }
          : board,
      ),
    );
  };

  const handleCreateBoard = (boardData: {
    title: string;
    visibility: "private" | "team" | "public";
    background: {
      type: "color" | "image";
      value: string;
    };
  }) => {
    const newBoard: Board = {
      id: `board-${Date.now()}`,
      title: boardData.title,
      background: boardData.background.value,
      isStarred: false,
      visibility: boardData.visibility,
      lastModified: new Date(),
    };

    setBoards([newBoard, ...boards]);

    // Navigate to the new board
    setTimeout(() => {
      navigate(`/board/${newBoard.id}`);
    }, 300);
  };

  const handleBoardClick = (boardId: string) => {
    navigate(`/board/${boardId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <svg
                className="h-8 w-8 text-blue-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3 3h18v18H3V3zm16 16V5H5v14h14z" />
              </svg>
              <span className="ml-2 text-xl font-bold">Boardify</span>
            </div>

            <nav className="hidden md:flex space-x-4">
              <Button variant="ghost" className="text-gray-700">
                Boards
              </Button>
              <Button variant="ghost" className="text-gray-700">
                Templates
              </Button>
              <Button variant="ghost" className="text-gray-700">
                Workspaces
              </Button>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative w-64 hidden md:block">
              <Input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-2 w-full"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            <Button variant="ghost" size="icon" className="text-gray-700">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123"
                      alt="User"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Your Boards</h1>
          <Button onClick={() => setCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create New Board
          </Button>
        </div>

        <CreateBoardModal
          open={createModalOpen}
          onOpenChange={setCreateModalOpen}
          onCreateBoard={handleCreateBoard}
        />

        {/* Boards Section */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-400 fill-yellow-400" />{" "}
            Starred Boards
          </h2>

          {boards.filter((board) => board.isStarred).length > 0 ? (
            <BoardGrid
              boards={boards.filter((board) => board.isStarred)}
              onToggleStar={toggleStar}
              onBoardClick={handleBoardClick}
              onCreateBoard={() => setCreateModalOpen(true)}
            />
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <p className="text-gray-500">
                Star your most important boards to access them quickly.
              </p>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            All Boards
          </h2>

          {boards.length > 0 ? (
            <BoardGrid
              boards={boards}
              onToggleStar={toggleStar}
              onBoardClick={handleBoardClick}
              onCreateBoard={() => setCreateModalOpen(true)}
            />
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-semibold mb-2">
                  Create your first board
                </h3>
                <p className="text-gray-500 mb-6">
                  A board is where your projects come to life. Create tasks,
                  organize workflows, and collaborate with your team.
                </p>
                <Button size="lg" onClick={() => setCreateModalOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Create Board
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
