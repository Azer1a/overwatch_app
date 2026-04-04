import React, { useState } from "react";
import { Tooltip } from 'react-tooltip';
import '../../styles/Tooltip.scss'
import CategorySelection from "../common/CategorySelection";

const SynergyResults = ({tank, synergies}) => {
    const hasSynergies = synergies.best.length > 0 ||
                        synergies.good.length > 0 ||
                        synergies.worst.length > 0;
    
    const getKey = (item) => item.id_hero;
    const getImage = (item) => `/images/heroes/${item.image_url}`;
    const getName = (item) => item.name_hero;
    const getDescriotion = (item) => item.description_s;
    
    return (
        <div className="results-base">
            <h3>Лучшие саппорты для {tank?.name}</h3>

            <CategorySelection
                title="Лучший"
                items={synergies.best}
                classNameCategory="best"
                tooltipId="synergy-tooltip"
                getItemKey={getKey}
                getItemImage={getImage}
                getItemName={getName}
                getItemDescriotion={getDescriotion}
            />
            <CategorySelection
                title="Хорошие"
                items={synergies.good}
                classNameCategory="good"
                tooltipId="synergy-tooltip"
                getItemKey={getKey}
                getItemImage={getImage}
                getItemName={getName}
                getItemDescriotion={getDescriotion}
            />
            <CategorySelection
                title="Плохие"
                items={synergies.worst}
                classNameCategory="worst"
                tooltipId="synergy-tooltip"
                getItemKey={getKey}
                getItemImage={getImage}
                getItemName={getName}
                getItemDescriotion={getDescriotion}
            />

            {!hasSynergies && (
                <div className="no-data">
                    <p>Нет данных о синергиях для этого танка</p>
                </div>
            )}

            <Tooltip 
                id="synergy-tooltip"
                className="tooltip-base"
                noArrow={false}
                delayShow={300}
                positionStrategy="fixed"
            />
        </div>
    );
};

export default SynergyResults;