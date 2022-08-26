import React, { useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { Button } from "../Button/Button";
import { IQuestion } from "../../Interface/question.interface";
import "./main.scss";
import { useNavigate } from "react-router-dom";

interface IMain {
  questions: IQuestion[];
  error: React.ReactNode;
  loading: React.ReactNode;
  setScore: Function;
  score: number;
}

export const Main: React.FC<IMain> = ({ questions, error, loading, setScore, score }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="firstContent">
        <Spinner thickness="4px" speed="1s" emptyColor="gray.200" color="blue.500" size="xl" />
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Something went wrong...</p>
      </div>
    );
  }

  const correctAnswer = questions[currentQuestion].correct_answer;

  function isTrue() {
    if (correctAnswer === "True") {
      setCurrentQuestion(currentQuestion + 1);
      setScore(score + 1);
    }
    if (correctAnswer === "False") {
      setCurrentQuestion(currentQuestion + 1);
      setScore(score);
    }

    if (questions.length - 1 === currentQuestion) {
      navigate("/Result");
    }
  }

  function isFalse() {
    if (correctAnswer === "False") {
      setCurrentQuestion(currentQuestion + 1);
      setScore(score + 1);
    }
    if (correctAnswer === "True") {
      setCurrentQuestion(currentQuestion + 1);
      setScore(score);
    }
    if (questions.length - 1 === currentQuestion) {
      navigate("/Result");
    }
  }
  return (
    <main className="firstContent">
      <div className="initialContent">
        <p className="questionCategory">{questions[currentQuestion].category}</p>
        <div className="questionContent">
          <p className="question" dangerouslySetInnerHTML={{ __html: questions[currentQuestion].question }} />
          <p className="score">
            {currentQuestion} of {questions.length}
          </p>
        </div>
        <div className="buttons">
          <Button label={"True"} round={true} size="medium" type="Success" click={isTrue} />
          <Button label={"False"} round={true} size="medium" type="Danger" click={isFalse} />
        </div>
      </div>
    </main>
  );
};
