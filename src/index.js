import express from 'express'
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';



const books = [
    {
      id: 1,
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    { id: 2,
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];
// const typeDefs = `

//      type User {
//         id: ID
//         name: String
//         email: String
//      }


//      type Query {
//         users: [User]
//      }


const typeDefs = `

     type Book {
        id: ID
        title: String
        author: String
     }


     type Query {
        users: [Book]
     }
`

const resolvers = {
    Query: {
        users: async () => {
           

            return books
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