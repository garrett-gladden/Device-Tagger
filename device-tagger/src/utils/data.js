import { useMemo } from 'react';

// Utility function to filter devices based on selected filters
export const filterDevices = (devices, filters) => {
  return devices.filter(device => {
    if (filters.country !== 'All' && device.country !== filters.country) return false;
    if (filters.city !== 'All' && device.city !== filters.city) return false;
    if (filters.manufacturer !== 'All' && device.manufacturer !== filters.manufacturer) return false;
    if (filters.deviceType !== 'All' && device.deviceType !== filters.deviceType) return false;
    if (filters.subnet !== 'All' && device.subnet !== filters.subnet) return false;
    return true;
  });
};

// Utility function to calculate average metrics from filtered devices
export const calculateMetrics = (filteredDevices) => {
  const avgQuality = filteredDevices.reduce((sum, d) => sum + d.qualityScore, 0) / filteredDevices.length || 0;
  const avgPoorCall = filteredDevices.reduce((sum, d) => sum + d.poorCallPct, 0) / filteredDevices.length || 0;
  const totalCalls = filteredDevices.reduce((sum, d) => sum + d.totalCalls, 0);
  const devicesWithIssues = filteredDevices.filter(d => d.qualityScore < 80).length;

  return {
    avgQuality: Math.round(avgQuality * 10) / 10,
    avgPoorCall: Math.round(avgPoorCall * 10) / 10,
    totalDevices: filteredDevices.length,
    totalCalls,
    devicesWithIssues
  };
};

// Utility function to group data by a specific key
export const groupBy = (data, key) => {
  return data.reduce((acc, item) => {
    const groupKey = item[key];
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {});
};