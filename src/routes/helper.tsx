import { redirect } from 'react-router-dom';

const isAuthenticated = async () => {
  // TODO: use login token here
  const token = true;
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  if (token) throw redirect('/');
  return null;
};

export default isAuthenticated;
