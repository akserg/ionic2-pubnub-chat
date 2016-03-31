import 'es6-shim';

import {App, IonicApp, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {PubNubService} from './common/pubnub.service';
import {WebRTCDatePipe} from './common/date.pipe';

import {GettingStartedPage} from './pages/getting-started/getting-started';
import {ListPage} from './pages/list/list';
import {ChatPage} from './pages/chat/chat';


@App({
    templateUrl: 'build/app.html',
    providers: [PubNubService],
    pipes: [WebRTCDatePipe],
    config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
    rootPage: any = ChatPage;
    pages: Array<{ title: string, component: any }>

    constructor(private app: IonicApp, private platform: Platform, private pubNubService: PubNubService) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Getting Started', component: GettingStartedPage },
            { title: 'List', component: ListPage },
            { title: 'Chat', component: ChatPage }
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            // Initialise WebRTC service when the platform is ready
            // this.pubNubService.init();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        let nav = this.app.getComponent('nav');
        nav.setRoot(page.component);
    }
}
