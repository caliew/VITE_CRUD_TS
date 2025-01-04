const BLUE_GREEN_HOST = {
    blue: 'blue',
    green: 'green',
  };
  
  export const getBlueGreenValue = (blueValue: string, greenValue: string) => {
    if (window.location && window.location.host) {
      if (window.location.host.includes(BLUE_GREEN_HOST.green)) {
        return greenValue;
      }
    }
  
    return blueValue;
  };
  