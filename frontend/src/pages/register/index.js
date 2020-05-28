import React, { useState } from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './stiles.css';
import logoImg from '../../assets/logo.svg';

export default function Register(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e){
    e.preventDefault();
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };
    try{
      const response = await api.post('ongs', data)
      alert(`Seu ID de acesso: ${response.data.id}`);
      history.push('/');
    }catch(err){
      alert('num foi dessa vez papai')
    }
  };

  return(
    <div className="register-conteiner">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1> Cadastro</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid excepturi enim blanditiis quisquam, quod reprehenderit quae omnis ipsam? Sequi rerum explicabo repellat, beatae veritatis aliquam tempora! Nihil quae deserunt unde!</p>
          <Link className="back-link" to="/"> 
          <FiArrowLeft size={16} color="#E02041"/>
          Não tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input 
            placeholder="Nome da ONG"
            value = {name} 
            onChange={e => setName(e.target.value)}
          />
          <input 
            type="email" 
            placeholder="E-mail"
            value = {email} 
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            placeholder="WhatsApp" 
            value = {whatsapp} 
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-grup">
            <input 
              placeholder="Cidade" 
              value = {city} 
              onChange={e => setCity(e.target.value)}
            />
            <input 
              placeholder="UF" 
              style={{ width: 80}} 
              value = {uf} 
              onChange={e => setUf(e.target.value)}
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}