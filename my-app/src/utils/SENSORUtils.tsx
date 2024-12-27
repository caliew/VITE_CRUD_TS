// ----------------
const getSensorUNIT = (sensorType: any, key: string | undefined,unitSystem: string | undefined) => {
    switch (sensorType) {
        case "AC CURRENT":
            return "A";
        case "WISENSOR":            
        case "DEW PT.METER":
        case "TEMP & RH":
        case "TEMP":
            if (key == "TEMP") return "°C";
            if (key == "RH" || key == "HUMD") return "%";
            return "°C";
        case "AIR PRESSURE":
        case "DIFF PRESS":
            return unitSystem;
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
const getPRESSFactor = (UNITSYSTEM:any) => {
    return  typeof(UNITSYSTEM) === 'undefined' ? 1.0 : 
      (UNITSYSTEM.toUpperCase() === 'GFORCE') ? 1.0197E-5 : 
      (UNITSYSTEM.toUpperCase() === 'BAR') ? 1.0E-5: 1.0;
}
// -------------------------
function hexToDecimal(hex:any) {
    return (parseInt(hex.slice(0, 2), 16) * 256 + parseInt(hex.slice(2, 4), 16)) / 10000 
};
function HEXTOINT(hex:any) {
    if (hex.length % 2 != 0) { hex = "0" + hex; }
    var num = parseInt(hex, 16);
    var maxVal = Math.pow(2, hex.length / 2 * 8);
    if (num > maxVal / 2 - 1) {
        num = num - maxVal
    }
    return num;
}
function parseFloat(str:any) {
    var float = 0, sign,  mantissa, exp,
    int = 0, multi = 1;
    if (/^0x/.exec(str)) { int = parseInt(str, 16); }
    else {
        for (var i = str.length -1; i >=0; i -= 1) {
            if (str.charCodeAt(i) > 255) {
                console.log('Wrong string parameter');
                return false;
            }
            int += str.charCodeAt(i) * multi;
            multi *= 256;
        }
    }
    sign = (int >>> 31) ? -1 : 1;
    exp = ((int >>> 23) & 0xff) - 127;
    mantissa = ((int & 0x7fffff) + 0x800000).toString(2);
    for (i=0; i<mantissa.length; i+=1) {
        float += parseInt(mantissa[i]) ? Math.pow(2, exp) : 0;
        exp--;
    }
    return float*sign;
}
// -----------
function calculateCurrent(HEX:string, CTRATIO:any) {
    let _CURR = (typeof CTRATIO === 'undefined') ? Math.abs(HEXTOINT(HEX) / 100.0) : Math.abs(hexToDecimal(HEX));
    _CURR = _CURR * 1.0;
    let objResult : any = { 
        CURR  : Number(_CURR).toFixed(2)
    }
    return objResult;
}
function calculateAirPressure(HEX:any,OFFSET_PRESS:any,UNITSYSTEM:any) {
    let HEX1 = HEX.slice(0,4);
    let HEX2 = HEX.slice(4,8);
    let newHEX = HEX2 + HEX1;
    let _reading  = `0x${newHEX}`;
    let _Value = Number(parseFloat(_reading)) + Number(OFFSET_PRESS?? 0);
    let _factor: any = getPRESSFactor(UNITSYSTEM);
    _Value = (_Value * _factor) ;    
    let objResult : any = {
        PRESS : Number(_Value).toFixed(2)
    }
    return objResult;
}
function calculateDiffPressure(HEX:any,OFFSET_PRESS:any) {
    const decimalNumber = parseInt(HEX, 16)/10.0;
    let objResult : any = {
        PRESS : Number(decimalNumber).toFixed(2)
    }
    return objResult;
}
function calculateTempAndRH(HEX:string, OFFSET_Temp:string, OFFSET_RH:string) {
    let HEX1 = HEX.slice(0,4);
    let HEX2 = HEX.slice(4,8);
    let RH = HEXTOINT(HEX1)/10.0 + (OFFSET_RH ?? 0);
    let TEMP = (HEXTOINT(HEX2)/10.0) + (OFFSET_Temp ?? 0);
    let objResult : any = {
        TEMP : Number(TEMP).toFixed(2),
        RH : Number(RH).toFixed(0)
    };
    return objResult;
}
function calculateDewPoint(HEX:string) {
    let RH  = HEXTOINT(HEX.substr(0,4))/10;
    let DEW = HEXTOINT(HEX.substr(4,4))/10;
    let TEMP = HEXTOINT(HEX.substr(8,4))/10;
    let objResult : any = {
        TEMP : Number(TEMP).toFixed(2),
        RH : Number(RH).toFixed(0),
        DEW : Number(DEW).toFixed(2)
    }
    return objResult;
}
// -----
const getWISensorREADIng = () => {

}
const get485SensorREADING = ({ID,TYPE,HEX,UNITSYSTEM,CTRATIO,OFFSET_Temp,OFFSET_RH,OFFSET_PRESS}: any) => {
    let _VALUE = {};
    switch (TYPE) {
        case 'AC CURRENT':
            _VALUE = calculateCurrent(HEX,CTRATIO);
            break;
        case 'AIR PRESSURE':
            _VALUE = calculateAirPressure(HEX,OFFSET_PRESS,UNITSYSTEM);
            break
        case 'DIFF PRESS':
            _VALUE = calculateDiffPressure(HEX,OFFSET_PRESS);
            break;
        case 'TEMP & RH':
            _VALUE = calculateTempAndRH(HEX,OFFSET_Temp,OFFSET_RH);
            break;
        case 'DEW PT.METER':
            _VALUE = calculateDewPoint(HEX);
            break;
        default:
            break;
    }
    // console.log('GETSENSORREADING..',ID,TYPE,HEX,_VALUE)
    return _VALUE;
}
// ----------------------------
// GET ALL FINAL CHILDREN NODES
//      FROM SUBBURST SELECTION
//  ---------------------------
const getFinalChildrenNODES = (node:any) =>  {
    const finalChildren:any = [];
    if (node.children) {
      node.children.forEach((child:any) => {
        if (child.children) {
          finalChildren.push(...getFinalChildrenNODES(child));
        } else {
          finalChildren.push(child);
        }
      });
    }
    return finalChildren;
}

export { getSensorUNIT, get485SensorREADING, getWISensorREADIng, getFinalChildrenNODES }