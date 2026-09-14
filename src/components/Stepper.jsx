const STEPS = ["Informacion", "Documentos", "Confirmacion"];

export default function Stepper({ current }) {
  return (
    <div className="stepper">
      {STEPS.map((s, i) => (
        <div key={s} style={{ display: "flex", alignItems: "center" }}>
          <div className="step">
            <div
              className={`step-circle ${i < current ? "done" : i === current ? "active" : ""}`}
            >
              {i < current ? "\u2713" : i + 1}
            </div>
            <span
              className={`step-label ${i < current ? "done" : i === current ? "active" : ""}`}
            >
              {s}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`step-line ${i < current ? "done" : ""}`} />
          )}
        </div>
      ))}
    </div>
  );
}
