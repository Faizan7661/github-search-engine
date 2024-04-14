import { Link } from "react-router-dom";

function HeroComponent({ githubUserData}) {
  // console.log(githubUserData);


  return (
    <div className="row">
      <div className="leftcolumn"></div>
      <div className="card-row">
        {githubUserData.map((ele) => (
          <div key={ele.id} className="card">
            <center>
              <img className="img" src={ele.avatar_url} height="200px" alt={ele.login} />
              <h2>Name: {ele.login}</h2>
              <Link  to={`/user/${ele.login}`} className="profile-link">
              Visit My Profile
            </Link>
            </center>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroComponent;