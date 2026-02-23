import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { PomodoroCircle } from '../../utils/Pomodoro';
import { useEffect, useRef, useState } from 'react';
import { useGetQuoteJokesQuery } from '../../store/api/RandomQuote/randomQuote';
import type { ITask } from '../Tasks';
import {ButtonElem} from '../../components/ui/ButtonElem';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import BlockIcon from '@mui/icons-material/Block';
import { Link } from 'react-router-dom';
import { useGetPhotoCatQuery } from '../../store/api/RandomPhoto/randomPhoto';

type PomodoroMode = 'work' | 'break';
interface ITaskGraphic {
    name: string;
    tasks: number;
}

export const  Dashboard = () => {
    const timeRef = useRef<number | undefined>(undefined)
    const hasSwitchedRef = useRef<boolean>(false)
    const [time, setTime] = useState<number>(0)
    const [now, setNow] = useState<number>(0)
    const [pause, setPause] = useState<boolean>(false)
    const [timePause, setTimePause] = useState<number>(0)
    const [isRunning, setRunning] = useState<boolean>(false)
    const [mode, setMode] = useState<PomodoroMode>('work');
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [taskGraphic, setTaskGraphic] = useState<ITaskGraphic[]>([]);

    const { data: quoteData } = useGetQuoteJokesQuery('');
    const { data: randomPhoto } = useGetPhotoCatQuery('');
    const quote = quoteData ? quoteData?.setup : "Загрузка цитаты...";

    const WORK_TIME = 1500;
    const BREAK_TIME = 300;
    const totalTimeSeconds = mode === 'work' ? WORK_TIME : BREAK_TIME;


    useEffect(() => {
        let parsedTasks;
        const arrayTasks = localStorage.getItem("tasks");

        if(arrayTasks) {
            parsedTasks = JSON.parse(arrayTasks);
            setTasks(parsedTasks)
        }
    }, [])

    useEffect(() => {
        let parsedGraphic;
        const graphic = localStorage.getItem("data");
        if(graphic) {
            parsedGraphic = JSON.parse(graphic);
            setTaskGraphic(parsedGraphic);
        }
    }, []);

    useEffect(() => {
        return () => clearInterval(timeRef.current)
    }, [])

    const elapsedSeconds = time > 0 ? (now - time) / 1000 : 0;
    const timeNow: number = Math.max(0, totalTimeSeconds - elapsedSeconds);

    useEffect(() => {
        if (isRunning && !pause && timeNow <= 0 && time > 0 && !hasSwitchedRef.current) {
            hasSwitchedRef.current = true;
            const nextMode: PomodoroMode = mode === 'work' ? 'break' : 'work';
            setMode(nextMode);
            const startTime = Date.now();
            setTime(startTime);
            setNow(startTime);
            setTimePause(0);
        } else if (timeNow > 0) {
            hasSwitchedRef.current = false;
        }
    }, [now, isRunning, pause, time, mode, timeNow])


    function handleClick(): void {
        if(isRunning) {
            handleStop();
        }

        setMode('work');
        hasSwitchedRef.current = false;
        // eslint-disable-next-line react-hooks/purity
        const startTime: number = Date.now();
        setTime(startTime);
        setNow(startTime);
        setPause(false);
        setTimePause(0);
        setRunning(true);
        timeRef.current = setInterval(() => {
            setNow(Date.now());
        }, 1000)

    }
    function handleReset(): void {
        clearInterval(timeRef.current);
        setTime(0);
        setNow(0);
        setPause(false);
        setTimePause(0);
        setRunning(false);
        setMode('work');
        hasSwitchedRef.current = false;
    }
    function handleStop(): void {
        if(!pause) {
            setTimePause(now - time)
            clearInterval(timeRef.current)
        } else {
            setTime(Date.now() - timePause);
            setNow(Date.now());
            timeRef.current = setInterval(() => {
                setNow(Date.now())
            }, 1000)
        }
        setPause(() => !pause)
    }


    return (
        <div>
            <section className="dashboard-container">
                <div className="dasboard-container-column">
                    <article className="dashboard-quote">
                        <header>
                            <h2>Рандомная цитата:</h2>
                            <p>{quote}</p>
                        </header>
                    </article>
                    <article className="dashboard-quote">
                        <header>
                            <h2>DONATE ME PLS!!!</h2>
                            <p>Hello world</p>
                        </header>
                    </article>
                </div>
                <article className="dashboard-tasks">
                    <header>
                        <h2>Текущие задачи:</h2>
                    </header>
                    <ul>
                        {tasks.filter((e) => e.completed === false).length !== 0 
                        ? tasks
                        .filter((e) => e.completed === false)
                        .slice(0, 5)
                        .map((e) => (
                            <li key={e.id}>{e.task}</li>
                        )) 
                        : "Список задач пуст"}
                        <br />
                        <Link to="/tasks" style={{color: "black"}}>Развернуть список</Link>
                    </ul>
                </article>
            </section>
            <section className="dashboard-container graphic">
                <article className="dashboard-card">
                    <header>
                        <h2>График продуктивности:</h2>
                    </header>
                    <div className="chart-wrapper">
                        <div className="progress-bar">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={taskGraphic}
                                    margin={{ top: 40, bottom: 5, left: 0, right: 0 }}
                                >
                                    <XAxis 
                                        dataKey="name" 
                                        stroke="var(--text)" 
                                        axisLine={false} 
                                        tickLine={false}
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        stroke="var(--text)"
                                    />
                                    <Tooltip />
                                    <CartesianGrid stroke="none" strokeDasharray="5 5" />
                                    <Bar dataKey="tasks" fill="var(--aside)" barSize={30} radius={[10, 10, 10, 10]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </article>
                <article className="dashboard-card">
                    <header style={{marginBottom: "3vh"}}>
                        <h2>Pomodoro таймер:</h2>
                    </header>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <PomodoroCircle totalTime={totalTimeSeconds} timeLeft={timeNow} />
                    <div style={{display: "flex", gap: "1.5vw", marginTop: "3vh"}}>
                    <div onClick={handleClick}><ButtonElem padding="14px 14px" butColor="white" color="#795548"><PlayArrowIcon /></ButtonElem></div>
                    <div onClick={handleReset}><ButtonElem padding="14px 14px" butColor="white" color="#795548"><RestartAltIcon /></ButtonElem></div>
                    <div onClick={handleStop}><ButtonElem padding="14px 14px" butColor="white" color="#795548"><BlockIcon /></ButtonElem></div>
                    </div>
                    </div>
                </article>
                <div style={{width: "20vw"}} className="dashboard-card cat">
                    <header style={{marginBottom: "2.4vh"}}>
                        <h3>Фотография кота</h3>
                    </header>
                    <img style={{width: "100%", height: "88%", borderRadius: "10px", border: "1px solid #CAB18E"}} src={randomPhoto ? randomPhoto[0]?.url : ``} />
                </div>
            </section>
            <section className="dashboard-container">
                <div style={{width: "90vw"}} className="dashboard-card">Придумаю позже что тут будет</div>
            </section>
        </div>
      )
}