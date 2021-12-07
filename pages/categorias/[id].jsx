import { Nav } from 'components';
import {useRouter} from 'next/router';
import { useEffect, useState } from 'react';
import fastis from '../../helpers/axios'
import Link from 'next/link'

export default Home;

export const getServerSideProps = async (context) => {
    let { id } = context.query;
    if (!id) {
      id = null;
    }
    return { props: { id:id } };
}

function Home(props) {

    const id = props.id;
    const [servicos, setServicos] = useState([])

    useEffect(() => {
        fastis.get(`/categorias/busca/${id}`).then((data) => {
            setServicos(data.data);
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
                        <h1 className="title is-4">Serviços</h1>
                    </div>
                </div>

                    <div className="page-content-inner">
                        <div className="flex-list-wrapper flex-list-v3">
                            {/*Active Tab*/}
                            <div id="active-items-tab" className="tab-content is-active">
                                <div className="flex-table">
                                    {/*Table header*/}
                                    <div className="flex-table-header" data-filter-hide>
                                        <span className="is-grow-lg">Serviço</span>
                                        <span>Categoria</span>
                                        <span>Descrição</span>
                                        <span className="cell-end">Ações</span>
                                    </div>
                                    <div className="flex-list-inner">
                                    {/*Table item*/}
                                    {servicos.map((item) => {
                                        return (
                                        <div key={item.id} className="flex-table-item">
                                            <div className="flex-table-cell is-media is-grow-lg">
                                            <img className="media" src="https://via.placeholder.com/150x110" alt="" />
                                            <div>
                                                <span className="item-name dark-inverted" data-filter-match>{item.nome}</span>
                                            </div>
                                            </div>
                                            <div className="flex-table-cell" data-th="Categoria">
                                                <span className="light-text" data-filter-match>{item.categoria_id}</span>
                                            </div>
                                            <div className="flex-table-cell">

                                            </div>
                                            <div className="flex-table-cell cell-end" data-th="Ações">
                                                <Link href={`/novo-agendamento/${item.id}`}>
                                                    <a className="button h-button has-dot dark-outlined is-pushed-mobile">Agendar</a>
                                                </Link>
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