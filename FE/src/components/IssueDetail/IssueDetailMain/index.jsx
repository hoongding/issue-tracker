import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Icon from '../../common/Icon';
import Button from '../../common/Button';
import SideBar from '../../common/SideBar';
import TextArea from '../../common/TextArea';
import Comments from './Comments';
import { $IssueDetailMain, $IssueCommentArea, $IssueDetailMainLayout } from './style';
import useFetch from '../../../hooks/useFetch';
import { COMMENTS } from '../../../constants/api';

const IssueDetailMain = ({
  detailIssue,
  user: userData,
  label: labelData,
  milestone: milestoneData,
  getNewIssueData,
}) => {
  const [selectedItems, setSelectedItems] = useState({
    assignee: detailIssue.assignee[0]?.userId,
    milestone: detailIssue.milestone?.milestoneId,
    label: detailIssue.label[0]?.labelId,
  });

  const [comment, setComment] = useState('');
  const [files, setFiles] = useState([]);

  const { fetchData: postCommentData } = useFetch(
    COMMENTS.POST_COMMENT(detailIssue.issueId),
    'POST',
    {
      writerId: 2,
      name: '니노',
      url: 'https://avatars.githubusercontent.com/u/95615105?v=4',
      contents: comment,
      createdAt: new Date(),
    },
    true,
  );

  const commentEditHandler = ({ target }) => {
    setComment(target.value);
  };
  const filesUploadHandler = ({ target }) => {
    setFiles([...target.files]);
  };

  const changeAssigneeHandler = (userId) => {
    setSelectedItems({ ...selectedItems, assignee: userId });
  };

  const changeLabelHandler = (labelId) => setSelectedItems({ ...selectedItems, label: labelId });

  const changeMilestoneHandler = (milestoneId) => {
    setSelectedItems({ ...selectedItems, milestone: milestoneId });
  };

  const postNewComment = async () => {
    await postCommentData();
    setComment('');
    getNewIssueData();
  };

  return (
    <$IssueDetailMainLayout>
      <$IssueCommentArea>
        <$IssueDetailMain>
          <Comments issue={detailIssue} getNewIssueData={getNewIssueData} />
        </$IssueDetailMain>
        <TextArea
          id="comment"
          value={comment}
          onChange={commentEditHandler}
          size="S"
          files={files}
          filesUploadHandler={filesUploadHandler}
        />
        <Button type="contained" size="S" onClick={postNewComment}>
          <Icon name="plus" />
          <p>코멘트 작성</p>
        </Button>
      </$IssueCommentArea>
      <SideBar
        issueId={detailIssue.issueId}
        assignees={userData}
        labels={labelData}
        milestones={milestoneData}
        selectedItems={selectedItems}
        changeAssigneeHandler={changeAssigneeHandler}
        changeLabelHandler={changeLabelHandler}
        changeMilestoneHandler={changeMilestoneHandler}
      />
    </$IssueDetailMainLayout>
  );
};

IssueDetailMain.propTypes = {
  detailIssue: PropTypes.object.isRequired,
  user: PropTypes.array.isRequired,
  label: PropTypes.array.isRequired,
  milestone: PropTypes.array.isRequired,
  getNewIssueData: PropTypes.func.isRequired,
};

export default IssueDetailMain;
