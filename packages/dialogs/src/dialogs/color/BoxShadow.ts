export class BoxShadow {
  hShadow: number;
  vShadow: number;
  blur: number;
  spread: number;
  color: string;
  inset: any;

  constructor(hShadow, vShadow, blur, spread, color, inset?) {
    this.hShadow = hShadow;
    this.vShadow = vShadow;
    this.blur = blur;
    this.spread = spread;
    this.color = color;
    this.inset = !!inset;
  }

  toString() {
    var vals = [
      Math.round(this.hShadow) + "px",
      Math.round(this.vShadow) + "px",
      Math.round(this.blur) + "px",
      Math.round(this.spread) + "px",
      this.color,
    ];
    if (this.inset) {
      vals.push("inset");
    }
    return vals.join(" ");
  }
}
