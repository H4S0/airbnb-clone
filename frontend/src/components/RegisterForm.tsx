import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { registerSchema } from '../../libs/zodSchema';

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });


  const onSubmit = (data: RegisterFormData) => {
    console.log('Form Data Submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="email" />
      {errors.email?.message && <p>{errors.email?.message}</p>}
      <input {...register('password')} placeholder="password" />
      {errors.password?.message && <p>{errors.password?.message}</p>}{' '}
      <input {...register('confirmPassword')} placeholder="confirm passwords" />
      {errors.confirmPassword?.message && (
        <p>{errors.confirmPassword?.message}</p>
      )}
      <button type="submit">submit</button>
    </form>
  );
};

export default RegisterForm;
