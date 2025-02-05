import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
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
import { useApplicationStore } from '@/store/applicationStore';

const ApplicationForm = ({ data }) => {
  const { applicationData, updateApplication } = useApplicationStore();
  const { mutate, isPending } = useApplication();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ApplicationSchemaType>({
    resolver: zodResolver(applicationSchema),
    defaultValues: applicationData,
  });

  const onSubmit: SubmitHandler<ApplicationSchemaType> = () => {
    console.log('Form Data:', applicationData);
    mutate(applicationData, {
      onSuccess: (response) => {
        console.log('Success:', response);
        alert(response.message);
      },
      onError: (error) => {
        console.error('Error:', error);
        alert(error.message);
      },
    });
  };

  console.log(applicationData);

  const handleIncrement = (field: 'adults' | 'kids') => {
    updateApplication(field, applicationData[field] + 1);
  };

  const handleDecrement = (field: 'adults' | 'kids') => {
    if (applicationData[field] > (field === 'kids' ? 0 : 1)) {
      updateApplication(field, applicationData[field] - 1);
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
              value={applicationData.fullName}
              onChange={(e) => updateApplication('fullName', e.target.value)}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <span className="text-sm">{errors.fullName.message}</span>
            )}
          </div>

          <div className={inputStyle}>
            <Label>Email</Label>
            <Input
              value={applicationData.email}
              onChange={(e) => updateApplication('email', e.target.value)}
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-sm">{errors.email.message}</span>
            )}
          </div>

          <div className={inputStyle}>
            <Label>Phone Number</Label>
            <Input
              value={applicationData.phoneNumber}
              onChange={(e) => updateApplication('phoneNumber', e.target.value)}
              placeholder="Enter your phone number"
            />
            {errors.phoneNumber && (
              <span className="text-sm">{errors.phoneNumber.message}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1 space-y-4 border p-6 rounded-md">
          <div className={inputStyle}>
            <Label>Select Date Range</Label>
            <Controller
              name="dateRange"
              control={control}
              render={({ field }) => (
                <DatePickerWithRange
                  NightPrice={pricePerNight}
                  selected={applicationData.dateRange}
                  onChange={(date) => updateApplication('dateRange', date)}
                />
              )}
            />
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
                    value={applicationData.adults}
                    readOnly
                    className="w-16 text-center"
                  />
                  <Button
                    type="button"
                    onClick={() => handleIncrement('adults')}
                    disabled={
                      applicationData.kids + applicationData.adults ===
                      maxPerson
                    }
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
                    value={applicationData.kids}
                    readOnly
                    className="w-16 text-center"
                  />
                  <Button
                    type="button"
                    onClick={() => handleIncrement('kids')}
                    disabled={
                      applicationData.kids + applicationData.adults ===
                      maxPerson
                    }
                  >
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
      <div className="flex justify-start mt-8">
        <Button type="submit" disabled={isPending} variant="destructive">
          {isPending ? 'Submitting...' : 'Submit Application'}
        </Button>
      </div>
    </form>
  );
};

const inputStyle = 'flex flex-col gap-2';
export default ApplicationForm;
