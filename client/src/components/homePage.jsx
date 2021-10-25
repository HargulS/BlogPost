import React, { useState, useEffect, usePrevious } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import HomePageListItems from "./homePageListItems";
import DataById from "./dataById";

export default function HomePage(props) {
    /* Hooks */
  const [getAllData, setGetAllData] = useState([]);
    /* End Of Hooks */
    
    /* Functions */
    // Get all the data 
  const getData = async () => {
    await Axios.get("http://localhost:5000/get")
      .then((response) => {
        setGetAllData(response.data);
        console.log("Get All Data",response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  // Sort data by date
  const sortData = () => {
    const data = getAllData;
    const dataToSort = [...data];
    const sortedData = dataToSort
      .sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      })
      .reverse();
    setGetAllData(sortedData);
  };
      /* End Of Functions */
  return (
    <main className="homepage">
      <section className="homepage__linkBtnContainer">
       <div className="homepage__btnContaier">
          <button className="homepage__btn" onClick={sortData}>Toggle By Date</button>
        </div>  
        <Link className="homepage__link" to="/postdata">Post Journal Entry</Link> 
      </section>
      <section className = "homepage__components">
      <div className="homepage__mappedItems">
        {getAllData &&
          getAllData.map((item) => {
            return (
              <HomePageListItems
                key={item.id}
                idx={item.user_id}
                name={item.first_name}
                title={item.title}
                journalEntry={item.journalentry}
                date={item.date_col}
                file={item.file}
                data={getAllData}
              />
            );
          })}
      </div>
      {usePrevious}
      <div className="homepage__dataBydIdComponent">
        <DataById data={getAllData}/>
      </div>
      </section>
    </main>
  );
}
