import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import { deleteCar } from '../services/CarService'

interface ModalProps {
    title: string;
    content: string;
    id: number;
}

function Modal(props: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDeleteClick = (id: number) => {
      deleteCar(id);
      closeModal();
  }

  return (
    <div>
      <FontAwesomeIcon
           icon={faTrash}
           className="absolute top-3 right-3 text-2xl text-purple-800 cursor-pointer bg-white p-2 rounded-xl hover:bg-purple-100"
           onClick={openModal}
         />
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{props.title}</h2>
            <p className="mb-4">{props.content}</p>
            <div className ="flex justify-between">
                <Button
                  name="Close"
                  onClick={closeModal}
                />
                <Button
                  name={"Delete"}
                  backgroundColor={"bg-red-500"}
                  hoverBackgroundColor={"hover:bg-red-900"}
                  onClick={() => handleDeleteClick(props.id)}
                />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;