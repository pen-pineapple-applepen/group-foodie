
import React from 'react';
import styled from 'styled-components';
import { Button, Block, Content, Image, Media, Modal, Columns } from 'react-bulma-components';
import { motion, AnimatePresence } from 'framer-motion';
import {OrangeButton } from '../styles/shared.tsx';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import allActions from '../state/actions/allActions';


const EmailContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;
const Body = styled(Modal.Card.Body)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;
const SmallDeleteButton = styled(OrangeButton)`
  border-radius: 31.5px;
  opacity: 0.5;
`;
const ProfilePic = styled.img`
  margin-top:auto;
  height:64px;
  width:64px;
  position: relative;
`;


function OrderShareModal(props) {
  const dispatch = useAppDispatch();

  function handleRemove (e) {
    console.log(e.target.value)
    dispatch(allActions.removeEmail(e.target.value))
  }

  return (
    <AnimatePresence>

      <motion.div
      initial={{ scale: 0 }}
      animate={{
        scale: 1,
        transition: {
          duration: 0.3
        }
      }}
      exit={{
        scale: 0,
        transition: {
          delay: 0.3
        }
      }}
      >
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
        <Body>
            {props.guestEmails.length === 0 ?
              <p>You have not added any guest emails!</p> :
              <React.Fragment>
                {props.guestEmails.map((email, index) => (
                  <EmailContainer key={index}>
                    <ProfilePic src="/account_circle_24dp.svg"/>
                    {email}
                    <SmallDeleteButton value={email} onClick={handleRemove}>-</SmallDeleteButton>
                  </EmailContainer>
                ))}
              </React.Fragment>
            }
        </Body>
        <Modal.Card.Footer renderAs={Button.Group} align="right">
          <OrangeButton onClick={() => {
          props.setOpenModal();
          }}>
            Close
          </OrangeButton>
        </Modal.Card.Footer>
      </Modal.Card>
    </Modal>
    </motion.div>
    </AnimatePresence>
  )
}

export default OrderShareModal;