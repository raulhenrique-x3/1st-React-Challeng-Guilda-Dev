import { IQuestion } from "../../Interface/question.interface";
import { StateContext } from "../../Context/scoreContext";
import { Button } from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import "./final.scss";

interface IScore {
  questions: IQuestion[];
  score: React.ReactNode;
  myAnswer: React.ReactNode;
  answers?: string;
}
export const FinalScreen: React.FC<IScore> = ({ score, questions, myAnswer }) => {
  const { setScore } = useContext(StateContext);
  const navigate = useNavigate();

  function Restart() {
    setScore(0);
    navigate("/");
  }

  return (
    <div className="finalScreen">
      <div className="finalInfo">
        <h2 className="scored">
          Your scored <br /> {score} / {questions.length}
        </h2>
        {questions.map((question, i) => (
          <div className="questionList" key={i}>
            {myAnswer === question.correct_answer ? (
              <FaPlus style={{ color: "green" }}>{question.correct_answer}</FaPlus>
            ) : (
              <FaMinus style={{ color: "red" }}>{question.correct_answer}</FaMinus>
            )}
            <p className="questionListAnswer" dangerouslySetInnerHTML={{ __html: question.question }} />
          </div>
        ))}

        <Button label={"PLAY AGAIN?"} size={"large"} type={"Primary"} click={Restart} />
      </div>
    </div>
  );
};
