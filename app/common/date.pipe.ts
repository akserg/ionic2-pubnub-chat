import {Pipe, PipeTransform} from 'angular2/core';

/*
 * WebRTC date format
 * Takes a string date.
 * Usage:
 *   value | WebRTCDate:format
 * Example:
 *   {{ '2016-03-29T21:32:33.805Z' |  WebRTCDate:full }}
 *   formats to: 2016-03-29 21:32:33
*/
@Pipe({ name: 'WebRTCDate' })
export class WebRTCDatePipe implements PipeTransform {
    transform(value: string, [format]): string {
        let result: string = value;

        if (value) {
            let array: Array<string> = value.split('T');
            if (array.length > 0) {
                let date: string = array[0];
                let time: string = array[1];
                //
                result = date + ' ' + time.substr(0, 8);
            }
        }
        return result;
    }
}