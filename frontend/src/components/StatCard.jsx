import React from "react";

/**
 * StatCard — reusable summary metric card used on the Dashboard.
 *
 * Props:
 *   icon        {string}  Material Symbol icon name
 *   iconColor   {string}  Tailwind text color class  e.g. "text-primary"
 *   iconBg      {string}  Tailwind bg color class     e.g. "bg-primary-container/20"
 *   label       {string}  Metric label
 *   value       {string}  Metric value
 *   badge       {string}  Badge text  e.g. "12%"
 *   badgeIcon   {string|null} Material Symbol for badge e.g. "trending_up"
 *   badgeColor  {string}  Tailwind classes for badge styling
 */
const StatCard = ({
  icon,
  iconColor = "text-primary",
  iconBg = "bg-primary-container/20",
  label,
  value,
  badge,
  badgeIcon = null,
  badgeColor = "text-outline bg-surface-container-high",
}) => {
  return (
    <div className="bg-surface-container p-5 rounded-xl border border-outline-muted shadow-sm flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <div className={`p-2 ${iconBg} rounded-lg`}>
          <span
            className={`material-symbols-outlined ${iconColor}`}
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {icon}
          </span>
        </div>
        {badge && (
          <span
            className={`${badgeColor} flex items-center gap-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full border`}
          >
            {badgeIcon && (
              <span className="material-symbols-outlined text-[14px]">
                {badgeIcon}
              </span>
            )}
            {badge}
          </span>
        )}
      </div>
      <div>
        <p className="text-outline uppercase text-[11px] tracking-wider font-semibold">
          {label}
        </p>
        <h3 className="text-[32px] text-on-surface font-bold leading-tight">
          {value}
        </h3>
      </div>
    </div>
  );
};

export default StatCard;
