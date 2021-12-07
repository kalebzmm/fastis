import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { userService } from 'services';

// CSS Import
import 'public/css/main.css';
import 'public/css/app.css';
import 'styles/globals.css';

export default App;

function App({ Component, pageProps }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Executa as funções do template Huro
    function huroConfig(){
        initPageLoader(),switchLayouts(),initBgImages(),feather.replace(),setActivelink(),updateSidebarNaver(),initMobileNavbar(),initMobileNavbarHamburger(),$(".main-sidebar").length&&(initSidebar(),$("[data-sidebar-open]").length&&openSidebar(),window.matchMedia("(min-width: 768px)").matches&&window.matchMedia("(max-width: 1024px)").matches&&window.matchMedia("(orientation: landscape)").matches&&(closeSidebarPanel(),$(".main-sidebar, .sidebar-brand").removeClass("is-bordered")),$(window).on("resize",(function(){window.matchMedia("(min-width: 768px)").matches&&window.matchMedia("(max-width: 1024px)").matches&&window.matchMedia("(orientation: landscape)").matches&&(closeSidebarPanel(),$(".main-sidebar, .sidebar-brand").removeClass("is-bordered"))}))),$(".view-wrapper").hasClass("is-webapp")&&initWebapp(),initCollapsibleMenu(),initStuckHeader(),initNavbarDropdowns(),initDropdowns(),initMobileDropdowns(),adjustDropdowns(),initChosenSelects(),initTabs(),initTabbedWidgets(),initHSelect(),initComboBox(),initImageComboBox(),initUserComboBox(),initStackedComboBox(),initBigComboBox(),initAccordion(),initAnimatedModals(),initHModals(),initPanels(),initSmallTextTip(),initTextTip(),initMediumTextTip(),initAnimatedCheckboxes(),initCustomTextFilter(),initTextFilter(),initAdvancedFlexTable(),initSingleAccordion(),initCollapse(),initPlayers(),initSearch(),initDarkMode();
    }

    useEffect(() => {

        huroConfig();

        // run auth check on initial load
        authCheck(router.asPath);

        const handleStart = (url) => (url !== router.asPath) && setLoading(true);
        const handleComplete = (url) => {
            huroConfig();
            (url === router.asPath) && setLoading(false);
        }

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }

    }, []);

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in 
        const publicPaths = ['/login'];
        const path = url.split('?')[0];
        if (!userService.userValue && !publicPaths.includes(path)) {
            router.push({
                pathname: '/login',
                query: { returnUrl: router.asPath }
            });
        }
    }

    return (
        <>
            <Head>
                <title>Fastis</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800;900&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,700" rel="stylesheet" />
            </Head>

            <Component {...pageProps} />

        </>
    );

}
