import React from "react";

/**
 * Status badge config — maps status string to Tailwind classes
 */
const STATUS_STYLES = {
  Issued: "bg-primary/20 text-primary",
  Pending: "bg-secondary/20 text-secondary",
  Resolved: "bg-surface-container-highest text-outline",
};

/**
 * AlertCard — displays a single penalty alert row / card.
 *
 * Props:
 *   id          {string}  Alert ID  e.g. "#SPD-2024-001"
 *   plate       {string}  License plate
 *   type        {string}  Violation type
 *   speed       {string}  Detected speed  e.g. "104 km/h"
 *   limit       {string}  Speed limit  e.g. "80"
 *   location    {string}  Location name
 *   camera      {string}  Camera ID  e.g. "CAM-042"
 *   time        {string}  Time string  e.g. "14:23:02"
 *   status      {string}  "Issued" | "Pending" | "Resolved"
 *   danger      {boolean} If true, speed is shown in red
 *   onView      {Function} Callback when view button is clicked
 */
const AlertCard = ({
  id,
  plate,
  type,
  speed,
  limit,
  location,
  camera,
  time,
  status = "Issued",
  danger = false,
  onView,
}) => {
  const statusClass = STATUS_STYLES[status] || STATUS_STYLES.Issued;

  return (
    <tr className="hover:bg-surface-container-high transition-colors">
      {/* Alert ID */}
      <td className="px-6 py-4 text-[14px] text-primary font-bold">{id}</td>

      {/* Plate */}
      <td className="px-6 py-4 text-[14px] font-mono text-on-surface">
        <span className="bg-surface-variant px-2 py-1 rounded">{plate}</span>
      </td>

      {/* Violation Type */}
      <td className="px-6 py-4 text-[14px] text-on-surface">{type}</td>

      {/* Speed */}
      <td className={`px-6 py-4 text-[14px] ${danger ? "text-error-red" : "text-on-surface"}`}>
        {speed}{" "}
        {limit && (
          <span className="text-outline text-[11px]">(Limit {limit})</span>
        )}
      </td>

      {/* Location */}
      <td className="px-6 py-4 text-[14px] text-on-surface">{location}</td>

      {/* Camera */}
      <td className="px-6 py-4 text-[14px] text-outline">{camera}</td>

      {/* Time */}
      <td className="px-6 py-4 text-[14px] text-on-surface">{time}</td>

      {/* Status Badge */}
      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 rounded-full ${statusClass} text-[10px] uppercase font-bold`}
        >
          {status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-right">
        <button
          onClick={onView}
          className="material-symbols-outlined text-outline hover:text-primary transition-colors"
          aria-label={`View alert ${id}`}
        >
          visibility
        </button>
      </td>
    </tr>
  );
};

export default AlertCard;
