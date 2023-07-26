/* eslint-disable @next/next/no-img-element */
import Prisma from '@db';

interface Props {
  event: Prisma.Events;
}

const acceptedColours = ['rose', 'emerald', 'blue'] as const;
const acceptedIcons = ['🤘', '⭐️', '😀'] as const;

type Display = {
  colour?: (typeof acceptedColours)[number];
  icon?: (typeof acceptedIcons)[number];
  image?: string;
};

type Colour = {
  bg: string;
  bgFrom: string;
  bgTo: string;
  text: string;
  icon: string;
};

const colours = {
  rose: {
    bg: 'bg-rose-900',
    bgFrom: 'from-rose-900',
    bgTo: 'to-slate-900',
    text: 'text-slate-100',
    icon: 'bg-rose-500',
  },
  emerald: {
    bg: 'bg-emerald-900',
    bgFrom: 'from-emerald-900',
    bgTo: 'to-slate-900',
    text: 'text-slate-100',
    icon: 'bg-emerald-600',
  },
  blue: {
    bg: 'bg-blue-900',
    bgFrom: 'from-blue-900',
    bgTo: 'to-slate-900',
    text: 'text-slate-100',
    icon: 'bg-blue-500',
  },
} as {
  [key in (typeof acceptedColours)[number]]: Colour;
};
// 'sky', 'violet', 'slate', 'emerald'];

function stringToIndex(input: string, idxSize: number): number {
  // A simple hashing algorithm to convert the string to a number
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i);
    hash = (hash << 5) - hash + charCode;
    hash &= hash; // Convert to a 32-bit integer
  }

  // Make sure the result is positive and between 0 and idxSize
  const result = Math.abs(hash) % idxSize;
  return result;
}

const ScheduleEvent = ({ event }: Props) => {
  const display = event.display as Display;
  const idx = stringToIndex(event.name, acceptedColours.length);
  const defaultColour = acceptedColours[idx];
  const defaultIcon = acceptedIcons[idx];
  const colour = display?.colour
    ? colours[display.colour as (typeof acceptedColours)[number]]
    : colours[defaultColour];
  const icon = display?.icon ? display?.icon : defaultIcon;
  return (
    <div
      className={`mt-2 relative w-full rounded-lg ${colour.bg} ${colour.text}`}
    >
      <div
        className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-cover rounded-lg"
        style={{ backgroundImage: `url(test.jpg)` }}
      />
      <div
        className={`absolute top-0 bottom-0 left-0 right-0 z-20 rounded-lg opacity-50 bg-gradient-to-br ${colour.bgFrom} ${colour.bgTo}`}
      />
      <div
        className={`absolute top-0 bottom-0 left-0 right-0 z-30 rounded-lg opacity-50 bg-slate-900`}
      />
      <div className="relative z-40 flex p-4 rounded-lg">
        <div
          className={`w-8 h-8 rounded-md flex items-center justify-center text-xl ${colour.icon}`}
        >
          {icon}
        </div>
        <div className="flex-grow ml-4">
          <h4 className="self-center flex-grow">{event.name}</h4>
          <p className="mt-2 text-sm text-slate-400">
            This is where a description or time might go
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScheduleEvent;
