import { LEDDisplay } from "../components";
import { GetSensorUNIT } from "../utils";

const getLEDDisplay = ({reading, sensorType}:any) => {
    // ------------------
    const ledSize = 3;
    const widthSize = 18;
    const skewSize = -5;
    const fgColor = 'yellow';
    const bgColor = 'black'
    if ((reading?.length ?? 0) === 0) {
      return <LEDDisplay key={0} displayValue="-" width={widthSize} ledSize={ledSize} foregroundCol={fgColor} backgroundCol={bgColor} skew={skewSize} />;
    }
    const digitArray = reading.split(''); // split the string into an array of digits
    return (
      <div className="flex flex-row py-2">
        {digitArray.map((digit, index) => {
          if (digit === '-') {
            return <LEDDisplay key={index} displayValue={'-'} width={widthSize} ledSize={ledSize} foregroundCol={fgColor} backgroundCol={bgColor} skew={skewSize} />;
          } else if (digit === '.') {
            return <LEDDisplay key={index} displayValue={'.'} width={widthSize} ledSize={ledSize} foregroundCol={fgColor} backgroundCol={bgColor} skew={skewSize} />;
          } else {
            return <LEDDisplay key={index} displayValue={digit} width={widthSize} ledSize={ledSize} foregroundCol={fgColor} backgroundCol={bgColor} skew={skewSize} />;
          }
        })}
        {GetSensorUNIT(sensorType)}
      </div>
    );
};

export { getLEDDisplay }