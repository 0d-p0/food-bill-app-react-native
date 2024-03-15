import React from 'react';
import {FadeInView} from './Animation/FadeInView';

const VisibleComp = ({isVisible = true, children}) => {
  return <>{isVisible && <FadeInView>{children}</FadeInView>}</>;
};

export default VisibleComp;
