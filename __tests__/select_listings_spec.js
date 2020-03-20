import React from 'react';
import selectListing from '../public/actions/select_listing';
import reducerActiveListing from '../public/reducers/reducer_active_listing';

describe('selectListing', () => {
  it('should be a function', () => {
    expect(selectListing).toEqual(jasmine.any(Function));
  });
});

describe('reducerActiveListing', () => {
  it('should be a function', () => {
    expect(reducerActiveListing).toEqual(jasmine.any(Function));
  });
});

describe('actions', () => {
  it('should create and action to compare Listings', () => {
    const listing = [];
    const expectedAction = {
      type: 'LISTING_SELECTED',
      payload: listing
    };
    expect(selectListing(listing)).toEqual(expectedAction);
  });
});

