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

// add Products mutation
export const addProduct = gql`
  mutation addProduct($name: String!, $details: String!, $image: String!, $quantity: Float!, $productColor: [String!] , $productSize: [String!] ,  $companyId: String!){
    addProduct(data:{name: $name, details: $details, image: $image ,quantity: $quantity ,productColor: $productColor, productSize: $productSize, companyId: $companyId}){
      _id
      name
      details
      image
      quantity
      companyId
    }
  }
`

export const fetchProducts = gql`
query fetchProducts($companyId: String!) {
  fetchProducts(companyId: $companyId) {
    _id
    name
    details
    image
  }
}
`