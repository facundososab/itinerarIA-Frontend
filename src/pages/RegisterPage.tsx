import RegisterForm from "../components/RegisterForm.tsx";
import { AuthProvider } from "../context/AuthContext.tsx";

function RegisterPage() {
  return (
    <div>
      <AuthProvider>
        <RegisterForm />
      </AuthProvider>
    </div>
  );
}

export default RegisterPage;
