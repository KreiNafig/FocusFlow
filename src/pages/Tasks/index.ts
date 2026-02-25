export interface ITask {
    task: string;
    completed: boolean;
    dataCompleted: number;
    id: number;
}

export interface IModal {
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
    onClose: () => void;
    openModal: boolean;
}

export interface TaskProps {
    taskSearch?: string | null;
    tasks: ITask[];
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}