import { AlertColor } from '@mui/material';
import { createContext, FC, useState } from 'react';
import { VideoContextState, Video } from '../types/types';

export const VideoContext = createContext<VideoContextState>({
  allVideos: [],
  addVideos: () => undefined,
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
  const [allVideos, setAllVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'info' as AlertColor });

  const addVideos = (newVideos: any[]) => setAllVideos(newVideos);
  const removeVideo = (id: string) => setAllVideos(allVideos.filter((video) => video.id !== id));

  return (
    <VideoContext.Provider
      value={{
        allVideos,
        addVideos,
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
