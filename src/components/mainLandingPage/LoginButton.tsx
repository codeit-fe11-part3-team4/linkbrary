'use client';

import { useAuth } from '../../utils/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './LoginButton.module.css';
import Profile from "../../../public/icons/profile.svg"
import Image from 'next/image';

const LoginButton = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <div className={styles['login-container']}>
      {user ? (
        <div className='flex flex-row gap-3'>
          <button onClick={logout} className={styles['logout-button']}>
            로그아웃
          </button>
          <div className='flex items-center gap-2'>
            <Image alt="프로필" src={Profile} width={28} height={28} />
            <p className="hidden md:inline text-[14px] font-medium">{user.name}</p>
          </div>
        </div>
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