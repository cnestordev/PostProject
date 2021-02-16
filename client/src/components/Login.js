// import React, { useState } from 'react'
// import axiosCall from '../api/axiosCall'
// import axios from 'axios'

// const Login = () => {
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
//       console.log('entering TRY for LOGIN')
//       const response = await axios({
//         method: 'POST',
//         data: {
//           username: formData.username,
//           password: formData.password,
//         },
//         withCredentials: true,
//         url: 'http://192.168.1.14:3001/login',
//         credentials: 'same-origin',
//       })
//       console.log('successful try for LOGIN')
//     } catch (err) {
//       console.log('entering CATCH for LOGIN')
//       console.log(err)
//     }
//   }

//   return (
//     <div>
//       <h1>Login User:</h1>
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
//         <button>Login</button>
//       </form>
//     </div>
//   )
// }

// export default Login
