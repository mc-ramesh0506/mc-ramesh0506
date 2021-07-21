import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../modules/components/HomePage';
it('renders without crashing', () => {
  shallow(<HomePage />);
});