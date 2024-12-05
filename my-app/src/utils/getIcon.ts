import { Login } from "@mui/icons-material";
import { CircuitBoard, KeyRound, House, Utensils, User, LogOutIcon, LogIn, Camera, Ban } from "lucide-react";

const getIcon = (name: string) => {
    if (name === 'iotportal') return CircuitBoard
    if (name === 'key') return KeyRound
    if (name === 'home') return House
    if (name === 'restaurants') return Utensils
    if (name === 'workers') return User
    if (name === 'login') return LogIn
    if (name === 'logout') return LogOutIcon
    if (name === '404') return Ban
    return Ban
}

export { getIcon }