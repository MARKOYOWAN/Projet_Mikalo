import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dates'
})
export class DatesPipe extends DatePipe implements PipeTransform {

  transform(value: any, type: string = 'default'): any {
    const currentDate = new Date();
    const d = new Date(value);
    let res = null;
    switch (type) {
      case 'm-y':
        res = super.transform(value, "MMM yy");
        break;
    
      default:
        const diff = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) ) /(1000 * 60 * 60 * 24));
        if(diff === 0 && d.getDate() === currentDate.getDate()){
          res =  super.transform(value, "HH:mm");
        } else if(diff > 0 && diff < 365){
          res =  super.transform(value, "d MMM");
        } else{
          res =  super.transform(value, "MMM yy");
        } 
        break;
    }
         
    return res;
  }
    

}
