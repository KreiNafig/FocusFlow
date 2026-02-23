import { useState, useEffect } from "react";
import type { ITask } from ".";
import { Link, useSearchParams } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { ButtonElem } from "../../components/ui/ButtonElem";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import LocationDisabledIcon from '@mui/icons-material/LocationDisabled';
import PushPinIcon from '@mui/icons-material/PushPin';

export const Notes = () => {
    const [notes, setNotes] = useState<ITask[]>([]);
    const [searchTitle, setSearchTitle] = useSearchParams('');
    const titleSearch: string | null = searchTitle.get('title');


    useEffect(() => {
        const data = localStorage.getItem("notes");
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setNotes(data ? JSON.parse(data) : []);
    }, []);
    
    function handleDelete(id: number): void {
        const data = localStorage.getItem("notes");
        const newNotes: ITask[] = data ? JSON.parse(data).filter((e: ITask) => e.id !== id) : [];
        localStorage.setItem("notes", JSON.stringify(newNotes));
        setNotes(newNotes);
    }
    function handlePin(id: number): void {
        const data = localStorage.getItem("notes");
        const notesArr: ITask[] = data ? JSON.parse(data) : [];

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
    function handleSearchTitle(key: string, value: string): void {
        setSearchTitle({
            [key]: value,
        })
    }

  return (
   <div>
        <div className="search-action">
            <header className="search">
                <input className="search-bar" placeholder="Поиск" value={titleSearch ?? ""} onChange={(e) => handleSearchTitle("title", e.target.value)} />
                <SearchIcon />
            </header>
                <Link to="/notes/new"><ButtonElem padding="0px 16px" heightElem="35px">Создать закладку</ButtonElem></Link>
        </div>
        <section className="notes-container">
            {notes
                .slice()
                .filter((e) => titleSearch ? e.title.toLowerCase().includes(titleSearch.toLowerCase()) : true)
                .sort((a, b) => (b.pin ? 1 : 0) - (a.pin ? 1 : 0))
                .map((e) => (
                <article className="note-elem" key={e.id} >
                    <div>
                    <header>
                        <div style={{display: "flex", gap: "5px"}}>
                        {e.pin && <div style={{opacity: 0.5, display: "inline-block"}}><PushPinIcon /></div>}
                        <h3>{e.title}</h3>
                        </div>
                        <div className="action-note">
                            <div onClick={() => handlePin(e.id)}>{e.pin ? <LocationDisabledIcon /> : <LocationSearchingIcon />}</div>
                            <Link to={`/notes/update/${e.id}`}><div><EditIcon /></div></Link>
                            <div onClick={() => handleDelete(e.id)}><DeleteIcon /></div>
                        </div>
                    </header>
                        <p className="note-text">{e.text.slice(0, 450)}{e.text.length > 356 && "..."}</p>
                    </div>
                    <footer>
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
                    </footer>
                </article>
            ))}
        </section>
   </div>
  )
}
