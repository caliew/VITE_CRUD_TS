const getSensorUnit = (sensorType: string) => {
    switch (sensorType) {
        case "WISENSOR":
        case "Temperature":
            return "°C";
        case "Humidity":
            return "%";
        case "DIFF PRESS":
        case "Pressure":
            return "hPa";
        case "CO2":
            return "ppm";
        case "TVOC":
            return "ppb";
        case "Light":
            return "lux";
        default:
            return "NA";
    }
}

export { getSensorUnit }