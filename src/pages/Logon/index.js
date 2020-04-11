import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import Footer from '../../components/footer';

import api from '../../services/api';

import './styles.css';
import { Image, Toast, Button, Container, Row, Col} from 'react-bootstrap';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();
    let [show, setShow] = useState();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch(err){
            //alert('Falha no login, tente novamente.');
            setShow(true);
        }
    }
    
    function Alert() {        
        if(show){
            return (
                <Row>
                  <Col sm={12}>
                    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                      <Toast.Header>
                        <strong className="mr-auto">Algo não está certo</strong>
                      </Toast.Header>
                      <Toast.Body>Falha no login, tente novamente.</Toast.Body>
                    </Toast>
                  </Col>
                </Row>
              );
        }
        return '';
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
                                <Alert />
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