import React from "react";
import "./Repo.css";

const Repo = ({ repo }) => {
  return (
    <div>
      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
        title={`Go to ${repo.owner.login}/${repo.name}`}
      >
        <div className="repo-cnt">
          <div className="repo-head">
            <h4>{repo.name}</h4>
            <p className="repo-desc">{repo.description}</p>
          </div>
          <div>
            <h4 style={{ fontSize: "15px" }}>
              {repo.stargazers_count} &#9733;
            </h4>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Repo;
