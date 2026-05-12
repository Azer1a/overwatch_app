import React from "react";
import { useCounterPick } from "../hooks/useCounterPick";
import RoleSelection from "../components/counterpick/RoleSelection";
import EnemySelection from "../components/counterpick/EnemySelection";
import Results from "../components/counterpick/Results";
import LoadingSpinner from "../components/common/LoadingSpinner";
// import ErrorMessage from "../components/common/ErrorMessage";
import Toast from "../components/common/Toast";
import '../styles/CounterPickPage.scss';


const CounterPickPage = () => {
    const {
        step,
        setStep,
        selectedRole,
        selectedEnemy,
        counters,
        loading,
        error,
        roles,
        heroesByRole,
        handleRoleSelect,
        handleEnemySelect,
        resetSelection
    } = useCounterPick();

    // if (error) return <ErrorMessage error={error}/>

    if (loading) return <LoadingSpinner />;

    return (
        <div className="counter-page">
            <div className="two-column-layout">
                <div className="info-block">
                    <h2>Как это работает?</h2>
                    <p>
                        Нажмите на кнопку "Начать подбор", выберете роль,
                        затем выберите вражеского героя, против которого
                        хотите подобрать контерпик. Система покажет вам
                        лучших героев вашей роли для борьбы с этим врагом.
                        Кроме этого, система показывает, кого не стоит брать
                        против вашего врага.
                    </p>
                    <br />
                    <p>
                        Персонажи, которые не вошли ни в одну из категорий,
                        не явялются как таковыми контерпиками против вашего врага,
                        но их вы тоже можете использовать и чувствовать себя комфортно
                        на поле боя против вашего врага.
                    </p>
                </div>
                <div className="right-content">
                    <img src="/images/icons/heroes.png" />
                </div>
            </div>
            <button className="start-button" onClick={() => { setStep(1); console.log('Кнопка нажата, step =', step); }}>
                Начать подбор
            </button>
            {step >= 1 && (
                <div className="modal-overlay" onClick={resetSelection}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-button" onClick={resetSelection}>x</button>
                        {step === 1 && (
                            <RoleSelection
                                roles={roles}
                                onRoleSelect={handleRoleSelect}
                            />
                        )}

                        {step === 2 && selectedRole && heroesByRole && Object.keys(heroesByRole).length > 0 && (
                            <EnemySelection
                                heroesByRole={heroesByRole}
                                onEnemySelect={handleEnemySelect}
                            />
                        )}

                        {step === 3 && counters && (
                            <Results
                                enemy={selectedEnemy}
                                userRole={selectedRole}
                                counters={counters}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CounterPickPage;