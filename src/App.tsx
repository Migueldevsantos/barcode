import { CodeBarProvider } from "./contexts/codeBarContext";
import Navigator from "./routes/Navigation";

export default function App() {
  return (
    <CodeBarProvider>
      <Navigator/>
    </CodeBarProvider>
    )
}