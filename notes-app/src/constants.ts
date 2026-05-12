export const noteCategories = [
  { id: "1", title: "All notes", count: 12 },
  { id: "2", title: "Inspiration", count: 15 },
  { id: "3", title: "Work", count: 28 },
  { id: "4", title: "Personal", count: 23 },
];

export type Todo = {
  id: string;
  label: string;
  content: string;
  done: boolean;
};

export const initialTodos: Todo[] = [
  { id: "t1", label: "Music courses", content: "", done: true },
  { id: "t2", label: "Buy Groceries", content: "", done: false },
  { id: "t3", label: "Finish Design Project", content: "", done: false },
];
