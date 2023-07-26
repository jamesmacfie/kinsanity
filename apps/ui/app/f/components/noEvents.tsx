'use client ';

import { ReactComponent as Calendar } from '@ui/svgs/calendar.svg';

import AddEventButton from './addEventButton';

export default async function NoEvents() {
  return (
    <div className="pt-12 place-self-center">
      <div className="flex flex-col items-center mt-16">
        <Calendar className="w-24 h-24 text-slate-400" />
        <h2 className="mt-4 mb-8 text-ms">No events 😢</h2>
        <AddEventButton />
      </div>
    </div>
  );
}
