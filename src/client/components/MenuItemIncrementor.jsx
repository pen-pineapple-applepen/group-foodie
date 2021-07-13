import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { Button } from 'react-bulma-components';
import allActions from '../state/actions/allActions';
import styled from 'styled-components';
import {OrangeButton} from '../styles/shared.tsx';

const CirleButton = styled(OrangeButton)`
  border-radius: 31.5px;
  opacity: 0.5;
`;

export default function MenuItemIncrementor () {

  return(
    <div>
      <CirleButton>-</CirleButton>
    </div>
  )
}