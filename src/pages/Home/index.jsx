import './style.css'
import Trash from '../../assets/trash.svg'

function Home() {

  const users = [
    {
      id: '24235456545gf',
      name: 'Eduardo',
      age: 28,
      email: 'eduardo@email.com'
    },
    {
      id: '231423432',
      name: 'Sabrina',
      age: 25,
      email: 'sabrina@email.com'
    }
  ]

  return (

    <div className='container'>
      <form action="">
        <h1>Cadastro de Usuários</h1>
        <input type="text" name='nome' />
        <input type="number" name='idade' />
        <input type="email" name='email' />
        <button type='button'>Cadastrar</button>
      </form>

      {users.map(user => (
        <div key={user.id}>
          <div>
            <p>Nome: {user.name}</p>
            <p>Idade: {user.age}</p>
            <p>Email: {user.email}</p>
          </div>
          <button>
            <img src={Trash} width={30} alt="" />
          </button>
        </div>
      ))}

    </div>
  )
}

export default Home
