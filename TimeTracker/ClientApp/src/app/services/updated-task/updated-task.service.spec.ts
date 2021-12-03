import { TestBed } from '@angular/core/testing';

import { UpdatedTaskService } from './updated-task.service';

describe('UpdatedTaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdatedTaskService = TestBed.get(UpdatedTaskService);
    expect(service).toBeTruthy();
  });
});
