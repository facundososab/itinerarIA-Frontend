import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.tsx'

export function RegisterForm(): JSX.Element {
  const { register, handleSubmit } = useForm()
  const { user, isAuthenticated, signup } = useContext(AuthContext)
  return (
    <form
      onSubmit={handleSubmit((values) => {
        console.log(values)
      })}
    >
      <input
        type="text"
        {...register('username')}
        placeholder="Nombre de usuario"
      />
      <input
        type="password"
        {...register('password')}
        placeholder="Contraseña"
      />
      <input type="text" {...register('nombres')} placeholder="Nombres" />
      <input type="text" {...register('apellidos')} placeholder="Apellidos" />
      <input type="email" {...register('mail')} placeholder="Mail" />
      <input
        type="number"
        {...register('nroTelefono')}
        placeholder="Número de teléfono"
      />
      <input
        type="date"
        {...register('fechaDeNacimiento')}
        placeholder="Fecha de nacimiento"
      />
      <button type="submit">Registrarse</button>
    </form>
  )
}
