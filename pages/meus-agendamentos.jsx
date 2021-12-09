import { Nav } from 'components';
import { useEffect, useState } from 'react';
import fastis from '../helpers/axios'
const moment = require('moment');

export default Home;

function Home() {

    const [agendamentos, setAgendamentos] = useState([]);

    useEffect(() => {

        fastis.get('/minhaagenda/?id='+JSON.parse(localStorage.user).id).then((response) => {
            console.log(response.data)
            let arr = response.data.reverse();
            setAgendamentos(arr)
        }).catch((err) => {
            console.log(err)
        })

    }, [])

    return (
    <div id="huro-app" className="app-wrapper">
        <Nav />
        <div className="view-wrapper">
            <div className="page-content-wrapper">
                <div className="page-content is-relative">

                <div className="page-title has-text-centered">
                    <div className="title-wrap">
                        <h1 className="title is-4">Meus Agendamentos</h1>
                    </div>
                </div>
                    
                <div className="page-content-inner">
                    {agendamentos.map((item, index) => {
                    {/*Notifications Page*/}
                    return (<div key={index} className="timeline-wrapper">
                        <div className="timeline-header" />
                        <div className="timeline-wrapper-inner">
                            <div className="timeline-container">
                                {/*Timeline item*/}
                                <div className="timeline-item is-unread">
                                <div className="date">
                                    <span>{moment(item.data).format('DD/MM/YYYY')}</span>
                                </div>
                                <div className="dot is-primary" />
                                <div className="content-wrap">
                                    <div className="content-box">
                                    <div className="status" />
                                    <div className="h-avatar">
                                        <img className="avatar" src="/imagens/calendar.jpg" alt="" data-user-popover={6} />
                                    </div>
                                    <div className="box-text">
                                        <div className="meta-text">
                                        <p><span>Você</span> agendou <a>{item.servico}</a>.</p>
                                        <span>Às {moment(item.data).format('HH:mm:ss')}</span>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                    })}
                </div>

                    
                </div>
            </div>
        </div>
    </div>
    );

}
