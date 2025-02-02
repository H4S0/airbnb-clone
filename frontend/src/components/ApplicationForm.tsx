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

const ApplicationForm = () => {
  const { mutate, isPending } = useApplication();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationSchemaType>({
    resolver: zodResolver(applicationSchema),
  });

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
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row justify-around">
        <div>
          <div className={inputStyle}>
            <Label>Full name</Label>
            <Input
              {...register('fullName')}
              placeholder="Enter your fullname"
            />
          </div>
          <div className={inputStyle}>
            <Label>Email</Label>
            <Input {...register('email')} placeholder="Enter your email" />
          </div>
          <div className={inputStyle}>
            <Label>Phone number</Label>
            <Input
              {...register('phoneNumber')}
              placeholder="Enter your phone number"
            />
          </div>
        </div>
        <div className={inputStyle}>
          <DatePickerWithRange />
        </div>
      </div>
    </form>
  );
};

const inputStyle = 'flex flex-col gap-2 items-star mt-5';

export default ApplicationForm;
