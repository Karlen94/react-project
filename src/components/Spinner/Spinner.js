import React, { useEffect } from 'react';
import style from './styleSpinner.module.css';

export default function Spinner() {

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        }
    }, []);

    return (
        <div className={style.spinnerContainer}>
            <div className={style.loader}>Loading...</div>
        </div>

    )

}