// Presentational Component Pattern:
// Renders resident information without external dependencies.
//
// Single Responsibility Principle:
// Responsible only for resident data visualization.
export default function ResidentInfo({ resident }) {
    return (
        <div className="resident-box">
            <div className="resident-box-title">
                DATOS DEL RESIDENTE
            </div>

            <div className="resident-grid">
                <div>
                    <div className="resident-field-label">
                        Nombre Completo
                    </div>

                    <div className="resident-field-value">
                        {resident.name}
                    </div>
                </div>

                <div>
                    <div className="resident-field-label">
                        Apartamento / Torre
                    </div>

                    <div className="resident-field-value">
                        {resident.apartment}
                    </div>
                </div>

                <div>
                    <div className="resident-field-label">
                        Estado Cuenta
                    </div>

                    <div className="resident-field-value green">
                        {resident.status}
                    </div>
                </div>
            </div>
        </div>
    );
}