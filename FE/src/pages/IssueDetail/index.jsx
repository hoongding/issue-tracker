import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ISSUES, USERS, LABELS, MILESTONES } from '../../constants/api';
import useFetch from '../../hooks/useFetch';
import TextArea from '../../components/common/TextArea';
import SideBar from '../../components/common/SideBar';
import IssueDetailHeader from '../../components/IssueDetail/IssueDetailHeader';
import IssueDetailMain from '../../components/IssueDetail/IssueDetailMain';
import { $IssueDetail, $IssueCommentArea, $IssueDetailMain } from './style';
import Button from '../../components/common/Button';
import Icon from '../../components/common/Icon';

const IssueDetail = (props) => {
  const { issueId } = useParams();
  const { data: issueDetailData } = useFetch(ISSUES.GET_ISSUE(issueId));
  const { data: userData } = useFetch(USERS.GET_ALL_USERS);
  const { data: labelData } = useFetch(LABELS.GET_ALL_LABELS);
  const { data: milestoneData } = useFetch(MILESTONES.GET_ALL_MILESTONES);

  const allDataLoaded = issueDetailData && userData && labelData && milestoneData;

  const [text, setText] = useState('');

  const changeHandler = ({ target }) => {
    setText(target.value);
  };

  return (
    allDataLoaded && (
      <$IssueDetail>
        <IssueDetailHeader issue={issueDetailData} />
        <$IssueDetailMain>
          <$IssueCommentArea>
            <IssueDetailMain
              issue={issueDetailData}
              user={userData}
              label={labelData}
              milestone={milestoneData}
            />
            <TextArea id="comment" value={text} onChange={changeHandler} size="S" />
            <Button type="contained" size="S">
              <Icon name="plus" />
              코멘트 작성
            </Button>
          </$IssueCommentArea>
          <SideBar assignees={userData} labels={labelData} milestones={milestoneData} />
        </$IssueDetailMain>
      </$IssueDetail>
    )
  );
};

IssueDetail.propTypes = {};

export default IssueDetail;