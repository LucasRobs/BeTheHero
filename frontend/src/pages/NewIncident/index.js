import React, {useState} from 'react';
import { Link , useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncidents(){
  const[title, setTitle] = useState('');
  const[descripion, setDescription] = useState('');
  const[value, setValue] = useState('');
  const ongId = localStorage.getItem('ongId');
  const history = useHistory();
  async function handleNewIncidents(e){
    e.preventDedault();

    const data = {
      title,
      descripion,
      value,
    };
    try{
      await api.post('incidents', data,{
        headers:{
          Authorization: ongId,
        }
      })
      history.push('/profile');
    }catch(err){
      alert('error vsf');
    }
  }

  return (
  <div className="new_incident-conteiner">
    <div className="content">
      <section>
        <img src={logoImg} alt="Be The Hero"/>
        <h1> Cadastrar novo caso</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid excepturi enim blanditiis quisquam, quod reprehenderit quae omnis ipsam? Sequi rerum explicabo repellat, beatae veritatis aliquam tempora! Nihil quae deserunt unde!</p>
        <Link className="back-link" to="/profile"> 
        <FiArrowLeft size={16} color="#E02041"/>
        Voltar para home
        </Link>
      </section>
      <form onSubmit={handleNewIncidents}> 
        <input 
          placeholder="Título do caso" 
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        <textarea 
          placeholder="Descrição" 
            value={descripion}
            onChange={e => setDescription(e.target.value)}
          />
        <input 
          placeholder="Valor em Reais" 
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        <button className="button" type="submit">Cadastrar</button>
      </form>
    </div>
  </div>
  )
}