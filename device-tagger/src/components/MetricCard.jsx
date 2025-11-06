import React from 'react';
import { AlertCircle, TrendingDown, TrendingUp, Monitor } from 'lucide-react';

// Kollective color palette
const colors = {
  primary: '#00A3E0',
  success: '#00C781',
  danger: '#FF4757',
  text: '#E2E8F0',
  textMuted: '#94A3B8',
  bgCard: '#151B2D',
};

const MetricCard = ({ title, value, subtitle, icon: Icon, trend, trendValue }) => (
  <div className="rounded-lg p-6" style={{ backgroundColor: colors.bgCard, borderLeft: `4px solid ${colors.primary}` }}>
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium" style={{ color: colors.textMuted }}>{title}</p>
        <p className="text-3xl font-bold mt-2" style={{ color: colors.text }}>{value}</p>
        {subtitle && <p className="text-sm mt-1" style={{ color: colors.textMuted }}>{subtitle}</p>}
      </div>
      {Icon && (
        <div className="rounded-full p-3" style={{ backgroundColor: colors.bgCard }}>
          <Icon size={24} style={{ color: colors.primary }} />
        </div>
      )}
    </div>
    {trend && (
      <div className="flex items-center mt-3">
        {trend === 'up' ? (
          <TrendingUp size={16} style={{ color: colors.success }} />
        ) : (
          <TrendingDown size={16} style={{ color: colors.danger }} />
        )}
        <span className="text-sm ml-1" style={{ color: trend === 'up' ? colors.success : colors.danger }}>
          {trendValue}
        </span>
        <span className="text-sm ml-1" style={{ color: colors.textMuted }}>vs last week</span>
      </div>
    )}
  </div>
);

export default MetricCard;