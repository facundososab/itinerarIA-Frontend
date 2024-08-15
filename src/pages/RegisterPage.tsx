import { useForm } from "react-hook-form";

function RegisterPage() {
  const { register, handleSubmit } = useForm();

  return (
    <div>
      <form
        onSubmit={handleSubmit((values) => {
          console.log(values);
        })}
      >
        <input
          type="text"
          {...register("nombreDeUsuario")}
          placeholder="Nombre de usuario"
        />
        <input
          type="password"
          {...register("password")}
          placeholder="Contraseña"
        />
        <input type="text" {...register("nombres")} placeholder="Nombres" />
        <input type="text" {...register("apellidos")} placeholder="Apellidos" />
        <input type="email" {...register("mail")} placeholder="Mail" />
        <input
          type="number"
          {...register("nroTelefono")}
          placeholder="Número de teléfono"
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default RegisterPage;
