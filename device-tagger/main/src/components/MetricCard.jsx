import React from 'react';

const MetricCard = ({ title, value, description }) => {
  return (
    <div className="card">
      <div className="muted">{title}</div>
      <div className="metric">{value}</div>
      <div className="muted">{description}</div>
    </div>
  );
};

export default MetricCard;