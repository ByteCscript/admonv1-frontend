import { useNavigate } from "react-router-dom";
import ConvocationCard from "../components/ConvocationCard";
import useConvocations from "../hooks/useConvocations";
import { Loading, ErrorMessage } from "../../../../components/UI";

export default function ConvocationsPage() {
    // Controller responsibility:
    // Coordina interacción de la vista y navegación.
    const navigate = useNavigate();

    // Presentation abstraction:
    // Consume el estado preparado por el hook.
    const {
        convocations,
        loading,
        error,
    } = useConvocations();

    if (loading) return <Loading />;

    if (error) {
        return <ErrorMessage>{error}</ErrorMessage>;
    }

    return (
        <div className="page">
            <div className="page-header">
                <div className="page-header-row">
                    <div>
                        <h1>Convocatorias Disponibles</h1>
                        <p>
                            Participe en los sorteos mensuales para el uso de áreas comunes.
                        </p>
                    </div>
                </div>
            </div>

            <div className="calls-grid">
                {convocations.map((convocation) => (
                    <ConvocationCard
                        key={convocation.id}
                        convocation={convocation}
                        onViewDetails={() =>
                            navigate(`/convocations/${convocation.id}`)
                        }
                    />
                ))}

                {convocations.length === 0 && (
                    <p
                        style={{
                            gridColumn: "1/-1",
                            textAlign: "center",
                            color: "var(--gray-500)",
                            padding: 40,
                        }}
                    >
                        No hay convocatorias disponibles.
                    </p>
                )}
            </div>
        </div>
    );
}