import { useState } from "react";

function Search({ searchGithubUser }) {
  let [searchUsername, setSearchUsername] = useState("");
  function onChangeHandler(e) {
    setSearchUsername(e.target.value);
    console.log(searchUsername);
  }
  function searchUsers(e) {
    e.preventDefault();
    searchGithubUser(searchUsername);
  }
  return (
    <>
      <div className="container">
        <form className="search-bar" onSubmit={searchUsers}>
          <input
            className="input"
            type="text"
            placeholder="Enter Username"
            name="q"
            autoComplete="off"
            value={searchUsername}
            onChange={onChangeHandler}
          />
          <button type="submit" className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
    </>
  );
}

export default Search;
