import React from 'react';

const RoleSelection = ({roles, onRoleSelect}) => {
    const roleIcons = {
        'танк': 'tank.png',
        'урон': 'damage.png',
        'поддержка': 'support.png'
    };

    return (
        <div className='role-selection'>
            <h3>Выберите вашу роль</h3>
            <div className='roles-grid'>
                {roles.map(role => {
                    const roleName = role.name_role;
                    const iconFile = roleIcons[roleName];

                    return(
                        <div 
                            key={role.id_role}
                            className='role-card'
                            onClick={() => onRoleSelect(roleName)}
                        >
                            <img
                                src={`/images/icons/${iconFile}`}
                                alt={roleName}
                                className='role-icon'
                                />
                            <span className='role-name'>{roleName}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RoleSelection;