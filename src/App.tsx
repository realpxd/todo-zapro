import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AllTasks from './components/AllTasks';

type Task = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskTitle, setTaskTitle] = useState<string>('')

  return (
    <div>
      <h1>TO-DO List</h1>
      <AllTasks tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
