import {
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Bar,
} from 'recharts';
import { useEffect, useState } from 'react';
import type { ITaskGraphic } from '../../index';

export const Graphic = () => {
    const [taskGraphic, setTaskGraphic] = useState<ITaskGraphic[]>([]);

    useEffect(() => {
        try {
        const graphic = localStorage.getItem('data');
        if (graphic) {
            const parsedGraphic = JSON.parse(graphic);
            if(parsedGraphic && Array.isArray(parsedGraphic)) {
                setTaskGraphic(parsedGraphic);
            } else {
                setTaskGraphic([]);
            }
        } else {
            setTaskGraphic([]);
        }
        } catch(e) {
            console.log("Ошибка при разборе данных графика из localStorage:", e);
            setTaskGraphic([]);
        }
    }, []);

    return (
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
                            <Bar
                                dataKey="tasks"
                                fill="var(--aside)"
                                barSize={30}
                                radius={[10, 10, 10, 10]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </article>
    );
};
