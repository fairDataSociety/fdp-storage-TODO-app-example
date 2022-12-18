# Todos with `fdp-storage` and `fdp-play`

An web3 Todos application built using `fdp-storage` and `fdp-play`.

## Local Development Setup

### Prerequisites:

- `node` and `npm` must be installed
- docker must be installed
- the following ports must be free and available for FDP Play to use
    - **1634** and **1635** - for the queen bee node
    - **9545** - for the blockhain
    - **9090** - for fairOS

#### Install `fdp-play` globally
```shell
$ npm install -g @fairdatasociety/fdp-play
```

#### Spin up a local FDP development environment with fairos
```shell
$ fdp-play start --fairos
```

### Setup & Installation:

#### Clone the repo
```shell
$ git clone https://github.com/rampall/fdp-storage-todos.git
```

```shell
$ cd fdp-storage-todos/
```

### Install dependencies
```shell
$ npm install
```

### Run application
**Requirements:** `fdp-play` must be running already! 

```shell
$ npm dev
```

The application can be viewed at - http://localhost:5173/ 

## Screenshots

### Login / Import Wallet Page:

![image](https://user-images.githubusercontent.com/520570/208269899-938b86b0-2ce9-4def-b1a6-b6050b549065.png)

### Todo List:

![image](https://user-images.githubusercontent.com/520570/208270618-9c76eea5-6cd5-4f8c-9334-2d2e909eb4c1.png)
