# Product & Customer List

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.6.

## Prerequisites

```
Angular-cli 9+ (https://cli.angular.io)
Firebase (https://firebase.google.com)
Node.js (https://nodejs.org/en)
```
1. Customer Modal:
![CUSTOMERMODAL](https://github.com/joeldacuma/product-customer-app/blob/master/github-images/customer-modal.PNG)

2. Customer Page:
![CUSTOMERPAGE](https://github.com/joeldacuma/crescendo-test/blob/master/github-images/customer-page.PNG)

3.GROUP CUSTOMER/PRODUCTD:
![GROUP](https://github.com/joeldacuma/crescendo-test/blob/master/github-images/group-customers.PNG)

4. PRODUCT PAGE:
![PRODUCTPAGE](https://github.com/joeldacuma/crescendo-test/blob/master/github-images/product-page.PNG)

## Run Install

On root folder:

```
npm install
```

## Integrate Firestore to Project

1. Go to Firebase console and create a project.
2. Go to Firebase project settings then on your apps choose add firebase to your web app.
3. Fill-up app name then click register app.
4. copy below firebase configuration: 
```
{
    apiKey: "xxxxxxxxxx",
    authDomain: "xxxxxxxx",
    databaseURL: "xxxxxxxxxxxxx",
    projectId: "xxxxxxx",
    storageBucket: "xxxxxxxxx",
    messagingSenderId: "xxxxxxx",
    appId: "xxxxxxx",
    measurementId: "xxxxxxx"
  }
```
5. Paste config to root/environments/environment.ts
```
export const environment = {
  production: false,
  firebase: {
    apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
    authDomain: 'xxxxxxxxxxxxxxxxxxxxxx',
    databaseURL: 'xxxxxxxxxxxxxxxxx',
    projectId: 'xxxxxxxxxxxxx',
    storageBucket: 'xxxxxxxxxxxx',
    messagingSenderId: 'xxxxxxxxxxxxxx',
    appId: 'xxxxxxxxxxxxxxxxxx',
    measurementId: 'xxxxxxxxxxxxxx'
  }
}
```
6. Go to firebase console and create firestore database - Develop > Database > Create database

## Start Project

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Deployment

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Author

* **Joel L. Dacuma** - *Initial work* - [Joel Dacuma](https://github.com/joeldacuma)
