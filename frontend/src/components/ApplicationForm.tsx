import React from 'react';
import { useForm } from 'react-hook-form';
import {
  applicationSchema,
  ApplicationSchemaType,
} from '../../../backend/src/shared/libs/zodSchema';
import { zodResolver } from '@hookform/resolvers/zod';

const ApplicationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationSchemaType>({
    resolver: zodResolver(applicationSchema),
  });
  return <div>ApplicationForm</div>;
};

export default ApplicationForm;
