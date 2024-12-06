import { LEDDisplay } from "../components";

const getLEDDisplay = (reading: string) => {
    // ------------------
    const ledSize = 2;
    const widthSize = 15;
    const skewSize = -5;
    if ((reading?.length ?? 0) === 0) {
      return <LEDDisplay key={0} displayValue="0" width={widthSize} ledSize={ledSize} foregroundCol={'white'} backgroundCol={'black'} skew={skewSize} />;
    }
    const digitArray = reading.split(''); // split the string into an array of digits
    return (
      <div className="flex flex-row py-2">
        {digitArray.map((digit, index) => {
          if (digit === '-') {
            return <LEDDisplay key={index} displayValue={'-'} width={widthSize} ledSize={ledSize} foregroundCol={'white'} backgroundCol={'black'} skew={skewSize} />;
          } else if (digit === '.') {
            return <LEDDisplay key={index} displayValue={'.'} width={widthSize} ledSize={ledSize} foregroundCol={'white'} backgroundCol={'black'} skew={skewSize} />;
          } else {
            return <LEDDisplay key={index} displayValue={digit} width={widthSize} ledSize={ledSize} foregroundCol={'white'} backgroundCol={'black'} skew={skewSize} />;
          }
        })}
      </div>
    );
};

export { getLEDDisplay }