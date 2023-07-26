import Prisma from '@db';
import { groupBy } from 'lodash';
import { format, parse } from 'date-fns';
import Heading from '@ui/components/heading';
import ScheduleEvent from './event';

interface Props {
  events: Prisma.Events[];
}

const Schedule = ({ events }: Props) => {
  const eventsByDay = groupBy(events, (event) => {
    const startDate = new Date(event.startAt);
    const formattedStartDate = format(startDate, 'yyyyMMdd');
    return formattedStartDate;
  });
  const orderedEventsDays = Object.keys(eventsByDay).sort((a, b) => {
    return new Date(a) > new Date(b) ? 1 : -1;
  });

  return (
    <>
      {orderedEventsDays.map((date) => {
        const events = eventsByDay[date];
        const usableDate = parse(date, 'yyyyMMdd', new Date());
        return (
          <div key={date} className="mb-4 w-96 div">
            <Heading tag="h2" className="mb-2">
              {format(usableDate, 'eee d')}
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
