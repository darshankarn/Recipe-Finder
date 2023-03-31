import { useState } from "react";
import "./App.scss";
import Header from "./Components/Header";
import RecipeList from "./Components/RecipeList";
import Tabs from "./Components/Tabs";

function App() {
  const [loader, setLoader] = useState(true);
  return (
    <div className="main">
      <Header />
      <Tabs setLoader={setLoader} />
      <RecipeList setLoader={setLoader} />
      {loader && (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
}

export default App;
