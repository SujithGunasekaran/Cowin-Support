import axios from 'axios';

export const getStateList = async () => {
    try {
        const response = await axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states');
        return response.data;
    }
    catch (err) {
        console.log(err.message);
    }
}

export const getDistricts = async (stateCode) => {
    try {
        const response = await axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateCode}`);
        return response.data;
    }
    catch (err) {
        console.log(err.message);
    }
}

export const getVaccineDetails = async (districtCode) => {
    const date = new Date().toLocaleDateString();
    try {
        const response = await axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtCode}&date=${date}`)
        return response.data;
    }
    catch (err) {
        console.log(err.message);
    }
}
