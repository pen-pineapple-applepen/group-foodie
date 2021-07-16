
import React from 'react'
import { Button, Block, Content, Image, Media, Modal } from 'react-bulma-components';

function OrderShareModal(props) {
  return (
    <Modal
        show={props.openModal === 'card'}
        onClose={() => {
          props.setOpenModal();
        }}
      >
      <Modal.Card>
        <Modal.Card.Header showClose>
          <Modal.Card.Title>Added Email(s)</Modal.Card.Title>
        </Modal.Card.Header>
        <Modal.Card.Body>
          <Content>
            <p>
              <strong>John Smith</strong> <small>@johnsmith</small>{' '}
              <small>31m</small>
              <br />
              If the children of the Modal is a card, the close button
              will be on the Card Head instead than the top-right corner
              You can also pass showClose = false to Card.Head to hide the
              close button
            </p>
          </Content>
        </Modal.Card.Body>
        <Modal.Card.Footer renderAs={Button.Group} align="right" hasAddons>
          <Button color="success">Like</Button>
          <Button>Share</Button>
        </Modal.Card.Footer>
      </Modal.Card>
    </Modal>
  )
}

export default OrderShareModal;