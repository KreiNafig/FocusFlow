import { useEffect, useState, type ChangeEvent } from 'react'
import type { INote } from '../..';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonElem } from '../../../../components/ui/ButtonElem';

export const UpdateNote = () => {
    const noteId = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');
    
    useEffect(() => {
        const notesStorage = localStorage.getItem("notes");
        const data: INote[] = notesStorage ? JSON.parse(notesStorage) : [];
            if (notesStorage && noteId.id !== undefined) {
                const note: INote | undefined = data.find((e) => e.id === +noteId.id!);
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
        const data: INote[] = notesStorage ? JSON.parse(notesStorage) : [];

        const updatedNotes = data.map((note: INote) => {
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
    <div className="update-note">
        <h2>Редактирование закладки</h2>
        <form className="actions-note" onSubmit={handleSubmit}>
            <article>
            <label htmlFor="headline">Заголовок</label>
            <input onChange={(e) => setTitle(e.target.value)} defaultValue={title} placeholder="Заголовок" />
            </article>
            <article>
            <label htmlFor="text-note">Текст</label>
            <textarea id="text-note" onChange={(e) => setText(e.target.value)} defaultValue={text} placeholder="Текст" />
            </article>
            <ButtonElem widthElem="300px" heightElem="60px" butColor="white" color="var(--aside)">Сохранить заметку</ButtonElem>
        </form>
    </div>
  )
}
