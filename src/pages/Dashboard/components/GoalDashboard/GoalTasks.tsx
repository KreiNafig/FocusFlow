import { useEffect, useState } from "react";
import type { ITaskGraphic } from "../..";


export const GoalTasks = () => {
    const date = new Date();
    let goal: number = (date.getDay() === 0 ? 1 : date.getDay());
    const [taskGraphic, setTaskGraphic] = useState<ITaskGraphic[]>([]);

    useEffect(() => {
        try {
            const graphic = localStorage.getItem("data");
            if (graphic) {
                const parsedGraphic = JSON.parse(graphic);
                if (parsedGraphic && Array.isArray(parsedGraphic)) {
                    setTaskGraphic(parsedGraphic);
                } else {
                    setTaskGraphic([]);
                }
            } else {
                setTaskGraphic([]);
            }
        } catch (e) {
            console.error("Ошибка при разборе данных тасков из localStorage:", e);
            setTaskGraphic([]);
        }
    }, []);

    goal = Math.round(3 + goal * 1.5);


  return (
    <article className="dashboard-quote">
        <header>
            <h2>Цель дня: выполнить {goal} задач</h2>
            <p>Прогресс: {taskGraphic[date.getDay()]?.tasks >= goal ? <span style={{color: "green", fontWeight: "600"}}>Цель дня выполнена!</span> : <span>{taskGraphic[date.getDay()]?.tasks} / {goal}</span>}</p>
        </header>
    </article>
  )
}
