import Image from 'next/image'

const KakaoLoginButton = () => {
    const handleLogin = () => {
      const REST_API_KEY = "330caee9b983e753387fe01392f1bb0d";
      const REDIRECT_URI = encodeURIComponent("http://localhost:3000/login?provider=kakao");
  
      // 카카오 OAuth 인증 URL
      const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  

      window.location.href = kakaoAuthUrl;
    };
  
    return (
      <button onClick={handleLogin}>
        <Image src="/icons/kakao.svg" alt="카카오 로그인" width={40} height={40} />
      </button>
    );
  };
  
  export default KakaoLoginButton;
  