import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import '../Register/styles.css';
import { Container, Row, Col} from 'react-bootstrap';

import logoImg from '../../assets/logo.svg';

export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })

            history.push('/profile');
        } catch(err){
            alert('Erro ao cadastrar caso, tente novamente.');
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

                            <Link className="back-link" to="/profile">
                                <FiArrowLeft size={16} color="#E02041" />
                                Voltar para home
                            </Link>

                            <h1>Cadastrar novo caso</h1>
                            <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                        </section>
                    </Col>
                    <Col sm={12} lg={6}>
                        <form onSubmit={handleNewIncident}>
                            <input 
                                placeholder="Título do caso"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                            <textarea 
                                placeholder="Descrição"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                            <input 
                                placeholder="Valor em reais"
                                value={value}
                                onChange={e => setValue(e.target.value)}
                            />
                            <button className="button" type="submit">Cadastrar</button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}