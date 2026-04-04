import React from "react";
import { Tooltip } from 'react-tooltip';
import '../../styles/Tooltip.scss'
import CategorySelection from "../common/CategorySelection";

const MapResults = ({ map, userRole, heroes}) => {
    const hasHeroes = heroes.best.length > 0||
                     heroes.worst.length > 0;
    
    const getKey = (item) => item.id_hero;
    const getImage = (item) => `/images/heroes/${item.image_url}`;
    const getName = (item) => item.name_hero;
    const getDescriotion = (item) => item.description_comb;

    return (
        <div className="results">
            <h3>Герои для карты <span className="map-name">{map?.name}</span></h3>
            <p className="role-info">Вы играете за: {userRole}</p>

            <CategorySelection
                title="Лучший"
                items={heroes.best}
                classNameCategory="best"
                tooltipId="map-tooltip"
                getItemKey={getKey}
                getItemImage={getImage}
                getItemName={getName}
                getItemDescriotion={getDescriotion}
            />
            <CategorySelection
                title="Неподходящий"
                items={heroes.worst}
                classNameCategory="worst"
                tooltipId="map-tooltip"
                getItemKey={getKey}
                getItemImage={getImage}
                getItemName={getName}
                getItemDescriotion={getDescriotion}
            />

            {!hasHeroes && (
                <div className="no-data">
                    <p>Нет данных о героях для этой карты и вашей роли</p>
                </div>
            )}

            <Tooltip
                id="map-tooltip"
                className="tooltip-base"
                noArrow={false}
                delayShow={300}
                positionStrategy="fixed"
            />
        </div>
    );
}

export default MapResults;