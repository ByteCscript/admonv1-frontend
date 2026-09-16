import Stepper from "../../../../components/Stepper";

// Adapter Pattern:
// Adapts the legacy stepper to the Applications feature.
export default function ApplicationStepper({ current }) {
    return <Stepper current={current} />;
}