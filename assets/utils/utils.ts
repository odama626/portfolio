import * as pdfMake from 'pdfmake/build/pdfmake';
import * as vfsFonts from 'pdfmake/build/vfs_fonts';

declare var Promise;

export class Format {
	static price(price: number): string {
    // let precision = (price === (price | 0))? 0 : 2;
    let precision = 2;

		return `$${price.toLocaleString(undefined, {
			minimumFractionDigits: precision,
			maximumFractionDigits: precision
		})}`;
	}
	static percentage(percentage: number): string {
		return `${(percentage * 100).toLocaleString()}%`;
	}
	static dateFull(timestamp: number): string {
		return new Date(timestamp)
			.toLocaleDateString(undefined, {
				month: 'long',
				day: 'numeric',
				year: 'numeric'
			})
	}

	static date(timestamp: number): string {
		let date = new Date(timestamp);
		return `${Format.padLeft((date.getMonth()+1).toString(),2,'0')}/${Format.padLeft(date.getDate().toString(), 2, '0')}/${date.getFullYear().toString().slice(2)}`
	}

	static padLeft(str: string, x: number, s: string): string {
		str = str.toString();
		if (str.length >= x) return str;
		return Array((x+1-str.length)/s.length | 0).join(s)+str;
	}

  static capitalize(str:string): string {
    return str[0].toUpperCase()+str.slice(1);
	}

	static pluralize(str:string, qty: number): string {
		return qty>1 && str[str.length-1] !== 's' ? str+'s' : str;
  }
  static depluralize(str: string): string {
    return str[str.length-1] === 's'? str.substr(0, str.length-1) : str;
  }

  static phoneNumber(str:string): string {
    let s = str.replace(/\D/g,'');
    return `(${s.slice(0,3)}) ${s.slice(3,6)}-${s.slice(6)}`
	}

	static stringifyList(strs: string[]): string {
		return strs.slice(0,-1).join(', ')+', and '+strs.slice(-1);
	}
}

export function NewPdfMake() {
	const {vfs} = vfsFonts.pdfMake;
	pdfMake.vfs = vfs;
	return pdfMake;
}

export function ImageBase64(url: string) {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.setAttribute('crossOrigin', 'anonymous');
    image.onerror = (e) => reject(e);
    image.onload = function() {
      let me = this as HTMLImageElement;
      let canvas = document.createElement('canvas');
      canvas.width = me.width*2;
      canvas.height = me.height*2;
      let ctx = canvas.getContext('2d');
      if (ctx !== null) {
        ctx.scale(2,2);
        ctx.drawImage(me, 0, 0);
        let dataUrl = canvas.toDataURL("image/png");
        resolve(dataUrl);
      } else {
        reject('failed to create canvas');
      }
    }
    image.src = url;
  });
}

export function serialize(params) {
  return Object.keys(params).map( p => `${p}=${encodeURIComponent(params[p].trim())}`).join('&');
}

export function composeEmail(recipients: string[], subject: string, body: string) {
  return `mailto:${encodeURIComponent(recipients.join(', '))}?${serialize({subject, body})}`;
}

export function mapObjectWithIndex(obj: any, currier: any, index: number) {
  let keys = Object.keys(obj);
  return keys.map(k => ({key: k, func: (data) => currier(obj[k](index,data))}))
    .reduce((a, c) => ({...a, [c.key]: c.func}), {});
}