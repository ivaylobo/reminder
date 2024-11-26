import {useDispatch, useSelector} from "react-redux";
import classes from "./HomePage.module.css";
import {popupActions} from "../../Store/add-popup-slice.ts";
import {RootState} from "../../Store";
import Entries from "../../Components/Entries/Entries.tsx";
import {FormData} from "../../Types/PopupFormStateType.ts";

export default function HomePage() {

    const dispatch = useDispatch();
    const entries = useSelector((state: RootState) => state.popupData.formData);

    const togglePopup = () => {
        dispatch(popupActions.togglePopup());
    };

    return (
        <>
            <button
                className={classes.addNew}
                onClick={togglePopup}
            >
                Add new reminder
            </button>
            <div className={classes.entriesWrapper}>
                <ul>
                    {entries.map((entry:FormData) => <Entries name = {entry.name} key={entry.id} description={entry.description} date={entry.date} id={entry.id} />)}
                </ul>
            </div>
        </>
    );
}
