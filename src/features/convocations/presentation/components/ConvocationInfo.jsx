import Tooltip from "../../../../components/Tooltip";

// Presentational Component Pattern:
// Renders convocation information without infrastructure dependencies.
//
// Single Responsibility Principle:
// Responsible only for convocation detail visualization.
export default function ConvocationInfo({
    convocation,
}) {
    const isOpen = convocation.availableSlots > 0;

    return (
        <>
            <span
                className={`badge ${isOpen ? "badge-open" : "badge-closed"
                    }`}
            >
                {isOpen ? "Abierta" : "Cerrada"}
            </span>

            <h1
                style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: "var(--gray-900)",
                    marginTop: 12,
                }}
            >
                {convocation.title}
            </h1>

            <h2>Información de la Convocatoria</h2>

            <div className="spec-grid">
                <div className="spec-item">
                    <div className="spec-label">
                        Cupos Disponibles
                        <Tooltip text="Número de espacios que aún pueden ser asignados en esta convocatoria." />
                    </div>

                    <div className="spec-value">
                        {convocation.availableSlots}
                    </div>
                </div>

                <div className="spec-item">
                    <div className="spec-label">
                        Estado
                        <Tooltip text="Una convocatoria abierta acepta nuevas postulaciones; al agotarse los cupos pasa a cerrada y no se reciben más postulaciones." />
                    </div>

                    <div className="spec-value">
                        {isOpen ? "Abierta" : "Cerrada"}
                    </div>
                </div>
            </div>
        </>
    );
}