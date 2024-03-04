import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AllTasks from './components/AllTasks';
import AddNewTask from './components/AddNewTask';
import ListIcon from './components/icons/ListIcon';

type Task = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]) // stores all the tasks
  const [taskTitle, setTaskTitle] = useState<string>('') // stores the title of the new task

  return (
    <div className='wrapper'>
      <div className='container'>
        <AddNewTask tasks={tasks} setTasks={setTasks} taskTitle={taskTitle} setTaskTitle={setTaskTitle} />
        <AllTasks tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
}

export default App;
