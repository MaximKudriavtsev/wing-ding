import React from 'react';
import { Skeleton } from './Skeleton';
import { EVENT_TAB_STYLE } from '../theme';

export const EventTabLoader = () => {
  return <Skeleton style={EVENT_TAB_STYLE.event}></Skeleton>;
};
