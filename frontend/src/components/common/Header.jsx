import React from "react";
import '../../styles/BaseStyle.scss'

const Header = ({navigate, currentPage}) => {
    return(
        <header className="header">
            <nav>
                <div className="logo" onClick={() => navigate('main')}>
                    <img src="/images/icons/overwatch helper light.png"/>
                </div>
                <div className="nav-menu">
                    <a 
                        href="#"
                        onClick={(e) =>{e.preventDefault(); navigate('counterpick');}}
                    >
                        Контерпик
                    </a>
                    <a 
                        href="#"
                        onClick={(e) => {e.preventDefault(); navigate('synergy');}}
                    >
                        Исцеление танка
                    </a>
                    <a 
                        href="#"
                        onClick={(e) => {e.preventDefault(); navigate('maps');}}
                    >
                        Карты
                    </a>
                </div>
            </nav>
        </header>
    );
}

export default Header;