import {useState} from 'react'

interface IValidationRules {
    isTitle?: boolean;
    isTask?: boolean;
    isText?: boolean;
    required: boolean;
    maxLength?: number;
    minLength?: number;
}


type InputOrTextAreaEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
type InputOrTextAreaFocusEvent = React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>;

export const useValidation = (initialState: string) => {
    const [value, setValue] = useState(initialState)
    const [dirty, setDirty] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('Поле не должно быть пустым')

    function validateForm(name: string, value: string) {
        if(name === 'createTask') {
            setErrorMessage(validate(value.replaceAll(/\s+/g, ''), {isTask: true, required: true, minLength: 3}) || '')
          } else if(name === 'title') {
            setErrorMessage(validate(value.replaceAll(/\s+/g, ''), {isTitle: true, required: true, minLength: 3}) || '')
        } else if(name === 'text') {
            setErrorMessage(validate(value.replaceAll(/\s+/g, ''), {isText: true, required: true}) || '')
        }
    }

    const onBlur = (e: InputOrTextAreaFocusEvent) => {
        const nameTarget = e.target.name;
        const newValue =
          nameTarget === 'checking' && e.target instanceof HTMLInputElement
            ? e.target.checked
            : e.target.value;
        setDirty(true)
        validateForm(nameTarget, newValue as string)
    }

    const onChange = (e: InputOrTextAreaEvent) => {
        const nameTarget = e.target.name;
        const newValue =
          nameTarget === 'checking' && e.target instanceof HTMLInputElement
            ? e.target.checked
            : e.target.value;
        setValue(newValue as string)
        validateForm(nameTarget, newValue as string)
    }

    const validate = (value: string, rules: IValidationRules) => {
       if(!rules) {
        setError(false)
        return ''
       }

       if(rules.required && value.length === 0) {
        setError(true);
        return 'Поле задачи не должно быть пустым';
       }

       if(rules.isTask && typeof rules.minLength === 'number' && value.length < rules.minLength) {
        setError(true);
        return `Длина задачи меньше ${rules.minLength} символов`;
       }

       if(rules.isTitle && typeof rules.minLength === 'number' && value.length < rules.minLength) {
        setError(true);
        return `Длина заголовка меньше ${rules.minLength} символов`;
       }
    }

    const setValueForce = (newValue: string) => {
        setValue(newValue);
    };

    const reset = () => {
        setValue(initialState)
        setDirty(false)
        setError(false)
        setErrorMessage('Поле не должно быть пустым')
    }

    return {value, dirty, onChange, onBlur, error, errorMessage, reset, setValueForce}
}