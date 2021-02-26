# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command
4. Run `npm run dev` to seed the data manually

# GrpahQl Server http://localhost:4000/graphql

<pre>
# Register Company

mutation{
  registerCompany(data:{
    	name:"Company Name"
    	email:"company@gmail.com"
    	password:"qwerty"
    	contact:"+1 234 567 8"
    	address: "1-LA"
    
  }){
    _id
    email
    password
    contact
    address
  }
}

# Login Company

mutation{
  login(email:"company@gmail.com", password:"qwerty"){
    accessToken
    _id
    email
    password
  }
}

# Set Token For API's:
{
  "authorization" :"Bearer Token"
}

# Add Product

mutation{
  addProduct(data:{
    name:"Product"
    details:" New Product"
    quantity: 4
    image:"newimage/data.jpg"
    companyId: "602272e4836b195ca0b1dcbc"
    productSize: ["M"]
    productColor:["Red"]
  }){
    _id
    name
    details
    productSize
    productColor
    quantity
  }
}

# Update Product
mutation{
  updateProduct(productId:"60385d5c03024a5de8c7d49c", data:{
    name:"Product 1"
    details:" New Product"
    quantity: 4
    image:"newimage/data.jpg"
    companyId: "602272e4836b195ca0b1dcbc"
    productSize: ["X","L"]
    productColor:["Red", "Green"]
  }){
    _id
    name
    details
    productSize
    productColor
    quantity
  }
}

# Fetch Products
query{
  fetchProducts(companyId:"602272e4836b195ca0b1dcbc"){
    _id
    name
    details
  }
}

# Delete Product
mutation{
  deleteProduct(productId:"6037901e2f98262a0058c9a6"){
    _id
    name
  }
}
</pre>
