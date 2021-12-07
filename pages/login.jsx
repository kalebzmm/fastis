import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService } from 'services';

export default Login;

function Login() {
    const router = useRouter();

    useEffect(() => {
        // redirect to home if already logged in
        if (userService.userValue) {
            router.push('/');
        }

    }, []);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Informe o usuário'),
        password: Yup.string().required('Informe a senha')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, setError, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit({ username, password }) {
        return userService.login(username, password)
            .then(() => {
                // get return url from query parameters or default to '/'
                const returnUrl = router.query.returnUrl || '/';
                location.href = returnUrl;
                // router.push(returnUrl);
            })
            .catch(error => {
                setError('apiError', { message: error });
            });
    }

    return (
        <div id="huro-app" className="app-wrapper">
            <div className="auth-wrapper">
            <div className="auth-wrapper-inner columns is-gapless">
                <div className="column login-column is-8 h-hidden-mobile hero-banner">
                <div className="hero login-hero is-fullheight is-app-grey">
                    <div className="hero-body">
                    <div className="columns">
                        <div className="column is-10 is-offset-1">
                        <img className="light-image has-light-shadow has-light-border" src="/img/bg/login/calendar.png" alt="" />
                        <img className="dark-image has-light-shadow" src="/img/bg/login/calendar.png" alt="" />
                        </div>
                    </div>
                    </div>
                    <div className="hero-footer">
                    <p className="has-text-centered" />
                    </div>
                </div>
                </div>
                <div className="column is-4">
                <div className="hero is-fullheight is-white">
                    <div className="hero-heading">
                    <label className="dark-mode ml-auto">
                        <input type="checkbox" defaultChecked />
                        <span />
                    </label>
                    <div className="auth-logo">
                        <a href="/">
                        <img className="top-logo light-image" src="/img/logos/logo/logo.svg" alt="" />
                        <img className="top-logo dark-image" src="/img/logos/logo/logo-light.svg" alt="" />
                        </a>
                    </div>
                    </div>
                    <div className="hero-body">
                    <div className="container">
                        <div className="columns">
                        <div className="column is-12">
                            <div className="auth-content">
                            <h2>Bem-vindo</h2>
                            <p>Por favor, informe os dados de acesso a sua conta</p>
                            </div>
                            <div className="auth-form-wrapper">
                            {/* Login Form */}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div id="signin-form" className="login-form">
                                {/* Input */}
                                <div className="field">
                                    <div className="control has-icon">
                                    <input name="username" {...register('username')} className={`input ${errors.username ? 'is-invalid' : ''}`} type="text" placeholder="Usuário" />
                                    <span className="form-icon">
                                        <i className="lnir lnir-user"></i>
                                    </span>
                                    </div>
                                </div>
                                {/* Input */}
                                <div className="field">
                                    <div className="control has-icon">
                                    <input autoComplete="" {...register('password')} className={`input ${errors.password ? 'is-invalid' : ''}`} type="password" placeholder="Senha" />
                                    <span className="form-icon">
                                        <i className="lnil lnil-lock"></i>
                                    </span>
                                    </div>
                                </div>
                                {/* Submit */}
                                <div className="control login">
                                    <button disabled={formState.isSubmitting} className={`button h-button is-primary is-bold is-fullwidth is-raised ${formState.isSubmitting ? 'is-loading' : ''}`}>
                                        Entrar
                                    </button>
                                </div>
                                {errors.apiError &&
                                    <div className="alert alert-danger mt-3 mb-0">{errors.apiError?.message}</div>
                                }
                                </div>
                            </form>
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
