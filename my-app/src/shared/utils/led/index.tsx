import { LEDDisplay } from "../../components";
import { GetSensorUNIT } from "..";

const getLEDDisplay = ({ reading }: any) => {
  // ------------------
  const ledSize = 3;
  const widthSize = 18;
  const skewSize = -5;
  const fgColor = "yellow";
  const bgColor = "black";
  // ---------------------
  if ((reading?.length ?? 0) === 0 || reading === "NaN") {
    return (
      <LEDDisplay
        key={0}
        displayValue="-"
        width={widthSize}
        ledSize={ledSize}
        foregroundCol={fgColor}
        backgroundCol={bgColor}
        skew={skewSize}
      />
    );
  }
  const digitArray = reading.split(""); // split the string into an array of digits
  return (
    <div className="flex flex-row py-2 justify-center items-center font-Roboto text-2xl font-extralight">
      {digitArray.map((digit, index) => {
        if (digit === "-") {
          return (
            <LEDDisplay
              key={index}
              displayValue={"-"}
              width={widthSize}
              ledSize={ledSize}
              foregroundCol={fgColor}
              backgroundCol={bgColor}
              skew={skewSize}
            />
          );
        } else if (digit === ".") {
          return (
            <LEDDisplay
              key={index}
              displayValue={"."}
              width={widthSize}
              ledSize={ledSize}
              foregroundCol={fgColor}
              backgroundCol={bgColor}
              skew={skewSize}
            />
          );
        } else {
          return (
            <LEDDisplay
              key={index}
              displayValue={digit}
              width={widthSize}
              ledSize={ledSize}
              foregroundCol={fgColor}
              backgroundCol={bgColor}
              skew={skewSize}
            />
          );
        }
      })}
    </div>
  );
};

export { getLEDDisplay as GetLEDDisplay };
