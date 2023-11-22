import * as booyah from "@ghom/booyah"

import * as params from "../params"

import app from "./app"

import TitleScreen from "../entities/TitleScreen"
import DebugComposite from "../debug/DebugComposite"

class Game extends booyah.Composite {
  get defaultChildChipContext() {
    return {
      container: app.stage,
    }
  }

  protected _onActivate() {
    if (params.debug) {
      this._activateChildChip(
        new DebugComposite(
          this,
          console.log,
          [],
          (path) =>
            path.includes("Lambda") ||
            path.includes("Parallel") ||
            path.includes("StateMachine") ||
            path.includes("TimelineCharacter") ||
            (path.includes("Sequence") && !path.includes("PlayerTurn")),
        ),
      )
    }

    this._activateChildChip(new TitleScreen())
  }
}

const game = new Game()

export default game
