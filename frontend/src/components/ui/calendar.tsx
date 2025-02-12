'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-neutral-500 rounded-md w-9 font-normal text-[0.8rem] dark:text-neutral-300',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-neutral-200/50 [&:has([aria-selected])]:bg-neutral-200 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected].day-outside)]:bg-neutral-700/50 dark:[&:has([aria-selected])]:bg-neutral-700',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100'
        ),
        day_range_end: 'day-range-end',
        day_selected:
          'bg-neutral-900 text-neutral-50 hover:bg-neutral-900 hover:text-neutral-50 focus:bg-neutral-900 focus:text-neutral-50 dark:bg-neutral-200 dark:text-neutral-900 dark:hover:bg-neutral-300 dark:hover:text-neutral-900 dark:focus:bg-neutral-300 dark:focus:text-neutral-900',
        day_today:
          'bg-neutral-100 text-neutral-900 dark:bg-neutral-600 dark:text-neutral-200',
        day_outside:
          'day-outside text-neutral-500 aria-selected:bg-neutral-200/50 aria-selected:text-neutral-500 dark:text-neutral-300 dark:aria-selected:bg-neutral-700/50 dark:aria-selected:text-neutral-300',
        day_disabled: 'text-neutral-500 opacity-50 dark:text-neutral-400',
        day_range_middle:
          'aria-selected:bg-neutral-200 aria-selected:text-neutral-900 dark:aria-selected:bg-neutral-700 dark:aria-selected:text-neutral-200',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeftIcon className={cn('h-4 w-4', className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRightIcon className={cn('h-4 w-4', className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
