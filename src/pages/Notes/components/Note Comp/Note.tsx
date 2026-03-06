import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { INote } from '../..';

export const Note = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [isNote, setNote] = useState<INote[]>([]);


    useEffect(() => {
        try {
            const storageNote = localStorage.getItem("notes");
            
            if(storageNote) {
                const parsedNote = JSON.parse(storageNote);
                if(parsedNote && Array.isArray(parsedNote)) {
                    const data: INote[] = parsedNote.filter(e => e.id === +id);
                    if(data.length > 0) {
                        // eslint-disable-next-line react-hooks/set-state-in-effect
                        setNote(data);
                    } else {
                        navigate("/error");
                    }
                } else {
                    setNote([]);
                }
            } else {
                setNote([]);
            }
        } catch (e) {
            console.log("Ошибка распаковки данных заметки из localStorage: ", e);
            setNote([]);
        }
    }, [id])

    function mountColor(eventColor: string): string {
        const isDarkTheme: string = localStorage.getItem("layout") || '';
        const updateDarkTheme: boolean = isDarkTheme && JSON.parse(isDarkTheme);
        const colors: Record<string, { light: string; dark: string }> = {
          blue: { light: "#2A284E", dark: "#C2C3E7" },
          red: { light: "#763230", dark: "#FF7770" },
          green: { light: "#535D2B", dark: "#CAE7C2" },
          orange: { light: "#A35D44", dark: "#FFB770" },
          default: { light: "#2a2522", dark: "#2a2522" }
        };
  
        const selectedColorKey = eventColor in colors ? eventColor : "default";
        const color = !updateDarkTheme ? colors[selectedColorKey].dark : colors[selectedColorKey].light;
        return color;
      }

    if(isNote.length === 0) {
        return(
            <article>
                <h1>Загрузка заметки...</h1>
            </article>
        )
    }

  return (
    <article style={{backgroundColor: `${mountColor(isNote[0].color)}`}} className="note-elem-id">
      <header>
        <h2>{isNote[0].title}</h2>
      </header>
      <section>
        <p>{isNote[0].text}</p>
      </section>
      <footer>
        <div>
          {isNote[0].date}&nbsp;
          <time>{isNote[0].time}</time>
        </div>
      </footer>
    </article>
  )
}
