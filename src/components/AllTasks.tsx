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
    let limit = 5

    const getTasks = async () => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
            const data: Task[] = await response.json()
            setTasks(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <>
            {
                Object.values(tasks).map((task: Task) => {
                    return (
                        <div key={task.id}>
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