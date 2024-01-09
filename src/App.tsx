import { useAppSelector } from "./app/hooks";
import { selectUIScreen } from "./features/ui/ui-slice";
import { determineUIScreenContent } from "./features/ui/ui";

function App() {
  const screen = useAppSelector(selectUIScreen);

  return (
    <div>
      <h2>Math Survival</h2>
      {determineUIScreenContent(screen)}
    </div>
  );
}

export default App;
