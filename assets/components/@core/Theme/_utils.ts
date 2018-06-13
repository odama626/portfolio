// function sbcRip(d, i, r) {
//   let l=d.length,RGB={};
//   if(l>9){
//       d=d.split(",");
//       if(d.length<3||d.length>4)return null;//ErrorCheck
//       RGB[0]=i(d[0].split("(")[1]),RGB[1]=i(d[1]),RGB[2]=i(d[2]),RGB[3]=d[3]?parseFloat(d[3]):-1;
//   }else{
//       if(l==8||l==6||l<4)return null; //ErrorCheck
//       if(l<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(l>4?d[4]+""+d[4]:""); //3 or 4 digit
//       d=i(d.slice(1),16),RGB[0]=d>>16&255,RGB[1]=d>>8&255,RGB[2]=d&255,RGB[3]=-1;
//       if(l==9||l==5)RGB[3]=r((RGB[2]/255)*10000)/10000,RGB[2]=RGB[1],RGB[1]=RGB[0],RGB[0]=d>>24&255;
//   }
//   return RGB;
// }

// export function shadeBlendConvert (p: any, from, to?) {
//   if(typeof(p)!="number"||p<-1||p>1||typeof(from)!="string"||(from[0]!='r'&&from[0]!='#')||(to&&typeof(to)!="string"))return null; //ErrorCheck
//   var i=parseInt,r=Math.round,h=from.length>9,h=typeof(to)=="string"?to.length>9?true:to=="c"?!h:false:h,b=p<0,p=b?p*-1:p,to=to&&to!="c"?to:b?"#000000":"#FFFFFF",f=sbcRip(from,i,r),t=sbcRip(to,i,r);
//   if(!f||!t)return null; //ErrorCheck
//   if(h)return "rgb"+(f[3]>-1||t[3]>-1?"a(":"(")+r((t[0]-f[0])*p+f[0])+","+r((t[1]-f[1])*p+f[1])+","+r((t[2]-f[2])*p+f[2])+(f[3]<0&&t[3]<0?")":","+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*10000)/10000:t[3]<0?f[3]:t[3])+")");
//   else return "#"+(0x100000000+r((t[0]-f[0])*p+f[0])*0x1000000+r((t[1]-f[1])*p+f[1])*0x10000+r((t[2]-f[2])*p+f[2])*0x100+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*255):t[3]>-1?r(t[3]*255):f[3]>-1?r(f[3]*255):255)).toString(16).slice(1,f[3]>-1||t[3]>-1?undefined:-2);
// }

// // Inspired by Bootstrap
// export function themeColorLevel(color, level = 0, interval) {
//   return shadeBlendConvert((-level) * interval, color);
// }

// export function paletteFromTheme(theme) {
//   const { colors, modifiers } = theme;
//   let c = Object.keys(colors);
//   let m = Object.keys(modifiers);

//   return m.reduce((palette, component) => {
//     let mods = Object.keys(modifiers[component]);
//     let styles = c.reduce((styles, color) => ({
//       ...styles,
//       [color]: mods.reduce((styles, property ) => ({
//         ...styles,
//         [property]: themeColorLevel(colors[color], modifiers[component][property], 0.08)
//       }), {})
//     }), {}) 

//     return {
//       ...palette,
//       [component]: styles
//     }
//   }, {});
// }

function genStyles(style, classes: { [x: string]: any }) {
  return Object.keys(classes).reduce((className, key) => `${className} ${classes[key] ? style[key] : ''}`, '');
}