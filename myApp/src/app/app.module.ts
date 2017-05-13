import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ProgressoPage } from '../pages/progresso/progresso';
import { LoginPage } from '../pages/login/login';
import { PagesLoginAuthService } from '../providers/pages-login-auth-service';
import { PagesRegisterPage } from '../pages/pages-register/pages-register';
import { MeusCuponsPage } from '../pages/meus-cupons/meus-cupons';
import { ResetpwdPage } from '../pages/resetpwd/resetpwd';
import firebase from 'firebase';
import { BarcodeScanner } from 'ionic-native';
import { CrudCandler } from '../providers/crud-candler';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';


// Import the AF2 Module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// AF2 Settings
export const firebaseConfig = {
   apiKey: "AIzaSyDPpBVfyDkEskpromg8Sy1zpoc02ZyjJCE",
   authDomain: "candler-a7b00.firebaseapp.com",
   databaseURL: "https://candler-a7b00.firebaseio.com",
   storageBucket: "candler-a7b00.appspot.com",
   messagingSenderId: "532455404591"
};

firebase.initializeApp(firebaseConfig);

const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    ProgressoPage,
    LoginPage,
    HomePage,
    TabsPage,
    PagesRegisterPage,
    ResetpwdPage,
    MeusCuponsPage,
    ProgressBarComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    BrowserModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProgressoPage,
    LoginPage,
    HomePage,
    TabsPage,
    PagesRegisterPage,
    ResetpwdPage,
    MeusCuponsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PagesLoginAuthService,
    BarcodeScanner,
    CrudCandler
  ]
})
export class AppModule {}
