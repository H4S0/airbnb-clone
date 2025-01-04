import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import {
  registerSchema,
  RegisterSchemaType,
} from '../../../backend/src/shared/libs/zodSchema';

const RegistrationForm = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchemaType> = (data) =>
    console.log(data);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Register</h2>
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
          <div className="flex flex-col gap-2 items-start">
            <Label>Confirm Password</Label>
            <Input
              {...register('confirmPassword')}
              type="password"
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="mt-4 ">
            <Button className="w-full" type="submit" variant="destructive">
              Submit
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

export default RegistrationForm;
