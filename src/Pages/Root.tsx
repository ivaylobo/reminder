import {Outlet} from "react-router-dom";
import Header from "../Components/Header/Header.tsx";
import AddPopup from "../Components/AddPopup/AddPopup.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../Store";
import {FormData} from "../Types/PopupFormStateType.ts";

function RootLayout() {
    const isVisible = useSelector((state: RootState) => state.popupData.isVisible);
    const currentEntry = useSelector((state: RootState) => state.popupData.currentEntry);

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            {isVisible && <AddPopup entry={currentEntry as FormData} />}
        </>
    );
}

export default RootLayout