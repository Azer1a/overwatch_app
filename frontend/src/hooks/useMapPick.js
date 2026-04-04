import { useState, useEffect } from 'react';
import { fetchRoles, fetchMaps, fetchMapHeros } from '../services/api';

export const useMapPick = () => {
    const [step, setStep] = useState(0);
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectedMap, setSelectedMap] = useState(null);
    const [heroes, setHeroes] = useState(null);
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    const [maps, setMaps] = useState ([]);
    const [error, setError] = useState(null);

    useEffect (()=>{
        const loadData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [mapsData, rolesData] = await Promise.all([
                    fetchMaps(),
                    fetchRoles()
                ]);
                setMaps(mapsData);
                setRoles(rolesData);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
                setError(error.message || 'Не удалось загрузить данные.')
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setStep(2);
    };

    const handleMapSelect = async (map) => {
        setSelectedMap(map);
        setLoading(true);

        try {
            const data = await fetchMapHeros(map.id, selectedRole);
            if (data) {
                setHeroes({
                    best: data.heroes?.best || [],
                    worst: data.heroes?.worst || []
                });
                setStep(3);
            }
        } catch (error) {
            console.error('Ошибка загрузки героев для карты:', error);
            setError(error.message || 'Не удалось загрузить героев для карт.')
        } finally{
            setLoading(false);
        }
    };

    const resetSelection = () => {
        setStep(0);
        setSelectedRole(null);
        setSelectedMap(null);
        setHeroes(null);
        setError(null);
    };

    return {
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
    };
};