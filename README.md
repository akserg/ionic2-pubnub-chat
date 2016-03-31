# Mobile WebRTC Chat based on PubNub Data Stream Network and Angular 2

There is a simple mobile chat based on [PubNub Data Stream Network](https://www.pubnub.com) and Angular 2 for demonstrate how combine thwm together inside Ionic 2 application. 

### Prerequisite

 1. Check the 'Get Started' link on [PubNub](https://www.pubnub.com) to organise free account for you
 2. Install lates [Ionic 2 CLI](http://ionicframework.com/docs/v2/getting-started/installation)

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

Add Android or IOS platform
```bash
ionic platform add ios android
```

Build project for specified platform
```bash
ionic build
```

Explore project in your browser
```bash
ionic serve
```

### Credits

[PubNub Data Stream Network](https://www.pubnub.com)
[Angular 2](https://angular.io)