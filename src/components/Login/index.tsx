import React, {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import Link from 'next/link';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from 'axios';

const Login: React.FC = () => {
  const { setAuth } = useAuth();
  const router = useRouter();

  const userRef = useRef<HTMLInputElement | null>(
    null,
  );
  const errRef =
    useRef<HTMLParagraphElement | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        '/auth/signin',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );

      const accessToken =
        response?.data?.access_token;
      const refreshToken =
        response?.data?.refresh_token;
      const roles = response?.data?.roles;

      setAuth({
        roles,
        accessToken,
        refreshToken,
      });
      setEmail('');
      setPassword('');
      router.replace('/home');
    } catch (err: any | AxiosError) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }

      errRef.current?.focus();
    }
  };

  return (
    <section>
      <p
        ref={errRef}
        className={
          errMsg ? 'errmsg' : 'offscreen'
        }
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username:
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={e => setEmail(e.target.value)}
          value={email}
          required
        />

        <label htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          id="password"
          onChange={e =>
            setPassword(e.target.value)
          }
          value={password}
          required
        />
        <button>Sign In</button>
      </form>
      <p>
        Need an Account?
        <br />
        <span className="line">
          <Link href="/register">Sign Up</Link>
        </span>
      </p>
    </section>
  );
};

export default Login;
