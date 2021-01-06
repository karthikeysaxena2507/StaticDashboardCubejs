import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import Secured from './Secured';
import Login from "./Login";
import Charts from "./Charts";

const App = () => {
    return (
    <BrowserRouter>
      <Route path="/secured" component={Secured} />
      <Route path="/login" component={Login} />
      <Route path="/charts" component={Charts} />
    </BrowserRouter>
  );
}
export default App;