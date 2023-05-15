// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import {
  Modal,
  Button,
  ModalBody,
  ModalHeader
} from 'reactstrap'

// ** Icons Imports
import { Plus } from 'react-feather'
import WizardHorizontal from './WizardHorizontal'


const ReferEarnModal = () => {
  // ** State
  const [show, setShow] = useState(false)

  return (
    <Fragment>
      <Plus size={30} className='bg-primary rounded-2 cursor-pointer' color='white' onClick={() => setShow(true)} />
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-top modal-refer-earn modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-0'>
          <WizardHorizontal />
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default ReferEarnModal
