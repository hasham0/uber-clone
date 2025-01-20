const addressCoordinates = async (address) => {
    try {
        if (!address) {
            throw new error("address is required");
        }

        const response = await fetch(
            `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(
                address
            )}&key=${process.env.GOOGLE_MAP_API}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const result = await response.json();
        const { lat, lng } = result.results[0].geometry.location;
        return { lat, lng };
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        throw error;
    }
};

const distanceAndTime = async (origin, destination) => {
    try {
        if (!origin || !destination) {
            throw new error("Origin and Destination are required");
        }

        const response = await fetch(
            `https://maps.gomaps.pro/maps/api/distancematrix/json?destinations=${encodeURIComponent(
                destination
            )}&origins=${encodeURIComponent(origin)}&key=${
                process.env.GOOGLE_MAP_API
            }`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const result = await response.json();
        return result.rows[0].elements[0];
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        throw error;
    }
};

const autoSuggestions = async (input) => {
    try {
        if (!input) {
            throw new error("input is required");
        }

        const response = await fetch(
            `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(
                input
            )}&key=${process.env.GOOGLE_MAP_API}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const result = await response.json();
        return result.predictions;
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        throw error;
    }
};
export { addressCoordinates, distanceAndTime, autoSuggestions };
