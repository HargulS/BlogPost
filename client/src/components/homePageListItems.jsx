import React, { useState, useEffect, usePrevious } from "react";
import { Link } from "react-router-dom";

export default function HomePageListItems(props) {
  let { name, title, journalEntry, date, file, idx,data } = props;
  console.log("HomepageList",idx)
  return (
    <main className="homepageList">
      <Link to={`/${idx}`}>
        <section className="homepageList__listContainer">
          <ul className="homepageList__listItems">
            <li className="homepageList__listItemImgWrapper">
              <img className="homepageList__listItemImg" alt="" src={file} />
            </li>
            <li className="homepageList__listItemTitle">Title:{title}</li>
            <li className="homepageList__listItemAuthor">Name:{name}</li>
            <li className="homepageList__listItemJournal">
              Description:{journalEntry}
            </li>
            <li className="homepageList__listItemDate"> Date:{date}</li>
            <li className="homepageList__listItemReadMe">Click To Read</li>
          </ul>
        </section>
      </Link>

      {usePrevious}
      {/* </a> */}
    </main>
  );
}
