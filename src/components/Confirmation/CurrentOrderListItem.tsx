import * as React from 'react';
import { useState, useEffect } from 'react';
import { ReactElement } from 'react';
import { ProfileImage } from '../../styles/shared';
import styled from 'styled-components';
import axios from 'axios';

interface CurrentOrderListItemProps {
  userId: number;
  food: string;
  quantity: number;
  price: string;
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  guest: boolean;
}

const ListItemContainer = styled.div`
  width: 85vw;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 15px;
`;
const NameOrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 20px;
  width: 50%;
`;
const Name = styled.h3`
  font-weight: bold;
  display: block;
`;
const FoodAndOption = styled.div`
  font-size: 10px;
  width: 100%;
`;
const Price = styled.div`
  width: 30%;
  padding-left: 15px;
`;

function CurrentOrderListItem({
  userId,
  food,
  quantity,
  price,
}: CurrentOrderListItemProps): ReactElement {
  const [ordererName, setOrdererName] = useState('');

  useEffect(async () => {
    const userData = await axios.get(`/api/users/${userId}`);
    const user: User = userData.data;

    setOrdererName(user.first_name);
  }, []);

  return (
    <ListItemContainer>
      <ProfileImage src="/account_circle_24dp.svg" />

      <NameOrderContainer>
        <div>
          <Name>{ordererName}</Name>
        </div>

        <FoodAndOption>
          {quantity} {food}
        </FoodAndOption>
      </NameOrderContainer>

      <Price>${price}</Price>
    </ListItemContainer>
  );
}

export default CurrentOrderListItem;
