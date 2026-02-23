import { Route, Routes } from "react-router-dom"
import {Dashboard} from "../pages/Dashboard/Dashboard"
import { Outlet } from "../components/layout/Outlet"
import { Tasks } from "../pages/Tasks/Tasks"
import { Notes } from "../pages/Notes/Notes"
import { Profile } from "../pages/Profile/Profile"
import { Settings } from "../pages/Settings/Settings"
import { NotFound } from "../pages/NotFound/NotFound"
import { CreateNote } from "../pages/Notes/components/CreateNote"
import { UpdateNote } from "../pages/Notes/components/UpdateNote"
import { useEffect } from "react"

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
  const data = localStorage.getItem("data");
  if(!data) {
    localStorage.setItem("data", JSON.stringify(newData));
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])
   
  return (  
    <>
      <Routes >
        <Route path='/' element={<Outlet />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/notes' element={<Notes />} />
          <Route path='/notes/new' element={<CreateNote />} />
          <Route path='/notes/update/:id' element={<UpdateNote />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/settings' element={<Settings />} />
        </Route>
          <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
