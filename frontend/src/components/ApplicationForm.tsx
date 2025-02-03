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

const ApplicationForm = ({ data }) => {
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
      adults: 1,
      kids: 0,
    },
  });

  const adults = watch('adults');
  const kids = watch('kids');

  const onSubmit: SubmitHandler<ApplicationSchemaType> = (formData) => {
    mutate(formData, {
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

  const pricePerNight = data.price;
  const maxPerson = data.maxPerson;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto p-4 space-y-6"
    >
      <h2 className="text-xl font-semibold text-center mb-4">
        Application Form
      </h2>

      <div className="flex flex-col md:flex-row md:gap-x-8 gap-y-6">
        <div className="flex flex-col flex-1 space-y-4">
          <div className={inputStyle}>
            <Label>Full Name</Label>
            <Input
              {...register('fullName')}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <span className="text-sm">{errors.fullName.message}</span>
            )}
          </div>

          <div className={inputStyle}>
            <Label>Email</Label>
            <Input {...register('email')} placeholder="Enter your email" />
            {errors.email && (
              <span className="text-sm">{errors.email.message}</span>
            )}
          </div>

          <div className={inputStyle}>
            <Label>Phone Number</Label>
            <Input
              {...register('phoneNumber')}
              placeholder="Enter your phone number"
            />
            {errors.phoneNumber && (
              <span className="text-sm">{errors.phoneNumber.message}</span>
            )}
          </div>

          <div className="flex justify-start mt-8">
            <Button type="submit" disabled={isPending} variant="destructive">
              {isPending ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </div>

        <div className="flex flex-col flex-1 space-y-4 border p-6 rounded-md">
          <div className={inputStyle}>
            <Label>Select Date Range</Label>
            <DatePickerWithRange NightPrice={pricePerNight} />
          </div>

          <div className="flex flex-col md:flex-row justify-start md:justify-start md:items-center items-start gap-4">
            <div className="space-y-4">
              <div className={inputStyle}>
                <Label>Number of Adults</Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    onClick={() => handleDecrement('adults')}
                  >
                    -
                  </Button>
                  <Input
                    {...register('adults', { valueAsNumber: true })}
                    value={adults}
                    readOnly
                    className="w-16 text-center"
                  />
                  <Button
                    type="button"
                    onClick={() => handleIncrement('adults')}
                  >
                    +
                  </Button>
                </div>
                {errors.adults && (
                  <span className="text-sm">{errors.adults.message}</span>
                )}
              </div>

              <div className={inputStyle}>
                <Label>Number of Kids</Label>
                <div className="flex items-center gap-2">
                  <Button type="button" onClick={() => handleDecrement('kids')}>
                    -
                  </Button>
                  <Input
                    {...register('kids', { valueAsNumber: true })}
                    value={kids}
                    readOnly
                    className="w-16 text-center"
                  />
                  <Button type="button" onClick={() => handleIncrement('kids')}>
                    +
                  </Button>
                </div>
                {errors.kids && (
                  <span className="text-sm">{errors.kids.message}</span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              {data.isPet ? (
                <p>Pets are allowed.</p>
              ) : (
                <p>Pets are not allowed.</p>
              )}
              <p>
                Maximum {data.maxPerson}{' '}
                {data.maxPerson > 1 ? 'persons' : 'person'} in this listing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const inputStyle = 'flex flex-col gap-2';
export default ApplicationForm;
