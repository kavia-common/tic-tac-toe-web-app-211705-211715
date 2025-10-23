 /**
  * PUBLIC_INTERFACE
  * auditLog: Lightweight client-side audit trail stub for GxP traceability.
  * - Attributable: userId
  * - Contemporaneous: ISO8601 timestamp
  * - Accurate/Complete: includes action and details
  * Note: In a production app, forward to backend or secure storage.
  */
export function auditLog({ userId = 'anonymous', action, details = {} }) {
  if (!action || typeof action !== 'string') {
    // Defensive: avoid throwing in logger, but surface in console for developers.
    console.warn('auditLog called without valid action string');
    return;
  }
  const entry = {
    userId,
    action,
    details,
    timestamp: new Date().toISOString(),
    version: '1.0',
  };
  try {
    // For demo: console output. Replace with network call if needed.
    // eslint-disable-next-line no-console
    console.info('[AUDIT]', entry);
  } catch {
    // Swallow errors to prevent logging from impacting UX.
  }
  return entry;
}
