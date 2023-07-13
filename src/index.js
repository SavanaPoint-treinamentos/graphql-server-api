import express from 'express'
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import axios from 'axios';


const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];
const typeDefs = `

     type User {
        id: ID
        name: String
        email: String
     }


     type Query {
        users: [User]
     }
`

const resolvers = {
    Query: {
        users: async () => {
            const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')

            return data
        }
    } 
    
}


const server = new ApolloServer({
    typeDefs, 
    resolvers
})


const startServer = async() => {
    try {
       const { url } = await startStandaloneServer(server, {
            listen: {port: 5000}
        })

        console.log(url)
    } catch(error) {
        return error
    }
}


startServer()