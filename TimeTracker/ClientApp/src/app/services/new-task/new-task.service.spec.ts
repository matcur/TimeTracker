import { TestBed } from '@angular/core/testing';

import { NewTaskService } from './new-task.service';

describe('NewTaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewTaskService = TestBed.get(NewTaskService);
    expect(service).toBeTruthy();
  });
});
