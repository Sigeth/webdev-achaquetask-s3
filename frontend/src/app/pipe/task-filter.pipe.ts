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

    switch(filter) {
      case "todo":
        return value.filter(t => !t.finished);
      case "finished":
        return value.filter(t => t.finished);
      default:
        return value;
    }
  }

}
