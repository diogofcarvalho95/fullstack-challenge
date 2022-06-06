import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

const Input = props => (
  <input {...props} className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg outline-none focus: border-platinum"/>
 )

const validationSchema = yup.object({
  name: yup.string().required('Introduza o nome'),
  username: yup.string().required('Introduza o username'),
  email: yup.string().required('Introduza o seu email').email('Email inválido'),
  password: yup.string().required('Introduza a sua senha')
})

export function Signup({ signInUser }) {
  const formik = useFormik({
    onSubmit: async values => {
      const res = await axios.post(`${import.meta.env.VITE_API_HOST}/signup`, {
        name: values.name,
        username: values.username,
        email: values.email,
        password: values.password
      })
      signInUser(res.data)
    },
    initialValues: {
      email: '',
      password: ''
    },
    validateOnMount: true,
    validationSchema
  })
  return (
    <div className="flex flex-wrap min-h-screen">
      <div className="lg:flex-1 bg-blue"></div>
      <div className="flex flex-1 flex-wrap items-center justify-center">
        <div className="space-y-8 p-10 w-full max-w-lg">
          <h1 className="text-3xl text-center">Crie a sua conta</h1>
          <form className="space-y-5" onSubmit={formik.handleSubmit}>
            <div className="space-y-2">
              <Input
                type="text"
                name="name"
                placeholder="Nome"
                value={formik.values.name || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
                autoComplete="off"
              />
              {(formik.touched.name && formik.errors.name) && (
                <span className="text-red-500 text-sm">{formik.errors.name}</span>
              )}
            </div>
            <div className="space-y-2">
              <Input
                type="text"
                name="username"
                placeholder="Username"
                value={formik.values.username || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
                autoComplete="off"
              />
              {(formik.touched.username && formik.errors.username) && (
                <span className="text-red-500 text-sm">{formik.errors.username}</span>
              )}
            </div>
            <div className="space-y-2">
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formik.values.email || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
                autoComplete="off"
              />
              {(formik.touched.email && formik.errors.email) && (
                <span className="text-red-500 text-sm">{formik.errors.email}</span>
              )}
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                name="password"
                placeholder="Senha"
                value={formik.values.password || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
                autoComplete="off"
              />
              {(formik.touched.password && formik.errors.password) && (
                <span className="text-red-500 text-sm">{formik.errors.password}</span>
              )}
            </div>
            <button
              className="bg-blue w-full py-3 rounded-full disabled:opacity-50 text-lg"
              disabled={formik.isSubmitting || !formik.isValid}
              type="submit"
            >
            {formik.isSubmitting ? 'A registar...' : 'Registar'}
            </button>
          </form>
          <span className="block text-sm text-silver text-center">
            Já tem conta? <a className="text-blue" href="/login">Login</a>
          </span>
        </div>
      </div>
    </div>
  )
}
