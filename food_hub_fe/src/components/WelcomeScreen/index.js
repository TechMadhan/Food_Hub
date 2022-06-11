import React, { Component } from "react";
import "./style.css";

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      contact: "",
    };
  }

  onChangeHandler = (state, value) => {
    console.log("Eee", state, value, this.state.contact);
    this.setState({
      [state]: value,
    });
  };

  onSubmitHandler = () => {
    console.log("", this.props.history);
    localStorage.setItem("isAuthenticated", true);
    this.props.history.push("/menu");
  };
  render() {
    const { name, contact } = this.state;
    return (
      <div>
        <h3
          style={{
            padding: "20px",
            margin: "0px",
            textAlign: "center",
            marginTop: "10%",
          }}
        >
          Welcome to Food Hub
        </h3>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <p>Kindly enter your details to get your personalized menu</p>
          <div>
            <input
              type={"text"}
              name={"name"}
              value={name}
              className="inputClass"
              placeholder={"Enter your name"}
              onChange={(e) => {
                this.onChangeHandler(e.target.name, e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type={"number"}
              name={"contact"}
              className="inputClass"
              placeholder={"Contact No."}
              value={contact}
              onChange={(e) => {
                this.onChangeHandler(e.target.name, e.target.value);
              }}
              maxLength={10}
            />
          </div>
          <button
            disabled={!name.trim() || !contact || contact.length !== 10}
            onClick={this.onSubmitHandler}
            className="submitBtn"
          >
            Get Menus
          </button>
        </div>
      </div>
    );
  }
}
