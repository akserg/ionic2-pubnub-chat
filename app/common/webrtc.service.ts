import {Injectable} from 'angular2/core';

type OnMessageFn = (message, envelope, channelOrGroup, time, channel) => void;

@Injectable()
export class WebRTCService {
    
    pubnub:any;
    
    /**
     * Call this method after platform becomes to be ready
     */
    initialize() {
        this.pubnub = PUBNUB({
            subscribe_key: 'sub-c-de69fc3e-f4c8-11e5-8916-0619f8945a4f',
            publish_key:   'pub-c-d1cbea67-aa6d-4291-9418-5758e14246a5',
            ssl: true
        });
    }
    
    subscribe(channel:string, onMessage:OnMessageFn, onConnect: Function = null, onDisconnect: Function = null, onReconnect: Function = null, onError: Function = null) {
        this.pubnub.subscribe({
            channel : channel,
            message : onMessage,
            connect: onConnect,
            disconnect: onDisconnect,
            reconnect: onReconnect,
            error: onError, 
        });
    }
    
    publish(channel:string, message:any, onCallback:Function = null, onError:Function = null) {
        this.pubnub.publish({
            channel: channel,        
            message: message, // The message may be any valid JSON type including objects, arrays, strings, and numbers.
            store_in_history: true, // If true the messages are stored in history, default true.
            callback : onCallback, // Executes on a successful publish.
            error: onError // Executes on a publish error.
        });
    }
    
    history(channel: string, onHistory: Function, onError:Function, count:number = 100, start:number = null, end:number = null, reverse:boolean = true, include_token: boolean = true) {
        this.pubnub.history({
            channel: channel,
            callback: onHistory,
            error: onError,
            count: count,
            start: start,
            end: end,
            reverse: reverse,
            include_token: include_token
        });
    }
}