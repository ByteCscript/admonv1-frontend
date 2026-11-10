// Domain rules of a convocation for the resident views.
// The backend derives `status` from the dates and the manual close (RN-25),
// so it is the only source for whether a convocation is open.
const STATUS_VIEWS = {
  OPEN: { label: "Abierta", badgeClass: "badge-open" },
  SCHEDULED: { label: "Programada", badgeClass: "badge-soon" },
  CLOSED: { label: "Cerrada", badgeClass: "badge-closed" },
};

export function isConvocationOpen(convocation) {
  return convocation.status === "OPEN";
}

export function convocationStatusView(convocation) {
  return STATUS_VIEWS[convocation.status] ?? STATUS_VIEWS.CLOSED;
}

// A drawn convocation stays reachable so residents can see its results.
export function canViewConvocationDetails(convocation) {
  return convocation.status !== "CLOSED" || Boolean(convocation.drawExecuted);
}
