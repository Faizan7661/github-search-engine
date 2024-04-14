import Search from "./Search";

function Header({ searchGithubUser }) {
  return (
    <>
      <div className="header">
        <h1>Github Search Engine</h1>
        {<Search searchGithubUser={searchGithubUser} />}
      </div>
    </>
  );
}

export default Header;
