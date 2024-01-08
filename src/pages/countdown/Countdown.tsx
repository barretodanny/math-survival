import { useAppDispatch } from "../../app/hooks"
import { showGameScreen } from "../../features/ui/uiSlice"

function Countdown() {
  const dispatch = useAppDispatch()

  return (
    <div>
      <h2>Countdown</h2>
      <button onClick={() => dispatch(showGameScreen())}>Next</button>
    </div>
  )
}

export default Countdown
