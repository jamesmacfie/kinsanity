'use client ';

import Prisma from '@db';
import { groupBy } from 'lodash';
import { format } from 'date-fns';
import Heading from '@ui/components/heading';

interface Props {
  events: Prisma.Events[];
}

const EventsList = ({ events }: Props) => {
  const eventsByDay = groupBy(events, (event) => {
    const startDate = new Date(event.startAt);
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    return formattedStartDate;
  });

  return (
    <>
      {Object.entries(eventsByDay).map(([date, events]) => {
        return (
          <div key={date} className="mb-4">
            <Heading tag="h2" className="mb-2">
              {date}
            </Heading>

            {events.map((event) => {
              return (
                <Heading key={event.id} tag="h3" className="mb-2">
                  {event.name}
                </Heading>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default EventsList;
