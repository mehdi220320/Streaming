import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSerieComponent } from './create-serie.component';

describe('CreateSerieComponent', () => {
  let component: CreateSerieComponent;
  let fixture: ComponentFixture<CreateSerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSerieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
