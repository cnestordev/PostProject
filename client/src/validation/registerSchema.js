import * as yup from 'yup'

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required('a username is required')
    .trim('username must contain only alphanumeric values')
    .strict(true)
    .min(3, 'username must be at least 3 characters')
    .max(15, 'username must be 15 characters or less'),
  password: yup
    .string()
    .required('a password is required')
    .strict(true)
    .min(3, 'password must be at least 3 characters')
    .max(15, 'password must be 15 characters or less'),
  email: yup.string(),
})

export default loginSchema
