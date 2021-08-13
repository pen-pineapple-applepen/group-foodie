import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
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

const Image = styled.img`
  background-color: #ff6c36;
  min-width: 154px;
  height: 117px;
  position: relative;
`;

const Name = styled.div`
  padding: 2px 2px;
`;

const SubInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2px 2px;
`;

export default function RestaurantContainer({ name, cuisine, hours, id }) {
  return (
    <MainConatiner>
      <div>
        <Image src={cuisine === 'Asian' ? 'Asian_Thumb.png' : 'American_Thumb.png'} />
      </div>
      <InfoContainer>
        <Name>
          <h3>{name}</h3>
        </Name>
        <SubInfo>
          <h5>{cuisine}</h5>
        </SubInfo>
        <SubInfo>
          <h5>{hours}</h5>
        </SubInfo>
      </InfoContainer>
    </MainConatiner>
  );
}
