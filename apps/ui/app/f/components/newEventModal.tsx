'use client';

import Button from '@ui/components/button';
import Input from '@ui/components/input';
import Modal from '@ui/components/modal';
import { useRouter } from 'next/navigation';

import { ChangeEvent, FormEvent, useState } from 'react';

interface Props {
  onClose: () => void;
}

const NewEventModal = ({ onClose }: Props) => {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    name: '',
    startAt: '2023-01-01',
    type: 'ANY_TIME_IN_DAY',
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify({
          name: formValues.name,
          startAt: new Date(formValues.startAt),
          type: formValues.type,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // setLoading(false);
      if (!res.ok) {
        alert((await res.json()).message);
        return;
      }

      router.refresh();
      onClose();
    } catch (error: any) {
      // setLoading(false);
      console.log(error.message);
      alert(error.message);
    }
  };
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  return (
    <Modal onClose={onClose}>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <Input
          label="Name"
          required
          name="name"
          value={formValues.name}
          onChange={onChange}
        />

        <Input
          label="Start at"
          required
          type="date"
          name="start_at"
          value={formValues.startAt}
          onChange={onChange}
        />
        <div className="mt-3">
          <Button>Add event</Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewEventModal;
