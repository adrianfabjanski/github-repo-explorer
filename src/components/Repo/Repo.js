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
            <h3>&#9733;</h3>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Repo;
