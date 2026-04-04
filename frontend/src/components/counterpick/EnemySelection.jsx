import React from "react";

const EnemySelection = ({ heroesByRole, onEnemySelect }) => {

    const roleIcons = {
        'танк': '/images/icons/tank.png',
        'урон': '/images/icons/damage.png',
        'поддержка': '/images/icons/support.png'
    };

    const roleOrder = ['танк', 'урон', 'поддержка'];

    if (!heroesByRole) {
        return <div className="loading">Загрузка героев...</div>;
    }

    if (Object.keys(heroesByRole).length === 0) {
        return <div className="loading">Загрузка героев...</div>;
    }

    return (
        <div className="enemy-selection">
            <h3>Выберите вражеского героя</h3>
            
            {roleOrder.map(roleName => {
                const heroes = heroesByRole[roleName];
                if (!heroes || heroes.length === 0) return null;

                return (
                    <div key={roleName} className="role-group">
                        <div className="role-column">
                            <img
                                src={roleIcons[roleName]}
                                alt={roleName}
                                className="role-icon"
                            />
                            <span className="role-name">{roleName}</span>
                        </div>

                        <div className="heroes-grid">
                            {heroes.map(hero => (
                                <div
                                    key={hero.id}
                                    className="selection-card"
                                    onClick={() => {onEnemySelect(hero);}}
                                >
                                    <img
                                        src={`/images/heroes/${hero.image}`}
                                        alt={hero.name}
                                        onError={(e) => {
                                            e.target.src = "/images/heroes/placeholder.png";
                                        }}
                                    />
                                    <span>{hero.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default EnemySelection;
