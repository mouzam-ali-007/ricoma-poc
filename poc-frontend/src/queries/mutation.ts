import { gql } from '@apollo/client'

export const registerCompany = gql`
  mutation registerCompany($company: CompanyType!) {
    registerCompany(data: $company) {
      _id
      accessToken
      name
      email
      contact
    }
  }
`
export const loginCompany = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      accessToken
      name
    }
  }
`
