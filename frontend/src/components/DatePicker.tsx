import * as React from 'react';
import { addDays, differenceInCalendarDays, format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export const DatePickerWithRange = ({
  className,
  NightPrice,
  selected,
  onChange,
}: {
  className?: string;
  NightPrice: number;
  selected: DateRange | undefined;
  onChange: (date: DateRange | undefined) => void;
}) => {
  const nights =
    selected?.from && selected.to
      ? differenceInCalendarDays(selected.to, selected.from)
      : 0;

  const totalPrice = nights * NightPrice;

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="ghost"
            className={cn(
              'w-[300px] justify-start text-left font-normal bg-gray-300',
              !selected && 'text-muted-foreground'
            )}
          >
            <CalendarIcon />
            {selected?.from ? (
              selected.to ? (
                <>
                  {format(selected.from, 'LLL dd, y')} -{' '}
                  {format(selected.to, 'LLL dd, y')}
                </>
              ) : (
                format(selected.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={selected?.from}
            selected={selected}
            onSelect={onChange} // Update parent state
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      {nights > 0 && (
        <div className="mt-2">
          <p>
            <strong>{nights}</strong> night{nights > 1 ? 's' : ''} at $
            {NightPrice} per night
          </p>
          <p className="underline underline-offset-4">
            Total Price: <strong>${totalPrice}</strong>
          </p>
        </div>
      )}
    </div>
  );
};
