## 🦄 Boilerplate React Native Typescript

### 🚀 Demo URL
- [Github Page](https://github.com/DEVfancybear/boilerplate-react-native)

### 🎈 Introduce
- A complete boilerplate for React Native

### 🔥 Library
- Recoil
- Axios
- Lodash
- React hook form
- React native vector image
- React native dotenv
- React query
### 🐶 Project Structure

````

src/                 #project root
|   ├── common/      #common app
|   |          ├── apis/        #apis of feature
|   |          ├── assets/      #assets file
|   |          ├── components/  #common components reuse
|   |          ├── helpers/     #share an function logic for our app
|   |          ├── i18n/        #multi languages
|   |          ├── models/      #define interface
|   |          ├── recoil/      #state management source
|   |          ├── themes/      #themes app
│   ├── configs/     #configs project
│   ├── views/       #screens source
|   ├── routes/      #common routes
│   ├── services/    #services source
│   ├── Endpoint.ts

└── package.json```
````


### 🛠 Project Settings

#### 📢 Install dependencies

```bash
> npm install
```

#### 📢 Start Android

```bash
> npx react-native run-android
```


#### 📢 Start IOS

```bash
> cd ios > npx pod install
> npx react-native run-ios
```