import { BrowserRouter, Route, Routes } from "react-router-dom";
import { IQuestion } from "./Interface/question.interface";
import { FinalScreen } from "./Pages/Final/FinalScreen";
import { StateContext } from "./Context/scoreContext";
import { ChakraProvider } from "@chakra-ui/react";
import { Start } from "./Pages/Start/Start";
import { Main } from "./Pages/Main/Main";
import { API_URL } from "./Const/url";
import { useState } from "react";
import routes from "./Const/routes";
import axios from "axios";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [error, setError] = useState("");
  const [myAnswers, setMyAnswers] = useState("");
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);

  async function GetData(difficulty = "") {
    await axios
      .get(API_URL + `${difficulty}&type=boolean`)
      .then((response) => {
        setQuestions(response.data.results);
        console.log(response.data.results);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }

  return (
    <StateContext.Provider value={{ setScore }}>
      <ChakraProvider>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Start getData={GetData} />} />
              <Route
                path={routes.Main}
                element={
                  <Main
                    setScore={setScore}
                    setMyAnswers={setMyAnswers}
                    score={score}
                    error={error}
                    loading={loading}
                    questions={questions}
                  />
                }
              />
              <Route
                path={routes.Result}
                element={<FinalScreen myAnswer={myAnswers} questions={questions} score={score} />}
              />
            </Routes>
          </BrowserRouter>
        </div>
      </ChakraProvider>
    </StateContext.Provider>
  );
}

export default App;
