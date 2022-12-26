import isHttpLink from "./is-http-link";

describe('isHttpLink', () => {
  it('should return false if not begin with https or http', () => {    
    expect(isHttpLink('/src/dump')).toBeFalsy();
    expect(isHttpLink('https://domain')).toBeTruthy();
    expect(isHttpLink('http://domain')).toBeTruthy();
  })
})