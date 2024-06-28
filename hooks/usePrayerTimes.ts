// usePrayerTimes.ts
import { useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';


interface PrayerTimes {
    Fajr: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
}

const usePrayerTimes = () => {
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
    const [nextPrayer, setNextPrayer] = useState<string>('');
    const [nextPrayerName, setNextPrayerName] = useState<string>('');
    const [timeToNextPrayer, setTimeToNextPrayer] = useState<number>(0);

    useEffect(() => {
        const loadPrayerTimes = async () => {
            const savedPrayerTimes = await SecureStore.getItem('prayerTimes');
            if (savedPrayerTimes) {
                const parsedTimes: PrayerTimes = JSON.parse(savedPrayerTimes);
                setPrayerTimes(parsedTimes);
                calculateNextPrayer(parsedTimes);
            }
        };

        loadPrayerTimes();
    }, []);

    const calculateNextPrayer = (times: PrayerTimes) => {
        if (!times) return;

        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes(); // current time in minutes since midnight

        let nearestPrayer: string | null = null;
        let nearestTime = Infinity;

        Object.entries(times).forEach(([prayer, time]) => {
            const [hour, minute] = time.split(':').map(Number);
            const prayerTime = hour * 60 + minute; // prayer time in minutes since midnight

            if (prayerTime >= currentTime && prayerTime - currentTime < nearestTime) {
                nearestTime = prayerTime - currentTime;
                nearestPrayer = prayer;
            }
        });

        if (nearestPrayer) {
            setNextPrayer(nearestPrayer);
            setNextPrayerName(getPrayerName(nearestPrayer));
            setTimeToNextPrayer(nearestTime);
        }
    };

    const getPrayerName = (prayer: string): string => {
        switch (prayer) {
            case 'Fajr':
                return 'Subuh';
            case 'Dhuhr':
                return 'Dzuhur';
            case 'Asr':
                return 'Ashar';
            case 'Maghrib':
                return 'Maghrib';
            case 'Isha':
                return 'Isya';
            default:
                return '';
        }
    };

    function formatTime(minutes: number): string {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours} hours ${mins} mins`;
    }

    return {
        prayerTimes,
        nextPrayerName,
        timeToNextPrayer,
        formatTime,
        getPrayerName,
    };
};

export default usePrayerTimes;
