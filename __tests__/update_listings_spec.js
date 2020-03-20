import React from 'react';
import updateListings from '../public/actions/update_listings';
import reducerUpdateListings from '../public/reducers/reducer_listings';

describe('updateListings', () => {
  it('should be a function', () => {
    expect(updateListings).toEqual(jasmine.any(Function));
  });
});

describe('reducerUpdateListings', () => {
  it('should be a function', () => {
    expect(reducerUpdateListings).toEqual(jasmine.any(Function));
  });
});

describe('actions', () => {
  it('should create an action to update the current listings', () => {
    const listings = [{}, {}, {}, {}];
    const expectedAction = {
      type: 'UPDATE_LISTINGS',
      payload: listings
    };
    expect(updateListings(listings)).toEqual(expectedAction);
  });
});
