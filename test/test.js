describe('Testing the functionality, this is the checklist', () => {
  it('should fetch services api', () => {
    expect(fetchAPI('https://us-west-2.cloudconformity.com/v1/services')).toBe(
      true
    );
  });

  it('should check if a value is empty', () => {
    expect(isEmpty('not empty')).toBe(false);
  });
});
