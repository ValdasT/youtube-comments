import { AlertColor } from '@mui/material';
import { createContext, FC, useState } from 'react';
import { VideoContextState, Video } from '../types/types';

export const VideoContext = createContext<VideoContextState>({
  allVideos: [],
  addVideo: () => undefined,
  removeVideo: () => undefined,
  loading: false,
  setLoading: () => undefined,
  alert: { show: false, message: '', severity: 'info' },
  setAlert: () => undefined,
});

type Props = {
  children?: React.ReactNode;
};

const VideoProvider: FC<Props> = ({ children }) => {
  const [allVideos, setAllVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'info' as AlertColor });

  const addVideo = (newVideo: Video) => setAllVideos([...allVideos, newVideo]);
  const removeVideo = (id: string) => setAllVideos(allVideos.filter((video) => video.id !== id));

  return (
    <VideoContext.Provider
      value={{
        allVideos,
        addVideo,
        removeVideo,
        loading,
        setLoading,
        alert,
        setAlert,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export default VideoProvider;
