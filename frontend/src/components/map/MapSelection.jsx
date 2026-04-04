import React from "react";

const MapSelection = ({ maps, onMapSelect }) => {
    return (
        <div className="map-selection">
            <h3>Выберите карту</h3>
            <div className="selection-grid">
                {maps.map(map => (
                    <div
                        key={map.id_map}
                        className="map-card"
                        onClick={() => onMapSelect({
                            id: map.id_map,
                            name: map.name_map,
                            image: map.image_map
                        })}
                    >
                        <img
                            src={`/images/maps/${map.image_map}`}
                            alt={map.name_map}
                            onError={(e)=>{
                                e.target.src='images/maps/placeholder.png';
                            }}
                        />
                        <span>{map.name_map}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MapSelection;