import React from "react";
import '../../styles/BaseStyle.scss'

const Main = () => {
    return (
        <div className="main-page">
            <div className="info-main-div">
                <h1>Добро пожаловать на Overwatch Helper</h1>
                <div className="welcom-text">
                    <p>
                        <strong>Overwatch Helper</strong> - это ваш помощник в игре Overwatch.
                        Здесь вы найдёте интсрумент, помогающие улучшить ваши знания по игре.
                    </p>
                </div>
                <div className="features">
                    <h2>Что может предложить вам сайт:</h2>
                    <ul>
                        <li>
                            <strong>Контерпики</strong> - узнайте, какой герой лучше всего подходит против конкретного противника на вашей роли.
                        </li>
                        <li>
                            <strong>Исцеление танка</strong> - узнайте, какие саппорты лучше всего подходят вашему танку.
                        </li>
                        <li>
                            <strong>Карты</strong> - узнайте, на каких картах каким персонажам комфортнее всего играть.
                        </li>
                    </ul>
                </div>
                <p>
                    Выбирайте нужный раздел в меню выше и переигрывайте своих противников!
                </p>
            </div>
        </div>
    );
}

export default Main;