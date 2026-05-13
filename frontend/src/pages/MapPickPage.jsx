import React from "react";
import { useMapPick } from '../hooks/useMapPick';
import RoleSelection from '../components/counterpick/RoleSelection'
import MapSelection from '../components/map/MapSelection';
import MapResults from "../components/map/MapResults";
import LoadingSpinner from '../components/common/LoadingSpinner';
import Toast from "../components/common/Toast";
import '../styles/MapPickPage.scss';

const MapPickPage = () => {
    const {
        step,
        setStep,
        selectedRole,
        selectedMap,
        heroes,
        loading,
        error,
        maps,
        roles,
        handleRoleSelect,
        handleMapSelect,
        resetSelection
    } = useMapPick();
    
    if (loading) return <LoadingSpinner />;

    return(
        <div className="map-page">
            <div className="info-block">
                <h2>Как это работает</h2>
                <p>
                    Нажмите кнопку "начать подбор". Выберите вашу роль и карту. После вашего выбора, 
                    вы увидите героев, которые лучше всего подходят для этой карты с учётом вашей роли, 
                    а также тех, кого лучше не брать. Наведясь на иконки персонажей, вы можете узнать подробности, 
                    почему они являются хорошим или плохим выбором
                </p>
                <br />
                <p>
                    Герои, не попавшие в списки, тоже могут быть использованы, они считаются нейтральным выбором.
                </p>
            </div>
            <button className="start-button" onClick={() => setStep(1)}>Начать подбор</button>

            {step >= 1 && (
                <div className="modal-overlay" onClick={resetSelection}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-button" onClick={resetSelection}>x</button>

                        {step === 1 &&(
                            <RoleSelection
                            roles={roles}
                            onRoleSelect={handleRoleSelect}
                            />
                        )}

                        {step === 2 && selectedRole && (
                            <MapSelection 
                                maps={maps}
                                onMapSelect={handleMapSelect}
                            />
                        )}

                        {step ===3 && heroes && (
                            <MapResults
                                map={selectedMap}
                                userRole={selectedRole}
                                heroes={heroes}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapPickPage;