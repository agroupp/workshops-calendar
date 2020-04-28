import * as fromMonth from './month.actions';

describe('loadMonths', () => {
  it('should return an action', () => {
    expect(fromMonth.loadMonths().type).toBe('[Month] Load Months');
  });
});
