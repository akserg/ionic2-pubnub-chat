Mobile WebRTC Chat based on PubNub and Angular 2
===============================

There is a simple mobile chat based on [PubNub Data Stream Network](https://www.pubnub.com) and [Angular 2](https://angular.io) for demonstrate how combine them together inside [Ionic 2](http://ionic.io/2) project. 

### Prerequisite

 1. Check the 'Get Started' link on [PubNub](https://www.pubnub.com) to register free account
 2. Install latest [Ionic 2 CLI](http://ionicframework.com/docs/v2/getting-started/installation)

### Testing Locally

You need an HTTPS (TLS) File Server. To start a local secure file server:

```shell
python <(curl -L https://goo.gl/Rrko89)
```

> This is a Simple Python HTTPS Secure Server
> https://gist.github.com/stephenlb/2e19d98039469b9d0134

### Start

Run following shell script to install NPM modules
```bash
npm i
```

Add Android or IOS platform to your project
```bash
ionic platform add ios android
```

Build project for specified platforms
```bash
ionic build
```

Explore project in your local web browser
```bash
ionic serve
```

### Credits

- [PubNub Data Stream Network](https://www.pubnub.com)
- [Angular 2](https://angular.io)