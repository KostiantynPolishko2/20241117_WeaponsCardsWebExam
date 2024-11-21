import axios from "axios";
import { WeaponsData } from "./CardNew";

export const fetchImageAIPath = async (asteroidName: string): Promise<string> => { 
    const asteroidImage = axios.create({
        baseURL: 'https://spaceobjectaiserver.azurewebsites.net/api/AsteroidImage/asteroid-image',
        method: 'get',
        responseType: 'json',
    });

    try{
        const responce = await asteroidImage.get(`new ${asteroidName}`);
        return responce.data;
    }
    catch(error){
        return 'https://docfiles.blob.core.windows.net/files/images/404.png';
    }
}

export const postWeaponsData = async(model: string, weaponsData: WeaponsData): Promise<number> => {

    const weaponsDataPost = axios.create({
        baseURL: 'http://localhost:5144/api/WeaponsItems',
        method: 'post',
        responseType: 'json',
        timeout: 4000,
    });
    weaponsDataPost.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

    try{
        const responce = await weaponsDataPost.post(`new-model/${model}`, weaponsData);
        return responce.data;
    }
    catch(error){
        return 401;
    }
}

export const deleteWeaponsData = async(model: string): Promise<number> => {

    if(model == 'none'){
        return 401;
    }

    const weaponsDataDelete = axios.create({
        baseURL: 'http://localhost:5144/api/WeaponsItems',
        method: 'delete',
        responseType: 'json',
        timeout: 4000,
    });
    weaponsDataDelete.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

    try{
        const responce = await weaponsDataDelete.delete(`model/${model}`);
        return responce.data;
    }
    catch(error){
        return 401;
    }
}