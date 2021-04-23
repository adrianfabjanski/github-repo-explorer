import React, { useState } from "react";
import "./Card.css";
import axios from "axios";
import { FaAngleUp, FaTimes } from "react-icons/fa";
import Repo from "../Repo/Repo";
import Input from "../Input/Input";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

const Card = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedId, setCollapsedId] = useState();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearching(true);
    props.actions.setSearchTerm(searchQuery);
    axios
      .get(`https://api.github.com/search/users?q=${searchQuery}&per_page=5`)
      .then((res) => {
        props.actions.setUsers(res.data.items);
        setSearching(false);
      });
  };

  const handleCollapse = (id) => {
    id === collapsedId ? setCollapsedId(0) : setCollapsedId(id);
  };

  const getRepos = (login) => {
    axios.get(`https://api.github.com/users/${login}/repos`).then((res) => {
      setRepos(res.data);
      setLoading(false);
    });
  };

  const handleClear = () => {
    props.actions.setUsers([]);
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
          {props.applicationState.users.length > 0 ? (
            <div className="results-msg">
              <span>
                Showing users for "{props.applicationState.searchTerm}"
              </span>
              <FaTimes id="clear-btn" onClick={handleClear} title="Clear" />
            </div>
          ) : null}
          {props.applicationState.users.map((result) => (
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
                      repos.map((repo) => <Repo repo={repo} key={repo.id} />)
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

const mapStateToProps = (state) => ({ applicationState: state });
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
