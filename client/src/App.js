import React from "react";
import  {BrowserRouter,Switch, Router, Route } from "react-router-dom";
import "./style/App.css";
import HomePage from "./components/homePage"
import PostJournalEntry from "./components/postJournalEntry"
import DataByID from "./components/dataById"


function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Switch>  
      <Route path="/" exact component = {HomePage}/>
      <Route path="/postdata" exact component = {PostJournalEntry}></Route>
      <Route path="/:id" exact component = {HomePage}/>
      <Route path="/:id" exact component = {DataByID}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
