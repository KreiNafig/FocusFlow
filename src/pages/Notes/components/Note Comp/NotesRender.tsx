import { useEffect, useState, type ChangeEvent } from "react";
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
    function handleChange(e: ChangeEvent<HTMLSelectElement>, id: number): void {
      const data = localStorage.getItem("notes");
      const notesArr: INote[] = data ? JSON.parse(data) : [];
      let color = "";

      const isDarkTheme: string = localStorage.getItem("layout") || '';
      const updateDarkTheme: boolean = isDarkTheme && JSON.parse(isDarkTheme);
      const colors: Record<string, { light: string; dark: string }> = {
        blue: { light: "#2A284E", dark: "#C2C3E7" },
        red: { light: "#763230", dark: "#FF7770" },
        green: { light: "#535D2B", dark: "#CAE7C2" },
        orange: { light: "#A35D44", dark: "#FFB770" },
        default: { light: "#755C49", dark: "#e7d7c2" }
      };

      const selectedColorKey = e.target.value in colors ? e.target.value : "default";
      color = !updateDarkTheme ? colors[selectedColorKey].dark : colors[selectedColorKey].light;

      const updatedNotes = notesArr.map((note) => {
        if (note.id === id) {
            return {
                ...note,
                colorTask: color,
                color: e.target.value,
            };
        }
        return note;
    });

    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
    }

    function mountColor(eventColor: string): string {
      const isDarkTheme: string = localStorage.getItem("layout") || '';
      const updateDarkTheme: boolean = isDarkTheme && JSON.parse(isDarkTheme);
      const colors: Record<string, { light: string; dark: string }> = {
        blue: { light: "#2A284E", dark: "#C2C3E7" },
        red: { light: "#763230", dark: "#FF7770" },
        green: { light: "#535D2B", dark: "#CAE7C2" },
        orange: { light: "#A35D44", dark: "#FFB770" },
        default: { light: "#2a2522", dark: "#e7d7c2" }
      };

      const selectedColorKey = eventColor in colors ? eventColor : "default";
      const color = !updateDarkTheme ? colors[selectedColorKey].dark : colors[selectedColorKey].light;
      return color;
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
          <article style={{backgroundColor: `${mountColor(e.color)}`}} className={`note-elem ${e.pin && "pinned"}`} key={e.id}>
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
            </div>
            <Link to={`/notes/${e.id}`}>
              <div className="text-container">
              <p className="note-text">
                {e.text.slice(0, 450)}
                {e.text.length > 356 && "..."}
              </p>
              </div>
              </Link>
            <footer>
              <div className="footer-container">
                <select defaultValue={`${e.color}`} onChange={(event) => handleChange(event, e.id)}>
                  <option value="base">Базовый цвет</option>
                  <option value="blue">Синий цвет</option>
                  <option value="red">Красный цвет</option>
                  <option value="green">Зеленый цвет</option>
                  <option value="orange">Оранжевый цвет</option>
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
