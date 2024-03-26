import { GraphQLClient } from "graphql-request";

const url = "https://saintesteve.stepzen.net/api/belligerent-turkey/__graphql";

const client = new GraphQLClient(url, {
  headers: {
    Authorization: `apikey ${process.env.EXPO_PUBLIC_GRAPHQL_API_KEY}`,
  },
});

export default client;
