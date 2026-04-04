import React from 'react';

const ErrorMessage = ({ error }) => {
    if (!error) return null;

    return (
        <div className='error-container'>
            <div className='error-message'>
                <h3>ОШИБКА</h3>
                <p>{error}</p>
                <button onClick={()=>window.location.reload()}>
                    Обновить страницу
                </button>
            </div>
        </div>
    )
};

export default ErrorMessage;