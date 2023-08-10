import { prisma } from '@db';
import { Session, getServerSession } from 'next-auth';
import { authOptions } from '@ui/lib/auth';
import { wrapper } from '@ui/store/store';
import Heading from '@ui/components/heading';
import AddEventButton from './components/addEventButton';
// import EventsList from './components/eventsList';
import NoEvents from './components/noEvents';
// import Today from './components/today';
import Schedule from '@ui/components/schedule';

async function getData() {
  const session = (await getServerSession(authOptions)) as Session;

  const events = await prisma.eventUsers.findMany({
    where: {
      userId: (session.user as any).id, // TODO - what's the deal with this any?
    },
    select: {
      event: true,
    },
  });

  return { events: events.map((eu) => eu.event) };
}

const F = async () => {
  const { events } = await getData();

  return (
    <>
      <div className="flex justify-between mb-4">
        <Heading tag="h1">Events</Heading>
        <div>
          <AddEventButton />
        </div>
      </div>
      {events.length ? <Schedule events={events} /> : <NoEvents />}
    </>
  );
};

export default F;
