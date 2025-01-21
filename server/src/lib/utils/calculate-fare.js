import { distanceAndTime } from "../services/map.service.js";

const calculateFare = async (pickup, destination) => {
    const distanceTime = await distanceAndTime(pickup, destination);
    const baseFare = {
        auto: 30,
        car: 50,
        motorcycle: 20,
    };
    const perKmRate = {
        auto: 10,
        car: 15,
        motorcycle: 8,
    };
    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorcycle: 1.5,
    };

    const fare = {
        auto:
            baseFare.auto +
            (distanceTime.distance.value / 1000) * perKmRate.auto +
            (distanceTime.duration.value / 60) * perKmRate.auto,
        car:
            baseFare.car +
            (distanceTime.distance.value / 1000) * perKmRate.car +
            (distanceTime.duration.value / 60) * perMinuteRate.car,
        motorcycle:
            baseFare.motorcycle +
            (distanceTime.distance.value / 1000) * perKmRate.motorcycle +
            (distanceTime.duration.value / 60) * perMinuteRate.motorcycle,
    };

    return fare;
};

export default calculateFare;
