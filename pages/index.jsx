import { Nav } from 'components';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Heart } from 'react-feather';
import fastis from '../helpers/axios'
import Link from 'next/link';

export default Home;

function Home() {

    const [servicos, setServicos] = useState([])

    useEffect(() => {
        fastis.get('/categorias').then((data) => {
            setServicos(data.data.slice(0, 20));
        });
    }, [])

    return (
    <div id="huro-app" className="app-wrapper">
        <Nav />
        <div className="view-wrapper">
            <div className="page-content-wrapper">
                <div className="page-content is-relative">

                <div className="page-title has-text-centered">
                    <div className="title-wrap">
                        <h1 className="title is-4">Categorias</h1>
                    </div>
                </div>

                    <div className="page-content-inner">
                        <div className="list-view list-view-v4">
                            {/*Active Tab*/}
                            <div id="active-items-tab" className="tab-content is-active">
                                <div className="flex-table">
                                    <div className="flex-list-inner">
                                    {/*Table item*/}
                                    {servicos.map((item, index) => {
                                        return (
                                        <div key={index} className="list-view-item">
                                            <div className="list-view-item-inner">
                                                <div className="pre-meta">
                                                    <h3 data-filter-match>{item.categoria_nome}</h3>
                                                </div>
                                                <img className="avatar" src={`/imagens/categorias/${item.id}.jpg`} alt="" />
                                                <div className="meta-left">
                                                    {item.descricao}
                                                </div>
                                                <div className="meta-right">
                                                <div className="buttons">
                                                    <Link href={`/categorias/${item.id}`}>
                                                        <a className="button h-button is-primary is-outlined is-raised">Ver Serviços</a>
                                                    </Link>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    })}
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
