import * as React from 'react';
import { ReactElement } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import allActions from '../../state/actions/allActions';

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
  min-width: 154px;
  height: 117px;
  position: relative;
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

export default function MenuItemContainer({ name, price, category }) {
  return (
    <MainConatiner>
      {category === 'entree' ? (
        <Image src={'/lunch_icon_24dp.svg'} />
      ) : (
        <Image src={'/local_cafe_black_24dp.svg'} />
      )}
      <InfoContainer>
        <Name>
          <h3>{name}</h3>
        </Name>
        <SubInfo>
          <h4>${price.toFixed(2)}</h4>
        </SubInfo>
      </InfoContainer>
    </MainConatiner>
  );
}
