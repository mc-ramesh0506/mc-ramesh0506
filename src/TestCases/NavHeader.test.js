import React from 'react';
import { shallow } from 'enzyme';
import NavHeader from '../modules/components/NavHeader';
it('renders without crashing', () => {
  shallow(<NavHeader />);
});