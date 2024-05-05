export const getPayStationUrlFunction = (isSandbox: boolean) => {
  return isSandbox
    ? import.meta.env.VITE_SANDBOX_PAY_STATION_URL
    : import.meta.env.VITE_PAY_STATION_URL;
};
