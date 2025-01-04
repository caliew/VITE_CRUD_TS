// ==========================
// Error message formatters
//
// Formats frontend error messages from all API calls.
// ==========================

// ==================
// COMMON
// ==================
export const PAYLOAD_UNDEFINED_ERROR_MESSAGE = `Response payload was found to be undefined`;

export const PAYLOAD_NULL_ERROR_MESSAGE = `Response payload was found to be null`;

export const SERVICE_UNAVAILABLE_ERROR_MESSAGE =
  'We are experiencing connectivity issues due to unexpected errors. Please try again later.';

export const TRY_AGAIN_ERROR_MESSAGE = 'Please try again later.';

export const NO_INTERNET_ERROR_MESSAGE = `We are experiencing connectivity issues.`;

export const GENERIC_ERROR_MESSAGE = `An error occurred while processing your request. Please try again after sometime.`;

// =============================
// API-specific for Health Profiles
// =============================

// =============================
// API-specific for Home Page
// =============================

// =============================
// API-specific for HealthierSG
// =============================
export const OPTOUT_ERROR_MESSAGE = `We are experiencing some technical issues. Please contact us at <a href='tel:18002254482'>1800 225 4482</a> or <a href='mailto:contact_us@healthhub.sg'>contact_us@healthhub.sg</a> for further assistance.`;

// =============================
// API-specific for PAYMENTS
// =============================

export const GET_DUPLICATE_BILLS_ERROR_MESSAGE = `This bill is already on your list.(PAY0015)`;

// Appointment
export const CANCEL_APPOINTMENT_ERROR_MESSAGE = 'An error occurred while cancel appointment';
export const EXISTING_NSC_APPOINTMENT_ERROR_MESSAGE =
  'You may have an existing appointment or unscheduled follow up appointment, please manage your appointment in one of the following tabs: <span class="font-semibold">Upcoming, Open </span>';
