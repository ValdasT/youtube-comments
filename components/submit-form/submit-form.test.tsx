import { act, fireEvent, render, screen } from '@testing-library/react';
import SubmitForm from './submit-form';
import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

beforeEach(() => {
  fetchMock.doMock();
});

test('Should be submit video input on page', async () => {
  render(<SubmitForm />);
  const videoInput = screen.getByLabelText('Video id');
  await act(async () => {
    fireEvent.change(videoInput, { target: { value: 'New video id' } });
  });
  expect(videoInput).toHaveValue('New video id');
  await act(async () => {
    fireEvent.change(videoInput, { target: { value: '' } });
  });
  expect(videoInput).toHaveValue('');
});

test('Should be error message when submitting empty video input input', async () => {
  const { getByText } = render(<SubmitForm />);
  const videoInput = screen.getByLabelText('Video id');
  await act(async () => {
    fireEvent.click(getByText('Submit'));
  });
  const videoIdErrorMsg = getByText('Video Id is required');
  expect(videoIdErrorMsg).toBeInTheDocument();
  await act(async () => {
    fireEvent.change(videoInput, { target: { value: 'Video id' } });
  });
  await act(async () => {
    fireEvent.click(getByText('Submit'));
  });
  expect(videoIdErrorMsg).not.toBeInTheDocument();
});

test('Should be remove button when press add button', async () => {
  const { getByText, getAllByText } = render(<SubmitForm />);
  const addButton = getByText('add');
  expect(addButton).toBeInTheDocument();
  await act(async () => {
    fireEvent.click(getByText('add'));
  });
  const removeButton = getAllByText('remove')[0];
  expect(removeButton).toBeInTheDocument();
});
