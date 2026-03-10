import { Route, Routes } from "react-router-dom"
import { Outlet } from "../components/layout/Outlet"
import { NotFound } from "../pages/NotFound/NotFound"
import { useEffect } from "react"
import { lazy, Suspense } from "react";

function App() {
  const newData = [
    { name: 'Вс', tasks: 0 },
    { name: 'Пн', tasks: 0 },
    { name: 'Вт', tasks: 0 },
    { name: 'Ср', tasks: 0 },
    { name: 'Чт', tasks: 0 },
    { name: 'Пт', tasks: 0 },
    { name: 'Сб', tasks: 0 },
];

useEffect(() => {
  try {
    const layout = localStorage.getItem("layout");
    if (layout === "true") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  } catch (e) {
    console.warn("Ошибка чтения темы из localStorage:", e);
  }
}, []);

useEffect(() => {
  const data = localStorage.getItem("data");
  if(!data) {
    localStorage.setItem("data", JSON.stringify(newData));
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard").then(module => ({ default: module.Dashboard })));
const Tasks = lazy(() => import("../pages/Tasks/Tasks").then(module => ({ default: module.Tasks })));
const Notes = lazy(() => import("../pages/Notes/Notes").then(module => ({ default: module.Notes })));
const Note = lazy(() => import("../pages/Notes/components/Note Comp/Note").then(module => ({ default: module.Note })));
const CreateNote = lazy(() => import("../pages/Notes/components/CreateNote/CreateNote").then(module => ({ default: module.CreateNote })));
const UpdateNote = lazy(() => import("../pages/Notes/components/UpdateNote/UpdateNote").then(module => ({ default: module.UpdateNote })));
const Profile = lazy(() => import("../pages/Profile/Profile").then(module => ({ default: module.Profile })));
const Settings = lazy(() => import("../pages/Settings/Settings").then(module => ({ default: module.Settings })));

   
  return (  
    <>
    <Suspense fallback={(<h1 className="loading-page">Загрузка страницы...</h1>)}>
      <Routes >
        <Route element={<Outlet />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/notes' element={<Notes />} />
          <Route path='/notes/:id' element={<Note />} />
          <Route path='/notes/new' element={<CreateNote />} />
          <Route path='/notes/update/:id' element={<UpdateNote />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/settings' element={<Settings />} />
        </Route>
          <Route path='*' element={<NotFound />} />
      </Routes>
      </Suspense>
    </>
  )
}

export default App
