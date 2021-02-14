import * as yup from 'yup'

const commentSchema = yup.object().shape({
  body: yup.string().required('a comment is required'),
})

export default commentSchema
