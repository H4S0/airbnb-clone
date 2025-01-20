import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import {
  loginSchema,
  LoginSchemaType,
} from '../../../backend/src/shared/libs/zodSchema';
import { useLogin } from '@/hooks/useLogin';

const LoginForm = ({ onClose }) => {
  const { mutate, isPending } = useLogin();
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    setErrorMessage(''); // Reset the error message before submitting
    mutate(data, {
      onSuccess: () => {
        console.log('Login successful');
      },
      onError: () => {
        setErrorMessage('Invalid credentials. Please try again.');

        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-2 items-start">
            <Label>Email</Label>
            <Input {...register('email')} placeholder="Enter your email" />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 items-start">
            <Label>Password</Label>
            <Input
              {...register('password')}
              type="password"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {errorMessage && (
            <p className="text-red-500 text-center text-sm">{errorMessage}</p>
          )}

          <div className="mt-4 ">
            <Button className="w-full" type="submit" variant="destructive">
              {isPending ? 'Logging in...' : 'Login'}
            </Button>
            <Button className="w-full mt-3" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
