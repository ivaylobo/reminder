import classes from "./Header.module.css";

export default function Header () {
    return (
        <header>
            <h3 className={classes.mainText}>My reminders</h3>
        </header>
    )
}