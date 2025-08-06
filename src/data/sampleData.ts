export const sampleEconomicData = `date,inflation,interest_rate,forex_reserves,transactions
2024-01,3.2,5.75,145000000000,2850000000
2024-02,3.1,5.75,147200000000,2920000000
2024-03,3.0,5.50,148500000000,3100000000
2024-04,2.9,5.50,149800000000,3250000000
2024-05,2.8,5.25,151200000000,3380000000
2024-06,2.7,5.25,152600000000,3450000000
2024-07,2.6,5.00,154100000000,3620000000
2024-08,2.5,5.00,155800000000,3750000000
2024-09,2.4,4.75,157200000000,3890000000
2024-10,2.3,4.75,158900000000,4020000000`;

export function generateSampleCSVFile(): File {
  const blob = new Blob([sampleEconomicData], { type: 'text/csv' });
  return new File([blob], 'sample-economic-data.csv', { type: 'text/csv' });
}

export interface EconomicDataPoint {
  date: string;
  inflation: number;
  interest_rate: number;
  forex_reserves: number;
  transactions: number;
}

export function parseEconomicData(csvText: string): EconomicDataPoint[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return {
      date: values[0],
      inflation: parseFloat(values[1]),
      interest_rate: parseFloat(values[2]),
      forex_reserves: parseFloat(values[3]),
      transactions: parseFloat(values[4])
    };
  });
}