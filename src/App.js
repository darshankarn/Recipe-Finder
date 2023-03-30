
import './App.scss';
import Header from './Components/Header';
import RecipeList from './Components/RecipeList';
import Tabs from './Components/Tabs';

function App() {
  return (
    <div className="main">
    <Header/>
    <Tabs/>
    <RecipeList/>
    </div>
  );
}

export default App;
