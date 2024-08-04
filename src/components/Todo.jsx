import { useState } from "react";


export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true); // Add state for dark mode

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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div
        className={`max-w-md mx-auto p-6 space-y-6 border rounded-md shadow-lg text-center ${
          isDarkMode
            ? "border-gray-700 bg-gray-800"
            : "border-gray-300 bg-white"
        }`}
      >
        <h1 className="text-3xl font-bold mb-4">Todo App</h1>

        <div className="flex justify-between mb-4">
          <div className="flex-grow"></div>{" "}

          <button onClick={toggleTheme} className="p-2 rounded-full">
            {isDarkMode ? (
              <SunIcon className="w-6 h-6 text-yellow-500" />
            ) : (
              <MoonIcon className="w-6 h-6 text-gray-800" />
            )}
          </button>
          <div className="flex-grow"></div>{" "}
        </div>

        <div className="flex items-center rounded-md drop-shadow-sm mb-4">
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
            className={`flex-1 py-2 px-4 outline-none rounded-md focus:ring-2 ${
              isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-800"
            } focus:ring-blue-500`}
          />

          <button onClick={addTodo} className="p-[1px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2 bg-gray-900 rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
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
                className={`flex items-center justify-between p-2 rounded-md shadow ${
                  isDarkMode ? "bg-gray-700" : "bg-white"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodoComplete(todo.id)}
                    className="form-checkbox text-gray-500"
                  />
                  <input
                    type="text"
                    value={todo.text}
                    onChange={(e) => editTodo(todo.id, e.target.value)}
                    className={`flex-1 ${
                      isDarkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-gray-800"
                    } outline-none`}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="text-gray-900 hover:text-gray-500"
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
                className={`flex items-center justify-between p-2 rounded-md shadow ${
                  isDarkMode ? "bg-gray-700" : "bg-white"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodoComplete(todo.id)}
                    className="form-checkbox"
                  />
                  <input
                    type="text"
                    value={todo.text}
                    onChange={(e) => editTodo(todo.id, e.target.value)}
                    className={`flex-1 ${
                      isDarkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-gray-800"
                    } outline-none`}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="text-gray-900 hover:text-gray-500"
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

function SunIcon(props) {
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
      <circle cx="12" cy="12" r="5" />
      <line x1="12" x2="12" y1="1" y2="3" />
      <line x1="12" x2="12" y1="21" y2="23" />
      <line x1="4.22" x2="5.64" y1="4.22" y2="5.64" />
      <line x1="18.36" x2="19.78" y1="18.36" y2="19.78" />
      <line x1="1" x2="3" y1="12" y2="12" />
      <line x1="21" x2="23" y1="12" y2="12" />
      <line x1="4.22" x2="5.64" y1="19.78" y2="18.36" />
      <line x1="18.36" x2="19.78" y1="5.64" y2="4.22" />
    </svg>
  );
}

function MoonIcon(props) {
  return (
    <svg
      fill="#000000"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="24"
      height="24"
      viewBox="0 0 292.299 292.299"
      xml:space="preserve"
    >
      <g>
        <g>
          <path
            d="M153.699,292.138C68.95,292.138,0,223.185,0,138.439C0,79.742,32.675,27.002,85.28,0.807
			c2.369-1.174,5.215-0.718,7.077,1.144c1.864,1.864,2.345,4.711,1.183,7.074C83.941,28.527,79.077,49.496,79.077,71.33
			c0,77.972,63.432,141.407,141.395,141.407c22.08,0,43.247-4.978,62.942-14.777c2.366-1.177,5.213-0.721,7.074,1.141
			c1.873,1.867,2.342,4.714,1.177,7.073C265.61,259.195,212.738,292.138,153.699,292.138z"
          />
        </g>
      </g>
    </svg>
  );
}
