import * as yup from 'yup'

const formSchema = yup.object().shape({
  title: yup.string().required('a title is required'),
  body: yup.string(),
  tags: yup.string().required('at least one tag is required'),
})

export default formSchema
