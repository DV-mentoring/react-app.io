import { Fragment } from "react";
import {Header} from './components/Header/Header'
import {Main} from './components/Main/Main'
import {Todo} from './components/Todo/Todo'
import {ButtonAddTask} from './components/Button/ButtonAddTask'
function App() {
  return (
      <Fragment>
          <Header/>
          <Main/>
          <Todo/>
          <ButtonAddTask/>

      </Fragment>
  );
}

export {App};

