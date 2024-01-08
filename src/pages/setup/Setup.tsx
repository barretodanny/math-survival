import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { UIModalState } from "../../constants/ui"
import {
  selectUIModal,
  showCountdownScreen,
  showScoresModal,
  showSettingsModal,
} from "../../features/ui/uiSlice"

import ScoresModal from "../../components/Modal/ScoresModal"
import SettingsModal from "../../components/Modal/SettingsModal"

function Setup() {
  const modal = useAppSelector(selectUIModal)
  const dispatch = useAppDispatch()

  return (
    <div>
      {modal === UIModalState.SCORES && <ScoresModal />}
      {modal === UIModalState.SETTINGS && <SettingsModal />}
      <h2>Setup</h2>
      <button onClick={() => dispatch(showSettingsModal())}>Settings</button>
      <br />
      <button onClick={() => dispatch(showScoresModal())}>View Scores</button>
      <br />
      <button onClick={() => dispatch(showCountdownScreen())}>Start</button>
    </div>
  )
}

export default Setup
