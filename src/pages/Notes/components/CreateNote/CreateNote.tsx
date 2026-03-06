import type { INote } from "../..";
import { useNavigate } from "react-router-dom";
import { ButtonElem } from "../../../../components/ui/ButtonElem";
import { useValidation } from "../../../../hooks/useValidationInput";
import { useEffect, useState } from "react";


export const CreateNote = () => {
    const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    const [isValidation, setIsValidation] = useState(false);
    const isTitle = useValidation('');
    const isText = useValidation('');
    const navigate = useNavigate();
    const date = new Date();

    useEffect(() => {
        if(isTitle.errorMessage || isText.errorMessage) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsValidation(true);
        } else {
            setIsValidation(false);
        }
    }, [isText.errorMessage, isTitle.errorMessage])

    function handleSubmit(e: { preventDefault: () => void; }): void {
        e.preventDefault();
        if(!isTitle.errorMessage && !isText.errorMessage) {
        const data: INote = {
            id: Date.now(),
            title: isTitle.value,
            text: isText.value,
            date: `${date.getDate()} ${monthNames[date.getMonth()]}`,
            time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()}`,
            pin: false,
            colorTask: "#e7d7c2",
            color: "base",
        }

        const existingTasks = localStorage.getItem("notes");
        const tasks: INote[] = existingTasks ? JSON.parse(existingTasks) : [];
        tasks.push(data);
        localStorage.setItem("notes", JSON.stringify(tasks));
        navigate('/notes')
    }
    }
  return (
    <div className="create-note">
        <h2>Создание закладки</h2>
        <form className="actions-note" onSubmit={handleSubmit}>
            <article>
            <label htmlFor="headline">Заголовок</label>
            <input id="headline" name="title" value={isTitle.value} onChange={isTitle.onChange} onBlur={isTitle.onBlur} placeholder='Введите заголовок...' />
            {(isTitle.dirty && isTitle.error && isTitle.errorMessage) && <div style={{display: `${(isTitle.dirty && isTitle.error) ? "block" : "none"}`}} className="error">{isTitle.errorMessage}</div>}
            </article>
            <article>
            <label htmlFor="text-note">Текст</label>
            <textarea id="text-note" name="text" value={isText.value} onChange={isText.onChange} onBlur={isText.onBlur} placeholder='Введите текст...' />
            {(isText.dirty && isText.error && isText.errorMessage) && <div className="error">{isText.errorMessage}</div>}
            </article>
            <ButtonElem disable={isValidation} widthElem="300px" heightElem="60px" butColor="white" color="var(--button-color)" padding="10px 20px">Создать заметку</ButtonElem>
        </form>
    </div>
  )
}
