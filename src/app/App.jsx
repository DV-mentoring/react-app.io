import './styles/style.css'
import { BrowserRouter as Router } from "react-router-dom";
import {Sidebar} from '../widgets/sidebar/Sidebar'

function App() {
  return (
      <Router>
          <Sidebar/>
      </Router>
      );
}

export {App};

