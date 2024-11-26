export interface PopupFormStateType {
    isVisible: boolean;
    formData: FormData[];
    currentEntry: FormData | null
}

export interface FormData {
    name: string;
    description: string;
    date: string;
    id: number;
}