import type { ITask, TaskProps } from "../..";


export const Task = ({ taskSearch, tasks, setTasks }: TaskProps) => {
 
    const handleChecked = (id: number, completed: boolean):void => {
        const date = new Date();

        const storageTask = localStorage.getItem("tasks");
        const parsedTasks = storageTask ? JSON.parse(storageTask) : [];
        const updateTasks = parsedTasks.map((e: ITask) => e.id === id ? {...e, completed: !e.completed} : e);
        localStorage.setItem("tasks", JSON.stringify(updateTasks));
        setTasks(updateTasks)

        const storageGraphic = localStorage.getItem("data");
        const parsedGraphic = storageGraphic ? JSON.parse(storageGraphic) : [];
        let updateGraphic;

            if(completed) {
                updateGraphic = parsedGraphic.slice();
                if (updateGraphic[date.getDay()].tasks > 0) {
                    updateGraphic[date.getDay()] = {
                        ...updateGraphic[date.getDay()],
                        tasks: updateGraphic[date.getDay()].tasks - 1
                    };
                }
            } else {
                updateGraphic = parsedGraphic.slice();
                updateGraphic[date.getDay()] = {
                    ...updateGraphic[date.getDay()],
                    tasks: updateGraphic[date.getDay()].tasks + 1
                };
            }

            localStorage.setItem("data", JSON.stringify(updateGraphic));
            
    }

    const handleDelete = (id: number, completed: boolean, dataCompleted: number): void => {
        const storage = localStorage.getItem("tasks");
        const parsedTasks = storage ? JSON.parse(storage) : [];
        const updateTasks = parsedTasks.filter((e: ITask) => e.id !== id);
        localStorage.setItem("tasks", JSON.stringify(updateTasks));
        setTasks(updateTasks)


        const storageGraphic = localStorage.getItem("data");
        const parsedGraphic = storageGraphic ? JSON.parse(storageGraphic) : [];
        let updateGraphic;

            if(completed) {
                updateGraphic = parsedGraphic.slice();
                if (updateGraphic[dataCompleted].tasks > 0) {
                    updateGraphic[dataCompleted] = {
                        ...updateGraphic[dataCompleted],
                        tasks: updateGraphic[dataCompleted].tasks - 1
                    };
                }
            }

            localStorage.setItem("data", JSON.stringify(updateGraphic));
    }


  return (
    <article>
            {tasks
            .slice()
            .filter((e) => taskSearch ? e.task.toLowerCase().includes(taskSearch.toLowerCase()) : true)
            .map((e) => (
            <div key={e.id} className={`task task-visible`}>
                <div className="task-text">
                <h3>{e.task}</h3>
                <p>{e.completed ? "Completed" : "Procces"}</p>
                </div>
                <div className="actions-task">
                <input type="checkbox"  checked={e.completed} onChange={() => handleChecked(e.id, e.completed)}/>
                <button onClick={() => handleDelete(e.id, e.completed, e.dataCompleted)}>Удалить</button>
                </div>
            </div>
            ))}
        </article>
  )
}
