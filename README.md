# GPScavenger (development name)

> A location based social scavenger hunt app for Android, built in React Native

## Team

  - __Product Owner__: Jennifer Tran
  - __Scrum Master__: Jeffrey Lee
  - __Development Team Members__: Michael Nguyen, Kevin Tamarus


## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

### General Notes:
- Homebrew and NPM are used for services and package managers
- In terminal, npm install will be required in two places: within the client folder (package.json generated by React Native), and within the server folder (package.json generated for server and database use).
```sh
npm install
```
- There are also multiple .gitignore files.
- API keys used:
Client: Firebase (for authentication)
Client: Google Maps
Database: PostgreSQL (on ElephantSQL)

### Client config.js (in client/config/):
- firebase used for authentication, relevant details are stored in this file.
- If testing with a local server, the emulator should NOT be sending requests to 'localhost'. It will be another IP address depending on the service that is running the emulator. Localhost (or server) address is set in this file, since various emulators use certain IP addresses to refer to localhost. Set this address to the server address with port when the server is deployed

### Database config.js (in server/database/):
- PostgreSQL using elephantSQL is the database used for this project

### Google Maps API Configuration:
- Google Play Services is required on the device. (Adding Google Player Services to Genymotion emulator: http://opengapps.org/, x86 platform, Android 6.0, nano variant. Drop the zip file into the running emulator)
- AndroidManifeset.xml file needs to be updated with <meta data> and the API key (refer to Google API docs)


## Requirements

## Development

### Installing Dependencies

> Project is written in React Native. Here are the steps to set up an environment to work in React Native. (base reference link: https://facebook.github.io/react-native/releases/0.23/docs/android-setup.html)

#### for macOS developers, working on an Android App:

- Android SDK (by installing Android Studio 2.3.3 for macOS)
- Configure the Android SDK: React Native supports Android 6.0 (API 23) at the time of this writing. Install the Android SDK files for 6.0 (System Image, Tools, etc.)
- Update environment variables for Android SDK: (in .bash_profile for macOS users). "ANDROID_HOME" should point to the path in given by the SDK manager (where SDK is located).
```sh
# Android SDK
export ANDROID_HOME=~/Library/Android/sdk
export PATH=${PATH}:${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools
export PATH="$HOME/Android/tools:$PATH"
export PATH="$HOME/Android/platform-tools:$PATH"
```
- VirtualBox 5.1.26 platform packages (Genymotion requires this for macOS)
- Genymotion 2.10.0 Revision 20170719-0eb896a (Android Emulator)
- Genymotion Configuration: Create an Android Emulator running Android 6.0 (API 23).

#### for Windows (10?) developers, working on an Android App:

- [dependency here]
- [dependency here]
- [dependency here]



### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

### Known Bugs

