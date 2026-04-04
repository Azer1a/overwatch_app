import React, { useState } from "react";
import { Tooltip } from 'react-tooltip';
import '../../styles/Tooltip.scss'
import CategorySelection from "../common/CategorySelection";

const Results = ({enemy, userRole, counters}) => {
    const hasCounters = counters.best.length > 0 ||
                        counters.good.length > 0 ||
                        counters.no_take.length > 0;
    
    const getKey = (item) => item.id;
    const getImage = (item) => `/images/heroes/${item.image}`;
    const getName = (item) => item.name;
    const getDescriotion = (item) => item.description;

    return (
        <div className="results">
            <h3>Контер пик против <span className="enemy-name">{enemy?.name}</span></h3>
            <p className="role-info">Вы играете за: {userRole}</p>

            <CategorySelection
                title="Лучший"
                items={counters.best}
                classNameCategory="best"
                tooltipId="counter-tooltip"
                getItemKey={getKey}
                getItemImage={getImage}
                getItemName={getName}
                getItemDescriotion={getDescriotion}
            />
            <CategorySelection
                title="Хороший"
                items={counters.good}
                classNameCategory="good"
                tooltipId="counter-tooltip"
                getItemKey={getKey}
                getItemImage={getImage}
                getItemName={getName}
                getItemDescriotion={getDescriotion}
            />
            <CategorySelection
                title="Не брать"
                items={counters.no_take}
                classNameCategory="worst"
                tooltipId="counter-tooltip"
                getItemKey={getKey}
                getItemImage={getImage}
                getItemName={getName}
                getItemDescriotion={getDescriotion}
            />
            {!hasCounters && (
                <div className="no-data">
                    <p>Нет данных о контерпиках для этого героя</p>
                </div>
            )}
           <Tooltip
                id="counter-tooltip"
                className="tooltip-base"
                noArrow={false}
                delayShow={300}
                positionStrategy="fixed"
           /> 
        </div>
    );
};

export default Results;