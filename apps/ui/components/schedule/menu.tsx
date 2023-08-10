'use client';
import { useState } from 'react';
import { Popover } from 'react-tiny-popover';
import { ReactComponent as HorizontalThreeDots } from '@ui/svgs/horizontalThreeDots.svg';
import { ReactComponent as Edit } from '@ui/svgs/edit.svg';
import { ReactComponent as Delete } from '@ui/svgs/x.svg';
const EventMenu = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const menuItems = (
    <div className="rounded-md bg-slate-50">
      <div className="flex items-center py-2 pl-4 pr-8 cursor-pointer rounded-t-md border-b-slate-700 hover:bg-slate-400 hover:text-slate-200">
        <Edit className="w-4 h-4 mr-2" />
        <span>Edit</span>
      </div>
      <div className="flex items-center py-2 pl-4 pr-8 cursor-pointer rounded-b-md border-b-slate-700 hover:bg-slate-400 hover:text-slate-200">
        <Delete className="w-4 h-4 mr-2" />
        <span>Delete</span>
      </div>
    </div>
  );

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={['bottom', 'top', 'left', 'right']}
      align="start"
      containerClassName="z-40"
      content={menuItems}
    >
      <HorizontalThreeDots
        className="w-6 h-6 text-white cursor-pointer hover:text-slate-400"
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
      />
    </Popover>
  );
};

export default EventMenu;
