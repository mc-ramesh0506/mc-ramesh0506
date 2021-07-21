import React from 'react';
import { shallow } from 'enzyme';
import {LoginPage} from '../modules/components/LoginPage';
it('renders without crashing', () => {
  shallow(<LoginPage />);
});