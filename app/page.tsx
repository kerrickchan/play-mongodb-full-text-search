"use client";
import { useEffect, useState } from "react";

import { Item } from '@/entity/item';

export default function Home() {
  const [todos, setTodos] = useState<Item[]>([]);
  const [input, setInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    fetch("/api/v1/items")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((err) => alert(err));
  }, []);

  const addTodo = async () => {
    if (input.trim()) {
      try {
        await fetch("/api/v1/items", {
          method: "POST",
          body: JSON.stringify({ text: input }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        setTodos([...todos, new Item(input)]);
        setInput("");
      } catch (err) {
        alert(err);
      }
    }
  };

  const searchTodos = async () => {
    if (search.trim()) {
      try {
        const response = await fetch(`/api/v1/items/search?query=${search}`);
        const results = await response.json();
        setTodos(results);
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex mb-4">
        <input 
          type="text" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder="Search todos" 
          className="border border-gray-300 p-2 rounded-l"
        />
        <button 
          onClick={searchTodos} 
          className="bg-green-500 text-white p-2 rounded-r"
        >
          Search
        </button>
      </div>
      <div className="flex mb-4">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Add a todo" 
          className="border border-gray-300 p-2 rounded-l"
        />
        <button 
          onClick={addTodo} 
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          Add
        </button>
      </div>
      <ul className="list-disc">
        {todos.map((todo) => (
          <li key={todo.id} className="mb-2">{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}
