import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogOut, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import { Container, Row, Col} from 'react-bootstrap';

import logoImg from '../../assets/logo.svg';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch(err){
            alert('Erro ao deletar caso, tente novamente');
        }
    }

    function hadleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return(
        <div>
        <div className="profile-container">
            <Container>
                <Row>
                    <header>
                        <img src={logoImg} alt="Be The Hero" />

                        <button onClick={hadleLogout} type="button">
                            <span>SAIR</span>
                            <FiLogOut size={18} color="#E02041" />
                        </button>
                    </header>

                    <Col sm={12} lg={6}>
                        <h3>Bem vinda, {ongName}</h3>
                    </Col>

                    <Col sm={12} lg={6}>
                       {/* <h1>Casos cadastrados</h1> */}
                    </Col>
                    <ul>
                        {incidents.map(incident => (
                            <li key={incident.id}>
                                <strong>CASO:</strong>
                                <p>{incident.title}</p>

                                <strong>DESCRIÇÃO:</strong>
                                <p>{incident.description}</p>

                                <strong>VALOR:</strong>
                                <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                                <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                                    <FiTrash2 size={20} color="#a8a8b3" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </Row>
            </Container>
        </div>
        <Link className="button cadastrar-caso" to="/incidents/new">Cadastrar novo caso</Link>
        </div>
    );
}