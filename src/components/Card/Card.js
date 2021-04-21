import React, { useState } from "react";
import "./Card.css";
import axios from "axios";
import { FaAngleUp } from "react-icons/fa";
import Repo from "../Repo/Repo";
import Input from "../Input/Input";

const Card = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [collapsedId, setCollapsedId] = useState();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearching(true);
    setSearchTerm(searchQuery);
    axios
      .get(`https://api.github.com/search/users?q=${searchQuery}&per_page=5`)
      .then((res) => {
        setResults(res.data.items);
        setSearching(false);
      });
  };

  const handleCollapse = (id) => {
    if (id === collapsedId) {
      setCollapsedId(0);
    } else {
      setCollapsedId(id);
    }
  };

  const getRepos = (login) => {
    axios.get(`https://api.github.com/users/${login}/repos`).then((res) => {
      setRepos(res.data);
      console.log(res.data);
      setLoading(false);
    });
  };

  return (
    <div className="card-cnt">
      <div className="card">
        <Input
          handleSearch={handleSearch}
          searching={searching}
          setSearchQuery={setSearchQuery}
        />
        <div className="results-cnt">
          {results.length > 0 ? (
            <div className="results-msg">
              <span>Showing users for "{searchTerm}"</span>
            </div>
          ) : null}
          {results.map((result) => (
            <div key={result.id}>
              <div
                className="result"
                onClick={() => {
                  handleCollapse(result.id);
                  getRepos(result.login);
                  setLoading(true);
                }}
              >
                <span>{result.login}</span>{" "}
                <FaAngleUp
                  id={
                    collapsedId === result.id ? "arrow-btn" : "arrow-btn-active"
                  }
                />
              </div>
              <div
                className={
                  collapsedId === result.id ? "accordion-active" : "accordion"
                }
              >
                {collapsedId === result.id ? (
                  <div>
                    {loading ? (
                      <div style={{ textAlign: "center" }}>
                        <div className="lds-dual-ring"></div>
                      </div>
                    ) : repos.length > 0 ? (
                      repos.map((repo) => <Repo repo={repo} />)
                    ) : (
                      <div style={{ textAlign: "center" }}>
                        <p>No repos found</p>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
