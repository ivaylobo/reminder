import classes from './AddPopup.module.css';
import {useDispatch} from 'react-redux';
import {popupActions} from '../../Store/add-popup-slice.ts';
import {ChangeEvent, useState, useEffect} from 'react';
import moment from 'moment';
import {useDebouncer} from '../../Hooks/useDebouncer.ts';
import {FormData} from "../../Types/PopupFormStateType.ts";
import {useNavigate} from "react-router-dom";


export default function AddPopup({ entry }: { entry: FormData }) {

    const [name, setName] = useState(entry ? entry.name : '');
    const [description, setDescription] = useState(entry ? entry.description : '');
    const [date, setDate] = useState(entry ? entry.date : '');
    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [dateError, setDateError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const debouncedName = useDebouncer(name, 300);
    const debouncedDescription = useDebouncer(description, 300);

    useEffect(() => {
        if (debouncedName.length > 0 && debouncedName.length < 4) {
            setNameError('Name must be at least 4 characters long.');
        } else {
            setNameError('');
        }
    }, [debouncedName]);

    useEffect(() => {
        if (debouncedDescription.length > 0 && debouncedDescription.length < 4) {
            setDescriptionError('Description must be at least 4 characters long.');
        } else {
            setDescriptionError('');
        }
    }, [debouncedDescription]);

    useEffect(() => {
        const nameValid = name.length >= 4;
        const descriptionValid = description.length >= 4;
        const dateValid = date.length > 0;

        if (nameValid && descriptionValid && dateValid) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }

    }, [name, description, date]);

    const onClose = () => {
        dispatch(popupActions.togglePopup())
    }

    const handleNameChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setName(ev.target!.value);
    };

    const handleDescriptionChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(ev.target!.value);
    };

    const handleDateChange = (ev: ChangeEvent<HTMLInputElement>) => {
        if (!ev.target.value) {
            setDateError('Date should be updated!')
        }
        setDate(ev.target.value);
    }

    const handleSubmit = () => {
        const id: number = localStorage.getItem('pageId') ? Number(JSON.parse(localStorage.getItem('pageId')!)) : 0;
        localStorage.setItem('pageId', (id + 1).toString());
        navigate('/')
        dispatch(popupActions.togglePopup());
        dispatch(
            popupActions.addPopupData({
                name,
                description,
                date,
                id
            })
        );
    };


    return (<div className={classes.AddPopup}>
            <div className={classes.popupContent}>
                <a className={classes.closeButton} onClick={onClose}>
                    &times;
                </a>
                <div className={`${classes.inputContainer} ${nameError ? classes.error : ''}`}>
                    <input className={`${classes.inputElement} ${nameError ? classes.error : ''}`}
                           type='text'
                           onChange={handleNameChange}
                           placeholder='Name'
                           value={name}/>
                    {nameError && <p className={classes.errorMessage}>{nameError}</p>}
                </div>
                <div className={`${classes.inputContainer} ${descriptionError ? classes.error : ''}`}>
                    <textarea
                        className={`${classes.inputElement} ${
                            descriptionError ? classes.error : ''
                        }`}
                        onChange={handleDescriptionChange}
                        placeholder='Description'
                        value={description}
                    />
                    <p className={classes.errorMessage}>{descriptionError}</p>
                </div>
                <div className={classes.inputContainer}>
                    <input min={moment().format('YYYY-MM-DD')} className={classes.inputElement} value={date}
                           onChange={handleDateChange} type='date'/>
                    {dateError && <p className={classes.errorMessage}>{dateError}</p>}
                </div>
                <div className={classes.inputContainer}>
                    <button onClick={handleSubmit} disabled={!isFormValid} className={classes.inputElement}>Submit</button>
                </div>
            </div>
        </div>
    );
}
