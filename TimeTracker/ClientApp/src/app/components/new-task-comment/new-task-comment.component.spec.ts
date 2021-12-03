import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskCommentComponent } from './new-task-comment.component';

describe('TaskDescriptionComponent', () => {
  let component: NewTaskCommentComponent;
  let fixture: ComponentFixture<NewTaskCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTaskCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTaskCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
