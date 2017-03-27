import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ProgressoPage } from '../pages/progresso/progresso';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';

// AF2 Settings
export const firebaseConfig = {
   apiKey: "AIzaSyDPpBVfyDkEskpromg8Sy1zpoc02ZyjJCE",
   authDomain: "candler-a7b00.firebaseapp.com",
   databaseURL: "https://candler-a7b00.firebaseio.com",
   storageBucket: "candler-a7b00.appspot.com",
   messagingSenderId: "532455404591"
};

@NgModule({
  declarations: [
    MyApp,
    ProgressoPage,
    LoginPage,
    HomePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProgressoPage,
    LoginPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
