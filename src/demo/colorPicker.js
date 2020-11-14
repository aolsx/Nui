const ColorPicker = {
  hslToRgb(h,s,l){
    h /= 360;
    s /= 100;
    l /= 100;
    var r,g,b;
    if (s == 0){
      r = g = b = l; // achromatic
    } else {
      var hue2rgb = function hue2rgb(p,q,t){
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p,q,h + 1 / 3);
      g = hue2rgb(p,q,h);
      b = hue2rgb(p,q,h - 1 / 3);
    }
    return [Math.round(r * 255),Math.round(g * 255),Math.round(b * 255)];
  },
  rgbToHsv(r,g,b){
    var max,min,h,s,v,d;
    r /= 255;
    g /= 255;
    b /= 255;
    max = Math.max(r,g,b);
    min = Math.min(r,g,b);
    v = max;
    d = max - min;
    s = max === 0 ? 0 : d / max;
    if (max === min){
      h = 0; // achromatic
    } else {
      switch (max){
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    // map top 360,100,100
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    v = Math.round(v * 100);
    return [h,s,v];
  },
  rgbToHex(r,g,b){
    var hex = [0,0,0];
    hex[0] = parseFloat(r).toString(16);
    hex[1] = parseFloat(g).toString(16);
    hex[2] = parseFloat(b).toString(16);
    if (hex[0].length < 2){
      hex[0] = `0${hex[0]}`;
    }
    if (hex[1].length < 2){
      hex[1] = `0${hex[1]}`;
    }
    if (hex[2].length < 2){
      hex[2] = `0${hex[2]}`;
    }
    return `#${hex.join("")}`;
  },
  hsvToRgb(h,s,v){
    if (v === 0){return [0,0,0]}
    s /= 100;
    v /= 100;
    h /= 60;
    var r = 0,g = 0,b = 0;
    var i,f,p,q,t;
    i = parseInt(h % 6);
    f = h - i;
    p = v * (1 - s);
    q = v * (1 - (s * f));
    t = v * (1 - (s * (1 - f)));
    switch (i){
    case 0:
      r = v; g = t; b = p;
      break;
    case 1:
      r = q; g = v; b = p;
      break;
    case 2:
      r = p; g = v; b = t;
      break;
    case 3:
      r = p; g = q; b = v;
      break;
    case 4:
      r = t; g = p; b = v;
      break;
    case 5:
      r = v; g = p; b = q;
      break;
    default:
      break;
    }
    r = parseInt(r * 255);
    g = parseInt(g * 255);
    b = parseInt(b * 255);
    return [r,g,b];
  },
  hsvToGroup([h,s,v],ofv){
    v += ofv;
    if (v < 0){
      v = 0;
    } else if (v > 100){
      v = 100;
    }
    const [r,g,b] = ColorPicker.hsvToRgb(h,s,v);
    return ColorPicker.rgbToHex(r,g,b);
  }
};

export default ColorPicker;