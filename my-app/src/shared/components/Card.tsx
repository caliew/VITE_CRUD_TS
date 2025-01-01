import {
  GetIcon,
  GetLEDDisplay,
  GetSensorUNIT,
  CardClasses,
  CardHeaderClasses,
  CardTitleClasses,
  CardTitleGroupClasses,
  CardTitleNameClasses,
  CardIconClasses,
  CardSensorIDClasses,
} from "../utils";
import { SimpleGauge } from "../components";
interface ButtonProp {
  className?: string;
  sensorType?: string;
  name?: string;
  sensorId?: string;
  group?: string;
  reading?: any;
  unitSystem?: any;
  onClick?: any;
  children?: any;
  px?: string;
  white?: string;
}

const Card = ({
  className,
  sensorType,
  name,
  sensorId,
  group,
  reading,
  unitSystem,
  onClick,
  children,
  px,
  white,
}: ButtonProp) => {
  const Icon = GetIcon(sensorType);
  const MailIcon = GetIcon("Mail");
  const BellOnIcon = GetIcon("BellOn");
  const ChartLineIcon = GetIcon("ChartLine");
  const ChartPieIcon = GetIcon("ChartPie");
  const BatteryIcon = GetIcon("Battery");
  const Battery100Icon = GetIcon("Battery100");
  const Battery50Icon = GetIcon("Battery50");
  const Battery10Icon = GetIcon("Battery10");
  const Battery0Icon = GetIcon("Battery0");
  const MessageCircle = GetIcon("MessageCircle");
  const MessageSquare = GetIcon("MessageSquare");

  //<AlignCenterVertical size={28} color="#ce1c1c" strokeWidth={0.75} absoluteStrokeWidth />
  // const DisplayValue = reading['CURR'] ?? reading['PRESS'] ?? reading['TEMP'] ?? 0;

  const GetResultREADING = () => {
    const RsltKEY = Object.keys(reading);
    const length = RsltKEY.length;

    if (length === 0) {
      return (
        <div className="flex flex-col flex-wrap font-Roboto text-2xl font-extralight justify-center items-center my-5">
          NO DATA AVAILABLE
        </div>
      );
    } else {
      return (
        <div className="flex flex-col flex-wrap font-Roboto text-lg font-extralight justify-center items-center">
          {RsltKEY.map((key, index) => (
            <div key={index} className="flex justify-center items-center">
              <div className="px-2">{key}</div>
              {GetLEDDisplay({
                id: sensorId,
                reading: reading[key],
                sensorType,
              })}
              <span className="px-1" />
              <div className="font-extralight pb-10">
                {GetSensorUNIT(sensorType, key, unitSystem)}
              </div>
            </div>
          ))}
          {false &&
            RsltKEY.map((key, index) => (
              <SimpleGauge
                key={index}
                value={reading[key]}
                className=""
                name={name}
                min={0}
                max={100}
                unit={GetSensorUNIT(sensorType, unitSystem)}
              />
            ))}
        </div>
      );
    }
  };

  const renderCard = () => (
    <div className={CardClasses()}>
      <div className={CardHeaderClasses}>
        <Icon
          className={`${CardIconClasses} size-14 stroke-[1.0] text-cyan-300 absoluteStrokeWidth`}
        />
        <div className="px-2 text-1xl py-2">{sensorType}</div>
      </div>
      <div className={CardTitleClasses}>
        <div className={CardTitleGroupClasses}>{group}</div>
        <div className={CardTitleNameClasses}>{name}</div>
      </div>
      <div className={CardSensorIDClasses}>{sensorId}</div>
      {GetResultREADING()}

      <div className="flex">
        <MailIcon className={CardIconClasses} />
        <MessageCircle className={CardIconClasses} />
        <MessageSquare className={CardIconClasses} />
        <BellOnIcon className={CardIconClasses} />
        <ChartLineIcon className={CardIconClasses} />
        <ChartPieIcon className={CardIconClasses} />
      </div>
      <div className="flex">
        <BatteryIcon className={CardIconClasses} />
        <Battery100Icon className={CardIconClasses} />
        <Battery50Icon className={CardIconClasses} />
        <Battery10Icon className={CardIconClasses} />
        <Battery0Icon className={CardIconClasses} />
      </div>
      {children}
    </div>
  );

  return renderCard();
};

export default Card;
