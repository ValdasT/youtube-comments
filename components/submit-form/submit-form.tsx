import { ChangeEvent, FC, Fragment, useContext, useState } from 'react';
import { VideoContext } from '../../context/video-context';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Router from 'next/router';
import CustomButton from '../custom-button/custom-button';
import classes from './submit-form.module.scss';
import { TextField, Button, Input } from '@mui/material';
import youtube from '../../pages/api/youtube';

const SubmitForm: FC = () => {
  const { allVideos, addVideo, setLoading, setAlert } = useContext(VideoContext);
  const [inputList, setInputList] = useState([{ videoId: '', error: false }]);

  const handleRemoveClick = (index: number) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { videoId: '', error: false }]);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { value } = e.target;
    const list = [...inputList];
    list[index] = { videoId: value.trim(), error: value.length ? false : true };
    setInputList(list);
  };

  const onSubmit = async () => {
    console.log(inputList);
    setInputList(inputList.map((list: any, i) => (list.videoId.trim().length ? list : { videoId: inputList[i].videoId, error: true })));
    if (inputList.some((el) => el.error === true) ? false : true) {
      let videosIds = '';
      const promises: any[] = [];
      inputList.forEach((e: any, i) => {
        promises.push(
          youtube.get(`/commentThreads`, {
            params: { videoId: e.videoId, part: 'snippet', maxResults: 20 },
          })
        );
        videosIds += i === inputList.length ? `${e.videoId}` : `${e.videoId},`;
      });
      console.log(videosIds);
      const { data } = await youtube.get(`/videos`, { params: { id: videosIds, part: 'snippet' } });
      console.log(data);
      try {
        const res = await Promise.all(promises);
        const data = res.map((res) => res.data);
        console.log(data.flat());
      } catch {
        throw Error("Promise failed");
      }
    }
    // const { videoId } = values;
    // setLoading(true);
    // try {
    //   const { data } = await youtube.get(`/videos`, { params: { id: videoId, part: 'snippet' } });
    //   if (data.items.length) {
    //     const newVideo = {
    //       id: videoId,
    //       title: data.items[0].snippet.title,
    //       thumbnails: data.items[0].snippet.thumbnails.default.url,
    //     };
    //     allVideos.some((el) => el.id === newVideo.id) ? null : addVideo(newVideo);
    //     Router.push(`/${newVideo.id}`);
    //   } else {
    //     setAlert({ show: true, message: 'The video is not found. Please try another Id.', severity: 'error' });
    //     // resetForm();
    //   }
    // } catch (err) {
    //   console.log(err);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className={classes['form-container']}>
      {inputList.map((x, i) => {
        return (
          <Fragment key={i}>
            <div className={classes['form-actions']}>
              <div className={classes['form-input']}>
                <TextField
                  size="small"
                  style={{ width: '250px' }}
                  name="videoId"
                  label="Video id"
                  value={x.videoId}
                  onChange={(e) => handleInputChange(e, i)}
                />
                {x.error ? <div className={classes['invalid-feedback']}>{`Video Id is required`}</div> : null}
              </div>
              <div className={classes['form-buttons']}>
                {inputList.length !== 1 && (
                  <Button size="small" variant="outlined" onClick={() => handleRemoveClick(i)}>
                    remove
                  </Button>
                )}
                {inputList.length - 1 === i && inputList.length !== 10 && (
                  <Button style={{ margin: '0 5px' }} size="small" variant="outlined" onClick={handleAddClick}>
                    add
                  </Button>
                )}
              </div>
            </div>
          </Fragment>
        );
      })}
      <div className={classes['buttons-container']}>
        <Button size="small" variant="outlined" type="submit" onClick={() => onSubmit()}>
          Submit
        </Button>
      </div>
      {/* <form onSubmit={formik.handleSubmit}>
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
          <Button type="submit">Submit</Button>
        </div>
      </form> */}
    </div>
  );
};

export default SubmitForm;
