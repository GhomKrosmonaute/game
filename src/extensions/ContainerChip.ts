import * as booyah from "@ghom/booyah"
import * as pixi from "pixi.js"

export default abstract class ContainerChip<
  CompositeEvents extends
    booyah.BaseCompositeEvents = booyah.BaseCompositeEvents,
> extends booyah.Composite<CompositeEvents> {
  protected _container!: pixi.Container

  public get chipContext(): {
    readonly container: pixi.Container
  } & Readonly<Record<string, any>> {
    // @ts-expect-error
    return super.chipContext
  }

  public get defaultChildChipContext() {
    return {
      container: this._container,
    }
  }

  public activate(
    tickInfo: booyah.TickInfo,
    chipContext: Readonly<Record<string, any>>,
    inputSignal?: booyah.Signal,
    reloadMemento?: booyah.ReloadMemento,
  ) {
    this._container = new pixi.Container()

    super.activate(tickInfo, chipContext, inputSignal, reloadMemento)

    this.chipContext.container.addChild(this._container)
  }

  public terminate() {
    super.terminate()

    this.chipContext.container.removeChild(this._container)

    this._container.destroy()
  }
}
