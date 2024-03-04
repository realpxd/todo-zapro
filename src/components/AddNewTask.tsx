import React from 'react'
import SearchIcon from './icons/SearchIcon';
import ListIcon from './icons/ListIcon';

type Task = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

type AllTasksProps = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    taskTitle: string;
    setTaskTitle: React.Dispatch<React.SetStateAction<string>>;
};

const AddNewTask: React.FC<AllTasksProps> = ({ tasks, setTasks, taskTitle, setTaskTitle }) => {

    const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // prevent the default form submission
        const newId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1; // generate a new id for the new task

        // input validation
        if (taskTitle === '') return alert('Please write something')

        // updating todos tasks list
        try {
            const data: Task = {
                userId: 1,
                id: newId,
                title: taskTitle,
                completed: false
            }
            setTasks([...tasks, data])
            localStorage.setItem('tasks', JSON.stringify([...tasks, data]))
        } catch (error) {
            console.log(error) // check for errors
        }
    }

    return (
        <>
            <div> <ListIcon/> Add New Task</div>
            <form action="POST" onSubmit={(e) => addTask(e)}>
                <input type="text" placeholder="Write something..." onChange={(e) => setTaskTitle(e.currentTarget.value)} />
                <input type="submit" value="Add" />
                <SearchIcon />
            </form>
        </>
    )
}

export default AddNewTask