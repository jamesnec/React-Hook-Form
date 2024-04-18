import { useForm } from 'react-hook-form'

function App() {

  const {register, handleSubmit, formState: {errors}, watch, setValue} = useForm({
    defaultValues: {
      nombre: "James"
    }
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <form onSubmit={onSubmit}>
      {/* nombre */}
      <label htmlFor="nombre">Nombre</label>
      <input 
        type="text"
        {...register("nombre", {
          required: {
            value: true,
            message: "Nombre es requerido"
          },
          minLength: {
            value: 2,
            message: "Nombre debe tener al menos 2 caracteres"
          },
          maxLength: {
            value: 20,
            message: "Nombre ebe tener máximo 20 caracteres"
          }
        })} />
        {
          errors.nombre && <span className='error'>{errors.nombre.message}</span>
        }

      {/* correo */}
      <label htmlFor="correo">Correo</label>
      <input 
        type="email"
        {...register("email", {
          required: {
            value: true,
            message: "Correo es requerido"
          },
          pattern: {
            value: /^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}$/,
            message: "Correo no válido"
          }
        })} />
        {
          errors.email && <span className='error'>{errors.email.message}</span>
        }        

      {/* password */}
      <label htmlFor="password">Password</label>
      <input 
        type="password"
        {...register("password", {
          required: {
            value: true,
            message: "Password es requerido"
          },
          minLength: {
            value: 6,
            message: "Password debe tener al menos 6 caracteres"
          }
        })} />
        {
          errors.password && <span className='error'>{errors.password.message}</span>
        }           

      {/* confirmPassword */}
      <label htmlFor="confirmPassword">Confirmar password</label>
      <input 
        type="password"
        {...register("confirmPassword", {
          required: {
            value: true,
            message: "Confirmar password es requerido"
          }, 
          validate: (value) => {
            if(value === watch('password')){
              return true
            }else{
              return "Los passwords no coinciden"
            }
          }
        })} />
        {
          errors.confirmPassword && <span className='error'>{errors.confirmPassword.message}</span>
        }        

      {/* birthday */}
      <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
      <input 
        type="date"
        {...register("fechaNacimiento", {
          required: {
            value: true,
            message: "Fecha de nacimiento es requerida"
          },
          validate: (value) => {
            const fechaNacimiento = new Date(value);
            const fechaActual = new Date();
            const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

            return edad >= 18 || "Debe ser mayor de edad"
          }
        })} />
        {
          errors.fechaNacimiento && <span className='error'>{errors.fechaNacimiento.message}</span>
        }

      {/* country */}
      <label htmlFor="pais">País</label>
      <select
        {...register("pais", {
          required: {
            value: true,
            message: "El país es requerido"
          }
        })} >
        <option value="" hidden>Escoger una opción</option>
        <option value="mx">México</option>
        <option value="co">Colombia</option>
        <option value="ar">Argentina</option>
      </select>
      {
        errors.pais && <span className='error'>{errors.pais.message}</span>
      }

      {
        watch('pais') === 'ar' && (
          <>
            <input type="text" placeholder='Provincia' {...register('provincia', {
              required: {
                value: true,
                message: "Provincia es requerida"
              }
            })} />  
            {
              errors.provincia && <span className='error'>{errors.provincia.message}</span>
            }                    
          </>
        )
      }

      {/* file */}
      <label htmlFor="foto">Foto de perfil</label>
      <input type="file" onChange={(e) => {
        setValue('fotoUser', e.target.files[0].name)
      }} />

      {/* terms */}
      <label htmlFor="terminos">Acepto términos y condiciones</label>
      <input type="checkbox"
        {...register("terminos", {
          required: {
            value: true,
            message: "Debe aceptar los términos y condiciones"
          }
        })} />

      {
        errors.terminos && <span className='error'>{errors.terminos.message}</span>
      }        

      <button type='submit'>Enviar</button>

      <pre>
        {JSON.stringify(watch(), null, 2)}
      </pre>
    </form>
  )
}

export default App