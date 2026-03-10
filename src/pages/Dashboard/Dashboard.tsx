import { GoalTasks } from './components/GoalDashboard/GoalTasks';
import { TasksDashboard } from './components/TasksDashboard/TasksDashboard';
import { Graphic } from './components/Graphic/Graphic';
import { Pomodoro } from './components/Pomodoro/Pomodoro';
import { PhotoCat } from './components/PhotoCat/PhotoCat';
import { RandomQuote } from './components/RandomQuote/RandomQuote';

export const  Dashboard = () => {

    return (
        <div className="dashboard">
            <section className="dashboard-container">
                <div className="dasboard-container-column">
                    <RandomQuote />
                    <GoalTasks />
                </div>
                <TasksDashboard />
            </section>
            <section className="dashboard-container graphic">
                <Graphic />
                <Pomodoro />
                <PhotoCat />
            </section>
            <section className="dashboard-container">
                <div style={{width: "90vw", display: "flex", justifyContent: "center"}} className="dashboard-card">Krein Project ®</div>
            </section>
        </div>
      )
}