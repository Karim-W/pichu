# Pika-Pichu

Pika-Pichu is a simple wrapper around the W3CWebSocket API which allows you to easily connect to the pikachu WebSocket server.

## Installation

Via [npm](https://www.npmjs.com/):

```sh
npm install pika-pichu
```

Via [Yarn](https://yarn.io/):

```sh
yarn add pika-pichu
```

## Usage

### Instantiate a new Pichu class
```ts
import { Pichu } from 'pika-pichu';

const url = 'ws://localhost:8080';
const token = 'my-token';
const pikaPichu = new PikaPichu(url, token);
// client connects to the server automatically when it is constructed 
```

### Send a message to the server
```ts
pikaPichu.sendJSON({
	  type: 'message',
  data: 'Hello world!'
});
```

### Receive a message from the server
```ts
pikaPichu.GetJSONMessageon((data) => {
  console.log(data);
});
```