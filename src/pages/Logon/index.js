import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import Footer from '../../components/footer';

import api from '../../services/api';

import './styles.css';
import { Image, Container, Row, Col} from 'react-bootstrap';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch(err){
            alert('Falha no login, tente novamente.');
        }
    }


    return(
        <div className="logon-container">
            <Container>
                <Row>
                    <Col sm={12} lg={6}>
                        <section className="form">
                            <div className="logo">
                                <Image src={logoImg} alt="Be The Hero"/>
                            </div>

                            <form onSubmit={handleLogin} >
                                <h1>Faça seu logon</h1>

                                <input
                                    placeholder="Sua ID"
                                    value={id}
                                    onChange={e => setId(e.target.value)}
                                />

                                <button className="button" type="submit">Entrar</button>

                                <Link className="back-link" to="/register">
                                    <FiLogIn size={16} color="#E02041" />
                                    Não tenho cadastro
                                </Link>
                            </form>
                        </section>
                    </Col>
                    <Col sm={12} lg={6}>
                        <img src={heroesImg} alt="Heroes" width="500" style={{width:'100%'}} />
                    </Col>
                </Row>
                <Footer />
            </Container>
        </div>
    );
}