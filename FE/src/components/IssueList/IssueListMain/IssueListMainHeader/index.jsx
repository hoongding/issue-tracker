import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../common/Button';
import Icon from '../../../common/Icon';
import DropDownButton from './DropDownButton';
import { $IssueListMainHeader, $CheckBox, $LeftButton, $RightButton } from './style';

const IssueButton = ({ status, count = 0, active = false }) => {
  const STATUS_MAP = {
    open: { iconName: 'alertCircle', buttonText: `열린 이슈(${count})` },
    close: { iconName: 'trash', buttonText: `닫힌 이슈(${count})` },
  };

  return (
    <Button type="ghost" size="M" active={active}>
      <Icon name={STATUS_MAP[status].iconName} />
      {STATUS_MAP[status].buttonText}
    </Button>
  );
};

IssueButton.propTypes = {
  status: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  active: PropTypes.bool,
};

const IssueListMainHeader = (props) => {
  const [isSelected, setIsSelected] = useState(false);

  const checkBoxClickHandler = () => {
    setIsSelected((prev) => !prev);
  };

  return (
    <$IssueListMainHeader>
      <$LeftButton>
        <$CheckBox type="button" onClick={checkBoxClickHandler}>
          <Icon
            name={isSelected ? 'checkBoxActive' : 'checkBoxInitial'}
            fill={isSelected ? '#007AFF' : '#D9DBE9'}
          />
        </$CheckBox>
        <IssueButton status="open" active />
        <IssueButton status="close" />
      </$LeftButton>
      <$RightButton>
        <DropDownButton name="담당자" />
        <DropDownButton name="레이블" />
        <DropDownButton name="마일스톤" />
        <DropDownButton name="작성자" />
      </$RightButton>
    </$IssueListMainHeader>
  );
};

IssueListMainHeader.propTypes = {};

export default IssueListMainHeader;
