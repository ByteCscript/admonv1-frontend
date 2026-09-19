import { useId } from "react";

// Presentational Component Pattern:
// Displays contextual help text on hover or keyboard focus.
//
// Single Responsibility Principle:
// Responsible only for tooltip visualization, no business logic.
export default function Tooltip({ text, position = "top" }) {
  const id = useId();

  return (
    <span className="tooltip">
      <button
        type="button"
        className="tooltip-trigger"
        aria-describedby={id}
        aria-label="Más información"
      >
        i
      </button>

      <span
        id={id}
        role="tooltip"
        className={`tooltip-content tooltip-${position}`}
      >
        {text}
      </span>
    </span>
  );
}
