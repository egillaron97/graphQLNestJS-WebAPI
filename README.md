# Amboss Developer Exercise by Egill Aron
Author: Egill Aron Thorisson

## Description
This is an implementation of a GraphQL API which uses the NestJS framework that is capable of basic CRUD operations. This implementation then saves data into a Postgres database and sends the events into a RabbitMQ queue.

## Dependencies
In order to run this implementation you will need to install the following:
 - Node
 - Npm
 - Docker

## Running the solution
To start Postgres and RabbitMQ navigate to the root of the project and run `docker-compose up` <br>
Then in a seperate terminal, navigate to the root of the project and run `npm i` to install the needed packages. <br>
After installing, run `npm start env:dev` to get the solution running. <br>
Now you can navigate to http://localhost:3000/graphql/ and start using the API.

## Operations the API supports
This API support the following operations:
 - getEdge()
 - getEdges()
 - createEdge()
 - updateEdgeCapacity()
 - updateEdgeAliases()
 - removeEdge()

## Sending messages through RabbitMQ
I set it up so that you can update the node aliases using the `update-alias` exchange and the `update-alias-queue` with a JSON payload with these values:

    {
      id: Int
      node1_alias: String,
      node2_alias: String,
    }

I would like to note that I was having trouble publishing the messages from the RabbitMQ Manager to the solution itself.