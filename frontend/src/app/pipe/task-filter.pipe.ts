import { Pipe, PipeTransform } from '@angular/core';
import {Task} from "../model/task";

@Pipe({
  name: 'taskFilter'
})
export class TaskFilterPipe implements PipeTransform {

  transform(value: Array<Task>, filter: string): Array<Task> {
    if (!value) {
      return value;
    }
    return value.filter(t => t.status == filter);
  }

}
