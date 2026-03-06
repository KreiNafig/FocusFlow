import { useEffect, useState, type ChangeEvent } from 'react'
import type { INote } from '../..';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonElem } from '../../../../components/ui/ButtonElem';
import { useValidation } from '../../../../hooks/useValidationInput';

export const UpdateNote = () => {
    const noteId = useParams();
    const navigate = useNavigate();
    const [isValidation, setIsValidation] = useState(false);
    const isTitle = useValidation('');
    const isText = useValidation('');
    
    useEffect(() => {
        const notesStorage = localStorage.getItem("notes");
        const data: INote[] = notesStorage ? JSON.parse(notesStorage) : [];
            if (notesStorage && noteId.id !== undefined) {
                const note: INote[] | undefined = data.filter((e) => e.id === +noteId.id!);
                if (note && note.length > 0) {
                    isTitle.setValueForce(note[0].title);
                    isText.setValueForce(note[0].text);
                } else {
                    navigate("/error");
                }
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [noteId.id]);

        useEffect(() => {
            if(isTitle.errorMessage || isText.errorMessage) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setIsValidation(true);
            } else {
                setIsValidation(false);
            }
        }, [isText.errorMessage, isTitle.errorMessage])


    function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        if(!isTitle.errorMessage && !isText.errorMessage) {
        const notesStorage = localStorage.getItem("notes");
        const data: INote[] = notesStorage ? JSON.parse(notesStorage) : [];

        const updatedNotes = data.map((note: INote) => {
            if (note.id === +noteId.id!) {
                return {
                    ...note,
                    title: isTitle.value,
                    text: isText.value,
                };
            }
            return note;
        });
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
        navigate("/notes")
    }
    }

  return (
    <div className="update-note">
        <h2>Редактирование закладки</h2>
        <form className="actions-note" onSubmit={handleSubmit}>
            <article>
            <label htmlFor="titleNote">Заголовок</label>
            <input id="titleNote" name="title" value={isTitle.value} onChange={isTitle.onChange} onBlur={isTitle.onBlur} placeholder="Введите заголовок..." />
            {(isTitle.dirty && isTitle.error && isTitle.errorMessage) && <div className="error">{isTitle.errorMessage}</div>}
            </article>
            <article>
            <label htmlFor="text-note">Текст</label>
            <textarea id="text-note" name="text" value={isText.value} onChange={isText.onChange} onBlur={isText.onBlur} placeholder="Введите текст..." />
            {(isText.dirty && isText.error && isText.errorMessage) && <div className="error">{isText.errorMessage}</div>}
            </article>
            <ButtonElem disable={isValidation} widthElem="300px" heightElem="60px" butColor="white" color="var(--button-color)">Сохранить заметку</ButtonElem>
        </form>
    </div>
  )
}
