import * as yup from 'yup'

const loginSchema = yup.object().shape({
  username: yup.string().required('a username is required').strict(true),
  password: yup.string().required('a password is required').strict(true),
})

export default loginSchema
