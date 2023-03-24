import "@patternfly/react-core/dist/styles/base.css";
import { Masthead, MastheadMain} from '@patternfly/react-core';
import Home from './Home';

function App() {
  return (
    <div>
      <Masthead id="basic">
        <MastheadMain> URL Shortener App</MastheadMain>
      </Masthead>
      <Home />
    </div>
  );
}

export default App;
