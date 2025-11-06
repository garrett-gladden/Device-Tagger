const { useState, useMemo } = React;

// Keep color palette consistent with original
const colors = {
  primary: '#00A3E0',
  text: '#E2E8F0',
  muted: '#94A3B8',
  bg: '#0A0E1A',
  card: '#151B2D'
};

// Minimal data generator (ported from your JSX)
function generateMockData(){
  const countries = ['USA','UK','Germany','France','Australia','Canada','Japan','Singapore'];
  const cities = {
    'USA':['New York','San Francisco','Chicago','Austin','Seattle'],
    'UK':['London','Manchester','Edinburgh'],
    'Germany':['Berlin','Munich','Frankfurt'],
    'France':['Paris','Lyon','Marseille'],
    'Australia':['Sydney','Melbourne','Brisbane'],
    'Canada':['Toronto','Vancouver','Montreal'],
    'Japan':['Tokyo','Osaka','Nagoya'],
    'Singapore':['Singapore']
  };
  const manufacturers=['Microsoft','Logitech','Poly','Crestron','Yealink'];
  const deviceTypes=['Teams Room Standard','Teams Room Premium','Teams Display','Teams Phone'];
  const data=[]; let id=1000;
  countries.forEach(c=>{
    cities[c].forEach(city=>{
      const n = Math.floor(Math.random()*10)+3;
      for(let i=0;i<n;i++){
        const m = manufacturers[Math.floor(Math.random()*manufacturers.length)];
        const t = deviceTypes[Math.floor(Math.random()*deviceTypes.length)];
        const base = 75 + Math.random()*20 + (m==='Microsoft'?3:0) + (t.includes('Premium')?3:0);
        const q = Math.round(Math.min(100, base + (Math.random()-0.5)*10)*10)/10;
        const poor = Math.round(Math.max(0, 100 - q + (Math.random()-0.5)*8)*10)/10;
        data.push({
          deviceId: 'DEV-'+(id++),
          country: c, city, manufacturer: m, deviceType: t,
          qualityScore: q, poorCallPct: poor,
          avgLatency: Math.round((15 + (100-q)*0.6 + Math.random()*20)*10)/10,
          packetLoss: Math.round(Math.random()*2*100)/100,
          subnet: `10.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.0/24`,
          totalCalls: Math.floor(Math.random()*400)+50
        });
      }
    })
  });
  return data;
}

function Dashboard(){
  const [devices] = useState(generateMockData());
  const [filters, setFilters] = useState({country:'All',manufacturer:'All',deviceType:'All'});
  const countries = ['All', ...Array.from(new Set(devices.map(d=>d.country)))];
  const manufacturers = ['All', ...Array.from(new Set(devices.map(d=>d.manufacturer)))];
  const deviceTypes = ['All', ...Array.from(new Set(devices.map(d=>d.deviceType)))];

  const filtered = useMemo(()=>devices.filter(d=>{
    if(filters.country!=='All' && d.country!==filters.country) return false;
    if(filters.manufacturer!=='All' && d.manufacturer!==filters.manufacturer) return false;
    if(filters.deviceType!=='All' && d.deviceType!==filters.deviceType) return false;
    return true;
  }),[devices,filters]);

  const metrics = useMemo(()=>{
    const avgQuality = Math.round((filtered.reduce((s,d)=>s+d.qualityScore,0)/Math.max(1,filtered.length))*10)/10;
    const avgPoor = Math.round((filtered.reduce((s,d)=>s+d.poorCallPct,0)/Math.max(1,filtered.length))*10)/10;
    return { avgQuality, avgPoor, totalDevices: filtered.length, totalCalls: filtered.reduce((s,d)=>s+d.totalCalls,0) };
  },[filtered]);

  return (
    <div>
      <header style={{marginBottom:12}}>
        <h1>Teams Room Device Performance</h1>
        <div className="muted">Lightweight static demo converted from JSX — charts removed for standalone publish</div>
      </header>

      <section className="card">
        <div style={{display:'flex',gap:12,flexWrap:'wrap',alignItems:'center'}}>
          <div>
            <label className="muted">Country</label><br />
            <select value={filters.country} onChange={e=>setFilters({...filters,country:e.target.value})}>
              {countries.map(c=> <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="muted">Manufacturer</label><br />
            <select value={filters.manufacturer} onChange={e=>setFilters({...filters,manufacturer:e.target.value})}>
              {manufacturers.map(m=> <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="muted">Device Type</label><br />
            <select value={filters.deviceType} onChange={e=>setFilters({...filters,deviceType:e.target.value})}>
              {deviceTypes.map(t=> <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </section>

      <section className="grid cols-4" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
        <div className="card">
          <div className="muted">Average Quality</div>
          <div className="metric">{metrics.avgQuality}</div>
          <div className="muted">{metrics.totalDevices} devices</div>
        </div>
        <div className="card">
          <div className="muted">Avg Poor Call %</div>
          <div className="metric">{metrics.avgPoor}%</div>
          <div className="muted">{metrics.totalCalls} calls</div>
        </div>
        <div className="card">
          <div className="muted">Top Manufacturers</div>
          <ul style={{margin:0,paddingLeft:16}}>
            {Array.from(new Set(filtered.map(d=>d.manufacturer))).slice(0,4).map(m=> <li key={m}>{m}</li>)}
          </ul>
        </div>
        <div className="card">
          <div className="muted">Top Cities</div>
          <ul style={{margin:0,paddingLeft:16}}>
            {Array.from(new Set(filtered.map(d=>d.city))).slice(0,6).map(c=> <li key={c}>{c}</li>)}
          </ul>
        </div>
      </section>

      <section className="card">
        <h3 style={{marginTop:0}}>Devices</h3>
        <div style={{overflowX:'auto'}}>
          <table>
            <thead>
              <tr><th>Device</th><th>Location</th><th>Manufacturer</th><th>Type</th><th>Quality</th><th>Poor %</th></tr>
            </thead>
            <tbody>
              {filtered.slice(0,200).map(d=>(
                <tr key={d.deviceId}>
                  <td>{d.deviceId}</td>
                  <td>{d.city}, {d.country}</td>
                  <td>{d.manufacturer}</td>
                  <td>{d.deviceType}</td>
                  <td>{d.qualityScore}</td>
                  <td>{d.poorCallPct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="muted" style={{marginTop:12}}>Static preview generated from your JSX data logic.</footer>
    </div>
  );
}

export default Dashboard;