import React from 'react';
import selectUser from '../public/actions/select_user';
import reducerActiveUser from '../public/reducers/reducer_active_user';

describe('selectUser', () => {
  it('should be a function', () => {
    expect(selectUser).toEqual(jasmine.any(Function));
  });
});

describe('reducerActiveUser', () => {
  it('should be a function', () => {
    expect(reducerActiveUser).toEqual(jasmine.any(Function));
  });
});

describe('actions', () => {
  it('should create an action to update the current user', () => {
    const user = 'JohnS mith';
    const expectedAction = {
      type: 'USER_SELECTED',
      payload: user
    };
    expect(selectUser(user)).toEqual(expectedAction);
  });
});
