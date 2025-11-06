import React from 'react';

const Filters = ({ filters, setFilters, filterOptions }) => {
  return (
    <div className="rounded-lg p-6 mb-6" style={{ backgroundColor: '#151B2D', borderColor: '#2D3748' }}>
      <h2 className="text-lg font-semibold mb-4" style={{ color: '#E2E8F0' }}>Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#94A3B8' }}>Country</label>
          <select
            value={filters.country}
            onChange={(e) => setFilters({ ...filters, country: e.target.value, city: 'All' })}
            className="w-full px-3 py-2 rounded-lg border text-sm"
            style={{ backgroundColor: '#0A0E1A', borderColor: '#2D3748', color: '#E2E8F0' }}
          >
            {filterOptions.countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#94A3B8' }}>City</label>
          <select
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border text-sm"
            style={{ backgroundColor: '#0A0E1A', borderColor: '#2D3748', color: '#E2E8F0' }}
          >
            {filterOptions.cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#94A3B8' }}>Manufacturer</label>
          <select
            value={filters.manufacturer}
            onChange={(e) => setFilters({ ...filters, manufacturer: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border text-sm"
            style={{ backgroundColor: '#0A0E1A', borderColor: '#2D3748', color: '#E2E8F0' }}
          >
            {filterOptions.manufacturers.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#94A3B8' }}>Device Type</label>
          <select
            value={filters.deviceType}
            onChange={(e) => setFilters({ ...filters, deviceType: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border text-sm"
            style={{ backgroundColor: '#0A0E1A', borderColor: '#2D3748', color: '#E2E8F0' }}
          >
            {filterOptions.deviceTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#94A3B8' }}>Subnet</label>
          <select
            value={filters.subnet}
            onChange={(e) => setFilters({ ...filters, subnet: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border text-sm"
            style={{ backgroundColor: '#0A0E1A', borderColor: '#2D3748', color: '#E2E8F0' }}
          >
            {filterOptions.subnets.slice(0, 20).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;