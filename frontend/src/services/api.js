const API_URL = 'http://localhost:5000/api';

const handleResponse = async (response) => {
    if (response.ok){
        return await response.json();
    }

    let errorMessage;
    try {
        const errorData = await response.json()
        errorMessage = errorData || `Ошибка ${response.status}: ${response.statusText}`;
    } catch {
        errorMessage = `Ошибка ${response.status}: ${response.statusText}`;
    }

    throw { status: response.status, message: errorMessage };
};

export const fetchRoles = async () => {
    try {
        const response = await fetch(`${API_URL}/roles`);
        return await handleResponse(response);
    } catch (error) {
        console.error(`Error fetching roles:`, error);
        throw error;
    }
};

export const fetchHeroesByRole = async (role) => {
    try{
        const response = await fetch(`${API_URL}/heroes?role=${encodeURIComponent(role)}`);
        return await handleResponse(response);
    } catch (error) {
        console.error(`Error fetching heroes:`, error);
        throw error;
    }
};

export const fetchCounterPick = async (heroId, userRole) => {
    try{
        const response = await fetch(`${API_URL}/counters?hero_id=${heroId}&user_role=${encodeURIComponent(userRole)}`);
        return await handleResponse(response);
    } catch (error) {
        console.error(`Error fetching counterpick:`, error);
        throw error;
    }
};

export const fetchAllHeroes = async () => {
    try{
        const response = await fetch(`${API_URL}/heroes`);
        return await handleResponse(response);
    } catch (error) {
        console.error(`Error fetching all heroes:`, error);
        throw error;
    }
};

export const fetchTanks = async () => {
    try {
        const response = await fetch (`${API_URL}/tanks`);
        return await handleResponse(response);
    } catch (error) {
        console.error('Error fetching tanks: ', error);
        throw error;
    }
};

export const fetchSynergies = async (tankId) => {
    try {
        const response = await fetch(`${API_URL}/synergies/${tankId}`);
        return await handleResponse(response);
    } catch (error) {
        console.error('Error fetching synergies:', error);
        throw error;
    }
};

export const fetchMaps = async () => {
    try {
        const response = await fetch(`${API_URL}/maps`);
        return await handleResponse(response);
    } catch (error){
        console.error('Error fetching maps:', error);
        throw error;
    }
};

export const fetchMapHeros = async(mapId, userRole) => {
    try {
        const response = await fetch(`${API_URL}/map-heroes?map_id=${mapId}&user_role=${encodeURIComponent(userRole)}`);
        return await handleResponse(response);
    } catch (error) {
        console.error('Error fetching map heroes:', error);
        throw error;
    }
};