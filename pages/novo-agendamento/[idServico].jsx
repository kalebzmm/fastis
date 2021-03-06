import { Nav } from 'components';
import { useState, useEffect } from 'react';
import fastis from '../../helpers/axios';
import { useRouter } from 'next/router';
import {format, setDate} from 'date-fns';

export default Home;

export const getServerSideProps = async (context) => {
    let { idServico } = context.query;
    if (!idServico) {
      idServico = null;
    }
    return { props: { idServico:idServico } };
}

function Home(props) {

    const router = useRouter()

    // const idServico = props.idServico;
    const idServico = 2;
    const [servico, setServico] = useState({
        id: "",
        cnpj: "",
        nome: "",
        telefone: "",
        email: "",
        responsavel: "",
        deletedAt: "",
        sub_categoria_id: ""
    })
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [observacao, setObservacao] = useState('')

    useEffect(() => {
        fastis.get(`/subcategorias/busca/${idServico}`).then((data) => {
            console.log(data.data)
            setServico(data.data[0]);
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    function enviaForm(){
        setLoading(true);
        fastis.post('/agendamento/novo', {
            cnpj: servico.cnpj,
            data: date + ' ' + time + ':00',
            observacoes: observacao,
            servico: 'corte de cabelo',
            empresa_id: idServico,
            cliente_id: JSON.parse(localStorage.user).id,
        }).then((response) => {
            setLoading(false);
            router.push('/meus-agendamentos')
        }).catch((e) => {
            setLoading(false);
        })
    }

    return (
    <div id="huro-app" className="app-wrapper">
        <Nav />
        <div className="view-wrapper">
            <div className="page-content-wrapper">
                <div className="page-content is-relative">

                    <div className="page-title has-text-centered">
                        <div className="title-wrap">
                            <h1 className="title is-4"></h1>
                        </div>
                    </div>

                    <div className="form-layout is-split">
                    <div className="form-outer">
                        <div className="form-header stuck-header">
                        <div className="form-header-inner">
                            <div className="left">
                            <h3>Novo Agendamento</h3>
                            </div>
                            <div className="right">
                            <div className="buttons">
                                <a onClick={() => router.back()} href="#" className="button h-button is-light is-dark-outlined">
                                    <span className="icon">
                                        <i className="lnir lnir-arrow-left rem-100" />
                                    </span>
                                    <span>Cancelar</span>
                                </a>
                                <button onClick={() => enviaForm()} id="save-button" className={`button h-button is-primary is-raised ${loading ? 'is-loading' : ''}`}>Agendar</button>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="form-body">
                        <div className="form-section is-grey">
                            <div className="left">
                                <h3>Servi??o</h3>
                                <div className="field">
                                    <div className="control has-icon">
                                        <input value={servico.nome} className="input is-disabled" readOnly placeholder="Nome" />
                                        <div className="form-icon">
                                            <i className="lnil lnil-apartment"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control has-icon">
                                        <input value={servico.email} className="input is-disabled" readOnly placeholder="Nome" />
                                        <div className="form-icon">
                                            <i className="lnil lnil-envelope"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control has-icon">
                                        <input value={servico.responsavel} className="input is-disabled" readOnly placeholder="Nome" />
                                        <div className="form-icon">
                                            <i className="lnil lnil-user"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control has-icon">
                                        <input value={servico.telefone} className="input is-disabled" readOnly placeholder="Nome" />
                                        <div className="form-icon">
                                            <i className="lnil lnil-phone"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="right">
                            <h3>Agendamento</h3>
                                <div className="field">
                                    <div className="control">
                                        <input onChange={(ev) => setDate(ev.target.value)} className="input" type="date"/>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <input onChange={(ev) => setTime(ev.target.value)} className="input" type="time"/>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <textarea onChange={(ev) => setObservacao(ev.target.value)} className="textarea" rows="4" placeholder="Alguma observa????o?"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    );

}
