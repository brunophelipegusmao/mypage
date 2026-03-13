export const minimumOwnerPasswordLength = 12;

export const normalizeOwnerEmail = (email: string) => email.trim().toLowerCase();

export const assertOwnerEmail = (email: string) => {
  const normalizedEmail = normalizeOwnerEmail(email);

  if (!normalizedEmail) {
    throw new Error("ADMIN_EMAIL is required.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    throw new Error("ADMIN_EMAIL must be a valid email address.");
  }

  return normalizedEmail;
};

export const assertOwnerPassword = (password: string) => {
  if (!password) {
    throw new Error("ADMIN_PASSWORD is required.");
  }

  if (password.length < minimumOwnerPasswordLength) {
    throw new Error(
      `ADMIN_PASSWORD must contain at least ${minimumOwnerPasswordLength} characters.`,
    );
  }

  return password;
};

export const resolveOwnerDisplayName = (name: string | null | undefined, email: string) => {
  const trimmedName = name?.trim();

  return trimmedName || email;
};
