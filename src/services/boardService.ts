// Mock data for boards
const mockBoards = [
  {
    id: "1",
    title: "Product Roadmap",
    background:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
    isStarred: true,
    visibility: "team",
    lastModified: new Date("2023-09-15"),
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
  },
  {
    id: "2",
    title: "Marketing Campaign",
    background:
      "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&q=80",
    isStarred: false,
    visibility: "private",
    lastModified: new Date("2023-09-10"),
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
    ],
  },
  {
    id: "3",
    title: "Design System",
    background:
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80",
    isStarred: true,
    visibility: "public",
    lastModified: new Date("2023-09-05"),
    members: [
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
    ],
  },
];

// Mock data for lists
const mockLists = {
  "1": [
    {
      id: "list-1",
      title: "Backlog",
      cards: [
        {
          id: "card-1",
          title: "Research competitor products",
          description: "Look into main competitors and their features",
          labels: [{ color: "bg-blue-500", text: "Research", id: "1" }],
          dueDate: new Date(Date.now() + 86400000 * 3), // 3 days from now
          members: [
            {
              id: "1",
              name: "John Doe",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
            },
            {
              id: "3",
              name: "Alex Johnson",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
            },
          ],
          attachments: 2,
          checklistItems: { total: 5, completed: 3 },
        },
        {
          id: "card-2",
          title: "Create wireframes for new dashboard",
          description: "Design initial wireframes for the dashboard layout",
          labels: [{ color: "bg-green-500", text: "Design", id: "2" }],
          dueDate: new Date(Date.now() + 86400000 * 2), // 2 days from now
          members: [
            {
              id: "2",
              name: "Jane Smith",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
            },
          ],
          attachments: 1,
          checklistItems: { total: 3, completed: 2 },
        },
      ],
    },
    {
      id: "list-2",
      title: "In Progress",
      cards: [
        {
          id: "card-3",
          title: "Implement authentication system",
          description: "Set up user authentication with JWT",
          labels: [{ color: "bg-purple-500", text: "Development", id: "3" }],
          dueDate: new Date(Date.now() + 86400000), // 1 day from now
          members: [
            {
              id: "3",
              name: "Alex Johnson",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
            },
          ],
          attachments: 0,
          checklistItems: { total: 8, completed: 4 },
        },
      ],
    },
    {
      id: "list-3",
      title: "Review",
      cards: [
        {
          id: "card-4",
          title: "Code review for payment integration",
          description: "Review PR #42 for payment gateway integration",
          labels: [
            { color: "bg-purple-500", text: "Development", id: "4" },
            { color: "bg-red-500", text: "Important", id: "5" },
          ],
          dueDate: new Date(Date.now() - 86400000), // 1 day ago (overdue)
          members: [
            {
              id: "1",
              name: "John Doe",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
            },
            {
              id: "3",
              name: "Alex Johnson",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
            },
          ],
          attachments: 1,
          checklistItems: { total: 2, completed: 2 },
        },
      ],
    },
    {
      id: "list-4",
      title: "Done",
      cards: [
        {
          id: "card-5",
          title: "Set up CI/CD pipeline",
          description:
            "Configure GitHub Actions for automated testing and deployment",
          labels: [{ color: "bg-gray-500", text: "DevOps", id: "6"}],
          dueDate: new Date(Date.now() - 86400000 * 3), // 3 days ago
          members: [
            {
              id: "3",
              name: "Alex Johnson",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
            },
            {
              id: "5",
              name: "Mike Brown",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
            },
          ],
          attachments: 0,
          checklistItems: { total: 5, completed: 5 },
        },
      ],
    },
  ],
  "2": [
    {
      id: "list-1",
      title: "To Do",
      cards: [
        {
          id: "card-1",
          title: "Create social media content calendar",
          description: "Plan posts for next month",
          labels: [{ color: "bg-blue-500", text: "Planning",  id: "7"}],
          members: [
            {
              id: "2",
              name: "Jane Smith",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
            },
          ],
        },
      ],
    },
    {
      id: "list-2",
      title: "In Progress",
      cards: [],
    },
  ],
  "3": [
    {
      id: "list-1",
      title: "Components",
      cards: [
        {
          id: "card-1",
          title: "Button Component",
          description: "Create variations of button component",
          labels: [{ color: "bg-green-500", text: "Design",  id: "8"}],
          members: [
            {
              id: "2",
              name: "Jane Smith",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
            },
          ],
        },
      ],
    },
  ],
};

// Get all boards
export const getBoards = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBoards);
    }, 500);
  });
};

// Get a specific board by ID
export const getBoardById = async (id: string) => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const board = mockBoards.find((board) => board.id === id);
      if (board) {
        resolve(board);
      } else {
        reject(new Error("Board not found"));
      }
    }, 500);
  });
};

// Get lists for a specific board
export const getListsByBoardId = async (boardId: string) => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const lists = mockLists[boardId as keyof typeof mockLists];
      if (lists) {
        resolve(lists);
      } else {
        resolve([]);
      }
    }, 500);
  });
};

// Create a new board
export const createBoard = async (boardData: any) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newBoard = {
        id: `board-${Date.now()}`,
        ...boardData,
        lastModified: new Date(),
      };
      mockBoards.push(newBoard);
      resolve(newBoard);
    }, 500);
  });
};

// Update a board
export const updateBoard = async (id: string, boardData: any) => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const boardIndex = mockBoards.findIndex((board) => board.id === id);
      if (boardIndex !== -1) {
        mockBoards[boardIndex] = {
          ...mockBoards[boardIndex],
          ...boardData,
          lastModified: new Date(),
        };
        resolve(mockBoards[boardIndex]);
      } else {
        reject(new Error("Board not found"));
      }
    }, 500);
  });
};

// Create a new list
export const createList = async (boardId: string, listData: any) => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!mockLists[boardId as keyof typeof mockLists]) {
        mockLists[boardId as keyof typeof mockLists] = [];
      }
      const newList = {
        id: `list-${Date.now()}`,
        ...listData,
        cards: [],
      };
      mockLists[boardId as keyof typeof mockLists].push(newList);
      resolve(newList);
    }, 500);
  });
};

// Create a new card
export const createCard = async (
  boardId: string,
  listId: string,
  cardData: any,
) => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const lists = mockLists[boardId as keyof typeof mockLists];
      if (!lists) {
        reject(new Error("Board not found"));
        return;
      }

      const listIndex = lists.findIndex((list) => list.id === listId);
      if (listIndex === -1) {
        reject(new Error("List not found"));
        return;
      }

      const newCard = {
        id: `card-${Date.now()}`,
        ...cardData,
      };

      lists[listIndex].cards.push(newCard);
      resolve(newCard);
    }, 500);
  });
};
