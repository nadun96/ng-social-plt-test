import { App } from './app';

describe('AppComponent', () => {
  it('should have a title', () => {
    const app = new App();
    expect(app.title).toBe('my-app');
  })
});