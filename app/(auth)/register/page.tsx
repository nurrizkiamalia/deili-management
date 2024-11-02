import Link from "next/link";

const Register: React.FC = () => {
  return(
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col items-center justify-end gap-5 min-h-[150px]">
        <h1>Register your account.</h1>
        <div className="flex items-center gap-2">
          <p>Already have an account?</p>
          <Link href="/login">login</Link>
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Register;