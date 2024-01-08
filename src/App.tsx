import { useAppSelector } from "./app/hooks"
import { selectUIScreen } from "./features/ui/uiSlice"
import { UIScreenState } from "./constants/ui"

import Countdown from "./pages/countdown/Countdown"
import Game from "./pages/game/Game"
import PostGame from "./pages/postgame/PostGame"
import Setup from "./pages/setup/Setup"

function App() {
  const screen = useAppSelector(selectUIScreen)

  switch (screen) {
    case UIScreenState.SETUP_GAME:
      return <Setup />
    case UIScreenState.COUNTDOWN:
      return <Countdown />
    case UIScreenState.IN_GAME:
      return <Game />
    case UIScreenState.POST_GAME:
      return <PostGame />
    default:
      return <Setup />
  }
}

export default App
