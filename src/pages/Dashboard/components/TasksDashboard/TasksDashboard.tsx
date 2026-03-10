import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { ITask } from '../../../Tasks';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export const TasksDashboard = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);

    useEffect(() => {
        let parsedTasks;
        const arrayTasks = localStorage.getItem("tasks");

        if(arrayTasks) {
            parsedTasks = JSON.parse(arrayTasks);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTasks(parsedTasks)
        }
    }, [])

  return (
    <article className="dashboard-tasks">
        <header>
            <h2>Текущие задачи:</h2>
        </header>
        <ul>
            {tasks.filter((e) => e.completed === false).length !== 0 
            ? tasks
            .filter((e) => e.completed === false)
            .slice(0, 5)
            .map((e) => (
                <li key={e.id}>{e.task}</li>
            )) 
            : <div style={{textAlign: "center"}}>Список задач пуст</div>}
        </ul>
        <Link to="/tasks" className="task-dashboard-button">Развернуть список <ArrowRightAltIcon /></Link>
    </article>
  )
}
