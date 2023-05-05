import React from "react";
import { BsSearch } from "react-icons/bs";
import { useEffect, useState } from "react";
import { fetchData, fetchTabData } from "../service";

const RecipeList = (props) => {
  const [searchTearm, setSearchTearm] = useState("");
  const [query, setQuery] = useState("pizza");
  const [data, setData] = useState("");


  const searchrecipe=(searchQuery)=>{
    fetchData(searchQuery).then((response) => {
        setData(response);
        props.setLoader(false);
        console.log(response);
  });
}

const discription = (URL)=>{
  window.open(URL,'_blank');
}

  useEffect(() => {
    fetchData(query).then((response) => {
      setData(response);
      props.setLoader(false);
    });
  }, []);
  const handleSubmit = e => {
    searchrecipe(searchTearm);
    props.setLoader(true);
  }

  const handleKeypress = e => {
    //it triggers by pressing the enter key
  if (e.keyCode === 13) {
    handleSubmit();
  }
  };

  return (
    <div className="container">
      <div className="heading-line">
        <strong>Search Recipes</strong>
        <div className="input-wrapper">
          <input
            onChange={(e) => setSearchTearm(e.target.value)}
            value={searchTearm}
            type="text"
            placeholder="Search your recipe"
            onKeyDown={handleKeypress}
          />
          <button onClick={handleSubmit} type="submit">
            <BsSearch />
          </button>
        </div>
      </div>
      <div className="flexbox">
        {data && data.count !=0 ?
          data.hits.map((item, index) => (
            <div onClick={()=> discription(item.recipe.url)} key={index} className="flexItem" >
              <div className="img-wrapper">
                <img src={item.recipe.image} alt={item.recipe.label} />
              </div>
              <p>{item.recipe.label}</p>
            </div>
          ))
          :<p className="error">Something went wrong...</p>
        }
      </div>
    </div>
  );
};

export default RecipeList;
