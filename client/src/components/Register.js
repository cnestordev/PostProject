// import React, { useState } from 'react'
// import axiosCall from '../api/axiosCall'
// import axios from 'axios'

// const Register = () => {
//   const initialValues = {
//     username: '',
//     password: '',
//   }

//   const [formData, setFormData] = useState(initialValues)

//   const handleChange = e => {
//     const { name, value } = e.target
//     setFormData({
//       ...formData,
//       [name]: value,
//     })
//   }

//   const handleSubmit = async e => {
//     e.preventDefault()
//     try {
//       console.log('entering TRY for REGISTER')
//       const response = await axios({
//         method: 'POST',
//         data: {
//           username: formData.username,
//           password: formData.password,
//         },
//         withCredentials: true,
//         credentials: 'same-origin',
//         url: 'http://192.168.1.14:3001/register',
//       })
//       console.log('successful try for REGISTER')
//     } catch (err) {
//       console.log('entering CATCH for REGISTER')
//       console.log(err)
//     }
//   }

//   return (
//     <div>
//       <h1>Reigster User:</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           placeholder="username"
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="password"
//           onChange={handleChange}
//         />
//         <button>Register</button>
//       </form>
//     </div>
//   )
// }

// export default Register
