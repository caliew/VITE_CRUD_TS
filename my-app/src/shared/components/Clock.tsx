import { useState, useEffect } from 'react';
import { LEDDisplay } from '../components';

const ledSize = 2;
const widthSize = 16;
const skewSize = -5;
const fgColor = 'white';
const bgColor = 'black'

const Clock = () => {

    const[time,setTime] = useState(new Date());

    useEffect(()=>{
        const intervalID = setInterval(()=>{
            setTime(new Date())
        },1000)
        return ()=> clearInterval(intervalID)
    },[])

    const hours = time.getHours().toString().padStart(2,'0');
    const minutes = time.getMinutes().toString().padStart(2,'0');
    const seconds = time.getSeconds().toString().padStart(2,'0');

    return (
    <div className='flex flex-col flex-wrap justify-center items-center font-Roboto font-extralight text-2xl'>
        <div className='flex'>
            <div>
                <LEDDisplay key='clock' displayValue={''} width={widthSize} ledSize={ledSize} foregroundCol={fgColor} backgroundCol={bgColor} skew={skewSize} />
            </div>
            <div>
                <LEDDisplay key='clock' displayValue={hours[0]} width={widthSize} ledSize={ledSize} foregroundCol={fgColor} backgroundCol={bgColor} skew={skewSize} />
                <LEDDisplay key='clock' displayValue={hours[1]} width={widthSize} ledSize={ledSize} foregroundCol={fgColor} backgroundCol={bgColor} skew={skewSize} />
                <LEDDisplay key='clock' displayValue={':'} width={widthSize} ledSize={ledSize} foregroundCol={fgColor} backgroundCol={bgColor} skew={skewSize} />
            </div>
            <div>
                <LEDDisplay key='clock' displayValue={minutes[0]} width={widthSize} ledSize={ledSize} foregroundCol={fgColor} backgroundCol={bgColor} skew={skewSize} />
                <LEDDisplay key='clock' displayValue={minutes[1]} width={widthSize} ledSize={ledSize} foregroundCol={fgColor} backgroundCol={bgColor} skew={skewSize} />
                <LEDDisplay key='clock' displayValue={':'} width={widthSize} ledSize={ledSize} foregroundCol={fgColor} backgroundCol={bgColor} skew={skewSize} />
            </div>
            <div>
                <LEDDisplay key='clock' displayValue={seconds[0]} width={widthSize} ledSize={ledSize} foregroundCol={fgColor} backgroundCol={bgColor} skew={skewSize} />
                <LEDDisplay key='clock' displayValue={seconds[1]} width={widthSize} ledSize={ledSize} foregroundCol={fgColor} backgroundCol={bgColor} skew={skewSize} />
            </div>
        </div>
    </div>)

}

export default Clock