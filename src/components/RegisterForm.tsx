import { useForm } from "react-hook-form";
import { useEffect } from "react";
import "../RegisterForm.css";
import { useNavigate } from "react-router-dom";
import User from "../interfaces/User.ts";
import { useAuth } from "../context/AuthContext.tsx";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (values) => {
    signup(values as User);
  });
  const { isAuthenticated, signup } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        {...register("username", {
          required: "El nombre de usuario es requerido",
        })}
        placeholder="Nombre de usuario"
      />
      {errors.username && <p>{errors.username.message}</p>}
      <input
        type="password"
        id="password"
        {...register("password", { required: "La contraseña es requerida" })}
        placeholder="Contraseña"
      />

      {errors.password && <p>{errors.password.message}</p>}
      <input
        type="text"
        {...register("nombres", { required: "El nombre es requerido" })}
        placeholder="Nombres"
      />
      {errors.nombres && <p>{errors.nombres.message}</p>}
      <input
        type="text"
        {...register("apellidos", { required: "El apellido es requerido" })}
        placeholder="Apellidos"
      />
      {errors.apellidos && <p>{errors.apellidos.message}</p>}
      <input
        type="email"
        {...register("mail", { required: "El mail es requerido" })}
        placeholder="Mail"
      />
      {errors.mail && <p>{errors.mail.message}</p>}
      <input
        type="number"
        {...register("nroTelefono", {
          required: "El número de teléfono es requerido",
        })}
        placeholder="Número de teléfono"
      />
      {errors.nroTelefono && <p>{errors.nroTelefono.message}</p>}
      <input
        type="date"
        {...register("fechaNacimiento", {
          required: "La fecha de nacimiento es requerida",
        })}
        placeholder="Fecha de nacimiento"
      />
      {errors.fechaDeNacimiento && <p>{errors.fechaDeNacimiento.message}</p>}
      <button type="submit">Registrarse</button>
    </form>
  );
}

export default RegisterForm;
