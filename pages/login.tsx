import { useApolloClient } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Alert from '../components/common/alert';
import CustomLink from '../components/common/CustomLink';
import Title from '../components/common/Title';
import Form from '../components/forms/form';
import FormInput from '../components/forms/FormInput';
import Submit from '../components/forms/submit';
import { useLoginMutation, UserLoginInput } from '../generated/graphql';
import guestOnly from '../lib/auth/guest-only';
import { useErrorsHandler } from '../lib/hooks/use-errors-handler';
import { useToken } from '../lib/hooks/use-token';
import { loginInputSchema } from '../lib/validation/schema';

const Login: NextPage = () => {
  const router = useRouter();
  const client = useApolloClient();
  const { handleChangeToken } = useToken();
  const { errors, handleErrors, dismiss } = useErrorsHandler();

  const [login, { loading }] = useLoginMutation({
    onCompleted: async (data) => {
      if (data) {
        handleChangeToken(data.login.token as string);
        await client.resetStore();
        router.back();
      }
    },
    onError: (err) => handleErrors(err),
  });

  async function onLogin(input: UserLoginInput) {
    await login({ variables: { input } });
  }
  const init = { email: '', password: '' };
  return (
    <>
      <Title title='Sign in' />
      <div className='mb-auto'>
        <div className='container flex flex-wrap flex-col items-center mx-auto'>
          <h1 className='text-4xl font-extralight'>Sign in</h1>
          <p className='mt-4'>
            <CustomLink href='/register' mode='primary' underlined>
              Need an account?
            </CustomLink>
          </p>
          <div className='w-6/12'>
            <Alert type='danger' message={errors} />
            <Form<UserLoginInput> onSubmit={onLogin} schema={loginInputSchema} defaultValues={init}>
              <fieldset className='flex flex-col justify-center mx-auto' aria-live='polite'>
                <FormInput<UserLoginInput> name='email' placeholder='Email' dismiss={dismiss} />
                <FormInput<UserLoginInput> name='password' placeholder='Password' type='password' dismiss={dismiss} />

                <Submit size='l' className='self-end'>
                  Sign in
                </Submit>
              </fieldset>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default guestOnly(Login);
