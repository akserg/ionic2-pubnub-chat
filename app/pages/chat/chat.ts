import {Platform, Page, NavController, NavParams} from 'ionic-angular';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl, Control } from 'angular2/common';

import {WebRTCService} from '../../common/webrtc.service';
import {WebRTCDatePipe} from '../../common/date.pipe';

@Page({
  templateUrl: 'build/pages/chat/chat.html',
  directives: [FORM_DIRECTIVES],
  pipes: [WebRTCDatePipe]
})
export class ChatPage {
    messageForm: ControlGroup;
    messageControl: AbstractControl;
    
    channel:string = 'messages-channel';
    
    messages:Array<any> = ['1', '2'];
    uuid:string;
    
    constructor(private platform: Platform, private webRTCService:WebRTCService, private fb:FormBuilder) {
        // Generating a random uuid between 1 and 100 using utility function from lodash library.
        this.uuid = Math.floor((Math.random() * 100)).toString();
        // Create reference to message field
        this.messageForm = fb.group({  
            'message': ['', Validators.required]
        }); 
        this.messageControl = this.messageForm.controls['message'];
    }
    
    onPageWillEnter() {
        this.platform.ready().then(() => {
            // Get history for channel
            this.webRTCService.history(this.channel, (result:Array<any>) => {
                let messages:Array<any> = [];
                for (let i = 0; i < result[0].length; i++) {
                    messages.push(this.createMessage(result[0][i].message));
                }
                this.messages = messages;
            }, (error) => {
                console.log(JSON.stringify(error));
            });
            // Subscribe to messages channel
            this.webRTCService.subscribe(this.channel, (message) => {
                this.messages.push(this.createMessage(message));
            });
        });
    }
    
    createMessage(message:any):any {
        return {
            content: message.content.message,
            date: message.date
        };
    }
    
    // Fetching a uniq random avatar from the robohash.org service.
    avatarUrl(uuid) {
        return '//robohash.org/' + uuid + '?set=set2&bgset=bg2&size=70x70';
    };
    
    sendMessage(messageContent:string) {
       // Don't send an empty message 
       if (messageContent && messageContent !== '') {
           this.webRTCService.publish(this.channel, {
                    content: messageContent,
                    sender_uuid: this.uuid,
                    date: new Date()
                }, (m) => {
                    console.log('Published',m);
                    // Reset the messageContent input
                    (<Control>this.messageForm.controls['message']).updateValueAndValidity();
                }, (error) => {
                    // Handle error here
                    console.log('Publish error', JSON.stringify(error));
                }
            );
       }
    }
}