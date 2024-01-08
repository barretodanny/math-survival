import { useAppDispatch } from "../../app/hooks"
import { showSetupScreen } from "../../features/ui/uiSlice"

function PostGame() {
  const dispatch = useAppDispatch()

  return (
    <div>
      <h2>PostGame</h2>
      <button onClick={() => dispatch(showSetupScreen())}>Next</button>
    </div>
  )
}

export default PostGame
