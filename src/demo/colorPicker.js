export const ColorPicker = {
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
  rgbToHsl(r,g,b){
    r /= 255,g /= 255,b /= 255;
    var max = Math.max(r,g,b),min = Math.min(r,g,b);
    var h,s,l = (max + min) / 2;

    if (max == min){
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max){
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    if (h > 360){
      h = 360;
    }
    if (s > 100){
      s = 100;
    }
    if (l > 100){
      l = 100;
    }
    return [h,s,l];
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
  hexToRgb(hexStr){
    var sColor = hexStr.toLowerCase();
    // 十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)){
      if (sColor.length === 4){
        var sColorNew = "#";
        for (let i = 1; i < 4; i += 1){
          sColorNew += sColor.slice(i,i + 1).concat(sColor.slice(i,i + 1));
        }
        sColor = sColorNew;
      }
      // 处理六位的颜色值
      var sColorChange = [];
      for (let i = 1; i < 7; i += 2){
        sColorChange.push(parseInt(`0x${sColor.slice(i,i + 2)}`));
      }
      return sColorChange;
    }
    return sColor;
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
    const rgb = ColorPicker.hsvToRgb(h,s,v);
    const hex = ColorPicker.rgbToHex(...rgb);
    return {rgb,hex};
  },
};

export const colors = [
  {color: "Red",variations: [
    {weight: 50,hex: "#FFEBEE",hsl: [351,100,96]},
    {weight: 100,hex: "#FFCDD2",hsl: [354,100,90]},
    {weight: 200,hex: "#EF9A9A",hsl: [0,73,77]},
    {weight: 300,hex: "#E57373",hsl: [0,69,67]},
    {weight: 400,hex: "#EF5350",hsl: [1,83,63]},
    {weight: 500,hex: "#F44336",hsl: [4,90,58]},
    {weight: 600,hex: "#E53935",hsl: [1,77,55]},
    {weight: 700,hex: "#D32F2F",hsl: [0,65,51]},
    {weight: 800,hex: "#C62828",hsl: [0,66,47]},
    {weight: 900,hex: "#B71C1C",hsl: [0,73,41]}
  ]},
  {color: "Pink",variations: [
    {weight: 50,hex: "#FCE4EC",hsl: [340,80,94]},
    {weight: 100,hex: "#F8BBD0",hsl: [339,81,85]},
    {weight: 200,hex: "#F48FB1",hsl: [340,82,76]},
    {weight: 300,hex: "#F06292",hsl: [340,83,66]},
    {weight: 400,hex: "#EC407A",hsl: [340,82,59]},
    {weight: 500,hex: "#E91E63",hsl: [340,82,52]},
    {weight: 600,hex: "#D81B60",hsl: [338,78,48]},
    {weight: 700,hex: "#C2185B",hsl: [336,78,43]},
    {weight: 800,hex: "#AD1457",hsl: [334,79,38]},
    {weight: 900,hex: "#880E4F",hsl: [328,81,29]}
  ]},
  {color: "Purple",variations: [
    {weight: 50,hex: "#F3E5F5",hsl: [292,44,93]},
    {weight: 100,hex: "#E1BEE7",hsl: [291,46,83]},
    {weight: 200,hex: "#CE93D8",hsl: [291,47,71]},
    {weight: 300,hex: "#BA68C8",hsl: [291,47,60]},
    {weight: 400,hex: "#AB47BC",hsl: [291,47,51]},
    {weight: 500,hex: "#9C27B0",hsl: [291,64,42]},
    {weight: 600,hex: "#8E24AA",hsl: [287,65,40]},
    {weight: 700,hex: "#7B1FA2",hsl: [282,68,38]},
    {weight: 800,hex: "#6A1B9A",hsl: [277,70,35]},
    {weight: 900,hex: "#4A148C",hsl: [267,75,31]}
  ]},
  {color: "Deep Purple",variations: [
    {weight: 50,hex: "#EDE7F6",hsl: [264,45,94]},
    {weight: 100,hex: "#D1C4E9",hsl: [261,46,84]},
    {weight: 200,hex: "#B39DDB",hsl: [261,46,74]},
    {weight: 300,hex: "#9575CD",hsl: [262,47,63]},
    {weight: 400,hex: "#7E57C2",hsl: [262,47,55]},
    {weight: 500,hex: "#673AB7",hsl: [262,52,47]},
    {weight: 600,hex: "#5E35B1",hsl: [260,54,45]},
    {weight: 700,hex: "#512DA8",hsl: [258,58,42]},
    {weight: 800,hex: "#4527A0",hsl: [255,61,39]},
    {weight: 900,hex: "#311B92",hsl: [251,69,34]}
  ]},
  {color: "Indigo",variations: [
    {weight: 50,hex: "#E8EAF6",hsl: [231,44,94]},
    {weight: 100,hex: "#C5CAE9",hsl: [232,45,84]},
    {weight: 200,hex: "#9FA8DA",hsl: [231,44,74]},
    {weight: 300,hex: "#7986CB",hsl: [230,44,64]},
    {weight: 400,hex: "#5C6BC0",hsl: [231,44,56]},
    {weight: 500,hex: "#3F51B5",hsl: [231,48,48]},
    {weight: 600,hex: "#3949AB",hsl: [232,50,45]},
    {weight: 700,hex: "#303F9F",hsl: [232,54,41]},
    {weight: 800,hex: "#283593",hsl: [233,57,37]},
    {weight: 900,hex: "#1A237E",hsl: [235,66,30]}
  ]},
  {color: "Blue",variations: [
    {weight: 50,hex: "#E3F2FD",hsl: [205,87,94]},
    {weight: 100,hex: "#BBDEFB",hsl: [207,89,86]},
    {weight: 200,hex: "#90CAF9",hsl: [207,90,77]},
    {weight: 300,hex: "#64B5F6",hsl: [207,89,68]},
    {weight: 400,hex: "#42A5F5",hsl: [207,90,61]},
    {weight: 500,hex: "#2196F3",hsl: [207,90,54]},
    {weight: 600,hex: "#1E88E5",hsl: [208,79,51]},
    {weight: 700,hex: "#1976D2",hsl: [210,79,46]},
    {weight: 800,hex: "#1565C0",hsl: [212,80,42]},
    {weight: 900,hex: "#0D47A1",hsl: [216,85,34]}
  ]},
  {color: "Light Blue",variations: [
    {weight: 50,hex: "#E1F5FE",hsl: [199,94,94]},
    {weight: 100,hex: "#B3E5FC",hsl: [199,92,85]},
    {weight: 200,hex: "#81D4FA",hsl: [199,92,74]},
    {weight: 300,hex: "#4FC3F7",hsl: [199,91,64]},
    {weight: 400,hex: "#29B6F6",hsl: [199,92,56]},
    {weight: 500,hex: "#03A9F4",hsl: [199,98,48]},
    {weight: 600,hex: "#039BE5",hsl: [200,97,45]},
    {weight: 700,hex: "#0288D1",hsl: [201,98,41]},
    {weight: 800,hex: "#0277BD",hsl: [202,98,37]},
    {weight: 900,hex: "#01579B",hsl: [206,99,31]}
  ]},
  {color: "Cyan",variations: [
    {weight: 50,hex: "#E0F7FA",hsl: [187,72,93]},
    {weight: 100,hex: "#B2EBF2",hsl: [187,71,82]},
    {weight: 200,hex: "#80DEEA",hsl: [187,72,71]},
    {weight: 300,hex: "#4DD0E1",hsl: [187,71,59]},
    {weight: 400,hex: "#26C6DA",hsl: [187,71,50]},
    {weight: 500,hex: "#00BCD4",hsl: [187,100,42]},
    {weight: 600,hex: "#00ACC1",hsl: [187,100,38]},
    {weight: 700,hex: "#0097A7",hsl: [186,100,33]},
    {weight: 800,hex: "#00838F",hsl: [185,100,28]},
    {weight: 900,hex: "#006064",hsl: [182,100,20]}
  ]},
  {color: "Teal",variations: [
    {weight: 50,hex: "#E0F2F1",hsl: [177,41,91]},
    {weight: 100,hex: "#B2DFDB",hsl: [175,41,79]},
    {weight: 200,hex: "#80CBC4",hsl: [174,42,65]},
    {weight: 300,hex: "#4DB6AC",hsl: [174,42,51]},
    {weight: 400,hex: "#26A69A",hsl: [174,63,40]},
    {weight: 500,hex: "#009688",hsl: [174,100,29]},
    {weight: 600,hex: "#00897B",hsl: [174,100,27]},
    {weight: 700,hex: "#00796B",hsl: [173,100,24]},
    {weight: 800,hex: "#00695C",hsl: [173,100,21]},
    {weight: 900,hex: "#004D40",hsl: [170,100,15]}
  ]},
  {color: "Green",variations: [
    {weight: 50,hex: "#E8F5E9",hsl: [125,39,94]},
    {weight: 100,hex: "#C8E6C9",hsl: [122,37,84]},
    {weight: 200,hex: "#A5D6A7",hsl: [122,37,74]},
    {weight: 300,hex: "#81C784",hsl: [123,38,64]},
    {weight: 400,hex: "#66BB6A",hsl: [123,38,57]},
    {weight: 500,hex: "#4CAF50",hsl: [122,39,49]},
    {weight: 600,hex: "#43A047",hsl: [123,41,45]},
    {weight: 700,hex: "#388E3C",hsl: [123,43,39]},
    {weight: 800,hex: "#2E7D32",hsl: [123,46,34]},
    {weight: 900,hex: "#1B5E20",hsl: [124,55,24]}
  ]},
  {color: "Light Green",variations: [
    {weight: 50,hex: "#F1F8E9",hsl: [88,52,94]},
    {weight: 100,hex: "#DCEDC8",hsl: [88,51,86]},
    {weight: 200,hex: "#C5E1A5",hsl: [88,50,76]},
    {weight: 300,hex: "#AED581",hsl: [88,50,67]},
    {weight: 400,hex: "#9CCC65",hsl: [88,50,60]},
    {weight: 500,hex: "#8BC34A",hsl: [88,50,53]},
    {weight: 600,hex: "#7CB342",hsl: [89,46,48]},
    {weight: 700,hex: "#689F38",hsl: [92,48,42]},
    {weight: 800,hex: "#558B2F",hsl: [95,49,36]},
    {weight: 900,hex: "#33691E",hsl: [103,56,26]}
  ]},
  {color: "Lime",variations: [
    {weight: 50,hex: "#F9FBE7",hsl: [66,71,95]},
    {weight: 100,hex: "#F0F4C3",hsl: [65,69,86]},
    {weight: 200,hex: "#E6EE9C",hsl: [66,71,77]},
    {weight: 300,hex: "#DCE775",hsl: [66,70,68]},
    {weight: 400,hex: "#D4E157",hsl: [66,70,61]},
    {weight: 500,hex: "#CDDC39",hsl: [66,70,54]},
    {weight: 600,hex: "#C0CA33",hsl: [64,60,50]},
    {weight: 700,hex: "#AFB42B",hsl: [62,61,44]},
    {weight: 800,hex: "#9E9D24",hsl: [60,63,38]},
    {weight: 900,hex: "#827717",hsl: [54,70,30]}
  ]},
  {color: "Yellow",variations: [
    {weight: 50,hex: "#FFFDE7",hsl: [55,100,95]},
    {weight: 100,hex: "#FFF9C4",hsl: [54,100,88]},
    {weight: 200,hex: "#FFF59D",hsl: [54,100,81]},
    {weight: 300,hex: "#FFF176",hsl: [54,100,73]},
    {weight: 400,hex: "#FFEE58",hsl: [54,100,67]},
    {weight: 500,hex: "#FFEB3B",hsl: [54,100,62]},
    {weight: 600,hex: "#FDD835",hsl: [49,98,60]},
    {weight: 700,hex: "#FBC02D",hsl: [43,96,58]},
    {weight: 800,hex: "#F9A825",hsl: [37,95,56]},
    {weight: 900,hex: "#F57F17",hsl: [28,92,53]}
  ]},
  {color: "Amber",variations: [
    {weight: 50,hex: "#FFF8E1",hsl: [46,100,94]},
    {weight: 100,hex: "#FFECB3",hsl: [45,100,85]},
    {weight: 200,hex: "#FFE082",hsl: [45,100,75]},
    {weight: 300,hex: "#FFD54F",hsl: [46,100,65]},
    {weight: 400,hex: "#FFCA28",hsl: [45,100,58]},
    {weight: 500,hex: "#FFC107",hsl: [45,100,51]},
    {weight: 600,hex: "#FFB300",hsl: [42,100,50]},
    {weight: 700,hex: "#FFA000",hsl: [38,100,50]},
    {weight: 800,hex: "#FF8F00",hsl: [34,100,50]},
    {weight: 900,hex: "#FF6F00",hsl: [26,100,50]}
  ]},
  {color: "Orange",variations: [
    {weight: 50,hex: "#FFF3E0",hsl: [37,100,94]},
    {weight: 100,hex: "#FFE0B2",hsl: [36,100,85]},
    {weight: 200,hex: "#FFCC80",hsl: [36,100,75]},
    {weight: 300,hex: "#FFB74D",hsl: [36,100,65]},
    {weight: 400,hex: "#FFA726",hsl: [36,100,57]},
    {weight: 500,hex: "#FF9800",hsl: [36,100,50]},
    {weight: 600,hex: "#FB8C00",hsl: [33,100,49]},
    {weight: 700,hex: "#F57C00",hsl: [30,100,48]},
    {weight: 800,hex: "#EF6C00",hsl: [27,100,47]},
    {weight: 900,hex: "#E65100",hsl: [21,100,45]}
  ]},
  {color: "Deep Orange",variations: [
    {weight: 50,hex: "#FBE9E7",hsl: [6,71,95]},
    {weight: 100,hex: "#FFCCBC",hsl: [14,100,87]},
    {weight: 200,hex: "#FFAB91",hsl: [14,100,78]},
    {weight: 300,hex: "#FF8A65",hsl: [14,100,70]},
    {weight: 400,hex: "#FF7043",hsl: [14,100,63]},
    {weight: 500,hex: "#FF5722",hsl: [14,100,57]},
    {weight: 600,hex: "#F4511E",hsl: [14,91,54]},
    {weight: 700,hex: "#E64A19",hsl: [14,80,50]},
    {weight: 800,hex: "#D84315",hsl: [14,82,46]},
    {weight: 900,hex: "#BF360C",hsl: [14,88,40]}
  ]},
  {color: "Brown",variations: [
    {weight: 50,hex: "#EFEBE9",hsl: [20,16,93]},
    {weight: 100,hex: "#D7CCC8",hsl: [16,16,81]},
    {weight: 200,hex: "#BCAAA4",hsl: [15,15,69]},
    {weight: 300,hex: "#A1887F",hsl: [16,15,56]},
    {weight: 400,hex: "#8D6E63",hsl: [16,18,47]},
    {weight: 500,hex: "#795548",hsl: [16,25,38]},
    {weight: 600,hex: "#6D4C41",hsl: [15,25,34]},
    {weight: 700,hex: "#5D4037",hsl: [14,26,29]},
    {weight: 800,hex: "#4E342E",hsl: [11,26,24]},
    {weight: 900,hex: "#3E2723",hsl: [9,28,19]}
  ]},
  {color: "Grey",variations: [
    {weight: 50,hex: "#FAFAFA",hsl: [0,0,98]},
    {weight: 100,hex: "#F5F5F5",hsl: [0,0,96]},
    {weight: 200,hex: "#EEEEEE",hsl: [0,0,93]},
    {weight: 300,hex: "#E0E0E0",hsl: [0,0,88]},
    {weight: 400,hex: "#BDBDBD",hsl: [0,0,74]},
    {weight: 500,hex: "#9E9E9E",hsl: [0,0,62]},
    {weight: 600,hex: "#757575",hsl: [0,0,46]},
    {weight: 700,hex: "#616161",hsl: [0,0,38]},
    {weight: 800,hex: "#424242",hsl: [0,0,26]},
    {weight: 900,hex: "#212121",hsl: [0,0,13]}
  ]},
  {color: "Blue Grey",variations: [
    {weight: 50,hex: "#ECEFF1",hsl: [204,15,94]},
    {weight: 100,hex: "#CFD8DC",hsl: [198,16,84]},
    {weight: 200,hex: "#B0BEC5",hsl: [200,15,73]},
    {weight: 300,hex: "#90A4AE",hsl: [200,16,62]},
    {weight: 400,hex: "#78909C",hsl: [200,15,54]},
    {weight: 500,hex: "#607D8B",hsl: [200,18,46]},
    {weight: 600,hex: "#546E7A",hsl: [199,18,40]},
    {weight: 700,hex: "#455A64",hsl: [199,18,33]},
    {weight: 800,hex: "#37474F",hsl: [200,18,26]},
    {weight: 900,hex: "#263238",hsl: [200,19,18]}
  ]}
];

// for (const o of colors){
//   for (const ov of o.variations){
//     const reg = ColorPicker.hexToRgb(ov.hex);
//     // ov.hsv = ColorPicker.rgbToHsv(...reg);
//     ov.hsl = ColorPicker.rgbToHsl(...reg);
//   }
// }

// console.log(JSON.stringify(colors,null));