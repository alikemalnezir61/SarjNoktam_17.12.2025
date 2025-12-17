export const validatePassword = (pw: string) => {
  const p = pw || '';
  const rules = {
    min8: p.length >= 8,
    upper: /[A-Z]/.test(p),
    lower: /[a-z]/.test(p),
    digit: /\d/.test(p),
  };

  const ok = rules.min8 && rules.upper && rules.lower && rules.digit;

  return { ok, rules };
};
