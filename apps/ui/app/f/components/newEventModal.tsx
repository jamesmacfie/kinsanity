'use client';

import Button from '@ui/components/button';
import Input from '@ui/components/input';
import Modal from '@ui/components/modal';
import Select from '@ui/components/select';
import Textarea from '@ui/components/textarea';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

import { ChangeEvent, FormEvent, useState } from 'react';

interface Props {
  onClose: () => void;
}

type FormValues = {
  name: string;
  description?: string;
  startAt: string;
  endAt?: string;
  type: 'ANY_TIME_IN_DAY' | 'ALL_DAY' | 'SPECIFIC_TIME';
};

const NewEventModal = ({ onClose }: Props) => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    description: undefined,
    startAt: format(new Date(), 'yyyy-MM-dd'),
    endAt: undefined,
    type: 'ANY_TIME_IN_DAY',
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify({
          name: formValues.name,
          description: formValues.description?.length
            ? formValues.description
            : undefined,
          startAt: new Date(formValues.startAt),
          endAt: formValues.endAt ? new Date(formValues.endAt) : undefined,
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
  const onChange = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Modal onClose={onClose}>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <Input
          label="Name*"
          required
          name="name"
          value={formValues.name}
          onChange={onChange}
        />
        <Textarea
          label="Description"
          name="description"
          value={formValues.description}
          onChange={onChange}
        />
        <Input
          label="Start at*"
          required
          type="date"
          name="startAt"
          value={formValues.startAt}
          onChange={onChange}
        />
        <Input
          label="End at"
          type="date"
          name="endAt"
          value={formValues.endAt}
          onChange={onChange}
        />
        <Select
          label="Type"
          name="type"
          value={formValues.type}
          onChange={onChange}
        >
          <option value="ANY_TIME_IN_DAY">Any time in day</option>
          <option value="ALL_DAY">All day</option>
          <option value="SPECIFIC_TIME">Specific time</option>
        </Select>
        <div className="mt-3">
          <Button>Add event</Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewEventModal;
