import { useEffect, useState } from "react"
import { ModalTask } from "./components/Modaltask";
import type { ITask } from ".";
import { useSearchParams } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { ButtonElem } from "../../components/ui/ButtonElem";
import { Task } from "./components/Task/Task";


export const Tasks = () => {
    const [modal, setModal] = useState<boolean>(false);
    const [, setTasks] = useState<ITask[]>([]);
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
 
    const handleClose = ():void => {
        setModal(false)
    }

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
        <Task taskSearch={taskSearch} />
        </section>
    </div>
  )
}
