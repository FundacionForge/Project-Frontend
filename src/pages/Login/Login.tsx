import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RiGitRepositoryPrivateLine, RiMailLine } from 'react-icons/ri';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { config } from '@/config';
import { PrivateRoutes, PublicRoutes } from '@/models/routes';
import { createUser, resetUser } from '@/redux/state/user.slice';
import { AppDispatch } from '@/redux/store';
import { clearLocalStorage } from '@/utils/localStorage.util';
import { loginUser } from '@/services/auth.service';

interface LoginFormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const initialValues: LoginFormValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Ingresa tu correo electrónico'),
    password: Yup.string().required('Ingresa tu contraseña').min(6, 'La contraseña debe tener al menos 6 caracteres'),
  });

  const onLogin = async (values: LoginFormValues) => {
    try {
      const result = await loginUser(values);
      dispatch(createUser({ ...result }));
      navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true });
    } catch (error: any) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    clearLocalStorage(config.TOKEN_STORAGE);
    dispatch(resetUser());
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
  }, []);

  return (
    <div className="min-h-screen bg-[#F2F4FE] flex items-center justify-center p-4">
      <div className="max-w-lg">
        <div className="bg-white w-full rounded-lg p-8 mb-8">
          <div className="flex flex-col items-center gap-1 mb-8">
            <h1 className="text-xl text-gray-900">Bienvenido</h1>
            <p className="text-gray-400 text-sm">Ingresa con tu correo electrónico y tu contraseña</p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              onLogin(values);
              setSubmitting(false);
            }}
          >
            <Form className="flex flex-col gap-4">
              <div>
                <div className="relative">
                  <Field
                    name="username"
                    className="w-full border py-2 px-10 rounded-md outline-none"
                    placeholder="Ingresa tu correo"
                  />
                  <RiMailLine className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-blue-500" />
                </div>
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <div className="relative">
                  <Field
                    name="password"
                    type="password"
                    className="w-full border py-2 px-10 rounded-md outline-none"
                    placeholder="Ingresa tu contraseña"
                  />
                  <RiGitRepositoryPrivateLine className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-blue-500" />
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-primary py-2 px-4 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Ingresar
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
