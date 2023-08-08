import rawdata from './data.json';


export const data = {
  ...rawdata,
  nearby: Object.fromEntries(
    Object.entries(rawdata.nearby).map(([key, list]) => [key, list.filter((row) => row['直线距离'] as unknown as number < 800)])
  )
};