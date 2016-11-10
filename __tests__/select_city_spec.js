import React from 'react';
import selectCity from '../public/actions/select_city';
import reducerActiveCity from '../public/reducers/reducer_active_city';

describe('selectCity', () => {
  it('should be a function', ()=> {
    expect(selectCity).toEqual(jasmine.any(Function))
  });
});

describe('reducerActiveCity', () => {
  it('should be a function', ()=> {
    expect(reducerActiveCity).toEqual(jasmine.any(Function))
  });
});


describe('actions', () => {
  it('should create an action to change the city', () => {
    const city = 'Chicago'
    const expectedAction = {
      type: "CITY_SELECTED",
      payload: city
    }
    expect(selectCity(city)).toEqual(expectedAction);
  })
})
