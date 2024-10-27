export interface FakeCanvasOpts {
  width: number
  height: number
  fontSize: number
  backgroundColor: string
}

export class FakeCanvas {
  childrenHtmls: string[] = []

  constructor(public opts: FakeCanvasOpts) {}

  drawText(text: string, x: number, y: number, color: string) {
    this.addChild(
      `<span style="position: absolute; left: ${x}px; top: ${y}px; color: ${color};">${text}</span>`,
    )
  }

  addChild(html: string) {
    this.childrenHtmls.push(html)
  }

  render() {
    const { width, height, fontSize, backgroundColor } = this.opts
    return `<div style="position: relative; width: ${width}px; height: ${height}px; font-size: ${fontSize}px; background-color: ${backgroundColor};">
            ${this.childrenHtmls.join('\n')}
        </div>
    `
  }
}
