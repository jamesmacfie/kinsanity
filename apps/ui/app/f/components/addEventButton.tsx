'use client';

import { useState } from 'react';
import NewEventModal from './newEventModal';
import Button from '@ui/components/button';

const AddEventButton = () => {
  const [newModalOpen, setNewModalOpen] = useState(false);
  const toggleNewModalOpen = () => setNewModalOpen(!newModalOpen);

  return (
    <>
      <Button onClick={toggleNewModalOpen}>+ Create a new event</Button>
      {newModalOpen && <NewEventModal onClose={toggleNewModalOpen} />}
    </>
  );
};

export default AddEventButton;
