#  How to run client application

## Preparations

First of all to run the application you must install Node.js and the npm command line interface.

Then you should install expo framework. The quickest way to get started:

```npm install --global expo-cli```

## Installing application

To install client application you need to open your workspace folder and run in command line:

```expo init wing-ding```

When installation is done, open wing-ding folder and replace all files with the content of folder "client" of this repository.

After that you can build the application:

```expo start```

## Running application

The fastest way to run client application is to use the Expo Go app on your iOS or Android device. You can download it from App Store or Google Store. 

Run Expo Go press "Scan QR Code" on the "Projects" tab of the Expo Go app and scan the QR code you see in the terminal or in Expo Dev Tools.

### Enjoy


## Issues

> If you cath a connection error ```Uncaught Error: Java.net,sockettimeoutException: failed to connect to after 10000ms``` 
> Try to change connection from LAN to tunnel and back in Expo Dev Tools.

## Featured links

[Node.Js](https://nodejs.org/en)

[Expo](https://docs.expo.dev/)
