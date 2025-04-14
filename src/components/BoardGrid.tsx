import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PlusIcon,
  StarIcon,
  LockIcon,
  UsersIcon,
  GlobeIcon,
} from "lucide-react";
import { motion } from "framer-motion";

interface Board {
  id: string;
  title: string;
  visibility: "private" | "team" | "public";
  starred: boolean;
  background: {
    type: "color" | "image";
    value: string;
  };
  lastModified?: Date;
  members?: { id: string; name: string; avatar?: string }[];
}

interface BoardGridProps {
  boards?: Board[];
  onBoardClick?: (boardId: string) => void;
  onCreateBoard?: () => void;
  onToggleStar?: (boardId: string, starred: boolean) => void;
}

const BoardGrid: React.FC<BoardGridProps> = ({
  boards = [],
  onBoardClick = () => {},
  onCreateBoard = () => {},
  onToggleStar = () => {},
}) => {
  // Animation variants for grid items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getVisibilityIcon = (visibility: Board["visibility"]) => {
    switch (visibility) {
      case "private":
        return <LockIcon className="h-4 w-4" />;
      case "team":
        return <UsersIcon className="h-4 w-4" />;
      case "public":
        return <GlobeIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getVisibilityLabel = (visibility: Board["visibility"]) => {
    switch (visibility) {
      case "private":
        return "Private";
      case "team":
        return "Team";
      case "public":
        return "Public";
      default:
        return "";
    }
  };

  return (
    <div className="bg-background w-full p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {boards.map((board, index) => (
          <motion.div
            key={board.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="h-full"
          >
            <Card
              className="h-full cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
              onClick={() => onBoardClick(board.id)}
            >
              <div
                className="h-32 w-full relative"
                style={{
                  background:
                    board.background.type === "color"
                      ? board.background.value
                      : `url(${board.background.value})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-white hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleStar(board.id, !board.starred);
                  }}
                >
                  <StarIcon
                    className={`h-5 w-5 ${board.starred ? "fill-yellow-400 text-yellow-400" : "text-white"}`}
                  />
                </Button>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-lg truncate">
                    {board.title}
                  </h3>
                </div>
                <div className="mt-2 flex items-center">
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 text-xs"
                  >
                    {getVisibilityIcon(board.visibility)}
                    <span>{getVisibilityLabel(board.visibility)}</span>
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Create New Board Card */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, delay: boards.length * 0.05 }}
          className="h-full"
        >
          <Card
            className="h-full cursor-pointer hover:shadow-md transition-shadow border-dashed border-2 flex flex-col justify-center items-center p-6"
            onClick={onCreateBoard}
          >
            <div className="rounded-full bg-primary/10 p-4 mb-4">
              <PlusIcon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-medium text-lg text-center">
              Create New Board
            </h3>
            <p className="text-muted-foreground text-sm text-center mt-2">
              Add a new board to organize your projects
            </p>
          </Card>
        </motion.div>

        {/* Empty state - only shown when there are no boards */}
        {boards.length === 0 && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="col-span-full flex flex-col items-center justify-center p-12 text-center"
          >
            <div className="rounded-full bg-primary/10 p-6 mb-6">
              <PlusIcon className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Create your first board</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Boards help you organize your projects and tasks in a visual way.
              Get started by creating your first board.
            </p>
            <Button onClick={onCreateBoard} size="lg">
              Create Board
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BoardGrid;
