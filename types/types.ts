import { Double } from 'mongodb';

export type Comment = {
  id: string;
  text: string;
  author: string;
  authorImage: string;
};

export type Video = {
  _id?: string;
  title: string;
  timestamp: Double;
  videoId: string;
  fromDb?: boolean;
  comments: Comment[];
  thumbnails: string;
};

export type InputList = {
  videoId: string;
  error: boolean;
  invalid: boolean;
};

export type VideoContextState = {
  allVideos: Video[];
  addVideos: (videos: Video[]) => void;
  removeVideo: (id: string) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
};
