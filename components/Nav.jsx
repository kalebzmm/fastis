import { useState, useEffect } from 'react';
import { links } from './Links';
import { userService } from 'services';
import { LogOut } from 'react-feather';

export { Nav };

function Nav() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    function logout() {
        userService.logout();
    }

    return (
        <>
            <nav className="navbar mobile-navbar no-shadow is-hidden-desktop is-hidden-tablet" aria-label="main navigation">
                <div className="container">
                {/* Brand */}
                <div className="navbar-brand">
                    {/* Mobile menu toggler icon */}
                    <div className="brand-start">
                    <div className="navbar-burger">
                        <span />
                        <span />
                        <span />
                    </div>
                    </div>
                    <a className="navbar-item is-brand" href="/">
                    <img className="light-image" src="/img/logos/logo/logo.svg" alt="" />
                    <img className="dark-image" src="/img/logos/logo/logo-light.svg" alt="" />
                    </a>
                    <div className="brand-end" />
                </div>
                </div>
            </nav>
            <div className="mobile-main-sidebar">
                <div className="inner">
                <ul className="icon-side-menu">
                    {links.map((item, index) => {
                        return (
                            <li key={index}>
                                <a style={{color: '#a9abac'}} href={item.href}>
                                    {item.icon}
                                </a>
                            </li>
                        );
                    })}
                </ul>
                <ul className="bottom-icon-side-menu">
                    <li key={1}>
                        <a onClick={logout} style={{color: '#a9abac'}} href={'#'}>
                            <LogOut/>
                        </a>
                    </li>
                </ul>
                </div>
            </div>
            <div className="main-sidebar is-float">
                <div className="sidebar-brand">
                <a href="/">
                    <img src="/img/logos/logo/logo-light.svg" alt="" />
                </a>
                </div>
                <div className="sidebar-inner">
                {/* <div class="naver"></div> */}
                <ul className="icon-menu">
                    {links.map((item, index) => {
                        return (
                            <li key={index}>
                                <a style={{color: '#a9abac'}} href={item.href}>
                                    {item.icon}
                                </a>
                            </li>
                        );
                    })}
                </ul>
                {/* User account */}
                <ul className="bottom-menu">
                    <li key={1}>
                        <a onClick={logout} style={{color: '#a9abac'}}>
                            <LogOut size={20}/>
                        </a>
                    </li>
                </ul>
                </div>
            </div>
        </>
    );
}