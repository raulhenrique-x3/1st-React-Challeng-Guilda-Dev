import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../Context/scoreContext";
import { Button } from "../Button/Button";
import "./final.scss";

interface IScore {
  score: React.ReactNode;
}
export const FinalScreen: React.FC<IScore> = ({ score }) => {
  const { setScore } = useContext(StateContext);
  const navigate = useNavigate();
  function Restart() {
    setScore(0);
    navigate("/");
  }
  return (
    <div className="finalScreen">
      <div className="finalInfo">
        <h1>Quiz finished!</h1>
        <h2>Your score is: {score}</h2>
        <Button label={"Restart"} size={"large"} type={"Primary"} click={Restart} />
      </div>
    </div>
  );
};
