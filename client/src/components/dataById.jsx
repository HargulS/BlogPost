import React, { useState, useEffect, usePrevious } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

export default function DataById(props) {
   /* Hooks */
  const [axiosGetData, setAxiosGetData] = useState([]);
   /* End Of Hooks */

  /* Variables */
  const { id } = useParams()
  const defaultId = "07a730df-0dd4-4f65-ba2d-8d038cb43a84"
   /* End Of Variables */

  /* Functions */
  
  // Get data by id
  const getDataById=((startupId,paramId)=>{
  startupId=defaultId
  if(startupId===defaultId)
    {
      // Get data to display when the page starts
      Axios.get(`http://localhost:5000/${defaultId}`)
      .then((response) => {
        setAxiosGetData(response.data[0]);
        console.log("Data", response.data[0]);
      })  
      .catch((error) => {
        console.log(error);
      });
      //Gets the data using params id 
       paramId=id
       if(paramId!=null){
        Axios.get(`http://localhost:5000/${id}`)
        .then((response) => {
          setAxiosGetData(response.data[0]);
          console.log("DataParam", response.data[0]);
        })  
        .catch((error) => {
          console.log(error);
        });
       }
    }
})
// Rerun the getDataById() when the id changes 
  useEffect(() => {
    getDataById();
  }, [id]);
  /* End Of Functions */

  return (
    <main className="dataById">
      <ul className="dataById__listUl">
      <li className = "dataById__listName">User:{axiosGetData.first_name}</li>
      <li className = "dataById__listDate">Date:{axiosGetData.date_col}</li>
      <li className = "dataById__listEntry">
      Post:{axiosGetData.journalentry}
      </li>
      </ul>
      {usePrevious}
    </main>
  );
}
