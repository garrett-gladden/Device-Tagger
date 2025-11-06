const { useState, useMemo } = require('react');

function generateMockData() {
  const countries = ['USA', 'UK', 'Germany', 'France', 'Australia', 'Canada', 'Japan', 'Singapore'];
  const cities = {
    'USA': ['New York', 'San Francisco', 'Chicago', 'Austin', 'Seattle'],
    'UK': ['London', 'Manchester', 'Edinburgh'],
    'Germany': ['Berlin', 'Munich', 'Frankfurt'],
    'France': ['Paris', 'Lyon', 'Marseille'],
    'Australia': ['Sydney', 'Melbourne', 'Brisbane'],
    'Canada': ['Toronto', 'Vancouver', 'Montreal'],
    'Japan': ['Tokyo', 'Osaka', 'Nagoya'],
    'Singapore': ['Singapore']
  };
  const manufacturers = ['Microsoft', 'Logitech', 'Poly', 'Crestron', 'Yealink'];
  const deviceTypes = ['Teams Room Standard', 'Teams Room Premium', 'Teams Display', 'Teams Phone'];
  const data = [];
  let id = 1000;

  countries.forEach(c => {
    cities[c].forEach(city => {
      const n = Math.floor(Math.random() * 10) + 3;
      for (let i = 0; i < n; i++) {
        const m = manufacturers[Math.floor(Math.random() * manufacturers.length)];
        const t = deviceTypes[Math.floor(Math.random() * deviceTypes.length)];
        const base = 75 + Math.random() * 20 + (m === 'Microsoft' ? 3 : 0) + (t.includes('Premium') ? 3 : 0);
        const q = Math.round(Math.min(100, base + (Math.random() - 0.5) * 10) * 10) / 10;
        const poor = Math.round(Math.max(0, 100 - q + (Math.random() - 0.5) * 8) * 10) / 10;
        data.push({
          deviceId: 'DEV-' + (id++),
          country: c,
          city,
          manufacturer: m,
          deviceType: t,
          qualityScore: q,
          poorCallPct: poor,
          avgLatency: Math.round((15 + (100 - q) * 0.6 + Math.random() * 20) * 10) / 10,
          packetLoss: Math.round(Math.random() * 2 * 100) / 100,
          subnet: `10.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.0/24`,
          totalCalls: Math.floor(Math.random() * 400) + 50
        });
      }
    });
  });
  return data;
}

function useMockData() {
  const [devices] = useState(generateMockData());
  return devices;
}

module.exports = useMockData;