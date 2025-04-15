import {
  Loader,
  CircuitBoard,
  KeyRound,
  House,
  Utensils,
  User,
  LogOutIcon,
  LogIn,
  Thermometer,
  CalendarCheck,
  Gauge,
  CircleGauge,
  CalendarDays,
  Mail,
  MessageCircle,
  MessageSquare,
  Omega,
  Rainbow,
  Map,
  MapPinHouse,
  Bell,
  BellOff,
  PieChart,
  ChartSpline,
  ChartLine,
  FireExtinguisher,
  Battery,
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  BatteryWarning,
  LayoutPanelLeft,
  LayoutPanelTop,
  Ban,
} from "lucide-react";

const getIcon = (name: any) => {
  if (name === "IOTPortal") return CircuitBoard;
  if (name === "Scheduler") return CalendarCheck;
  if (name === "SPKAPortal") return FireExtinguisher;
  if (name === "Loading") return Loader;
  if (name === "Key") return KeyRound;
  if (name === "Home") return House;
  if (name === "Restaurants") return Utensils;
  if (name === "Workers") return User;
  if (name === "Login") return LogIn;
  if (name === "Logout") return LogOutIcon;
  if (name === "404") return Ban;
  if (name === "Sunburst") return Rainbow;
  if (name === "WISENSOR") return Thermometer;
  if (name === "TEMP & RH") return Thermometer;
  if (name === "DEW PT.METER") return Thermometer;
  if (name === "DIFF PRESS") return Gauge;
  if (name === "AIR PRESSURE") return CircleGauge;
  if (name === "AC CURRENT") return Omega;
  if (name === "Calendar") return CalendarDays;
  if (name === "Gauge") return Gauge;
  if (name === "Mail") return Mail;
  if (name === "BellOn") return Bell;
  if (name === "BellOff") return BellOff;
  if (name === "ChartLine") return ChartLine;
  if (name === "ChartSpline") return ChartSpline;
  if (name === "ChartPie") return PieChart;
  if (name === "Battery") return Battery;
  if (name === "Battery100") return BatteryFull;
  if (name === "Battery50") return BatteryMedium;
  if (name === "Battery10") return BatteryLow;
  if (name === "Battery0") return BatteryWarning;
  if (name === "MessageCircle") return MessageCircle;
  if (name === "MessageSquare") return MessageSquare;
  if (name === "Layout1") return LayoutPanelLeft;
  if (name === "Layout2") return LayoutPanelTop;
  if (name === "Map") return Map;
  if (name === "MapPinHouse") return MapPinHouse;

  return Ban;
};

export { getIcon as GetIcon };
