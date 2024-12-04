import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";import {Header} from './components/Header/Header'
import {Sidebar} from './components/Sidebar/Sidebar'
import {Today} from './components/Todo/Today'
import {Yesterday} from "./components/Todo/Yesterday";
import {Upcoming} from  "./components/Todo/Upcoming"

function App() {
  return (
      <Fragment>
        <Router>
            <Sidebar/>
            <Routes>
                <Route path="/" element={<Today />} />
                <Route path="/Yesterday" element={<Yesterday />} />
                <Route path="/Upcoming" element={<Upcoming />} />
            </Routes>
        </Router>
      </Fragment>
  );
}

export {App};

