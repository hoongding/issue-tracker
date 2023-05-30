import React from 'react';
import { useParams } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';

import { ISSUES, USERS, LABELS, MILESTONES } from '../../constants/api';

import IssueDetailHeader from '../../components/IssueDetail/IssueDetailHeader';
import IssueDetailMain from '../../components/IssueDetail/IssueDetailMain';
import { $IssueDetail } from './style';

const IssueDetail = () => {
  // TODO: Text Area UnControlled Component로 바꾸기.
  const { issueId } = useParams();
  const { data: issueDetailData } = useFetch(ISSUES.GET_ISSUE(issueId));
  const { data: userData } = useFetch(USERS.GET_ALL_USERS);
  const { data: labelData } = useFetch(LABELS.GET_ALL_LABELS);
  const { data: milestoneData } = useFetch(MILESTONES.GET_ALL_MILESTONES);

  const allDataLoaded = issueDetailData && userData && labelData && milestoneData;

  return (
    allDataLoaded && (
      <$IssueDetail>
        <IssueDetailHeader issue={issueDetailData} />
        <IssueDetailMain
          detailIssue={issueDetailData}
          user={userData}
          label={labelData}
          milestone={milestoneData}
        />
      </$IssueDetail>
    )
  );
};

export default IssueDetail;