import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import Edit from '../../assets/edit.svg'
import api from '../../services/api'

function Home() {

  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()
  const inputEvolution = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data)

  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)

    getUsers()
  }

  async function createUsers() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: parseInt(inputAge.current.value, 10),
      email: inputEmail.current.value,
      evolution:  inputEvolution.current.value
    })

    inputName.current.value = ''
    inputAge.current.value = ''
    inputEmail.current.value = ''
    inputEvolution.current.value = ''
    getUsers()
  }


  useEffect(() => {
    getUsers()
  }, [])

  return (

    <div className='container'>
      <form>
        <h1>Cadastro de Pacientes</h1>
        <input placeholder='Nome' type="text" name='nome' ref={inputName} />
        <input placeholder='Idade' type="number" name='idade' ref={inputAge} />
        <input placeholder='E-mail' type="email" name='email' ref={inputEmail} />
        <textarea placeholder='Evolução' wrap='true' ref={inputEvolution}/>
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map(user => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
            <p>Evolução: <span>{user.evolution}</span></p>
          </div>
          <div>
            <button>
              <img src={Edit} width={26} alt="Edit Icon" />
            </button>
            <button onClick={() => deleteUsers(user.id)}>
              <img src={Trash} width={30} alt="Trash Icon" />
            </button>
          </div>
        </div>
      ))}

    </div>
  )
}

export default Home
