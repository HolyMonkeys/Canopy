import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../public/components/footer';

describe('<Footer />', () => {
  it('should render 5 list items', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('li').length).toBe(5);
  });
});
