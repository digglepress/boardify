import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import BoardDetail from "@/components/BoardDetail";
import { getBoardById, getListsByBoardId } from "@/services/boardService";

const BoardPage = () => {
  const { id } = useParams<{ id: string }>();
  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoardData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        // Fetch board details
        const boardData = await getBoardById(id);
        setBoard(boardData);

        // Fetch lists for this board
        const listsData = await getListsByBoardId(id);
        setLists(listsData);

        setError(null);
      } catch (err) {
        console.error("Error fetching board data:", err);
        setError("Failed to load board. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBoardData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading board...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <BoardDetail boardId={id || ""} initialData={board} initialLists={lists} />
  );
};

export default BoardPage;
