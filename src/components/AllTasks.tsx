import React, { useEffect } from 'react'

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


    // localStorage.removeItem('tasks') // clearing the localStorage for debugging purpose

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <>
            {
                // mapping through the tasks to visualize them
                Object.values(tasks).map((task: Task) => {
                    return (
                        <div key={task.id}>
                            {/* @todo add checkbox functionality to strike the completed tasks */}
                            {/* @todo add delete functionality to delete a task */}
                            <h2>{task.title}</h2>
                            <p>{task.completed ? 'Completed' : 'Not completed'}</p>
                            <input type="checkbox" defaultChecked={task.completed} />
                            <button>Delete</button>
                        </div>
                    )
                })
            }
        </>
    )
}

export default AllTasks