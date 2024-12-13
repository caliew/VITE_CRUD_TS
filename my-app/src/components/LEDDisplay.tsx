import { useEffect, useState } from 'react';

// 0123 4567

//   7      (F) 101 = 0110 0101
// 1| | 6   (E) 117 = 0111 0101
//   5      (H) 110 = 0110 1110
// 2| | 4   (J) 27  = 0001 1011
//   3

const lookUpValues = {
    0: 123, 1: 10, 2: 55, 3: 31, 4: 78, 5: 93, 
    6: 125, 7: 11, 8: 127, 9: 95, '-': 4,
    'A': 111, 'B': 127, 'C': 113, 'D': 123, 'E': 117,
    'F': 101, 'G': 125, 'H': 110, 'I':10, 'J': 27, 'K': 110,
    'L': 112, 'O': 123, 'Z': 128
}
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

                <rect x={ledSize} y="0" rx="2" ry="2" width={barSize} height={ledSize} 
                      style={{fill: `${ (value & 1) === 1 ? foregroundCol : backgroundCol}`, stroke:borderCol, opacity:'0.8'}}  />

                <rect x={barSize + ledSize} y={ledSize} rx="2" ry="2" width={ledSize} height={barSize} 
                      style={{fill: `${ (value & 2) === 2 ? foregroundCol : backgroundCol}`, stroke:borderCol, opacity:'0.8'}}  />

                <rect x={ledSize} y={barSize + (ledSize)} rx="2" ry="2" width={barSize} height={ledSize} 
                      style={{fill: `${ (value & 4) === 4 ? foregroundCol : backgroundCol}`, stroke:borderCol, opacity:'0.8'}}  />

                <rect x={barSize + ledSize} y={barSize + (ledSize * 2)} rx="2" ry="2" width={ledSize} height={barSize} 
                      style={{fill: `${ (value & 8) === 8 ? foregroundCol : backgroundCol}`, stroke:borderCol, opacity:'0.8'}}  />    

                <rect x={ledSize} y={(barSize * 2) + (ledSize * 2)} rx="2" ry="2" width={barSize} height={ledSize} 
                      style={{fill:`${ (value & 16) === 16 ? foregroundCol : backgroundCol}`, stroke:borderCol, opacity:'0.8'}}  />

                <rect x="0" y={barSize + (ledSize * 2)} rx="2" ry="2" width={ledSize} height={barSize} 
                      style={{fill:`${ (value & 32) === 32 ? foregroundCol : backgroundCol}`, stroke:borderCol, opacity:'0.8'}}  />
                <rect x="0" y={ledSize} rx="2" ry="2" width={ledSize} height={barSize} 
                      style={{fill:`${ (value & 64) === 64 ? foregroundCol : backgroundCol}`, stroke:borderCol, opacity:'0.8'}}  />


                { (typeof(value) == 'undefined') && (props.displayValue == '.') && ( 
                    <rect x={barSize} y={(barSize * 2) + (ledSize * 2)} width={ledSize*1.2} height={ledSize*1.2} 
                          style={{fill:`${ (props.displayValue==='.') ? foregroundCol : backgroundCol}`, stroke:borderCol, opacity:'0.8'}}  />) }

                { (typeof(value) == 'undefined') && (props.displayValue == ':') && ( 
                        <>
                        <rect x={barSize} y={(barSize * 1.5) + (ledSize * 2)} width={ledSize * 1.2} height={ledSize * 1.2}
                              style={{ fill: `${(props.displayValue === ':') ? foregroundCol : backgroundCol}`, stroke: borderCol, opacity: '0.8' }} />
                        <rect x={barSize} y={(barSize * 0.5) + (ledSize * 2)} width={ledSize * 1.2} height={ledSize * 1.2}
                            style={{ fill: `${(props.displayValue === ':') ? foregroundCol : backgroundCol}`, stroke: borderCol, opacity: '0.8' }} />
                        </>
                    ) 
                }

            </svg>
        </div>
    )
}

export default LEDDisplay;