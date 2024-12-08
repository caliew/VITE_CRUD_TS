const PageClasses = 'mt-15 p-2 font-Roboto flex flex-col items-center justify-center w-full';
const PageContainClasses = 'relative bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-15 ';
const GridClasses = 'absolute top-0 left-0 w-full';
const HeaderClasses = 'inline-flex size-24 mb-5 mt-5 stroke-[0.75]';

const SidebarClasses = 'fixed container px-5 py-10 top-20 z-30 w-1/6 flex flex-col font-Roboto font-extralight text-2xl gap-5 ';
const RoutesClasses = 'relative container w-full';
const ButtonLINKClasses = 'font-Roboto font-extralight text-2xl m-2 hover:focus:bg-color-4 hover:bg-color-3 lg:flex ';
const ButtonClasses = 'font-Roboto font-extralight text-2xl m-2 lg:flex ';

const MapClasses = 'w-[850px] h-[600px] p-1 bg-n-8 rounded-[2.4375rem] overflow-hidden';
const ChartClasses = 'w-[450px] h-[600px] p-1 bg-n-8 overflow-hidden';
const IOTSensorsClasses = 'flex flex-wrap justify-center items-center gap-1 overflow-hidden';

function CardClasses(px?: string,white?: boolean,className?: string): string {
    return `button relative inline-flex items-center justify-center h-11 
        transition-colors hover:text-color-1 flex flex-col h-full py-5 mb-15 
        border border-color-2 border-b-2 border-r-2
        ${px || "px-3"} ${white ? "text-n-8" : "text-n-1"} ${className || ""} ` }
const CardHeaderClasses = 'flex justify-center items-center font-Roboto text-2xl font-extralight border-y-2 border-color-0';
const CardTitleClasses = 'font-Roboto text-2xl font-extralight';
const CardIconClasses = 'size-10 text-white stroke-[0.75] absoluteStrokeWidth';
const CardSensorIDClasses = 'm-2 font-Roboto text-2xl font-extralight border-y-2 border-color-0';

export { PageClasses, HeaderClasses, SidebarClasses, 
         ButtonClasses, ButtonLINKClasses,
         RoutesClasses, 
         CardClasses, CardHeaderClasses, CardTitleClasses, CardIconClasses, CardSensorIDClasses,
         MapClasses, ChartClasses, IOTSensorsClasses,
         PageContainClasses, GridClasses }