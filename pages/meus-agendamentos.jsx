import { Nav } from 'components';
import { useEffect } from 'react';
import fastis from '../helpers/axios'

export default Home;

function Home() {

    useEffect(() => {

        fastis.get('/minhaagenda/?id='+JSON.parse(localStorage.user).id).then((data) => {
            console.log(data)
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
                    
                </div>
            </div>
        </div>
    </div>
    );

}
