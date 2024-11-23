import Link from "next/link";
import RegisterForm from "./components/RegisterForm";

const Register: React.FC = () => {
  return(
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col items-center justify-end gap-5 py-10 bg-white rounded-t-xl border-2">
        <h1 className="font-semibold text-2xl md:text-3xl lg:text-5xl">Register your account.</h1>
        <div className="flex items-center gap-2">
          <p>Already have an account?</p>
          <Link href="/login" className="text-dspOrange">Login</Link>
        </div>
      </div>
      <div className="border-2 p-5 md:p-10 rounded-b-xl w-full flex items-center justify-center">
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register;