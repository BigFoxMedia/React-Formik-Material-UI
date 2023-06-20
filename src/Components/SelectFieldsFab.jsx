import React from 'react';
import Fab from './Fab';
import CustomizedMenus from './Menu';

const SelectFieldsFab = ({...props}) => {


  return (
    <>
      <CustomizedMenus customButton={Fab} {...props} />
    </>
  );
};

export default SelectFieldsFab;
