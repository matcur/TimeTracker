import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsSelectComponent } from './projects-select.component';

describe('ProjectsSelectComponent', () => {
  let component: ProjectsSelectComponent;
  let fixture: ComponentFixture<ProjectsSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
