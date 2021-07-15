import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { Button } from 'react-bulma-components';
import allActions from '../state/actions/allActions';
import styled from 'styled-components';

const MainConatiner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: left;
`;

const Image = styled.div`
  background-color: #FF6C36;
  width: 154px;
  height: 117px;
`;

const Name = styled.div`
  padding: 10px 10px;
`;

const SubInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 10px;
`;

export default function MenuItemContainer ({name, price}) {

  return(
    <MainConatiner>
      <div>
        <Image></Image>
      </div>
      <InfoContainer>
        <Name>
          <h3>{name}</h3>
        </Name>
        <SubInfo>
          <h4>${price}.00</h4>
        </SubInfo>
      </InfoContainer>
    </MainConatiner>
  )
}