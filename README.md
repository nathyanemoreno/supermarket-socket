# Sistemas Distribuídos (2022.1)
by: Nathyane Moreno

### Microproject 1 - Supermarket Socket - DSP Protocol
A supermarket delivery system which uses the fictional DSP protocol(_Delivery Supermarket Protocol_). Verify in [supermarket-socket](./supermarket-socket/README.md).

## Languages
![Typescript](https://img.shields.io/badge/-TypeScript-000?&logo=TypeScript&=)

## Technologies
![Node.js](https://img.shields.io/badge/-Node.js-000?&logo=node.js)

## Run locally

Install dependencies:
- Command `yarn install`
or
- Command `npm install`

Server:
- **PRODUCTION**: Command `npm server:start`
- **DEVELOPMENT**: Command `npm run server:dev`

Client:
- **PRODUCTION**: Command `npm run client:start`
- **DEVELOPMENT**: Command `npm run client:dev`

**Obs:** The socket server must be running on the port specified in the file _.env_.

## Protocol commands
**Obs:** The commands of the DSP protocol are _case sensitive_.

### Command CLIENT
#### Structure
```sh
> client *name* *address*
```

#### Params
Param name|Type|Obligatory|Description
-|-|-|-
_NAME_|`string`|No|Name of the client (default: `admin`).
_ADDRESS_|`string`|No|Address of the client (default: `admin`).

### Command ORDER
#### Structure
```sh
> order *id* *option* *args*
```

#### Params
Param name|Type|Obligatory|Description
-|-|-|-
_id_|`string`|No*|The id of an order .
_option_|`string ('create'|'remove'|'payment'|'list'|'details')`|Yes|Option to execute over a order. 
_args_|`string|number`|No|Extra option.

#### Examples
```sh
order create c1e0c221-f6d7-4eb9-8d1b-1315a498ca62
```
```sh
order remove c1e0c221-f6d7-4eb9-8d1b-1315a498ca62
```
```sh
order payment c1e0c221-f6d7-4eb9-8d1b-1315a498ca62 300
```
```sh
order deliver c1e0c221-f6d7-4eb9-8d1b-1315a498ca62 Ricardo
```
```sh
order list
```

### Command EXIT
Disconnects the socket.

#### Structure
```sh
> exit
```
