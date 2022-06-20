import { queryByAttribute, render } from '@testing-library/react';
import { Double } from 'mongodb';
import VideoItem from './video-item';

const getById = queryByAttribute.bind(null, 'id');
const video = {
  videoId: '1',
  fromDb: true,
  thumbnails: 'https://yt3.ggpht.com/ytc/AKedOLQBzpsRnnTf-aXPzYJ3SxN7EwhAGAzyWtJwVZU1iQ=s48-c-k-c0x00ffffff-no-rj',
  comments: [],
  title: 'Demo video',
  timestamp: new Date('01/30/2022').getTime() as unknown as Double,
};

test('Event details on page', () => {
  const { getByText, container } = render(<VideoItem video={video} />);
  const pageTitle = getById(container, 'title');
  const eventTitle = getByText(video.title);
  expect(pageTitle && eventTitle).toBeInTheDocument();
});

test('Event details page has container class', () => {
  const { container } = render(<VideoItem video={video} />);
  expect(container.firstChild).toHaveClass('video');
});
