import React, { useEffect } from "react";
import { useAuth } from "../../store/hooks";
import { Button } from "react-bootstrap";
import "./style.css";
import { useParams } from "react-router-dom";

const WelcomeScreen = ({ history, ...restProps }) => {
  const { signInUser } = useAuth();
  const params = useParams();

  useEffect(() => {
    if (params?.tableID) {
      localStorage.setItem("currentTable", params.tableID);
    }
  }, []);

  const onSubmitHandler = () => {
    signInUser();
    history.push("/menu");
  };
  return (
    <div>
      <h2
        style={{
          padding: "20px",
          margin: "0px",
          textAlign: "center",
          marginTop: "10%",
        }}
      >
        Welcome to Food Hub
      </h2>
      <div
        style={{
        }}
      >
        <p>Kindly sign in to get your personalized menu</p>

        <Button onClick={onSubmitHandler} className="submitBtn">
          Sign-in with Google
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
