import PasswordStrengthColors from "../constants/PasswordStrengthColors";

export function getPasswordStrength(password) {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1)
    return { label: "Weak", score, color: PasswordStrengthColors.Weak };

  if (score <= 3)
    return { label: "Medium", score, color: PasswordStrengthColors.Medium };

  return { label: "Strong", score, color: PasswordStrengthColors.Strong };
}
