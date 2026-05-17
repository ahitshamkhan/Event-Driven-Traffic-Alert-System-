import React, { useState } from "react";

/**
 * Event type config — icon, colors, hover border, severity badge styles
 */
const EVENT_CONFIG = {
  "Speed Violation": {
    icon: "speed",
    iconBg: "bg-error-container text-error-red",
    hoverBorder: "hover:border-error",
    severityColor: "bg-error/10 text-error-red border-error/30",
  },
  "Vehicle Detected": {
    icon: "directions_car",
    iconBg: "bg-primary/10 text-primary",
    hoverBorder: "hover:border-primary",
    severityColor: "bg-primary/10 text-primary border-primary/30",
  },
  "Congestion Alert": {
    icon: "warning",
    iconBg: "bg-tertiary-container/20 text-tertiary",
    hoverBorder: "hover:border-tertiary",
    severityColor: "bg-tertiary/10 text-tertiary-fixed-dim border-tertiary/30",
  },
  "Traffic Cleared": {
    icon: "check_circle",
    iconBg: "bg-success-green/10 text-success-green",
    hoverBorder: "hover:border-success-green",
    severityColor: "bg-success-green/10 text-success-green border-success-green/30",
  },
};

const DEFAULT_CONFIG = {
  icon: "info",
  iconBg: "bg-primary/10 text-primary",
  hoverBorder: "hover:border-primary",
  severityColor: "bg-primary/10 text-primary border-primary/30",
};

/**
 * EventCard — displays a single live feed event card.
 *
 * Props:
 *   type        {string}  Event type  e.g. "Speed Violation"
 *   severity    {string}  Severity label  e.g. "High Severity"
 *   camera      {string}  Camera ID  e.g. "CAM-001"
 *   location    {string}  Location name
 *   time        {string}  Time string  e.g. "14:05:22"
 *   details     {Array}   [{ label, value, mono, color }]
 *   envelope    {string|null}  JSON string to show in expandable section
 */
const EventCard = ({
  type,
  severity,
  camera,
  location,
  time,
  details = [],
  envelope = null,
}) => {
  const [open, setOpen] = useState(false);
  const config = EVENT_CONFIG[type] || DEFAULT_CONFIG;

  return (
    <div
      className={`bg-surface-container border border-outline-variant rounded-xl p-5 shadow-sm ${config.hoverBorder} transition-all`}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-xl ${config.iconBg} flex items-center justify-center flex-shrink-0`}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {config.icon}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            {/* Title + severity badge */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[14px] font-semibold text-on-surface text-lg">
                {type}
              </span>
              <span
                className={`px-3 py-0.5 rounded-full ${config.severityColor} text-[10px] uppercase font-semibold border`}
              >
                {severity}
              </span>
            </div>

            {/* Meta info */}
            <div className="flex items-center gap-4 text-on-surface-variant text-[14px] flex-wrap">
              <span className="flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-[18px]">videocam</span>
                {camera}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">location_on</span>
                {location}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
                {time}
              </span>
            </div>

            {/* Detail chips */}
            {details.length > 0 && (
              <div className="mt-3 p-3 bg-surface-container-low rounded-lg flex gap-8 flex-wrap">
                {details.map((d) => (
                  <div key={d.label}>
                    <span className="text-on-surface-variant text-[10px] uppercase tracking-wider block mb-1 font-semibold">
                      {d.label}
                    </span>
                    <span
                      className={`font-bold text-[14px] ${d.mono ? "font-mono" : ""} ${
                        d.color || "text-on-surface"
                      }`}
                    >
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* More options */}
        <button className="text-outline hover:text-on-surface transition-colors ml-2 flex-shrink-0">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </div>

      {/* Expandable envelope */}
      {envelope && (
        <div className="mt-4 pt-4 border-t border-outline-variant/30">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-2 text-on-surface-variant text-xs font-semibold hover:text-primary select-none"
          >
            <span className="material-symbols-outlined text-[14px]">terminal</span>
            EVENT_ENVELOPE.JSON
            <span
              className="material-symbols-outlined text-[16px] transition-transform"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              expand_more
            </span>
          </button>
          {open && (
            <div className="mt-2 p-3 bg-surface-container-lowest rounded-lg border border-outline-variant/20">
              <code className="text-primary text-[11px] font-mono block leading-relaxed">
                {envelope}
              </code>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventCard;
