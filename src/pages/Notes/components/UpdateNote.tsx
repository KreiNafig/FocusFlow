import { useEffect, useState, type ChangeEvent } from 'react'
import type { ITask } from '..';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonElem } from '../../../components/ui/ButtonElem';

export const UpdateNote = () => {
    const noteId = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');
    
    useEffect(() => {
        const notesStorage = localStorage.getItem("notes");
        const data: ITask[] = notesStorage ? JSON.parse(notesStorage) : [];
            if (notesStorage && noteId.id !== undefined) {
                const note: ITask | undefined = data.find((e) => e.id === +noteId.id!);
                if (note) {
                    // eslint-disable-next-line react-hooks/set-state-in-effect
                    setTitle(note.title);
                    setText(note.text);
                }
            }
        }, [noteId.id]);


    function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        const notesStorage = localStorage.getItem("notes");
        const data: ITask[] = notesStorage ? JSON.parse(notesStorage) : [];

        const updatedNotes = data.map((note: ITask) => {
            if (note.id === +noteId.id!) {
                return {
                    ...note,
                    title: title,
                    text: text,
                };
            }
            return note;
        });
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
        navigate("/notes")
    }

  return (
    <div>
        <h2 style={{textAlign: "left", marginBottom: "20px"}}>Редактирование закладки</h2>
        <form className="actions-note" onSubmit={handleSubmit}>
            <article>
            <label htmlFor="headline">Заголовок</label>
            <input onChange={(e) => setTitle(e.target.value)} defaultValue={title} placeholder="Заголовок" />
            </article>
            <article>
            <label htmlFor="text-note">Текст</label>
            <textarea id="text-note" onChange={(e) => setText(e.target.value)} defaultValue={text} placeholder="Текст" />
            </article>
            <ButtonElem widthElem="300px" heightElem="60px" butColor="white" color="var(--aside)">Сохранить</ButtonElem>
        </form>
    </div>
  )
}
