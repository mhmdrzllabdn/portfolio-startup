export interface ValidationError {
  field: string;
  message: string;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function validateContactForm(data: {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.name || typeof data.name !== "string" || data.name.trim().length < 2) {
    errors.name = "Name is required and must be at least 2 characters.";
  } else if (data.name.trim().length > 120) {
    errors.name = "Name must not exceed 120 characters.";
  }

  if (!data.email || typeof data.email !== "string" || !validateEmail(data.email)) {
    errors.email = "Please enter a valid email address.";
  } else if (data.email.trim().length > 255) {
    errors.email = "Email address must not exceed 255 characters.";
  }

  if (!data.subject || typeof data.subject !== "string" || data.subject.trim().length < 3) {
    errors.subject = "Subject or project scope is required (min 3 characters).";
  } else if (data.subject.trim().length > 200) {
    errors.subject = "Subject must not exceed 200 characters.";
  }

  if (!data.message || typeof data.message !== "string" || data.message.trim().length < 10) {
    errors.message = "Message is required and must be at least 10 characters.";
  } else if (data.message.trim().length > 3000) {
    errors.message = "Message must not exceed 3000 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
