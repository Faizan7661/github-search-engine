import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroComponent from "./components/HeroComponent";
import UserProfile from "./components/UserProfile";
import NotFound from "./components/NotFound";

function App() {
  let [githubUserData, setGithubUserData] = useState([]);
  let [singleUserData, setSingleUserData] = useState({});

  async function getGithubUsers() {
    try {
      let response = await axios.get(`https://api.github.com/users`);
      setGithubUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getSingleUserData(username) {
    try {
      let response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setSingleUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function searchGithubUser(username) {
    try {
      let response = await axios.get(
        `https://api.github.com/search/users?q=${username}`
      );
      console.log("coming from search --- ", response.data);
      setGithubUserData(response.data.items);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getGithubUsers();
  }, []);

  return (
    <div>
      <Header searchGithubUser={searchGithubUser} />
      <Switch>
        <Route path="/" exact>
          <HeroComponent githubUserData={githubUserData} />
        </Route>
        <Route
          path="/user/:username"
          render={(props) => (
            <UserProfile
              {...props}
              getSingleUserData={getSingleUserData}
              singleUserData={singleUserData}
            />
          )}
        />

        <Route path="*" component={NotFound} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
