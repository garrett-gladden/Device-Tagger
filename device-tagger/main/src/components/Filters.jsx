import React from 'react';

const Filters = ({ filters, setFilters, countries, manufacturers, deviceTypes }) => {
  return (
    <section className="card">
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <div>
          <label className="muted">Country</label><br />
          <select value={filters.country} onChange={e => setFilters({ ...filters, country: e.target.value })}>
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="muted">Manufacturer</label><br />
          <select value={filters.manufacturer} onChange={e => setFilters({ ...filters, manufacturer: e.target.value })}>
            {manufacturers.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className="muted">Device Type</label><br />
          <select value={filters.deviceType} onChange={e => setFilters({ ...filters, deviceType: e.target.value })}>
            {deviceTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>
    </section>
  );
};

export default Filters;