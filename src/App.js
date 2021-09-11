import "./App.css";
import Home from "./Components/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Users from "./Components/Users/Users";
import Header from "./Components/Header/Header";
import UpdateUser from "./Components/Users/UpdateUser";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch> 
          <Route path="/User">
            <Users></Users>
          </Route>
          <Route path="/about">
          <About></About>
          </Route>
          <Route path="/updateUsers/:id">
            <UpdateUser></UpdateUser>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/contact">
            <Contact></Contact>
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
