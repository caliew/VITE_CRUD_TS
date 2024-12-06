import { 
    CircuitBoard, KeyRound, House, Utensils, User, LogOutIcon, LogIn, 
    Thermometer, ThermometerSnowflake, ThermometerSun,
    Wind, WindArrowDown, 
    Gauge, CircleGauge,
    Mail, MailOpen, Flag,
    MessageCircle, MessageSquare,
    Clipboard, ClipboardCheck, ClipboardPlus, ClipboardMinus, 
    ClipboardPenLine, ClipboardList,
    Sheet, TriangleAlert, 
    Omega, Radiation, Orbit, Sigma, Cctv, 
    Waypoints, 
    Bell, BellOff, 
    LineChart, PieChart, ChartScatter, ChartSpline, ChartArea, ChartLine,
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
    if (name === 'DIFF PRESS') return Gauge
    if (name === 'Mail') return Mail
    if (name === 'BellOn') return Bell
    if (name === 'BellOff') return BellOff
    if (name === 'ChartLine') return ChartLine
    if (name === 'ChartSpline') return ChartSpline
    if (name === 'ChartPie') return PieChart
    if (name === 'Battery') return Battery
    if (name === 'Battery100') return BatteryFull
    if (name === 'Battery50') return BatteryMedium
    if (name === 'Battery10') return BatteryLow
    if (name === 'Battery0') return BatteryWarning
    if (name === 'MessageCircle') return MessageCircle
    if (name === 'MessageSquare') return MessageSquare
    return Ban
}

export { getIcon }