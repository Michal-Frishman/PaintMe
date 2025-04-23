import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationStatisticsComponent } from './information-statistics.component';

describe('InformationStatisticsComponent', () => {
  let component: InformationStatisticsComponent;
  let fixture: ComponentFixture<InformationStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
