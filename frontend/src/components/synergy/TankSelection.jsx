import React from "react";

const TankSelection = ({tanks, onTankSelect}) => {
    return (
        <div className="tank-selection">
            <h3>Выберите танка в вашей команде</h3>
            <div className="selection-grid">
                {tanks.map(tank =>(
                    <div
                        key={tank.id_hero}
                        className="selection-card"
                        onClick ={() => onTankSelect({
                            id: tank.id_hero,
                            name: tank.name_hero,
                            image: tank.image_url
                        })}
                    >
                        <img
                            src={`/images/heroes/${tank.image_url}`}
                            alt={tank.name_hero}
                            onError={(e) => {
                                e.target.src='/images/heroes/placeholder.png';
                            }}
                        />
                        <span>{tank.name_hero}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TankSelection;