import { useEffect, useState } from "react"
import { ModalTask } from "./components/ModalTask";
import type { ITask } from ".";
import { useSearchParams } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { ButtonElem } from "../../components/ui/ButtonElem";


export const Tasks = () => {
    const [modal, setModal] = useState<boolean>(false);
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [searchTask, setSearchTask] = useSearchParams('');
    const taskSearch: string | null = searchTask.get('task');



    function handleSearchTitle(key: string, value: string): void {
        setSearchTask({
            [key]: value,
        })
    }

    useEffect(() => {
        const arrayTask: string | never[] | null = localStorage.getItem("tasks");
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTasks(arrayTask ? JSON.parse(arrayTask) : []);
    }, [])
 
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

    const handleClose = ():void => {
        setModal(false)
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

    console.log(tasks)

  return (
    <div>
        <div className="action-task">
        {modal && <ModalTask setTasks={setTasks} onClose={handleClose} openModal={modal} />}
        <div className="search">
        <input className="search-bar" placeholder="Поиск задачи..." value={taskSearch ?? ""} onChange={(e) => handleSearchTitle("task", e.target.value)} />
        <SearchIcon />
        </div>
        <div onClick={() => setModal(!modal)}><ButtonElem padding="0px 16px" heightElem="35px">Создать задачу</ButtonElem></div>
        </div>
        <section className="todo-list">
        <header className="tasks-header">
            <h2>Todo</h2>
            <h2>In progress</h2>
            <h2>Done</h2>
        </header>
        <article>
            {tasks
            .slice()
            .filter((e) => taskSearch ? e.task.toLowerCase().includes(taskSearch.toLowerCase()) : true)
            .map((e) => (
            <div key={e.id} className="task">
                <h3 style={{maxWidth: "120px"}}>{e.task}</h3>
                <p style={{width: "120px"}}>{e.completed ? "Completed" : "Procces"}</p>
                <div className="actions-task">
                <input style={{width: "120px"}} type="checkbox"  checked={e.completed} onChange={() => handleChecked(e.id, e.completed)}/>
                <button onClick={() => handleDelete(e.id, e.completed, e.dataCompleted)}>Удалить</button>
                </div>
            </div>
            ))}
        </article>
        </section>
    </div>
  )
}
