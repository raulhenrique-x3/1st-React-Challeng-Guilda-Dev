import { Select } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/Button/Button";
import "./start.scss";

interface IStart {
  onClick?: () => void;
  getData: (difficulty: string) => void;
}

export const Start: React.FC<IStart> = ({ getData }) => {
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  function handleSubmit() {
    if (!difficulty) {
      setError(true);
    } else {
      getData(difficulty);
      setError(false);
      navigate("/Main");
    }
  }

  return (
    <div className="startScreen">
      <div className="startContent">
        <h1 className="triviaTitle">Welcome to the Trivia Challenge!</h1>
        <h2 className="triviaDesc">You will be presented with 10 True or False questions.</h2>
        <h3 className="triviaDesc0">Can you score 100%?</h3>
        {error && <p className="errorText">Select an difficulty</p>}
        <Select
          placeholder="Select an difficulty"
          value={difficulty}
          width={"md"}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value={"easy"}>Easy</option>
          <option value={"medium"}>Medium</option>
          <option value={"hard"}>Hard</option>
        </Select>
        <Button type="Primary" label="Begin" round={false} size="large" click={handleSubmit} />
      </div>
    </div>
  );
};
