import React from 'react';
import PostJournalEntry from "./postJournalEntry";
import HomePage from "./homePage"
import HomepageListItems from "./homePageListItems"
import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })


  describe("rendering components",()=>{
    it('renders PostJournalEntry Correctly', () => {
      const wrapper = shallow(<PostJournalEntry/>)
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('renders Homepage Correctly', () => {
      const wrapper = shallow(<HomePage/>)
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('renders HomepageListItems Correctly', () => {
      const wrapper = shallow(<HomepageListItems/>)
      expect(toJson(wrapper)).toMatchSnapshot();
    });

  })