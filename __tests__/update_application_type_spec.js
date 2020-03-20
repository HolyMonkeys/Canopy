import React from 'react';
import updateApplication from '../public/actions/update_application_type';
import reducerUpdateApplication from '../public/reducers/reducer_application_type';
import typeToAppView from '../public/actions/typeToAppView';


describe('updateApplication', () => {
  it('should be a function', () => {
    expect(updateApplication).toEqual(jasmine.any(Function));
  });
});

describe('reducerUpdateApplication', () => {
  it('should be a function', () => {
    expect(reducerUpdateApplication).toEqual(jasmine.any(Function));
  });
});

describe('typeToAppView', () => {
  it('should be a function', () => {
    expect(typeToAppView).toEqual(jasmine.any(Function));
  });
});
