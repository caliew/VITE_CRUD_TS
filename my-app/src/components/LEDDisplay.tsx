import { useEffect, useState } from 'react';

const lookUpValues = [123, 10, 55, 31, 78, 93, 125, 11, 127, 95];

interface LEDDisplayProp {
    displayValue?: any;
    skew: number;
    width: number;
    ledSize: number;
    foregroundCol: string;
    backgroundCol: string;
}

function LEDDisplay ({...props}:LEDDisplayProp)  {
    //  ---------
    const [value,setValue] = useState<any>(null);
    //  --------
    useEffect(()=>{
        setValue(lookUpValues[props.displayValue]);
    },[props]);
    // ------------
    const foregroundCol:any = props.foregroundCol;
    const backgroundCol:any = props.backgroundCol;
    const borderCol:any = '';
    const skew:any = "skewX(" + props.skew + ")";
    const width:any = props.width;
    const ledSize:any = props.ledSize;
    const height:any = (width * 2) + (ledSize * 3);
    const barSize:any = width - (ledSize * 2);
    //  ----------------------------------
    return (
        <div className='inline-block relative'>
            <svg width={+width + 4} height={+height} transform={skew}>
                <rect x={ledSize} y="0" rx="2" ry="2" width={barSize} height={ledSize} style={{fill: `${ (value & 1) === 1 ? foregroundCol : backgroundCol}`, stroke:borderCol, opacity:'0.8'}}  />
                <rect x={barSize + ledSize} y={ledSize} rx="2" ry="2" width={ledSize} height={barSize} style={{fill: `${ (value & 2) === 2 ? foregroundCol : backgroundCol}`, stroke:borderCol, opacity:'0.8'}}  />

                <rect x={ledSize} y={barSize + (ledSize)} rx="2" ry="2" width={barSize} height={ledSize} style={{fill: `${ ((value & 4) === 4 || (props.displayValue==='-')) ? foregroundCol : backgroundCol}`, stroke:borderCol, opacity:'0.8'}}  />
                <rect x={barSize + ledSize} y={barSize + (ledSize * 2)} rx="2" ry="2" width={ledSize} height={barSize} style={{fill: `${ (value & 8) === 8 ? foregroundCol : backgroundCol}`, stroke:borderCol, opacity:'0.8'}}  />                

                <rect x={ledSize} y={(barSize * 2) + (ledSize * 2)} rx="2" ry="2" width={barSize} height={ledSize} style={{fill:`${ (value & 16) === 16 ? foregroundCol : backgroundCol}`, stroke:borderCol, opacity:'0.8'}}  />

                <rect x="0" y={barSize + (ledSize * 2)} rx="2" ry="2" width={ledSize} height={barSize} style={{fill:`${ (value & 32) === 32 ? foregroundCol : backgroundCol}`, stroke:borderCol, opacity:'0.8'}}  />
                <rect x="0" y={ledSize} rx="2" ry="2" width={ledSize} height={barSize} style={{fill:`${ (value & 64) === 64 ? foregroundCol : backgroundCol}`, stroke:borderCol, opacity:'0.8'}}  />

                { (typeof(value) == 'undefined') && (props.displayValue==='.') && (
                    <rect   x={barSize} y={(barSize * 2) + (ledSize * 2)}
                            width={ledSize*1.2} height={ledSize*1.2} 
                            style={{fill:`${ (props.displayValue==='.') ? foregroundCol : backgroundCol}`, 
                                    stroke:borderCol, opacity:'0.8'}}  />)
                }

            </svg>
        </div>
    )
}

export default LEDDisplay;