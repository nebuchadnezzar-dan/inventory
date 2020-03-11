import React from 'react'
import {Modal, Badge, Button} from 'react-bootstrap'
import PropTypes from 'prop-types'

const ModalDisplay = ({show, responseHead, message, onHide}) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
  <Modal.Title><h3>{responseHead === 'success' ? <Badge variant="success">Success</Badge> : <Badge variant="danger">Error</Badge>}</h3></Modal.Title>
    </Modal.Header>
  <Modal.Body>{message}</Modal.Body>
    <Modal.Footer>
      <Button variant={responseHead === 'success' ? 'success' : 'danger'} onClick={onHide}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
)

ModalDisplay.propTypes = {
  show: PropTypes.bool,
  responseHead: PropTypes.string,
  message: PropTypes.string,
  onHide: PropTypes.func
}

export default ModalDisplay
