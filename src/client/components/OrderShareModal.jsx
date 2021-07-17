
import React from 'react';
import styled from 'styled-components';
import { Button, Block, Content, Image, Media, Modal, Columns } from 'react-bulma-components';
import {OrangeButton} from '../styles/shared.tsx';

const emailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const emailContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;


function OrderShareModal(props) {
  return (
    <Modal
        show={props.openModal === 'card'}
        showClose={false}
        onClose={() => {
          props.setOpenModal();
        }}
      >
      <Modal.Card>
        <Modal.Card.Header showClose>
          <Modal.Card.Title>Added Email(s)</Modal.Card.Title>
        </Modal.Card.Header>
        <Modal.Card.Body>
            {props.guestEmails.length === 0 ?
              <p>You have not added any guest emails!</p> :
              <div>
                {props.guestEmails.map((email, index) => (
                  <Columns key={index} isMobile={true}>
                    <Columns.Column>
                      {email}
                    </Columns.Column>
                    <Columns.Column>
                        {email}
                    </Columns.Column>
                  </Columns>
                ))}
              </div>
            }
             {/* <p>
               <strong>John Smith</strong> <small>@johnsmith</small>{' '}
               <small>31m</small>
               <br />
               If the children of the Modal is a card, the close button
               will be on the Card Head instead than the top-right corner
               You can also pass showClose = false to Card.Head to hide the
               close button
             </p> */}
        </Modal.Card.Body>
        <Modal.Card.Footer renderAs={Button.Group} align="right">
          <OrangeButton onClick={() => {
          props.setOpenModal();
          }}>
            Close
          </OrangeButton>
        </Modal.Card.Footer>
      </Modal.Card>
    </Modal>
  )
}

export default OrderShareModal;