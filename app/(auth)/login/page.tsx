import Link from "next/link";

const Login: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col items-center justify-end gap-5 min-h-[150px]">
        <h1>Login.</h1>
        <div className="flex items-center gap-2">
          <p>Don&apos;t have an account yet?</p>
          <Link href="/register">register</Link>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Login;
