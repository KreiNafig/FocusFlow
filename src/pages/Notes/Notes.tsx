import { Link, useSearchParams } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { ButtonElem } from "../../components/ui/ButtonElem";
import { Note } from "./components/Note Comp/NotesRender";
import { InputElem } from "../../components/ui/InputElem";

export const Notes = () => {
    const [searchTitle, setSearchTitle] = useSearchParams('');
    const titleSearch: string | null = searchTitle.get('title');

    function handleSearchTitle(key: string, value: string): void {
        setSearchTitle({
            [key]: value,
        })
    }

  return (
   <div>
        <div className="search-action">
            <header className="search">
                <InputElem text={titleSearch ?? ""} place="Поиск заметки..." change={(e) => handleSearchTitle("title", e.target.value)} />
                <SearchIcon />
            </header>
                <Link to="/notes/new"><ButtonElem padding="0px 16px" heightElem="35px">Создать заметку</ButtonElem></Link>
        </div>
        <Note title={titleSearch} />
   </div>
  )
}
