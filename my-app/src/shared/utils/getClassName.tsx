const NavHeaderClass = 'mx-auto flex justify-between items-center font-Roboto font-extralight text-2xl';

const RoutesClasses = ''; // ml-64 p-4

const SPKAPageClasses = 'z-0 w-screen flex flex-col flex-wrap w-full items-center justify-center shadow-orange-500/50';

const PageClasses = 'w-full flex p-2 font-Roboto flex flex-col flex-wrap items-center justify-center shadow-cyan-500/50';

const PageContainClasses = 'flex flex-row flex-wrap items-center justify-center p-5 bg-n-8 rounded-[2.4375rem] overflow-hidden shadow-xl shadow-cyan-500/50';
const GridClasses = 'absolute top-0 left-0 w-full';
const PageHeaderClasses = 'inline-flex size-24 mb-5 mt-5 stroke-[0.75]';

const SidebarClasses = 'fixed top-20 left-5 w-64 bg-red p-4 z-20 font-Roboto font-extralight text-2xl rounded-[1.5rem] shadow-2xl shadow-indigo-500/50';
const ButtonLINKClasses = 'font-Roboto font-extralight text-2xl m-1';
const ButtonClasses = 'font-Roboto font-extralight text-2xl m-2 lg:flex ';

const MapClasses = 'w-[650px] h-[500px] p-1 bg-n-8 rounded-[2.4375rem] overflow-hidden';
const ChartClasses = 'w-[450px] h-[600px] p-1 bg-n-8 overflow-hidden';
const IOTSensorsClasses = 'flex flex-wrap justify-center items-center gap-3 overflow-hidden';

function CardClasses(px?: string,white?: boolean,className?: string): string {
    return `relative flex flex-col items-center justify-center h-11 transition-colors 
            shadow-2xl shadow-indigo-500/50
            hover:text-color-8 
            border-2 border-orange-50 rounded-lg
            h-full py-5 mb-15 w-[280px] 
            ${px || "px-3"} ${white ? "text-n-8" : "text-n-1"} ${className || ""} ` }
const CardIconClasses = 'size-8 text-white stroke-[0.75] absoluteStrokeWidth';
const CardHeaderClasses = 'flex justify-center items-center font-Roboto text-2xl text-center font-extralight border-y-2 border-color-0';
const CardTitleClasses = 'flex flex-col flex-wrap py-2 font-Roboto text-2xl font-light justify-center items-center';
const CardTitleGroupClasses = 'flex flex-wrap justify-center item-center font-Roboto text-2xl text-center py-1 border-y-2';
const CardTitleNameClasses = 'flex flex-wrap justify-center item-center font-Roboto font-extralight text-xl text-center pt-2';
// "flex font-Roboto font-extralight text-lg text-justify inline-block truncate text-overflow-ellipsis"
const CardSensorIDClasses = 'm-2 font-Roboto text-2xl font-extralight border-y-2 border-color-0';

export { NavHeaderClass,
         PageClasses, SPKAPageClasses,
         PageHeaderClasses, SidebarClasses, 
         ButtonClasses, ButtonLINKClasses,
         RoutesClasses, 
         CardClasses, CardHeaderClasses, 
         CardTitleClasses, CardTitleGroupClasses, CardTitleNameClasses,
         CardIconClasses, CardSensorIDClasses,
         MapClasses, ChartClasses, IOTSensorsClasses,
         PageContainClasses, GridClasses }