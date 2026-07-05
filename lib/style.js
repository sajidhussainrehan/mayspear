// Converts an inline CSS string ("a:b;c:d") into a React style object so the
// original Design Component style strings hhhh can be reused verbatim.
export function s(str) {
  const out = {};
  if (!str) return out;
  for (const part of str.split(';')) {
    const i = part.indexOf(':');
    if (i === -1) continue;
    const key = part.slice(0, i).trim();
    const val = part.slice(i + 1).trim();
    if (!key) continue;
    const camel = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    out[camel] = val;
  }
  return out;
}
