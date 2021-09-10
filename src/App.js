import "./App.css";
import Home from "./Components/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Users from "./Components/Users/Users";
import Header from "./Components/Header/Header";
import UpdateUser from "./Components/Users/UpdateUser";
function App() {
  return (
    <div className="App">
      <Router>
        {" "}
        <Header />
        <Switch>
        <Route path="/updateUsers/:id">
            <UpdateUser></UpdateUser>
          </Route>
          
          <Route path="/User">
            <Users></Users>
          </Route>
         
          <Route path="/">
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
