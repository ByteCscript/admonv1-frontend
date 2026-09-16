import { useState } from "react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";

import { RESIDENT } from "../../../../constants";
import {
    Loading,
    ErrorMessage,
} from "../../../../components/UI";

import useConvocation from "../../../convocations/presentation/hooks/useConvocation";
import useCreateApplication from "../hooks/useCreateApplication";
import useDocumentUpload from "../hooks/useDocumentUpload";

import ApplicationStepper from "../components/ApplicationStepper";
import ResidentInfo from "../components/ResidentInfo";
import ConvocationInfo from "../components/ConvocationInfo";
import DocumentUpload from "../components/DocumentUpload";
import ApplicationSummary from "../components/ApplicationSummary";

export default function CreateApplicationPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Presentation State:
    // Controls the application workflow.
    const [step, setStep] = useState(0);
    const [result, setResult] = useState(null);

    // Feature Reuse:
    // Retrieves convocation through its own feature boundary.
    const {
        convocation,
        loading,
        error,
    } = useConvocation(id);

    // Use Case abstraction:
    // Exposes application creation to presentation.
    const {
        createApplication,
        submitting,
    } = useCreateApplication();

    // Presentation abstraction:
    // Encapsulates document upload lifecycle.
    const {
        files,
        uploadDocument,
        removeDocument,
        uploadedDocumentIds,
    } = useDocumentUpload();

    if (loading) {
        return <Loading />;
    }

    if (error || !convocation) {
        return (
            <ErrorMessage>
                Convocatoria no encontrada.
            </ErrorMessage>
        );
    }

    const canSubmit =
        uploadedDocumentIds.length > 0;

    const handleSubmit = async () => {
        try {
            const application =
                await createApplication({
                    convocationId: Number(id),
                    residentId: RESIDENT.id,
                    documentIds: uploadedDocumentIds,
                });

            setResult(application);
            setStep(2);
        } catch {
            // Error state is managed by the hook.
        }
    };

    if (step === 2 && result) {
        return (
            <ApplicationSummary
                result={result}
                convocation={convocation}
                files={files}
                onFinish={() => navigate("/")}
            />
        );
    }

    return (
        <div className="page">
            <ApplicationStepper current={step} />

            <div className="form-layout">
                <div className="form-card">
                    <h2>
                        Información de la Postulación
                    </h2>

                    <ResidentInfo resident={RESIDENT} />

                    <ConvocationInfo
                        convocation={convocation}
                    />

                    {step === 0 && (
                        <div
                            className="form-actions"
                            style={{ marginTop: 24 }}
                        >
                            <button
                                className="btn btn-primary"
                                onClick={() => setStep(1)}
                            >
                                Continuar
                            </button>
                        </div>
                    )}

                    {step === 1 && (
                        <div
                            className="form-actions"
                            style={{ marginTop: 24 }}
                        >
                            <button
                                className="btn btn-secondary"
                                onClick={() => setStep(0)}
                            >
                                Atrás
                            </button>

                            <button
                                className="btn btn-primary"
                                disabled={
                                    !canSubmit || submitting
                                }
                                onClick={handleSubmit}
                            >
                                {submitting
                                    ? "Enviando..."
                                    : "Confirmar y Enviar"}
                            </button>
                        </div>
                    )}
                </div>

                {step === 1 && (
                    <DocumentUpload
                        files={files}
                        onUpload={uploadDocument}
                        onRemove={removeDocument}
                    />
                )}
            </div>
        </div>
    );
}