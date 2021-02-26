import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./pages/Home/Home";
import Post from "./pages/Post/Post";
import Ask from "./pages/Ask/Ask";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/post/ask" exact component={Ask}/>
                <Route path="/post/edit/:id" exact component={Ask}/>
                <Route path="/post/:id" exact component={Post} on/>
            </Switch>
        </Router>
    );
}

export default App;
