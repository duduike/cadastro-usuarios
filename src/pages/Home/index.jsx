import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../assets/trash.svg";
import Edit from "../../assets/edit.svg";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();
  const inputEvolucao = useRef();

  async function getUsers() {
    try {
      const usersFromApi = await api.get("/usuarios");
      console.log(usersFromApi);
      setUsers(usersFromApi.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }

  async function deleteUsers(id) {
    try {
      await api.delete(`/usuarios/${id}`);
      getUsers();
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  }

  async function createUsers() {
    try {
      await api.post("/usuarios", {
        name: inputName.current.value,
        age: parseInt(inputAge.current.value, 10),
        email: inputEmail.current.value,
        evolucao: inputEvolucao.current.value,
      });

      inputName.current.value = "";
      inputAge.current.value = "";
      inputEmail.current.value = "";
      inputEvolucao.current.value = "";
      getUsers();
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  }

  async function updateUsers() {
    if (editingUser) {
      try {
        await api.put(`/usuarios/${editingUser.id}`, {
          name: inputName.current.value,
          age: parseInt(inputAge.current.value, 10),
          email: inputEmail.current.value,
          evolucao: inputEvolucao.current.value,
        });

        setEditingUser(null);
        inputName.current.value = "";
        inputAge.current.value = "";
        inputEmail.current.value = "";
        inputEvolucao.current.value = "";
        getUsers();
      } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
      }
    }
  }

  function handleEdit(user) {
    setEditingUser(user);
    inputName.current.value = user.name;
    inputAge.current.value = user.age;
    inputEmail.current.value = user.email;
    inputEvolucao.current.value = user.evolucao;
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Pacientes</h1>
        <input placeholder="Nome" type="text" name="nome" ref={inputName} />
        <input placeholder="Idade" type="number" name="idade" ref={inputAge} />
        <input
          placeholder="E-mail"
          type="email"
          name="email"
          ref={inputEmail}
        />
        <textarea placeholder="Evolução" wrap="true" ref={inputEvolucao} />
        <button type="button" onClick={editingUser ? updateUsers : createUsers}>
          {editingUser ? "Atualizar" : "Cadastrar"}
        </button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              Nome: <span>{user.name}</span>
            </p>
            <p>
              Idade: <span>{user.age}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
            <p>
              Evolução: <span>{user.evolucao}</span>
            </p>
          </div>
          <div>
            <button onClick={() => handleEdit(user)}>
              <img src={Edit} width={26} alt="Edit Icon" />
            </button>
            <button onClick={() => deleteUsers(user.id)}>
              <img src={Trash} width={30} alt="Trash Icon" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
