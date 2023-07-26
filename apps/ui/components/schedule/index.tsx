import Prisma from '@db';
import { groupBy } from 'lodash';
import { format } from 'date-fns';
import Heading from '@ui/components/heading';
import ScheduleEvent from './event';

interface Props {
  events: Prisma.Events[];
}

const Schedule = ({ events }: Props) => {
  const eventsByDay = groupBy(events, (event) => {
    const startDate = new Date(event.startAt);
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    return formattedStartDate;
  });

  return (
    <>
      {Object.entries(eventsByDay).map(([date, events]) => {
        return (
          <div key={date} className="mb-4 w-96 div">
            <Heading tag="h2" className="mb-2">
              {format(new Date(date), 'eee d')}
            </Heading>

            {events.map((event) => {
              return <ScheduleEvent key={event.id} event={event} />;
            })}
          </div>
        );
      })}
    </>
  );
};

export default Schedule;
