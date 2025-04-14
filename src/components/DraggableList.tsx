import React, { useState } from "react";
import { motion, useDragControls } from "framer-motion";
import BoardList from "./BoardList";

interface DraggableListProps {
  id: string;
  title: string;
  cards: any[];
  onAddCard: (
    listId: string,
    cardData: { title: string; description?: string },
  ) => void;
  onEditListTitle: (listId: string, newTitle: string) => void;
  onArchiveList: (listId: string) => void;
  onDragStart: (e: React.DragEvent, listId: string, cardId: string) => void;
  onDragOver: (e: React.DragEvent, listId: string) => void;
  onDrop: (e: React.DragEvent, listId: string) => void;
}

const DraggableList: React.FC<DraggableListProps> = (props) => {
  const dragControls = useDragControls();
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="relative"
      drag="x"
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.1}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
    >
      <BoardList {...props} />
    </motion.div>
  );
};

export default DraggableList;
