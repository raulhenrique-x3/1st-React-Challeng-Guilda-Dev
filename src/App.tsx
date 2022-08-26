import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FinalScreen } from "./Components/Final/FinalScreen";
import { IQuestion } from "./Interface/question.interface";
import { StateContext } from "./Context/scoreContext";
import { ChakraProvider } from "@chakra-ui/react";
import { Start } from "./Components/Start/Start";
import { Main } from "./Components/Main/Main";
import { useState } from "react";
import routes from "./Const/routes";
import axios from "axios";
import "./App.css";
import { API_URL } from "./Const/url";

function App() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [error, setError] = useState("");
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
              <Route path="/" element={<Start getData={GetData} />}></Route>
              <Route
                path={routes.Main}
                element={
                  <Main setScore={setScore} score={score} error={error} loading={loading} questions={questions} />
                }
              ></Route>
              <Route path={routes.Result} element={<FinalScreen score={score} />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </ChakraProvider>
    </StateContext.Provider>
  );
}

export default App;
