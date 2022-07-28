import React, { useEffect, useState } from 'react'
import { Error } from '../Error/Error';
import { Paciente } from '../Paciente/Paciente';

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {

  const [ nombre, setNombre ] = useState('');
  const [ propietario, setPropietario ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ alta, setAlta ] = useState('');
  const [ sintomas, setSintomas ] = useState('');
  const [ error, setError ] = useState(false);

  useEffect(() => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setAlta(paciente.alta)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36)

    return random + fecha
  }
  useEffect(() => {

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    //validacion
    if([nombre, propietario, email, alta, sintomas].includes('')){
      console.log('Hay un campo vacio');
      setError(true)
      return
    } 
    // else { es una opcion
    //   setError(false)
    // }
    //objeto paciente
    const objPaciente = {
      nombre,
      propietario,
      email,
      alta,
      sintomas
    }

    if(paciente.id){
     //editando
     objPaciente.id = paciente.id
     console.log(objPaciente);

     const pacienteActualizado = pacientes.map( state => state.id === paciente.id ? objPaciente : state)

     setPacientes(pacienteActualizado)
     setPaciente({})
    }else{
      //nuevo registro
      objPaciente.id = generarId();
      setPacientes([...pacientes, objPaciente])
    }
    

    //reiniciar
    setNombre('')
    setPropietario('')
    setEmail('')
    setAlta('')
    setSintomas('')
  }

  return (
    <div className='md:w-1/2 lg:w-2/5'>
      <h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>
      <p className='text-lg mt-5 text-center mb-10'>Anade Pacientes y {''} <span className='text-indigo-600 font-bold text-lg'>Administralos</span></p>
      <form className='bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5'
            onSubmit={handleSubmit}
      >
        {error && (
              <Error><p>Todos los campos son obligatorios</p></Error>
        )}
        <div className='mb-5'>
          <label htmlFor="mascota" className='block text-gray-700 font-bold'>Mascota</label>
          <input type="text" 
                  id='mascota'
                  placeholder='Nombre de la mascota' 
                  className='border-2  w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label htmlFor="propietario" className='block text-gray-700 font-bold'>Propietario</label>
          <input type="text" 
                  id='propietario'
                  placeholder='Nombre del propietario'
                  value={propietario}
                  onChange={e => setPropietario(e.target.value)}
                  className='border-2  w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          />
        </div>
        <div className='mb-5'>
          <label htmlFor="email" className='block text-gray-700 font-bold'>Email</label>
          <input type="email" 
                  id='email'
                  placeholder='Email Propietario' 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className='border-2  w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          />
          
        </div>
        <div className='mb-5'>
          <label htmlFor="alta" className='block text-gray-700 font-bold'>Alta</label>
          <input type="date" 
                  id='alta'
                  value={alta}
                  onChange={e => setAlta(e.target.value)}
                  className='border-2  w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          />
        </div>
        <div>
          <label htmlFor="sintomas" className='block text-gray-700 font-bold'>Sintomas</label>
          <textarea id='sintomas'
                    value={sintomas}
                    onChange={e => setSintomas(e.target.value)}
                    className='border-2  w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    placeholder='Describe los sintomas'
          />
        </div>
        <input type="submit" 
               value={paciente.id ? 'editar paciente': 'Agregar paciente'}
               className='bg-indigo-500 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all'/>
      </form>
    </div>
  )
}

export default Formulario