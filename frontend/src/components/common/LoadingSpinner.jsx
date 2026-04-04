import React from "react";
import '../../styles/LoadingSpinner.scss';
const LoadingSpinner =({message = 'Загрузка...'}) => {
    return (
        <div className="loading-spinner">
            <div className="spinner"></div>
            <p>{message}</p>
        </div>
    );
};

export default LoadingSpinner;