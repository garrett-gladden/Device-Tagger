import React, { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { AlertCircle, TrendingDown, TrendingUp, MapPin, Network, Monitor } from 'lucide-react';
import { generateMockData, generateTimeSeriesData } from '../hooks/useMockData';
import Filters from './Filters';
import MetricCard from './MetricCard';

// Kollective color palette
const colors = {
  primary: '#00A3E0',
  secondary: '#0066A1',
  success: '#00C781',
  warning: '#FFB020',
  danger: '#FF4757',
  purple: '#9B59B6',
  teal: '#1ABC9C',
  bg: '#0A0E1A',
  bgCard: '#151B2D',
  bgHover: '#1F2937',
  border: '#2D3748',
  text: '#E2E8F0',
  textMuted: '#94A3B8'
};

const Dashboard = () => {
  const [devices] = useState(generateMockData());
  const [selectedView, setSelectedView] = useState('overview');
  
  // Filters
  const [filters, setFilters] = useState({
    country: 'All',
    city: 'All',
    manufacturer: 'All',
    deviceType: 'All',
    subnet: 'All'
  });

  // Get unique values for filters
  const filterOptions = useMemo(() => ({
    countries: ['All', ...new Set(devices.map(d => d.country))],
    cities: ['All', ...new Set(devices.filter(d => filters.country === 'All' || d.country === filters.country).map(d => d.city))],
    manufacturers: ['All', ...new Set(devices.map(d => d.manufacturer))],
    deviceTypes: ['All', ...new Set(devices.map(d => d.deviceType))],
    subnets: ['All', ...new Set(devices.map(d => d.subnet))]
  }), [devices, filters.country]);

  // Apply filters
  const filteredDevices = useMemo(() => {
    return devices.filter(device => {
      if (filters.country !== 'All' && device.country !== filters.country) return false;
      if (filters.city !== 'All' && device.city !== filters.city) return false;
      if (filters.manufacturer !== 'All' && device.manufacturer !== filters.manufacturer) return false;
      if (filters.deviceType !== 'All' && device.deviceType !== filters.deviceType) return false;
      if (filters.subnet !== 'All' && device.subnet !== filters.subnet) return false;
      return true;
    });
  }, [devices, filters]);

  // Calculate metrics
  const metrics = useMemo(() => {
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
  }, [filteredDevices]);

  // Aggregate data by various dimensions
  const dataByCountry = useMemo(() => {
    const grouped = {};
    filteredDevices.forEach(device => {
      if (!grouped[device.country]) {
        grouped[device.country] = { country: device.country, totalDevices: 0, avgQuality: 0, sumQuality: 0 };
      }
      grouped[device.country].totalDevices++;
      grouped[device.country].sumQuality += device.qualityScore;
    });
    return Object.values(grouped).map(g => ({
      ...g,
      avgQuality: Math.round((g.sumQuality / g.totalDevices) * 10) / 10
    })).sort((a, b) => b.avgQuality - a.avgQuality);
  }, [filteredDevices]);

  const dataByManufacturer = useMemo(() => {
    const grouped = {};
    filteredDevices.forEach(device => {
      if (!grouped[device.manufacturer]) {
        grouped[device.manufacturer] = { 
          manufacturer: device.manufacturer, 
          devices: 0, 
          avgQuality: 0, 
          sumQuality: 0,
          poorCallPct: 0,
          sumPoorCall: 0
        };
      }
      grouped[device.manufacturer].devices++;
      grouped[device.manufacturer].sumQuality += device.qualityScore;
      grouped[device.manufacturer].sumPoorCall += device.poorCallPct;
    });
    return Object.values(grouped).map(g => ({
      ...g,
      avgQuality: Math.round((g.sumQuality / g.devices) * 10) / 10,
      poorCallPct: Math.round((g.sumPoorCall / g.devices) * 10) / 10
    })).sort((a, b) => b.avgQuality - a.avgQuality);
  }, [filteredDevices]);

  const dataByDeviceType = useMemo(() => {
    const grouped = {};
    filteredDevices.forEach(device => {
      if (!grouped[device.deviceType]) {
        grouped[device.deviceType] = { 
          deviceType: device.deviceType, 
          count: 0,
          avgQuality: 0,
          sumQuality: 0
        };
      }
      grouped[device.deviceType].count++;
      grouped[device.deviceType].sumQuality += device.qualityScore;
    });
    return Object.values(grouped).map(g => ({
      ...g,
      avgQuality: Math.round((g.sumQuality / g.count) * 10) / 10
    }));
  }, [filteredDevices]);

  // Outlier detection
  const outliers = useMemo(() => {
    const avg = metrics.avgQuality;
    const stdDev = Math.sqrt(
      filteredDevices.reduce((sum, d) => sum + Math.pow(d.qualityScore - avg, 2), 0) / filteredDevices.length
    );
    return filteredDevices
      .filter(d => d.qualityScore < avg - 1.5 * stdDev)
      .sort((a, b) => a.qualityScore - b.qualityScore)
      .slice(0, 10);
  }, [filteredDevices, metrics.avgQuality]);

  const timeSeriesData = generateTimeSeriesData(filters);

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: colors.bg, color: colors.text }}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Teams Room Device Performance</h1>
        <p style={{ color: colors.textMuted }}>Real-time monitoring and analytics across your global deployment</p>
      </div>

      <Filters filters={filters} setFilters={setFilters} filterOptions={filterOptions} />

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {/* View Selector Buttons */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <MetricCard title="Average Quality Score" value={metrics.avgQuality} subtitle={`Across ${metrics.totalDevices} devices`} icon={Monitor} trend="up" trendValue="+2.3%" />
        <MetricCard title="Poor Call Percentage" value={`${metrics.avgPoorCall}%`} subtitle={`Of ${metrics.totalCalls.toLocaleString()} total calls`} icon={AlertCircle} trend="down" trendValue="-1.5%" />
        <MetricCard title="Devices with Issues" value={metrics.devicesWithIssues} subtitle="Quality score < 80" icon={AlertCircle} />
        <MetricCard title="Geographic Coverage" value={filterOptions.countries.length - 1} subtitle={`${filterOptions.cities.length - 1} cities monitored`} icon={MapPin} />
      </div>

      {/* Conditional Rendering for Views */}
    </div>
  );
};

export default Dashboard;