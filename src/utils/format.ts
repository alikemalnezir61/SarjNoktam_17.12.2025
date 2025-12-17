export const onlyDigits = (v: string) => v.replace(/\D/g, '');

export const formatTRPhone = (value: string) => {
  // 05551234567 => 0555 123 45 67
  const d = onlyDigits(value).slice(0, 11);
  if (d.length <= 4) return d;
  if (d.length <= 7) return `${d.slice(0, 4)} ${d.slice(4)}`;
  if (d.length <= 9) return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}`;
  return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7, 9)} ${d.slice(9)}`;
};

export const normalizeTRPhone = (value: string) => onlyDigits(value);

export const isTRPhone = (value: string) => /^05\d{9}$/.test(onlyDigits(value));

export const isEmail = (value: string) => /\S+@\S+\.\S+/.test(value.trim());
