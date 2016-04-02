import {Injectable, EventEmitter} from 'angular2/core';

type OnMessageFn = (message, envelope, channelOrGroup, time, channel) => void;

export enum PubNubEventType {
    MESSAGE,
    CONNECT,
    DISCONNECT,
    RECONNECT,
    PUBLISHED,
    HISTORY
}

export class PubNubEvent {
    constructor(public type: PubNubEventType, channel:string, public value: any) {}
}

@Injectable()
export class PubNubService {
    
    pubnub:any;
    
    /**
     * Call this method after platform becomes to be ready
     */
    // init() {
    constructor() {
        this.pubnub = PUBNUB({
            // Please use your own sub and pub keys below
            subscribe_key: 'sub-c-de69fc3e-f4c8-11e5-8916-0619f8945a4f',
            publish_key:   'pub-c-d1cbea67-aa6d-4291-9418-5758e14246a5',
            ssl: true
        });
    }
    
    subscribe(channel:string):EventEmitter<PubNubEvent> {
        let eventEmitter:EventEmitter<PubNubEvent> = new EventEmitter<PubNubEvent>();
        this.pubnub.subscribe({
            channel : channel,
            message : (message) => {
                eventEmitter.emit(new PubNubEvent(PubNubEventType.MESSAGE, channel, message));
            },
            connect: (message) => {
                eventEmitter.emit(new PubNubEvent(PubNubEventType.CONNECT, channel, message));
            },
            disconnect: (message) => {
                eventEmitter.emit(new PubNubEvent(PubNubEventType.DISCONNECT, channel, message));
            },
            reconnect: (message) => {
                eventEmitter.emit(new PubNubEvent(PubNubEventType.RECONNECT, channel, message));
            },
            error: (error) => {
                eventEmitter.error(error);
            }, 
        });
        return eventEmitter;
    }
    
    publish(channel:string, message:any, store_in_history:boolean = true):EventEmitter<PubNubEvent> {
        let eventEmitter:EventEmitter<PubNubEvent> = new EventEmitter<PubNubEvent>();
        this.pubnub.publish({
            channel: channel, 
            // The message may be any valid JSON type including objects, arrays, strings, and numbers.       
            message: message, 
            // If true the messages are stored in history, default true.
            store_in_history: store_in_history, 
            // Executes on a successful publish.
            callback : (message) => {
                eventEmitter.emit(new PubNubEvent(PubNubEventType.PUBLISHED, channel, message));
            },
            // Executes on a publish error.
            error: (error) => {
                eventEmitter.error(error);
            }
        });
        return eventEmitter;
    }
    
    history(channel: string, count:number = 100, start:number = null, end:number = null, reverse:boolean = true, include_token: boolean = true):EventEmitter<PubNubEvent> {
        let eventEmitter:EventEmitter<PubNubEvent> = new EventEmitter<PubNubEvent>();
        this.pubnub.history({
            channel: channel,
            callback: (messages) => {
                eventEmitter.emit(new PubNubEvent(PubNubEventType.HISTORY, channel, messages));
            },
            error: (error) => {
                eventEmitter.error(error);
            },
            count: count,
            start: start,
            end: end,
            reverse: reverse,
            include_token: include_token
        });
        return eventEmitter;
    }
}