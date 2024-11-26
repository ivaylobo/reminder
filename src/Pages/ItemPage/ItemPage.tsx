import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { popupActions } from '../../Store/add-popup-slice.ts';
import { RootState } from '../../Store';
import { useEffect } from 'react';
import classes from './ItemPage.module.css';

const ItemPage = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (id !== null && !isNaN(Number(id))) {
            const numericId = Number(id);
            dispatch(popupActions.setCurrentEntry(numericId));
        } else {
            navigate('/error');
        }
    }, [id, dispatch, navigate]); // Dependencies for the effect

    const currentEntry = useSelector((state: RootState) => state.popupData.currentEntry);

    const handleBack = () => {
        navigate(-1); // Navigate back
    };

    const handleDelete = () => {
        console.log('delete');
        if (id) {
            dispatch(popupActions.deletePopupData(Number(id)));
            navigate('/');
        }
    };

    const handleUpdate = () => {
        console.log('update');
        dispatch(popupActions.togglePopup());
    };

    return (
        <section className={classes.itemsSection}>
            <button className={classes.back} onClick={handleBack}>
                Back
            </button>
            {currentEntry ? (
                <>
                    <h1 className={classes.itemName}>{currentEntry.name}</h1>
                    <p className={classes.itemDescription}>{currentEntry.description}</p>
                    <p className={classes.itemDate}>{currentEntry.date}</p>
                    <div className={classes.actions}>
                        <button onClick={handleUpdate} className={classes.update}>
                            Update
                        </button>
                        <button onClick={handleDelete} className={classes.delete}>
                            Delete
                        </button>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </section>
    );
};

export default ItemPage;
