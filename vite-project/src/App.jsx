import { useState, useEffect } from 'react'
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import { MantineProvider, Table } from '@mantine/core';
import "@mantine/core/styles.css"
import { Button } from '@mantine/core';
function App() {

  const [usuarios, setUsuarios] = useState([]);
  const [tablaUsuarios, setTablaUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState([]);
  
  const peticionGet= async ()=>{
    await axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res=>{
      setUsuarios(res.data);
      setTablaUsuarios(res.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const handleChange=e=>{
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }

  const filtrar =(terminoBusqueda) =>{
    let resultadoBusqueda=tablaUsuarios.filter((elemento)=>{
      if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
        elemento.company.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())||
        elemento.address.city.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())||
        elemento.username.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()))
        
      {
        return elemento;
      }
    });
    setUsuarios(resultadoBusqueda);
  }


  useEffect(() => {
    peticionGet();
  },[])


  const rows = usuarios.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.phone}</Table.Td>
      <Table.Td>{element.username}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td>{element.website}</Table.Td>
      
    </Table.Tr>
  ))

  return (
    <MantineProvider>
      <div className='containerInput'>
        <input className='form-control inputBuscar' 
        value={busqueda}
        placeholder='Busqueda'
        onChange={handleChange}
        />
        <Button variant="filled" color="green" radius="md">
          Buscar
        </Button>
      </div>
      <Table striped highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>id</Table.Th>
          <Table.Th>name</Table.Th>
          <Table.Th>phone</Table.Th>
          <Table.Th>username</Table.Th>
          <Table.Th>email</Table.Th>
          <Table.Th>website</Table.Th>
          
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
      
    </MantineProvider>
  )
}

export default App
