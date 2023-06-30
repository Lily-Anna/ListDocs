import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDocsComponent } from './list-docs.component';

describe('ListDocsComponent', () => {
  let component: ListDocsComponent;
  let fixture: ComponentFixture<ListDocsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDocsComponent]
    });
    fixture = TestBed.createComponent(ListDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
