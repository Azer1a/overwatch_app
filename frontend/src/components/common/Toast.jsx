import React, { useEffect } from "react";
import '../../styles/Toast.scss';

const Toast = ({ message, type = 'error', onClose, duration = 5000}) => {
    useEffect (() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return (
        <div className={`toast toast-${type}`}>
            <span className="">
                {type === 'error' && 'Ошибка'}
                {type === 'success' && 'Успех'}
            </span>
            <span className="toast-message">{message}</span>
            <button className="toast-close" onClick={onClose}>x</button>
        </div>
    );
};