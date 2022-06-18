import { AlertColor } from '@mui/material';

export type Video = {
  id: string;
  title: string;
  thumbnails: string;
};

export type AlertType = {
  show: boolean;
  message: string;
  severity: AlertColor;
};

export type VideoContextState = {
  allVideos: Video[];
  addVideo: (video: Video) => void;
  removeVideo: (id: string) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  alert: AlertType;
  setAlert: (alert: AlertType) => void;
};
