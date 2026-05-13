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

    if (loading) return <LoadingSpinner />

    return (
        <div className="synergy-page">
            <div className="two-column-layout">
                <div className="left-content">
                    <img src="/images/icons/supports.png" />
                </div>
                <div className="info-block">
                    <h2>Как это работает?</h2>
                    <p>
                        Выберите танка для того, чтобы узнать, какой герой поддержки лучше всего подходит данному танку.
                    </p>
                    <br />
                    <p>
                        Для начала нажмите кнопку "начать подбор", затем выберите нужного танка. После этого вам
                        покажут список саппортов. Вы можете навестись на них и посмотреть список причин, почему
                        этот герой подходит или не подходит выбранному танку.
                    </p>
                    <br />
                    <p>
                        Герои поддержки, не попавших в список, тоже можно брать.
                        Они  считаются приемлемым выбором для выбранного танка.
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