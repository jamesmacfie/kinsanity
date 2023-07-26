'use client';

import Prisma from '@db';
import { groupBy } from 'lodash';
import { format } from 'date-fns';

import { useEffect, useRef, useState } from 'react';

interface Props {
  events: Prisma.Events[];
}

const hourHeight = 128;

const Today = ({ events }: Props) => {
  const [currentTimeOffset, setCurrentTimeOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hours = new Array(24).fill(0).map((_, i) => i);
  const eventsByHour = groupBy(events, (event) => {
    return format(new Date(event.startAt), 'h aa');
  });
  useEffect(() => {
    if (ref.current) {
      const now = new Date();
      const currentHour = format(now, 'h aa');
      const currentMin = parseInt(format(now, 'mm'), 10);
      const offsetHours = hours
        .map((hour) => format(now.setHours(hour), 'h aa'))
        .indexOf(currentHour);
      const containerHeight = ref.current.clientHeight;

      const minsScrollTop =
        offsetHours * hourHeight + hourHeight * (currentMin / 60);

      ref.current.scrollTop = offsetHours * hourHeight - containerHeight / 2;
      setCurrentTimeOffset(minsScrollTop);
    }
  }, [ref, hours]);

  return (
    <div className="relative h-full overflow-scroll" ref={ref}>
      <div
        className="absolute left-0 right-0 "
        style={{ top: currentTimeOffset }}
      >
        <span className="absolute left-0 right-0 border-b border-b-blue-400" />
        <span className="absolute w-2 h-2 -mt-1 bg-blue-400 rounded-full left-2" />
      </div>
      {hours.map((hour) => {
        const display = format(new Date().setHours(hour), 'h aa');
        const hourEvents = eventsByHour[display];
        return (
          <div
            key={hour}
            className={`flex flex-col justify-between`}
            style={{ height: `${hourHeight}px` }}
          >
            <div>
              {display}
              {hourEvents?.length > 0 ? (
                <div> - {hourEvents.length}</div>
              ) : null}
            </div>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        );
      })}
    </div>
  );
};

export default Today;
