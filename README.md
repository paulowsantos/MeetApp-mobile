# MeetApp

![Preview-Screens](https://github.com/paulowsantos/MeetApp-mobile/blob/master/SSmobile.png)


## About this Project

The idea of the App is:

_"Share knowledge in the form of meetups, providing a simple way to set them up"._

**PS:** Meetups were just the context chosen by me for this project, but all the code inside this app can be reused for any app that has meetings as domain, so you can reuse everything here in your next app for meetings, encounters or anything inside this context!

For the web version of this application, please refer to this [link](https://github.com/paulowsantos/MeetApp-web).
For the server, please refer to this [link](https://github.com/paulowsantos/Meetapp).


## Why?

This project is part of my personal portfolio, so, I'll be happy if you could provide me any feedback about the project, code, structure or anything that you can report that could make me a better developer!

Email-me: paulowsantos@gmail.com

Connect with me at [LinkedIn](https://www.linkedin.com/in/paulo-wayner/).

Also, you can use this Project as you wish, be for study, be for making improvements or earn money with it!

It's free!


## Some Observations about this App

1 - The functionality of image upload on the Profile and New Meets Screens are still not working.


## Functionalities

- Meetups Management
	- Edit existing Meetups that you created
	- Cancel existing Meetups that you created, this will automatically email all users registered in this Meetup
	- List Meetups by day
	- Register to attend to a Meetup

- Registration Management
	- List all your registrations
	- Cancel specific registration

- New MeetApp
	- Create new Meetups
	- Add an image as the banner for the Meetup
	- Choose Title, Description, Date, and Location for the Meetup

- Profile Management
	- Edit profile information
	- Change current password
	- Add/edit the profile avatar


## Getting Started

### Prerequisites

To run this project in the development mode, you'll need to have a basic environment to run a React-Native App, that can be found [here](https://facebook.github.io/react-native/docs/getting-started).

Also, you'll need to have a basic environment to run a Expo App, that can be found [here](https://docs.expo.io/versions/v35.0.0/get-started/installation).

Then, you'll need the server running locally on your machine with the mock data. You can find the server and all the instructions to start the server [here](https://github.com/paulowsantos/Meetapp).

### Installing

**Cloning the Repository**

```
$ git clone https://github.com/paulowsantos/MeetApp-mobile

$ cd MeetApp-mobile
```

**Installing dependencies**

```
$ yarn
```

_or_

```
$ npm install
```

### Connecting the App with the Server

1 - Follow the instructions on the [MeetApp](https://github.com/paulowsantos/Meetapp) to have the server up and running on your machine.

2 - With the server up and running, go to the [src/service/api.js](https://github.com/paulowsantos/MeetApp-mobile/blob/master/src/services/api.js) file and edit the value of the field _baseURL_ (line 4) with the IP of your machine (you can have some issues with _localhost_ if you're running on an android physical device, but you can use localhost safely on iOS).

It should look like this:

_http://< IP of your machine >:3333_ 

*or*

_http:// localhost:3333_

### Running

With all dependencies installed and the environment properly configured, you can now run the app:

Android/iOS

```
$ yarn start
```


## Built With

- [Expo](https://expo.io/) - A platform for universal React applications
- [React-Native](https://facebook.github.io/react-native/) - Create native apps for Android and iOS using React
- [React-Navigation](https://reactnavigation.org/docs/en/getting-started.html) - Router
- [Redux](https://redux.js.org/) - React State Manager
- [Redux-Saga](https://redux-saga.js.org/) - Side-Effect middleware for Redux
- [Redux-Persist](https://github.com/rt2zz/redux-persist) - Persist and rehydrate a Redux store
- [Axios](https://github.com/axios/axios) - HTTP Client
- [ESlint](https://eslint.org/) - JS Linter and code style
- [Expo-Image-Picker](https://docs.expo.io/versions/latest/sdk/imagepicker/) - Image picker from Expo
- [Prop-Types](https://www.npmjs.com/package/prop-types) - Static Type Checker
- [Prettier](https://prettier.io/) - Code Formatter
- [Babel](https://babeljs.io/) - Java Compiler
- [Reactotron](https://infinite.red/reactotron) - Inspector
- [Styled-Components](https://www.styled-components.com/) - Styles
- [React-Native-Linear-Gradient](https://github.com/react-native-community/react-native-linear-gradient) - Gradient Styles
- [React-Native-Vector-Icons](https://github.com/oblador/react-native-vector-icons) - Icons
- [Date-fns](https://date-fns.org/) - Format dates


## Support tools

- [Amazon S3](https://aws.amazon.com/pt/s3/) - Storage Service

## Contributing

You can send how many PR's do you want, I'll be glad to analyze and accept them! And if you have any questions about the project...

Email-me: paulowsantos@gmail.com

Connect with me at [LinkedIn](https://www.linkedin.com/in/paulo-wayner/)

Thank you!

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/paulowsantos/MeetApp-mobile/blob/master/LICENSE) file for details
