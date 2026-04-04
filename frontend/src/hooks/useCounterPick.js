import { useState, useEffect } from 'react';
import { fetchRoles, fetchHeroesByRole, fetchCounterPick, fetchAllHeroes } from '../services/api'

export const useCounterPick = () => {
    const [step, setStep] = useState(0);
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectedEnemy, setSelectedEnemy] = useState(null);
    const [counters, setCounters] = useState(null);
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    const [heroesByRole, setHeroesByRole] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadingInitialData = async () =>{
            setLoading(true);
            setError(null);
            try {
                const [rolesData, heroesData] = await Promise.all([
                    fetchRoles(),
                    fetchAllHeroes()
                ]);

                setRoles(rolesData);

                const grouped = heroesData?.reduce((acc, hero)=> {
                    const role = hero.name_role;
                    if(!acc[role]) acc[role]=[];
                    acc[role].push({
                        id: hero.id_hero,
                        name: hero.name_hero,
                        image: hero.image_url
                    });
                    return acc;
                }, {}) || {};

                console.log('Сгруппированные герои:', grouped);
                setHeroesByRole(grouped);
            } catch (error) {
                console.error("Ошибка загрузки данных: ", error);
                setError(error.message || 'Не удалось загрузить данные. Проверьте соединение с сервером');
            } finally {
                setLoading(false);
            }
        };

        loadingInitialData();
    }, []);

    const handleRoleSelect = async (role) => {
        setSelectedRole(role);
        setStep(2);
    };

    const handleEnemySelect = async (enemy) => {
        setSelectedEnemy(enemy);
        setLoading(true);
        setError(null);

        try{
            const data = await fetchCounterPick(enemy.id, selectedRole);
            if(data){
                setCounters({
                    best: data.counters?.best.map(formatCounter)||[],
                    good:  data.counters?.good.map(formatCounter)||[],
                    no_take: data.counters?.worst.map(formatCounter)||[],
                });
                setStep(3);
            }
        } catch(error){
            console.error('Ошибка загрузки контерпиков:', error);
            setError(error.message || 'Не удалось загрузить контерпики.');
        } finally {
            setLoading(false);
        }
    };

    const formatCounter = (c) => ({
        id: c.counter_id,
        name: c.counter_name,
        image: c.counter_image,
        description: c.description_c
    });

    const resetSelection = () => {
        setStep(0);
        setSelectedRole(null);
        setSelectedEnemy(null);
        setCounters(null);
        setError(null);
    };

    return {
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
    };
};