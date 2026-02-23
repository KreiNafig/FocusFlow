export interface ITask {
    id: number;
    title: string;
    text: string;
    date: string;
    time: string;
    pin: boolean;
}

export type ColorNote = "blue" | "red" | "green" | "orange"