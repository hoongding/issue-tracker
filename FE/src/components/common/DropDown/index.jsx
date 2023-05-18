import React from 'react';
import PropTypes from 'prop-types';

import { $DropDownHeader, $DropDownMenus, $DropDownWrapper } from './style';
import DropDownMenu from './DropDownMenu';

const DropDown = ({ modalName, menus }) => {
  return (
    <$DropDownWrapper>
      <$DropDownHeader>{modalName}</$DropDownHeader>
      <$DropDownMenus>
        {menus.map(({ id, imgSrc, text, isChecked }) => (
          /*
            menu : {
                id: map으로 돌리기 위한 id 설정.
                imgSrc: 이미지 주소 or 어떻게 할지 생각.
                text: 메뉴 텍스트 ex) 내가 작성한 이슈
                isChecked: 체크된 상태
            }
          */
          <DropDownMenu key={id} menuImg={imgSrc} menuText={text} isChecked={isChecked} />
        ))}
      </$DropDownMenus>
    </$DropDownWrapper>
  );
};

DropDown.propTypes = {
  modalName: PropTypes.string.isRequired,
  menus: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DropDown;