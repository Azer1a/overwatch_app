import React from "react";
import { Tooltip } from 'react-tooltip';
import '../../styles/Tooltip.scss';

const CategorySelection =({
    title,
    items,
    classNameCategory,
    tooltipId,
    getItemKey,
    getItemImage,
    getItemName,
    getItemDescriotion,
}) => {
    if (!items || !items.length) return null;

     return (
        <div className={`category ${classNameCategory}`}>
            <h4>{title}</h4>
            <div className="item-row">
                {items.map(item => (
                    <div
                        key={getItemKey(item)}
                        className='item-card'
                        data-tooltip-id={tooltipId}
                        data-tooltip-content={getItemDescriotion(item)}
                        data-tooltip-place="top"
                    >
                        <img 
                        src={getItemImage(item)}
                        alt={getItemName(item)}
                            onError={(e)=>{
                                e.target.src='images/placeholder.png';
                            }}
                        />
                        <span>{getItemName(item)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategorySelection;