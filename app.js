const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const PORT = 3003;

const app = express();
app.use(express.json())

app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`
    type RootQuery {
      events: [String!]!
    }

    type RootMutation {
      createEvent(name: String): String 
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    events: () => {
      return [
        'Romance',
        'Horror',
        'Actions'
      ]
    },
    createEvents: (args) => {
      const eventName = args.name;
      return eventName
    }
  },
  graphiql: true
}))

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})