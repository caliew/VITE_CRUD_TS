import { 
    CircuitBoard, KeyRound, House, Utensils, User, LogOutIcon, LogIn, 
    Thermometer, ThermometerSnowflake, ThermometerSun,
    Wind, WindArrowDown, 
    Gauge, CircleGauge,
    CalendarDays,
    Mail, MailOpen, Flag,
    MessageCircle, MessageSquare,
    Clipboard, ClipboardCheck, ClipboardPlus, ClipboardMinus, 
    ClipboardPenLine, ClipboardList,
    Sheet, TriangleAlert, 
    Omega, Radiation, Orbit, Sigma, Cctv, 
    Waypoints, Rainbow,
    Map, MapPin, MapPinOff, MapPinHouse,
    Bell, BellOff, 
    LineChart, PieChart, ChartScatter, ChartSpline, ChartArea, ChartLine,
    Drill, FireExtinguisher, 
    Battery,BatteryFull, BatteryLow, BatteryMedium, BatteryWarning,
    BatteryCharging, Plug, PlugZap, 
    BellElectric,
    LayoutPanelLeft, LayoutPanelTop,
    PanelsTopLeft, PanelsTopRight, PanelsBottomLeft, PanelsBottomRight,
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
    if (name === 'Sunburst') return Rainbow
    if (name === 'WISENSOR') return Thermometer
    if (name === 'TEMP & RH') return Thermometer
    if (name === 'DEW PT.METER') return Thermometer
    if (name === 'DIFF PRESS') return Gauge
    if (name === 'AIR PRESSURE') return CircleGauge
    if (name === 'AC CURRENT') return Omega
    if (name === 'Calendar') return CalendarDays
    if (name === 'Gauge') return Gauge
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
    if (name === 'Layout1') return LayoutPanelLeft
    if (name === 'Layout2') return LayoutPanelTop
    if (name === 'Map') return Map
    if (name === 'MapPinHouse') return MapPinHouse

    return Ban
}


export { getIcon }