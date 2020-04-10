import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import { Container, Row, Col} from 'react-bootstrap';

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
            uf
        };

        try{
            const response = await api.post('ongs', data)

            alert(`Seu ID de acesso: ${response.data.id}`);

            history.push('/');
        } catch(err){
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="register-container">
            <Container>
                <Row>
                    <Col sm={12} lg={6}>
                        <section>
                            <div className="logo">
                                <img src={logoImg} alt="Be The Hero" />
                            </div>

                            <h1>Cadastro</h1>
                            <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                            <Link className="back-link" to="/">
                                <FiArrowLeft size={16} color="#E02041" />
                                Voltar para o Logon
                            </Link>
                        </section>
                    </Col>
                    <Col sm={12} lg={6}>
                        <form onSubmit={handleRegister}>
                            <input
                                placeholder="Nome da ONG"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <input
                                placeholder="WhatsApp"
                                value={whatsapp}
                                onChange={e => setWhatsapp(e.target.value)}
                            />
                            <div className="input-group">
                                <input
                                    placeholder="Cidade"
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
                                />
                                <input
                                    placeholder="UF"
                                    value={uf}
                                    onChange={e => setUf(e.target.value)}
                                />
                            </div>
                            <button className="button" type="submit">Cadastrar</button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}