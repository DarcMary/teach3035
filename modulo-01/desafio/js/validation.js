import { VALIDATION, SELECTORS } from './constants.js';

const getFieldRoot = (form, fieldId) => {
  const input = form.elements[fieldId];
  return { input, wrapper: input?.closest(SELECTORS.INPUT_WRAPPER) };
};

const markError = (form, fieldId, message) => {
  const { input, wrapper } = getFieldRoot(form, fieldId);
  if (!wrapper || wrapper.classList.contains('error')) return;

  const errorId = `${fieldId}-error`;

  wrapper.classList.add('error');
  wrapper.setAttribute('aria-invalid', 'true');
  input?.setAttribute('aria-describedby', errorId);

  const span = document.createElement('span');
  span.id          = errorId;
  span.className   = 'error-message';
  span.textContent = message;
  span.setAttribute('role', 'alert');
  wrapper.after(span);
};

const clearErrors = (form) => {
  form.querySelectorAll(SELECTORS.ERROR_MESSAGE).forEach((el) => el.remove());
  form.querySelectorAll(`${SELECTORS.INPUT_WRAPPER}.error`).forEach((wrapper) => {
    wrapper.classList.remove('error');
    wrapper.removeAttribute('aria-invalid');
    wrapper.querySelector('input, select')?.removeAttribute('aria-describedby');
  });
};

const isDateInPast = (value) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(`${value}T12:00:00`) < today;
};

const RULES = [
  { field: 'tutorName',    test: (v) => v.trim().length >= VALIDATION.TUTOR_NAME_MIN,         message: VALIDATION.MESSAGES.tutorName    },
  { field: 'tutorPhone',   test: (v) => v.trim().length >= VALIDATION.PHONE_FORMATTED_LENGTH,  message: VALIDATION.MESSAGES.tutorPhone   },
  { field: 'tutorAddress', test: (v) => v.trim().length >= VALIDATION.TUTOR_ADDRESS_MIN,       message: VALIDATION.MESSAGES.tutorAddress },
  { field: 'serviceDate',  test: (v) => Boolean(v),                                            message: VALIDATION.MESSAGES.serviceDate  },
  { field: 'serviceDate',  test: (v) => !isDateInPast(v), condition: (v) => Boolean(v),        message: VALIDATION.MESSAGES.servicePast  },
  { field: 'petName',      test: (v) => v.trim().length >= VALIDATION.PET_NAME_MIN,            message: VALIDATION.MESSAGES.petName      },
  { field: 'petAge',       test: (v) => v.trim().length > 0,                                   message: VALIDATION.MESSAGES.petAge       },
  { field: 'petSize',      test: (v) => v.length > 0,                                          message: VALIDATION.MESSAGES.petSize      },
];

export const validateForm = (form) => {
  clearErrors(form);

  const errors = RULES.reduce((acc, { field, test, condition, message }) => {
    const value = form.elements[field]?.value ?? '';
    if ((!condition || condition(value)) && !test(value)) {
      acc.push({ field, message });
    }
    return acc;
  }, []);

  errors.forEach(({ field, message }) => markError(form, field, message));
  return errors.length === 0;
};
