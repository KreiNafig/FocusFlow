import { useEffect, useState } from 'react'
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
    }, [id, navigate])

    function mountColor(eventColor: string): string {
        const isDarkTheme: string = localStorage.getItem("layout") || '';
        const updateDarkTheme: boolean = isDarkTheme && JSON.parse(isDarkTheme);
        const colors: Record<string, { light: string; dark: string }> = {
          blue: { light: "#C2C3E7", dark: "#2A284E" },
          red: { light: "#FF7770", dark: "#763230" },
          green: { light: "#CAE7C2", dark: "#535D2B" },
          orange: { light: "#FFB770", dark: "#A35D44" },
          default: { light: "#e7d7c2", dark: "#2a2522" }
        };
  
        const selectedColorKey = eventColor in colors ? eventColor : "default";
        const color = updateDarkTheme ? colors[selectedColorKey].dark : colors[selectedColorKey].light;
        return color;
      }

    if(isNote.length === 0) {
        return(
            <article className="loading-user">
                <h1>Загрузка заметки...</h1>
            </article>
        )
    }

  return (
    <article style={{backgroundColor: `${mountColor(isNote[0].color)}`}} className="note-elem-id">
      <header>
        <h2 style={{ wordWrap: "break-word", overflowWrap: "break-word", whiteSpace: "pre-line" }}>{isNote[0].title}</h2>
      </header>
      <section>
        <p style={{ wordWrap: "break-word", overflowWrap: "break-word", whiteSpace: "pre-line" }}>
          {isNote[0].text}
        </p>
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
