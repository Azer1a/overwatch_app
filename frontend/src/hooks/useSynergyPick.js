import {useState, useEffect} from 'react';
import { fetchTanks, fetchSynergies } from '../services/api';

export const useSynergyPick = () => {
    const [step, setStep] = useState(0);
    const [selectedTank, setSelectedTank] = useState(null);
    const [synergies, setSynergies] = useState(null);
    const [loading, setLoading] = useState(false);
    const [tanks, setTanks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTanks = async () => {
            setLoading(true);
            setError(null);
            try {
                const tanksData = await fetchTanks();
                setTanks(tanksData);
            } catch (error) {
                console.error('Ошибка загрузки танков:', error);
                setError(error.message || 'Не удалось загрузить танков.');
            } finally {
                setLoading(false);
            }
        };
        loadTanks();
    }, []);

    const handelTanksSelect = async (tank) => {
        setSelectedTank(tank);
        setLoading(true);
        setError(null);

        try {
            const data = await fetchSynergies(tank.id);
            if (data) {
                setSynergies({
                    best: data.synergies?.best || [],
                    good: data.synergies?.good || [],
                    worst: data.synergies?.worst ||[]
                });
                setStep(2);
            }
        } catch (error) {
            console.error('Ошибка загрузка синергий:', error);
            setError(error.message || 'Не удалось загрузить сочетания.');
        } finally {
            setLoading(false);
        }
    };

    const resetSelection = () => {
        setStep(0);
        setSelectedTank(null);
        setSynergies(null);
        setError(null);
    };

    return {
        step,
        setStep,
        selectedTank,
        synergies,
        loading,
        error,
        tanks,
        handelTanksSelect,
        resetSelection
    };
};
