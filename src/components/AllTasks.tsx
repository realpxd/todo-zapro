import React, { useEffect } from 'react'
import TimesIcon from './icons/TimesIcon';
import DeleteIcon from './icons/DeleteIcon';

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

const AllTasks: React.FC<AllTasksProps> = ({ tasks, setTasks }) => {
    let limit = 5 // limit the number of todos tasks to fetch

    // fetching tasks from the API
    const getTasks = async () => {
        // checking if tasks already exist in localStorage
        if (localStorage.getItem('tasks')) {
            setTasks(JSON.parse(localStorage.getItem('tasks') || ''))
            return
        }

        // fetching tasks from the API
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
            const data: Task[] = await response.json() // converting the response to JSON
            // saving the tasks in the state and localStorage
            setTasks(data)
            localStorage.setItem('tasks', JSON.stringify(data))
        } catch (error) {
            console.log(error) // check for errors 
        }
    }


    localStorage.removeItem('tasks') // clearing the localStorage for debugging purpose

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

    useEffect(() => {
        getTasks() // calling the fetch tasks function 
    }, [])

    return (
        <div className='taskContainer'>
            {
                // mapping through the tasks to visualize them
                Object.values(tasks).map((task: Task) => {
                    return (
                        <div className='taskWrapper' key={task.id}>
                            <div>
                                <input type="checkbox" onClick={() => setCompleted(task.id)} defaultChecked={task.completed} />
                                <p className={"taskTitle " + (task.completed ? "completedTask" : "")}>{task.title}</p>
                            </div>
                            <button onClick={() => deleteTask(task.id)}><DeleteIcon /></button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AllTasks