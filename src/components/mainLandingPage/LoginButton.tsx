'use client';

import { useAuth } from '../../utils/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './LoginButton.module.css';

const LoginButton = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <div className={styles['login-container']}>
      {user ? (
        <>
          <span className={styles['user-email']}>{user.name}</span>
          <button onClick={logout} className={styles['logout-button']}>
            로그아웃
          </button>
        </>
      ) : (
        <button
          onClick={() => router.push('/login')}
          className={styles['login-button']}
        >
          로그인
        </button>
      )}
    </div>
  );
};

export default LoginButton;