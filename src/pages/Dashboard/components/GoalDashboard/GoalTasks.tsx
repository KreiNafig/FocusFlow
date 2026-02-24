import { useEffect, useState } from "react";
import type { ITaskGraphic } from "../..";


export const GoalTasks = () => {
    const date = new Date();
    const [taskGraphic, setTaskGraphic] = useState<ITaskGraphic[]>([]);

    useEffect(() => {
        let parsedGraphic;
        const graphic = localStorage.getItem("data");
        if(graphic) {
            parsedGraphic = JSON.parse(graphic);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTaskGraphic(parsedGraphic);
        }
    }, []);

  return (
    <article className="dashboard-quote">
        <header>
            <h2>Цель дня: выполнить 5 задач</h2>
            <p>Прогресс: {taskGraphic[date.getDay()]?.tasks} / 5</p>
        </header>
    </article>
  )
}
