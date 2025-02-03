'use client';

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

export function DatePickerWithRange({
  className,
  NightPrice,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const nights =
    date?.from && date.to ? differenceInCalendarDays(date.to, date.from) : 0;

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
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
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
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      {/* Display the calculated price if a valid date range is selected */}
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
}
