import { useNavigate } from "react-router-dom";
import ConvocationCard from "../components/ConvocationCard";
import useConvocations from "../hooks/useConvocations";
import { Loading, ErrorMessage } from "../../../../components/UI";

export default function ConvocationsPage() {
    // Controller responsibility:
    // Coordinates the interaction between the view and navigation.
    const navigate = useNavigate();

    // Presentation abstraction:
    // Consumes the state prepared by the hook.
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