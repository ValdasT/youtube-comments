import { FC, useContext, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { Collapse, IconButton } from '@mui/material';
import { AlertType } from '../../types/types';
import { VideoContext } from '../../context/video-context';

type Props = {
  alert: AlertType;
};

const AlertMessage: FC<Props> = ({ alert }) => {
  const { setAlert } = useContext(VideoContext);

  useEffect(() => {
    setTimeout(() => {
      setAlert({ ...alert, show: false });
    }, 3000);
  }, [alert.show]);

  return (
    <Collapse in={alert.show}>
      <Alert
        severity={alert.severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setAlert({ ...alert, show: false });
            }}
          >
            x
          </IconButton>
        }
      >
        {alert.message}
      </Alert>
    </Collapse>
  );
};

export default AlertMessage;
