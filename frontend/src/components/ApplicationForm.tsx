import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  applicationSchema,
  ApplicationSchemaType,
} from '../../../backend/src/shared/libs/zodSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApplication } from '@/hooks/useApplication';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { DatePickerWithRange } from './DatePicker';
import { Button } from './ui/button';

const ApplicationForm = () => {
  const { mutate, isPending } = useApplication();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ApplicationSchemaType>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      adults: 1, // Default value for adults
      kids: 0, // Default value for kids
    },
  });

  const adults = watch('adults');
  const kids = watch('kids');

  const onSubmit: SubmitHandler<ApplicationSchemaType> = (data) => {
    mutate(data, {
      onSuccess: (response) => {
        alert(response.message);
      },
      onError: (error) => {
        alert(error.message);
      },
    });
  };

  const handleIncrement = (field: 'adults' | 'kids') => {
    setValue(field, (field === 'adults' ? adults : kids) + 1);
  };

  const handleDecrement = (field: 'adults' | 'kids') => {
    const currentValue = field === 'adults' ? adults : kids;
    if (currentValue > (field === 'kids' ? 0 : 1)) {
      setValue(field, currentValue - 1);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="gap-6">
      <h2 className="text-xl font-semibold text-center mb-4">
        Application Form
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column */}
        <div className="flex flex-col w-full md:w-1/2 gap-4">
          <div className={inputStyle}>
            <Label className="text-neutral-800 dark:text-neutral-300">
              Full Name
            </Label>
            <Input
              {...register('fullName')}
              placeholder="Enter your full name"
              className="input-field"
            />
            {errors.fullName && (
              <span className="text-red-500 text-sm">
                {errors.fullName.message}
              </span>
            )}
          </div>
          <div className={inputStyle}>
            <Label className="text-neutral-800 dark:text-neutral-300">
              Email
            </Label>
            <Input
              {...register('email')}
              placeholder="Enter your email"
              className="input-field"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className={inputStyle}>
            <Label className="text-neutral-800 dark:text-neutral-300">
              Phone Number
            </Label>
            <Input
              {...register('phoneNumber')}
              placeholder="Enter your phone number"
              className="input-field"
            />
            {errors.phoneNumber && (
              <span className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col w-full md:w-1/2 gap-4">
          <div className={inputStyle}>
            <Label className="text-neutral-800 dark:text-neutral-300">
              Select Date Range
            </Label>
            <DatePickerWithRange />
          </div>

          {/* Number of Adults */}
          <div className={inputStyle}>
            <Label className="text-neutral-800 dark:text-neutral-300">
              Number of Adults
            </Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                onClick={() => handleDecrement('adults')}
                className="w-8 h-8 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-700 dark:hover:bg-neutral-600"
              >
                -
              </Button>
              <Input
                {...register('adults', { valueAsNumber: true })}
                value={adults}
                readOnly
                className="w-16 text-center input-field"
              />
              <Button
                type="button"
                onClick={() => handleIncrement('adults')}
                className="w-8 h-8 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-700 dark:hover:bg-neutral-600"
              >
                +
              </Button>
            </div>
            {errors.adults && (
              <span className="text-red-500 text-sm">
                {errors.adults.message}
              </span>
            )}
          </div>

          {/* Number of Kids */}
          <div className={inputStyle}>
            <Label className="text-neutral-800 dark:text-neutral-300">
              Number of Kids
            </Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                onClick={() => handleDecrement('kids')}
                className="w-8 h-8 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-700 dark:hover:bg-neutral-600"
              >
                -
              </Button>
              <Input
                {...register('kids', { valueAsNumber: true })}
                value={kids}
                readOnly
                className="w-16 text-center input-field"
              />
              <Button
                type="button"
                onClick={() => handleIncrement('kids')}
                className="w-8 h-8 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-700 dark:hover:bg-neutral-600"
              >
                +
              </Button>
            </div>
            {errors.kids && (
              <span className="text-red-500 text-sm">
                {errors.kids.message}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="w-full md:w-auto bg-neutral-900 text-white px-6 py-2 rounded-md hover:bg-neutral-800 dark:bg-neutral-700 dark:hover:bg-neutral-600 transition"
          disabled={isPending}
        >
          {isPending ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </form>
  );
};

const inputStyle = 'flex flex-col gap-2 mt-3';
export default ApplicationForm;
