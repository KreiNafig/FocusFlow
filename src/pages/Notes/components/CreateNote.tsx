import { useState, type ChangeEvent } from "react";
import type { ITask } from "..";
import { useNavigate } from "react-router-dom";
import { ButtonElem } from "../../../components/ui/ButtonElem";


export const CreateNote = () => {
    const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');
    const navigate = useNavigate();
    const date = new Date();

    function handleSubmit(e: ChangeEvent<HTMLFormElement>): void {
        e.preventDefault();
        const data: ITask = {
            id: Date.now(),
            title: title,
            text: text,
            date: `${date.getDate()} ${monthNames[date.getMonth()]}`,
            time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()}`,
            pin: false,
        }

        const existingTasks = localStorage.getItem("notes");
        const tasks: ITask[] = existingTasks ? JSON.parse(existingTasks) : [];
        tasks.push(data);
        localStorage.setItem("notes", JSON.stringify(tasks));
        navigate('/notes')
    }
  return (
    <div>
        <h2 style={{textAlign: "left", marginBottom: "20px"}}>Создание закладки</h2>
        <form className="actions-note" onSubmit={handleSubmit}>
            <article>
            <label htmlFor="headline">Заголовок</label>
            <input id="headline" onChange={(e) => setTitle(e.target.value)} placeholder='Введите заголовок' />
            </article>
            <article>
            <label htmlFor="text-note">Текст</label>
            <textarea id="text-note" onChange={(e) => setText(e.target.value)} placeholder='Введите текст' />
            </article>
            <ButtonElem widthElem="300px" heightElem="60px" butColor="white" color="var(--aside)">Создать Закладку</ButtonElem>
        </form>
    </div>
  )
}
