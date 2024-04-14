import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function UserProfile() {
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user details
        const userDetailsResponse = await axios.get(`https://api.github.com/users/${username}`);
        setUserDetails(userDetailsResponse.data);
  
        // Fetch user's top 5 repos
        const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos?sort=stars&per_page=5`);
        setRepos(reposResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [username]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Link to="/" className="btn1">
        Go to Main Page
      </Link>  <a
            href={userDetails.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn2"
          >
            Go to GitHub Profile
          </a>
      <div className="profile-page">
        <center>
          <img
            className="img-2"
            src={userDetails.avatar_url}
            alt={userDetails.login}
            height="200px"
          />

          <h1 className="name">{userDetails.name}</h1>

          <div className="user-details">
            <table className="user-details-table">
              <tbody>
                <tr>
                  <th>Username</th>
                  <td>{userDetails.login}</td>
                </tr>
                <tr>
                  <th>Company</th>
                  <td>{userDetails.company || "Not found"}</td>
                </tr>
                <tr>
                  <th>Location</th>
                  <td>{userDetails.location || "Not found"}</td>
                </tr>
                <tr>
                  <th>Followers</th>
                  <td>{userDetails.followers}</td>
                </tr>
                <tr>
                  <th>Following</th>
                  <td>{userDetails.following}</td>
                </tr>
                <tr>
                  <th>Hireable</th>
                  <td>{userDetails.hireable ? "Yes" : "No"}</td>
                </tr>
              </tbody>
            </table>
            <h2 className="top5">Top 5 Repositories:</h2>
            <table className="user-details-table">
              {" "}
              {/* Use the same table styling */}
              <tbody>
                {repos.map((repo) => (
                  <tr key={repo.id}>
                    <td>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {repo.name}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </center>
      </div>
    </>
  );
}

export default UserProfile;
