import { ChangeEvent, FC, Fragment, useContext, useState } from 'react';
import { VideoContext } from '../../context/video-context';
import { TextField, Button } from '@mui/material';
import youtube from '../../pages/api/youtube';
import { removeUnusedFields } from '../../utils/utils';
import classes from './submit-form.module.scss';
import { Video, InputList } from '../../types/types';

const SubmitForm: FC = () => {
  const { addVideos, setLoading } = useContext(VideoContext);
  const [inputList, setInputList] = useState<InputList[]>([{ videoId: '', error: false, invalid: false }]);
  let promises: any[] = [];

  const handleRemoveClick = (index: number) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { videoId: '', error: false, invalid: false }]);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { value } = e.target;
    const list = [...inputList];
    list[index] = { videoId: value.trim(), error: value.length ? false : true, invalid: false };
    setInputList(list);
  };

  const checkIfValid = (inputList: InputList[], data: any, commentsFromDb: Video[]) => {
    promises = [];
    return inputList.map((e: InputList) => {
      const found = data.items.some((el: any) => el.id === e.videoId);
      const foundInDb = commentsFromDb.some((el: Video) => el.videoId === e.videoId);
      if (!found && foundInDb) {
        return e;
      } else if (found && !foundInDb) {
        promises.push(
          youtube.get(`/commentThreads`, {
            params: { videoId: e.videoId, part: 'snippet', maxResults: 20 },
          })
        );
        return e;
      } else {
        return { videoId: e.videoId, error: e.error, invalid: true };
      }
    });
  };

  const checkFields = () => {
    setInputList(inputList.map((e: InputList) => (e.videoId.length ? e : { ...e, error: true })));
    return inputList.some((el) => el.error === true || el.invalid === true) ? false : true;
  };

  const onSubmit = async () => {
    if (checkFields()) {
      try {
        setLoading(true);
        let videoIds = '';
        const response = await fetch('/api/mongo', {
          method: 'POST',
          body: JSON.stringify({
            name: 'findAll',
            collection: 'videos',
            query: {
              $or: inputList.map((e: InputList) => {
                videoIds += `${e.videoId},`;
                return { videoId: e.videoId, timestamp: { $gte: new Date().getTime() - 24 * 60 * 60 * 1000 } };
              }),
            },
          }),
        });
        let commentsFromDb = await response.json();
        commentsFromDb = commentsFromDb.map((el: Video) => {
          videoIds = videoIds.replace(`${el.videoId},`, '');
          return { ...el, fromDb: true };
        });
        const { data } = await youtube.get(`/videos`, { params: { id: videoIds.slice(0, -1), part: 'snippet' } });
        setInputList(checkIfValid(inputList, data, commentsFromDb));
        const res = await Promise.all(promises);
        const commentsFromApi: any[] = removeUnusedFields(res, data.items);
        commentsFromApi.length
          ? await fetch('/api/mongo', {
              method: 'POST',
              body: JSON.stringify({
                name: 'updateMany',
                collection: 'videos',
                doc: commentsFromApi,
              }),
            })
          : null;

        addVideos(commentsFromApi.concat(commentsFromDb));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
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
                  error={x.error || x.invalid}
                />
                {x.error ? <div className={classes['invalid-feedback']}>{`Video Id is required`}</div> : null}
                {x.invalid ? <div className={classes['invalid-feedback']}>{`Video Id is invalid`}</div> : null}
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
    </div>
  );
};

export default SubmitForm;
