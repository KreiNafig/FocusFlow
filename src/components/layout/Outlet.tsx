import React, { useRef, useState } from 'react';
import { Link, Outlet as OutletReact} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import TaskIcon from '@mui/icons-material/Task';
import NotesIcon from '@mui/icons-material/Notes';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useOutsideClick } from '../../hooks/useOutsideClick';

export const Outlet = () => {
  const [openBurger, setOpenBurger] = useState<boolean>(false);
  const asideRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const path: string = location.pathname.split("/")[1];
  const arrayLink: { name: string; icon: React.ElementType }[] = [
    { name: "dashboard", icon: HomeIcon },
    { name: "tasks", icon: TaskIcon },
    { name: "notes", icon: NotesIcon },
    { name: "profile", icon: PersonIcon },
    { name: "settings", icon: SettingsIcon },
  ];

  useOutsideClick(asideRef, handleClose, openBurger)

  const currentLink = arrayLink.find(link => link.name === path);
  const headerTitle: string = currentLink
    ? currentLink.name[0].toUpperCase() + currentLink.name.slice(1)
    : "Dashboard"

    function handleClose():void {
      setOpenBurger(false)
    }


  return (
    <>
    <div className="container">
      <aside ref={asideRef} className={`${openBurger ? 'active' : ''}`}>
        <header>
          <h1>FocusFlow</h1>
        </header>
        <section>
          {arrayLink.map((e) => {
          const IconComponent = e.icon;
          return(
            <div className="languette" key={e.name}>
              <IconComponent />
              <Link to={e.name === "dashboard" ? '' :`/${e.name}`}>{e.name[0].toUpperCase() + e.name.slice(1)}</Link>
            </div>
          )})}
        </section>
      </aside>
        <div onClick={() => setOpenBurger(!openBurger)} className={`burger ${openBurger ? 'active' : ''}`}> {openBurger ? <CloseIcon /> : <MenuIcon />}</div>
      <main className="main">
            <header className="header">
                <h1>{headerTitle}</h1>
            </header>
            <article className="article">
              <OutletReact />
            </article>
      </main>
      </div>
    </>
  )
}
