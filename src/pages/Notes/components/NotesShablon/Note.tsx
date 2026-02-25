import { useEffect, useState } from "react";
import type { INote, NoteProps } from "../..";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import LocationDisabledIcon from '@mui/icons-material/LocationDisabled';
import PushPinIcon from '@mui/icons-material/PushPin';
import { Link } from "react-router-dom";


export const Note = ({ title }: NoteProps) => {
    const [notes, setNotes] = useState<INote[]>([]);

    useEffect(() => {
        const data = localStorage.getItem("notes");
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setNotes(data ? JSON.parse(data) : []);
    }, []);

    function handleDelete(id: number): void {
        const data = localStorage.getItem("notes");
        const newNotes: INote[] = data ? JSON.parse(data).filter((e: INote) => e.id !== id) : [];
        localStorage.setItem("notes", JSON.stringify(newNotes));
        setNotes(newNotes);
    }
    function handlePin(id: number): void {
        const data = localStorage.getItem("notes");
        const notesArr: INote[] = data ? JSON.parse(data) : [];

        const updatedNotes = notesArr.map((note) => {
            if (note.id === id) {
                return {
                    ...note,
                    pin: !note.pin,
                };
            }
            return note;
        });

        localStorage.setItem("notes", JSON.stringify(updatedNotes));
        setNotes(updatedNotes);
    }
    
  return (
    <section className="notes-container">
      {notes
        .slice()
        .filter((e) =>
            title ? e.title.toLowerCase().includes(title.toLowerCase()) : true
        )
        .sort((a, b) => (b.pin ? 1 : 0) - (a.pin ? 1 : 0))
        .map((e) => (
          <article className="note-elem" key={e.id}>
            <div>
              <header>
                <div>
                  {e.pin && (
                    <div className="pin-note">
                      <PushPinIcon />
                    </div>
                  )}
                  <h3>{e.title}</h3>
                </div>
                <div className="action-note">
                  <div onClick={() => handlePin(e.id)}>
                    {e.pin ? <LocationDisabledIcon /> : <LocationSearchingIcon />}
                  </div>
                  <Link to={`/notes/update/${e.id}`}>
                    <div>
                      <EditIcon />
                    </div>
                  </Link>
                  <div onClick={() => handleDelete(e.id)}>
                    <DeleteIcon />
                  </div>
                </div>
              </header>
              <p className="note-text">
                {e.text.slice(0, 450)}
                {e.text.length > 356 && "..."}
              </p>
            </div>
            <footer>
              <div className="footer-container">
                <select>
                  <option selected>Базовый цвет</option>
                  <option>Синий цвет</option>
                  <option>Красный цвет</option>
                  <option>Зеленый цвет</option>
                  <option>Оранжевый цвет</option>
                </select>
                <data>
                  {e.date}
                  <time>{e.time}</time>
                </data>
              </div>
            </footer>
          </article>
        ))}
    </section>
  )
}
