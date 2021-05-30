import axios from 'axios';

export const getStateList = async () => {
    try {
        const response = await axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states');
        console.log(response);
        return response.data;
    }
    catch (err) {

    }
}
