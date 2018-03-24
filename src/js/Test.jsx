import "./style.css";
import { TEST } from 'actions/testAction';
import Module from './Module';

import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  return (
    <div>
      <Module />
      <p>React here!</p>
      <p>{TEST}</p>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));

export default App;
