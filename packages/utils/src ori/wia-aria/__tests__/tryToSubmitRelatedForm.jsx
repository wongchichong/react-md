import { fireEvent, render } from '@testing-library/react';
import { tryToSubmitRelatedForm } from '../tryToSubmitRelatedForm';
function Test(_a) {
  var _b = _a.id,
    id = _b === void 0 ? 'form' : _b,
    _c = _a.submit,
    submit = _c === void 0 ? 'internal' : _c,
    onSubmit = _a.onSubmit,
    onNotSubmit = _a.onNotSubmit;
  var onKeyDown = function (event) {
    if (tryToSubmitRelatedForm(event)) {
      return;
    }
    onNotSubmit();
  };
  return (
    <>
      <form id={id} onSubmit={onSubmit}>
        <div
          id="radio"
          role="radio"
          aria-checked={false}
          onKeyDown={onKeyDown}
          tabIndex={0}
        >
          Radio
        </div>
        {submit === 'internal' && <button type="submit">Submit</button>}
      </form>
      {submit === 'external' && (
        <button form={id} type="submit">
          Submit External
        </button>
      )}
    </>
  );
}
describe('tryToSubmitRelatedForm', function () {
  it('should do nothing if the key is not enter', function () {
    var onSubmit = jest.fn();
    var onNotSubmit = jest.fn();
    var getByRole = render(
      <Test onSubmit={onSubmit} onNotSubmit={onNotSubmit} />
    ).getByRole;
    var radio = getByRole('radio', { name: 'Radio' });
    fireEvent.keyDown(radio, { key: 'A' });
    fireEvent.keyDown(radio, { key: 'Tab' });
    expect(onSubmit).not.toBeCalled();
    expect(onNotSubmit).toBeCalledTimes(2);
  });
  it('should do nothing if the form does not have a submit button', function () {
    var onSubmit = jest.fn();
    var onNotSubmit = jest.fn();
    var getByRole = render(
      <Test onSubmit={onSubmit} onNotSubmit={onNotSubmit} submit={null} />
    ).getByRole;
    var radio = getByRole('radio', { name: 'Radio' });
    fireEvent.keyDown(radio, { key: 'Enter' });
    expect(onSubmit).not.toBeCalled();
    expect(onNotSubmit).not.toBeCalled();
  });
  it('should attempt to find a submit button that has the form attribute set to the form id if the form has no submit button inside', function () {
    var error = jest.spyOn(console, 'error').mockImplementation(function () {});
    var onSubmit = jest.fn();
    var onNotSubmit = jest.fn();
    var getByRole = render(
      <Test onSubmit={onSubmit} onNotSubmit={onNotSubmit} submit="external" />
    ).getByRole;
    var radio = getByRole('radio', { name: 'Radio' });
    fireEvent.keyDown(radio, { key: 'Enter' });
    expect(onSubmit).toBeCalledTimes(1);
    expect(onNotSubmit).not.toBeCalled();
    error.mockRestore();
  });
  it('should do nothing if the element is not in a form', function () {
    function WithoutForm(_a) {
      var onNotSubmit = _a.onNotSubmit;
      var onKeyDown = function (event) {
        if (tryToSubmitRelatedForm(event)) {
          return;
        }
        onNotSubmit();
      };
      return (
        <>
          <div
            id="radio"
            role="radio"
            aria-checked={false}
            onKeyDown={onKeyDown}
            tabIndex={0}
          >
            Radio
          </div>
        </>
      );
    }
    var onNotSubmit = jest.fn();
    var getByRole = render(<WithoutForm onNotSubmit={onNotSubmit} />).getByRole;
    var radio = getByRole('radio', { name: 'Radio' });
    fireEvent.keyDown(radio, { key: 'Enter' });
    expect(onNotSubmit).not.toBeCalled();
  });
});
//# sourceMappingURL=tryToSubmitRelatedForm.jsx.map
