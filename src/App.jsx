import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodoComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const editTodo = (id, newText) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const completedTodos = todos.filter((todo) => todo.completed);
  const incompleteTodos = todos.filter((todo) => !todo.completed);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md mx-auto p-6 space-y-6 border rounded-md shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Todo App</h1>

        <div className="flex items-center rounded-md drop-shadow-sm">
          <input
            type="text"
            placeholder="Add a new todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTodo();
              }
            }}
            className="flex-1 py-2 px-4 outline-none rounded-md text-gray-800 focus:ring-2 focus:ring-blue-500"
          />

          <button onClick={addTodo} className="p-[2px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
              Add
            </div>
          </button>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-medium">Incomplete</h2>
          <div className="space-y-1">
            {incompleteTodos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between bg-white dark:bg-gray-800 p-2 rounded-md shadow"
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodoComplete(todo.id)}
                  />
                  <input
                    type="text"
                    value={todo.text}
                    onChange={(e) => editTodo(todo.id, e.target.value)}
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <Trash2Icon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-medium">Completed</h2>
          <div className="space-y-1">
            {completedTodos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between bg-white dark:bg-gray-800 p-2 rounded-md shadow"
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodoComplete(todo.id)}
                  />
                  <input
                    type="text"
                    value={todo.text}
                    onChange={(e) => editTodo(todo.id, e.target.value)}
                    className="flex-1"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <Trash2Icon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Trash2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}
