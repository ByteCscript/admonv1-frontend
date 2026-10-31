import { useState } from "react";

const EMPTY_VALUES = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  availableSlots: "",
};

function toPayload(values) {
  return {
    title: values.title.trim(),
    description: values.description,
    startDate: values.startDate,
    endDate: values.endDate,
    availableSlots: Number(values.availableSlots),
  };
}

function validate(values) {
  if (!values.title.trim()) {
    return "El título es obligatorio.";
  }

  if (!values.startDate || !values.endDate) {
    return "Las fechas de inicio y fin son obligatorias.";
  }

  if (values.startDate > values.endDate) {
    return "La fecha de inicio no puede ser posterior a la fecha de fin.";
  }

  if (!values.availableSlots || Number(values.availableSlots) < 1) {
    return "Los cupos disponibles deben ser al menos 1.";
  }

  return null;
}

// Presentational Component:
// Shared create/edit form for calls (RN-07 is validated by the backend,
// this is just a friendly first pass).
export default function CallForm({
  initialValues,
  submitLabel = "Guardar",
  onSubmit,
  onCancel,
  loading = false,
  error = null,
}) {
  const [values, setValues] = useState({
    ...EMPTY_VALUES,
    ...(initialValues || {}),
  });

  const [localError, setLocalError] = useState(null);

  const handleChange = (field) => (event) => {
    setValues((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validate(values);

    setLocalError(validationError);

    if (validationError) {
      return;
    }

    await onSubmit(toPayload(values));
  };

  return (
    <form className="form-card admin-call-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="call-title">Título</label>

        <input
          id="call-title"
          type="text"
          value={values.title}
          onChange={handleChange("title")}
          placeholder="Convocatoria Parqueadero Comunal"
          data-testid="admin-call-form-title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="call-description">Descripción</label>

        <textarea
          id="call-description"
          value={values.description}
          onChange={handleChange("description")}
          placeholder="Descripción de la convocatoria"
          data-testid="admin-call-form-description"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="call-start">Fecha de inicio</label>

          <input
            id="call-start"
            type="date"
            value={values.startDate}
            onChange={handleChange("startDate")}
            data-testid="admin-call-form-start"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="call-end">Fecha de fin</label>

          <input
            id="call-end"
            type="date"
            value={values.endDate}
            onChange={handleChange("endDate")}
            data-testid="admin-call-form-end"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="call-slots">Cupos disponibles</label>

        <input
          id="call-slots"
          type="number"
          min="1"
          value={values.availableSlots}
          onChange={handleChange("availableSlots")}
          placeholder="200"
          data-testid="admin-call-form-slots"
          required
        />
      </div>

      {(localError || error) && (
        <div className="error-msg" data-testid="admin-call-form-error">
          {localError || error}
        </div>
      )}

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          data-testid="admin-call-form-submit"
          disabled={loading}
        >
          {loading ? "Guardando..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
