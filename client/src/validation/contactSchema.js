import * as yup from 'yup'

const contactSchema = yup.object().shape({
  name: yup
    .string()
    .required('a name is required')
    .trim('username must contain only alphanumeric values')
    .strict(true)
    .min(2, 'username must be at least 2 characters')
    .max(25, 'username must be 25 characters or less'),
  email: yup
    .string()
    .email('invalid email format')
    .required('an email is required')
    .strict(true),
  body: yup.string().required().strict(true),
})

export default contactSchema
