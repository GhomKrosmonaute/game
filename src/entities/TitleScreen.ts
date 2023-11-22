import * as pixi from "pixi.js"

import ContainerChip from "../extensions/ContainerChip"

import packageJSON from "../../package.json"

export default class TitleScreen extends ContainerChip {
  private _title!: pixi.Text
  private _tick!: number

  protected _onActivate() {
    this._tick = 0

    this._container.addChild(
      (this._title = new pixi.Text(`"Hello world" from ${packageJSON.name}`, {
        fill: 0xffffff,
      })),
    )

    this._title.anchor.set(0.5)
    this._title.position.set(window.innerWidth / 2, window.innerHeight / 2)
  }

  protected _onTick() {
    this._tick += this._lastTickInfo.timeSinceLastTick
    this._title.position.y =
      window.innerHeight / 2 + Math.floor(Math.sin(this._tick / 200) * 15)
  }
}
