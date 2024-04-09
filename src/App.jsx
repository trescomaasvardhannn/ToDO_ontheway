import React, { useState, useEffect } from 'react';
import CreateTodo from '../components/CreateTodo';
import { Todos } from '../components/Todos';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/todos");
        if (!res.ok) {
          throw new Error('Failed to fetch todos');
        }
        const json = await res.json();
        setTodos(json.todos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); 
  }, []); 

  return (
    <>

      
      <CreateTodo />
      <div className="todos">
        {
          
            <Todos todos={todos}  setTodos={setTodos}  />
          
        }
      </div>
    </>
  );
}

export default App;
