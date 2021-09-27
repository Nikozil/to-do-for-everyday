import { getFirebase } from './firebase';

describe('firebase', () => {
  it('initialized', () => {
    expect(getFirebase()).toBeTruthy();
  });
  it('initialized then instance is exist', () => {
    let instance = {};
    expect(getFirebase()).toBeTruthy();
  });

  it('not initialized', () => {
    let windowSpy: jest.SpyInstance = jest.spyOn(window, 'window', 'get');

    windowSpy.mockImplementation(() => undefined);
    expect(getFirebase()).toBeNull();
  });
});
