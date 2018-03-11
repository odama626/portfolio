declare var Promise;

export function generateNumberList(to: number): number[] {
  return Array(to + 1)
    .join('.')
    .split('')
    .map((v, i) => i + 1);
}

/**
 * @description Get the value of a nested key inside of a large object or a default value
 * @param {object} obj The object to traverse
 * @param {any} defaultValue the default value to return if nested key doesn't exist
 * @param {string[]} path an array that represents the keys to follow into the object
 * @returns the value of the nested key after following the path or defaultValue
 */
export const nestedKeyOr = (obj: any, defaultValue: any, path: string[]) =>
  path.reduce((depth, key) => (depth && depth[key] ? depth[key] : defaultValue), obj);

export class Format {
  static percentage(percentage: number): string {
    return `${(percentage * 100).toLocaleString()}%`;
  }
  static dateFull(timestamp: number): string {
    return new Date(timestamp).toLocaleDateString(undefined, {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }

  static date(timestamp: number): string {
    let date = new Date(timestamp);
    return `${Format.padLeft((date.getMonth() + 1).toString(), 2, '0')}/${Format.padLeft(date.getDate().toString(), 2, '0')}/${date
      .getFullYear()
      .toString()
      .slice(2)}`;
  }

  static padLeft(str: string, x: number, s: string): string {
    str = str.toString();
    if (str.length >= x) return str;
    return Array(((x + 1 - str.length) / s.length) | 0).join(s) + str;
  }

  static capitalize(str: string): string {
    if (str.length < 1) return str;
    return str[0].toUpperCase() + str.slice(1);
  }

  static attachmentDescription(a): string {
    // {attachment.attachment} {attachment.attachment.length>0 && attachment.type.length>0? '- ': ''}{attachment.type}
    const showAtt = a.type.indexOf(a.attachment) === -1;
    const addSpace = a.type.length > 0 && showAtt;
    return `${a.type}${addSpace ? ' ' : ''}${showAtt ? a.attachment : ''}`;
  }

  static pluralize(str: string, qty: number): string {
    return qty > 1 && str[str.length - 1] !== 's' ? str + 's' : str;
  }
  static depluralize(str: string): string {
    return str[str.length - 1] === 's' ? str.substr(0, str.length - 1) : str;
  }

  static phoneNumber(str: string = ''): string {
    if (str.length === 0) return '';
    let s = str.replace(/\D/g, '');
    return `(${s.slice(0, 3)}) ${s.slice(3, 6)}-${s.slice(6)}`;
  }

  static stringifyList(strs: string[]): string {
    return strs.slice(0, -1).join(', ') + ', and ' + strs.slice(-1);
  }
}

export function lockScroll(lock: boolean = true, resetScroll: boolean = false) {
  if (resetScroll) {
    window.scroll(0, 0);
  }
  document.body.classList.toggle('body-locked', lock);
}

export function getProportionateWidth({ width, height }, targetHeight) {
  return width * targetHeight / height;
}

export function serialize(params) {
  return Object.keys(params)
    .map(p => `${p}=${encodeURIComponent(params[p].trim())}`)
    .join('&');
}

export function composeEmail(recipients: string[], subject: string, body: string) {
  return `mailto:${encodeURIComponent(recipients.join(', '))}?${serialize({
    subject,
    body
  })}`;
}

export function mapObjectWithIndex(obj: any, currier: any, index: number) {
  let keys = Object.keys(obj);
  return keys.map(k => ({ key: k, func: data => currier(obj[k](index, data)) })).reduce((a, c) => ({ ...a, [c.key]: c.func }), {});
}