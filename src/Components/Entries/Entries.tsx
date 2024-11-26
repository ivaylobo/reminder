import classes from './Entries.module.css';
import {NavLink} from "react-router-dom";
import moment from "moment";

type Props = {
    name: string;
    description: string;
    date: string;
    id: number;
};

export default function Entries({ name, description, date, id }: Props) {

    const today = moment(new Date()).format('YYYY-MM-DD');
    let styles;
    if(moment(date, 'YYYY-MM-DD').valueOf() < moment(today, 'YYYY-MM-DD').valueOf() ) {
        styles = classes.passed;
    }
    else if(today === date){
        styles = classes.active
    }
    return (
        <li key={id}  className={styles}>
            {<NavLink className={classes.entries}  to={`/item?id=${id}`}>
            <div className={classes.entryName}>{name}</div>
            <div className={classes.description}>{description}</div>
            <div className={classes.entryDate}>{date}</div>
            </NavLink>}
        </li>
    );
}
