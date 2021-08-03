import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leftTime'
})
export class DateTimePipe implements PipeTransform {

  transform(_leftTime: number, _date: Date): number {
    console.log(_leftTime)
    console.log(_date)
    let t = new Date();
    _date = new Date(_date);
    console.log(_date)
    let newt = t.getTime() - _date.getTime();
    console.log(newt)
    _leftTime = _leftTime * 60 * 1000;
    let left = _leftTime - newt;
    left = Math.ceil(left / 60 / 1000);
    console.log(left)
    if (left < 0)
      left = 0;
    return left;
  }

}
