import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import * as Device from 'expo-device';
import axios from 'axios';

interface Position {
    latitude: number | null;
    longitude: number | null;
}

interface LocationData {
    city: string | null;
    subdistrict: string | null;
    position: Position;
}

const useCurrentLocation = () => {
    const [locationData, setLocationData] = useState<LocationData>({
        city: null,
        subdistrict: null,
        position: { latitude: null, longitude: null }
    });
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        const fetchLocation = async () => {
            if (!Device.isDevice) {
                setErrorMsg('Must use physical device for this feature');
                return;
            }

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            let { latitude, longitude } = location.coords;

            // Use OpenCage Geocoding API
            const apiKey = 'ceff6b322a344e739cee933ac8ec96e5';
            const response = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
            );

            const components = response.data.results[0].components;

            let city = components.city || 'Unknown';
            let subdistrict = components.suburb || components.town || 'Unknown';

            setLocationData({
                city,
                subdistrict,
                position: { latitude, longitude }
            });
        };

        fetchLocation();
    }, []);

    return { locationData, errorMsg };
};

export default useCurrentLocation;
