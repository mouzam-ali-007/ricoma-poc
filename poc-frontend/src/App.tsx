import './App.css'
import { useEffect } from 'react'
import { from, useMutation } from '@apollo/client'
import { registerCompany, loginCompany } from './queries/mutation'

interface Company {
  _id: number
  accessToken: string
  name: string
  email: string
  contact: string
  address: string
  password: string
}

interface registerCompanyVars {
  name: string
  email: string
  contact: string
  password: string
  address: string
}
interface loginVar {
  email: string
  password: string
}

function App() {
  // const [registerComp, { error, data }] = useMutation<
  //   { Company: Company },
  //   registerCompanyVars
  // >(registerCompany)
  const [loginComp, { error, data }] = useMutation<
    { Company: Company },
    loginVar
  >(loginCompany)

  useEffect(() => {
    console.log('Data froom login', data)
  }, [data])

  const loginHelper = () => {
    try {
      loginComp({
        variables: {
          email: 'admin@dell.com',
          password: 'admin',
        },
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='App'>
      Poc Front End
      {data && data?.Company ? 'Saved ' : 'No saved '}
      <button onClick={loginHelper}>Login</button>
    </div>
  )
}

export default App
