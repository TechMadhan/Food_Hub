import React from "react";
import { useAuth } from "../../store/hooks";
import "./style.css";

const WelcomeScreen = ({ history }) => {
  const { signInUser } = useAuth();

  const onSubmitHandler = () => {
    signInUser();
    history.push("/menu");
  };
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

        <button onClick={onSubmitHandler} className="submitBtn">
          Sign-in with Google
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
