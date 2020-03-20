import React from 'react';
import compareListings from '../public/actions/compare_listings';
import reducerCompareListings from '../public/reducers/reducer_compare_listings';

describe('compareListings', () => {
  it('should be a function', () => {
    expect(compareListings).toEqual(jasmine.any(Function));
  });
});

describe('reducerCompareListings', () => {
    it('should be a function', () => {
        expect(reducerCompareListings).toEqual(jasmine.any(Function));
    });
});


describe('actions', () => {
  it('should create an action to compare Listings', () => {
    const compare = [{}, {}];
    const expectedAction = {
        type: 'LISTINGS_COMPARED',
        payload: compare
    };
    expect(compareListings(compare)).toEqual(expectedAction);
  });
});