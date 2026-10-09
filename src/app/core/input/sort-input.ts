export function parseSortInput(text: string): number[] {
  const tokens = text
    .trim()
    .split(/[\s,]+/)
    .filter(Boolean);
  if (!tokens.length || tokens.length > 16) {
    throw new Error('Enter 1–16 whole numbers.');
  }
  return tokens.map((token) => {
    const value = Number(token);
    if (!/^-?\d+$/.test(token) || !Number.isSafeInteger(value) || Math.abs(value) > 999) {
      throw new Error('Use whole numbers from -999 to 999, separated by commas or spaces.');
    }
    return value;
  });
}
