import { 
    CircuitBoard, KeyRound, House, Utensils, User, LogOutIcon, LogIn, 
    Thermometer, ThermometerSnowflake, ThermometerSun,
    Wind, WindArrowDown, 
    Gauge, CircleGauge,
    Omega, Radiation, Orbit, Sigma, Cctv, 
    Waypoints,
    Drill, FireExtinguisher, 
    Battery,BatteryFull, BatteryLow, BatteryMedium, BatteryWarning,
    BatteryCharging, Plug, PlugZap, 
    BellElectric,
    Ban
 } from "lucide-react";

 const getIcon = (name: any) => {
    if (name === 'iotportal') return CircuitBoard
    if (name === 'key') return KeyRound
    if (name === 'home') return House
    if (name === 'restaurants') return Utensils
    if (name === 'workers') return User
    if (name === 'login') return LogIn
    if (name === 'logout') return LogOutIcon
    if (name === '404') return Ban
    if (name === 'WISENSOR') return Thermometer
    if (name === 'DIFF PRESS') return CircleGauge
    return Ban
}

export { getIcon }