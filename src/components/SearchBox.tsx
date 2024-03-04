import React, { useEffect, useState } from 'react'
import AllTasks from './AllTasks'
import TimesIcon from './icons/TimesIcon';

type Task = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

type AllTasksProps = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const SearchBox: React.FC<AllTasksProps> = ({ tasks, setTasks }) => {
    const [searchFor, setSearchFor] = useState<string>('')
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
    
    useEffect(() => {
        setFilteredTasks(tasks)
    }, [tasks])

    // Filter tasks function
    // @param searchFor: string - the string to search for in the tasks
    const filterTasks = (searchFor: string) => {
        const filter = tasks.filter((task: Task) => task.title.toLowerCase().includes(searchFor.toLowerCase()))
        setFilteredTasks(filter)
    }

    useEffect(() => {
        filterTasks(searchFor)
    }, [searchFor])


    // Delete a task function
    // @param id: number - the id of the task to be deleted
    const deleteTask = async (id: number) => {
        try {
            const newTasks = tasks.filter((task: Task) => task.id !== id); // filtering out the task

            // updating the state and localStorage
            setTasks(newTasks);
            localStorage.setItem('tasks', JSON.stringify(newTasks));
        } catch (error) {
            console.log(error) // check for errors
        }
    }

    // Change completion status of a task
    // @param id: number - the id of the task to be updated
    const setCompleted = (id: number) => {
        const task = tasks.filter((task: Task) => task.id === id); // filtering the task
        task[0].completed = !task[0].completed; // changing the completion status
        const newTasks = tasks.map((task: Task) => {
            if (task.id === id) {
                return task
            }
            return task
        })

        // updating the state and localStorage
        setTasks(newTasks)
        localStorage.setItem('tasks', JSON.stringify(newTasks))
    }

    return (
        <>
            <input type="search" onChange={(e) => setSearchFor(e.currentTarget.value)} placeholder='Search your tasks...' />
            {
                // mapping through the tasks to visualize them
                Object.values(filteredTasks).map((task: Task) => {
                    return (
                        <div key={task.id}>
                            {/* @todo add checkbox functionality to strike the completed tasks */}
                            {/* @todo add delete functionality to delete a task */}
                            <h2>{task.title}</h2>
                            <p>{task.completed ? 'Completed' : 'Not completed'}</p>
                            <input type="checkbox" onClick={() => setCompleted(task.id)} defaultChecked={task.completed} />
                            <button onClick={() => deleteTask(task.id)}><TimesIcon /></button>
                        </div>
                    )
                })
            }
        </>
    )
}

export default SearchBox