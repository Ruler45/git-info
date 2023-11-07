import "./Home.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Home = () => {
  const inputRef = useRef("");
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [bio, setBio] = useState("");
  const [repo, setRepo] = useState();
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  const [git, setGit] = useState("");
  const [imageUrl, setImg] = useState("");

  useEffect(() => {
    setFullname();
  }, []);

  const handleClick = () => {
    console.log(inputRef.current.value);
    axios
      .get(`https://api.github.com/users/${inputRef.current.value}`)
      .then((res) => {
        setUsername(res.data.login);
        setFullname(res.data.name);
        setRepo(res.data.public_repos);
        setImg(res.data.avatar_url);
        setFollowers(res.data.followers);
        setFollowing(res.data.following);
        setGit(res.data.html_url);
        setBio(res.data.bio);
        console.log(res.data);

        setMessage("Success");
      })
      .catch((error) => {
        console.log(error);
        setMessage("User name doesn't exist");
      });
  };

  return (
    <div className="container">
      <div className="inner-container my-5">
        <iconify-icon icon="devicon:github" width="100"></iconify-icon>
        <h2 className="heading">Github User Info!</h2>
        <div className="search-area">
          <input
            className="search-bar"
            type="text"
            placeholder="Enter user name here"
            ref={inputRef}
          />
          <button
            onClick={handleClick}
            type="button"
            className="btn btn-primary"
          >
            Search
          </button>
        </div>

        <h5 className="message">{message}</h5>
        <div className="Card">
          <div className="info-box">
            <img className="avatar" src={imageUrl} alt="" />
            <div className="info-details">
              <div className="infos">
                Name: {fullname != null ? fullname : " "}
              </div>
              <div className="infos">Username: {username}</div>
              <div className="infos">Bio: {bio != null ? bio : " "}</div>
            </div>
          </div>
          <div className="info">
            <div className="infos">No of Repos: {repo}</div>
            <div className="infos">Followers: {followers}</div>
            <div className="infos">Following: {following}</div>
            <div className="infos">
              Github url:
              {git ? (
                <a href={git}>
                  <iconify-icon icon="devicon:github" width="15"></iconify-icon>
                </a>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
