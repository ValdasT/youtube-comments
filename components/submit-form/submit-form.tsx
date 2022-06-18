import { FC, useContext, useState } from 'react';
import { VideoContext } from '../../context/video-context';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Router from 'next/router';
import CustomButton from '../custom-button/custom-button';
import classes from './submit-form.module.scss';
import { TextField } from '@mui/material';
import youtube from '../../pages/api/youtube';

const SubmitForm: FC = () => {
  const { allVideos, addVideo, setLoading, setAlert } = useContext(VideoContext);
  const [inputList, setInputList] = useState([{ videoId: '' }]);

  const handleRemoveClick = (index: number) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { videoId: '' }]);
  };

  const formik = useFormik({
    initialValues: {
      videoId: '',
    },
    validationSchema: Yup.object().shape({
      videoId: Yup.string().required('video Id is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      const { videoId } = values;
      setLoading(true);
      try {
        const { data } = await youtube.get(`/videos`, { params: { id: videoId, part: 'snippet' } });
        if (data.items.length) {
          const newVideo = {
            id: videoId,
            title: data.items[0].snippet.title,
            thumbnails: data.items[0].snippet.thumbnails.default.url,
          };
          allVideos.some((el) => el.id === newVideo.id) ? null : addVideo(newVideo);
          Router.push(`/${newVideo.id}`);
        } else {
          setAlert({ show: true, message: 'The video is not found. Please try another Id.', severity: 'error' });
          resetForm();
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className={classes['form-container']}>
      <form onSubmit={formik.handleSubmit}>
        <div className={classes['form-input']}>
          <TextField
            error={formik.errors.videoId ? true : false}
            size="small"
            style={{ width: '250px' }}
            id="videoId"
            name="videoId"
            label="Video id"
            onChange={formik.handleChange}
            value={formik.values.videoId}
            variant="outlined"
          />
          {formik.errors.videoId ? <div className={classes['invalid-feedback']}>{formik.errors.videoId}</div> : null}
        </div>
        <div className={classes['buttons-container']}>
          <CustomButton type="submit">Submit</CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SubmitForm;
