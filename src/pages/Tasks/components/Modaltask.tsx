import { useEffect, useRef, useState } from "react"
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import type { IModal, ITask } from "..";
import { useValidation } from "../../../hooks/useValidationInput";



export const ModalTask = ({setTasks, onClose, openModal}: IModal) => {
    const isTaskCreate = useValidation('');
    const [isValidation, setIsValidation] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if(isTaskCreate.errorMessage) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsValidation(true);
        } else {
            setIsValidation(false);
        }
    }, [isTaskCreate.errorMessage])

    useOutsideClick(modalRef, onClose, openModal);

    const handleCreate = (): void => {
        if(!isTaskCreate.errorMessage) {
        const date = new Date();
        const createTask: ITask = {
            task: isTaskCreate.value,
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
    }
  return (
    <>
    <article className="modal">
        <div className="modal-container" ref={modalRef}>
            <h2>Создание Задачи</h2>
            <input name="createTask" placeholder="Введите задачу" value={isTaskCreate.value} onChange={isTaskCreate.onChange} onBlur={isTaskCreate.onBlur} />
            {(isTaskCreate.dirty && isTaskCreate.error && isTaskCreate.errorMessage) && <div className="error">{isTaskCreate.errorMessage}</div>}
            <button disabled={isValidation} onClick={() => handleCreate()}>Создать</button>
            <button onClick={onClose}>Закрыть</button>
        </div>
    </article>
    </>
  )
}
