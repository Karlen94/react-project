import React from 'react';
import style from './styleSpinner.module.css';

export default function Spinner() {
    return (
        <div className={style.spinnerContainer}>
        <div className={style.loader}>Loading...</div>
        </div>
        
    )

}