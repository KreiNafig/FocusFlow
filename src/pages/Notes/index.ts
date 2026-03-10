export interface INote {
    id: number;
    title: string;
    text: string;
    date: string;
    time: string;
    pin: boolean;
    colorTask: string;
    color: string;
}

export interface NoteProps {
    title?: string | null;
}

export type ColorNote = "blue" | "red" | "green" | "orange"