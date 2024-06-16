'use client';

import { Button, useDisclosure, Modal, ModalBody, ModalHeader, ModalContent } from '@nextui-org/react';
import { FaPlus } from 'react-icons/fa';
import AddSetForm from './addSetForm';

export default function AddSetButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button color="primary" onPress={onOpen} startContent={<FaPlus />}> Add Set </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Set</ModalHeader>
              <ModalBody>
                <AddSetForm onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}