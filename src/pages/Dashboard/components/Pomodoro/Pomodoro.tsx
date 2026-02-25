
import { useEffect, useRef, useState } from 'react';
import { PomodoroCircle } from '../../../../utils/Pomodoro';
import { ButtonElem } from '../../../../components/ui/ButtonElem';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import BlockIcon from '@mui/icons-material/Block';
import type { PomodoroMode } from '../..';


export const Pomodoro = () => {
  const timeRef = useRef<number | undefined>(undefined)
  const hasSwitchedRef = useRef<boolean>(false)
  const [time, setTime] = useState<number>(0)
  const [now, setNow] = useState<number>(0)
  const [pause, setPause] = useState<boolean>(false)
  const [timePause, setTimePause] = useState<number>(0)
  const [isRunning, setRunning] = useState<boolean>(false)
  const [mode, setMode] = useState<PomodoroMode>('work');

  const WORK_TIME = 1500;
  const BREAK_TIME = 300;
  const totalTimeSeconds = mode === 'work' ? WORK_TIME : BREAK_TIME;

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
    if (isRunning) {
      handleStop();
    }

    setMode('work');
    hasSwitchedRef.current = false;
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
    if (!pause) {
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
    <article className="dashboard-card">
      <header style={{ marginBottom: "3vh" }}>
        <h2>Pomodoro таймер:</h2>
      </header>
      <div className="dashboard-pomodoro">
        <PomodoroCircle totalTime={totalTimeSeconds} timeLeft={timeNow} />
        <div className="pomodor-actions">
          <div onClick={handleClick}>
            <ButtonElem padding="14px 14px" butColor="white" color="#795548">
              <PlayArrowIcon />
            </ButtonElem>
          </div>
          <div onClick={handleReset}>
            <ButtonElem padding="14px 14px" butColor="white" color="#795548">
              <RestartAltIcon />
            </ButtonElem>
          </div>
          <div onClick={handleStop}>
            <ButtonElem padding="14px 14px" butColor="white" color="#795548">
              <BlockIcon />
            </ButtonElem>
          </div>
        </div>
      </div>
    </article>
  )
}
