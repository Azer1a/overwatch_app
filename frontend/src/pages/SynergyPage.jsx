import React from "react";
import { useSynergyPick } from "../hooks/useSynergyPick";
import TankSelection from "../components/synergy/TankSelection";
import SynergyResults from "../components/synergy/SynergyResults";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Toast from "../components/common/Toast";
import '../styles/SynergyPickPage.scss';

const SynergyPickPage = () => {
    const {
        step,
        setStep,
        selectedTank,
        synergies,
        loading,
        error,
        tanks,
        handelTanksSelect,
        resetSelection
    } = useSynergyPick();

    const [toast, setToast] = useState(null);
        
        React.useEffect(()=> {
            if (error) {
                setToast({
                    message: error,
                    type: 'error'
                });
            }
        }, [error]);
    
    if (loading) return <LoadingSpinner />

    return (
        <div className="synergy-page">
            {toast && (
                    <Toast 
                        message={toast.message}
                        type={toast.type}
                        onClose={()=> setToast(null)}
                    />
                )}
            <div className="two-column-layout">
                <div className="left-content">
                    <img src="/images/icons/supports.png" />
                </div>
                <div className="info-block">
                    <h2>Как это работает?</h2>
                    <p>
                        Выбирите такнка в вашей команде для того, чтобы
                        узнать, какой саппорт наилучшим образом подходит
                        вашему танку.
                    </p>
                    <br />
                    <p>
                        Для начала нажмите кнопку, затем выберите
                        вашего танка. После этого вам покажут список саппортов.
                        Вы можете навестись на них и посмотреть описание, почему
                        этот герой подходит или не подходит под вашего танка.
                    </p>
                    <br />
                    <p>
                        Саппорты не попавшие в список тоже можно брать для вашего танка.
                        Они также считатются приемлемым выбором под вашего танка.
                    </p>
                </div>
            </div>
            <button className="start-button" onClick={() => setStep(1)}> Начать подбор</button>

            {step >= 1 && (
                <div className="modal-overlay" onClick={resetSelection}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-button" onClick={resetSelection}>x</button>
                        {step === 1 && (

                            <TankSelection
                                tanks={tanks}
                                onTankSelect={handelTanksSelect}
                            />
                        )}

                        {step === 2 && synergies && (
                            <SynergyResults
                                tank={selectedTank}
                                synergies={synergies}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SynergyPickPage;