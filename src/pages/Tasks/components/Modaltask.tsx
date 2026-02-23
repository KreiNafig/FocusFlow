import { useRef, useState } from "react"
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import type { ITask } from "..";

interface IModal {
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
    onClose: () => void;
    openModal: boolean;
}

export const ModalTask = ({setTasks, onClose, openModal}: IModal) => {
    const [task, setTask] = useState<string>("");
    const modalRef = useRef<HTMLDivElement | null>(null)

    useOutsideClick(modalRef, onClose, openModal);
    const handleCreate = (): void => {
        const date = new Date();
        const createTask: ITask = {
            task: task,
            completed: false,
            dataCompleted: date.getDay(),
            id: Date.now()

        }
        const storageTasks = localStorage.getItem("tasks");
        const parsedTask: ITask[] = storageTasks ? JSON.parse(storageTasks) : [];
        const updateTasks = [...parsedTask, createTask];
        localStorage.setItem("tasks", JSON.stringify(updateTasks));
        setTasks(updateTasks);
        onClose();
    }
  return (
    <>
    <article className="modal">
        <div className="modal-container" ref={modalRef}>
            <h2>Создание Задачи</h2>
            <input placeholder="Введите задачу" value={task} onChange={(e) => setTask(e.target.value)} />
            <button onClick={() => handleCreate()}>Создать</button>
            <button onClick={onClose}>Закрыть</button>
        </div>
    </article>
    </>
  )
}
