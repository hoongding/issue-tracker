import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ISSUES } from '../../../constants/api';
import useFetch from '../../../hooks/useFetch';

import Icon from '../../common/Icon';
import Label from '../../common/Label';
import Button from '../../common/Button';
import TextInput from '../../common/TextInput';
import {
  $IssueDetailHeader,
  $IssueDetailTitle,
  $TitleWrapper,
  $IssueTitle,
  $IssueId,
  $Buttons,
  $IssueDetailInfo,
  $IssueInfoText,
} from './style';

const IssueDetailHeader = ({ issue, getNewIssueData }) => {
  const [isEdited, setIsEdited] = useState(false);
  const [tempTitle, setTempTitle] = useState(issue.issueTitle);
  const [editTitle, setEditTitle] = useState(issue.issueTitle);

  const { fetchData: editIssue } = useFetch(
    ISSUES.PATCH_ISSUE(issue.issueId),
    'PATCH',
    { isOpened: !issue.isOpened },
    true,
  );

  const editBtnHandler = () => {
    setIsEdited(true);
  };

  const cancelEditBtnHandler = () => {
    setIsEdited(false);
    setTempTitle(issue.issueTitle);
    setEditTitle(issue.issueTitle);
  };

  const titleChangeHandler = ({ target }) => {
    setTempTitle(target.value);
  };

  const completeEditHandler = () => {
    setEditTitle(tempTitle);
    setIsEdited(false);
  };

  const statusChangeHandler = async () => {
    await editIssue();
    getNewIssueData();
  };

  return (
    <$IssueDetailHeader>
      <$IssueDetailTitle>
        {!isEdited ? (
          <$TitleWrapper>
            <$IssueTitle>{editTitle}</$IssueTitle>
            <$IssueId>{`#${issue.issueId}`}</$IssueId>
          </$TitleWrapper>
        ) : (
          <$TitleWrapper>
            <TextInput
              id="titleEdit"
              value={tempTitle}
              onChange={titleChangeHandler}
              labelText="제목"
              placeholderText="제목을 입력하세요."
            />
          </$TitleWrapper>
        )}

        {!isEdited ? (
          <$Buttons>
            <Button type="outline" size="S" onClick={editBtnHandler}>
              <Icon name="edit" />
              <p>제목 편집</p>
            </Button>
            <Button type="outline" size="S" onClick={statusChangeHandler}>
              <Icon name="archive" />
              <p>{`이슈 ${issue.isOpened ? '닫기' : '열기'} `}</p>
            </Button>
          </$Buttons>
        ) : (
          <$Buttons>
            <Button type="outline" size="S" onClick={cancelEditBtnHandler}>
              <Icon name="xSquare" />
              <p>편집 취소</p>
            </Button>
            <Button type="contained" size="S" onClick={completeEditHandler}>
              <Icon name="edit" fill="#FEFEFE" />
              <p>편집 완료</p>
            </Button>
          </$Buttons>
        )}
      </$IssueDetailTitle>

      <$IssueDetailInfo>
        {issue.isopened ? (
          <Label
            height={32}
            name="열린 이슈"
            fontColor="#FEFEFE"
            backgroundColor="#007AFF"
            iconName="alertCircle"
          />
        ) : (
          <Label
            height="32"
            name="닫힌 이슈"
            fontColor="#FEFEFE"
            backgroundColor="#FF3B30"
            iconName="archive"
          />
        )}
        <$IssueInfoText>
          {`이 이슈가 ${1}분 전에 ${issue.writer.name}님에 의해 ${
            issue.isopened ? '열렸습니다' : '닫혔습니다'
          } ∙ 코멘트 ${issue.comment.length}개 `}
        </$IssueInfoText>
      </$IssueDetailInfo>
    </$IssueDetailHeader>
  );
};

IssueDetailHeader.propTypes = {
  issue: PropTypes.object.isRequired,
  getNewIssueData: PropTypes.func.isRequired,
};

export default IssueDetailHeader;
