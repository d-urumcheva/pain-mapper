# pain-mapper
PainMapper is an app that helps people with chronic pain better track and manage their symptoms and conditions

In order to run the project on your device, it is recommended that you have the following applications and extensions: 
-	Git 
-	Node
-	React Native
-	React-native-cli
-	Android Studio and a running Android emulator or an Android device connected to your computer with a USB-cable 

First, you need to clone the project from the git repository: https://github.com/d-urumcheva/pain-mapper

After that, open a command prompt and navigate to the /painmapper folder in the project file system. Run 
 ``` npm install ``` 
to install all required node modules. After all modules have been installed, open the Android simulator (or have your Android device connected via a USB port). Run 
```` react-native run-android ```` 
to start the project. Now, the application should be running on your device. 

If you wish to install the official release of the application on your device, just copy the app-release.apk file to your device and install. The file can be found in
```` pain-mapper\painmapper\android\app\build\outputs\apk\release ````
