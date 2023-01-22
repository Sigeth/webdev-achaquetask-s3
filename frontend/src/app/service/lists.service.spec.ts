import { TestBed } from '@angular/core/testing';

import { TaskListsService } from './lists.service';

describe('ListsService', () => {
  let service: TaskListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
