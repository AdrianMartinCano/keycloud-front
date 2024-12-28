import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SobreProyectoComponent } from './sobre-proyecto.component';

describe('SobreProyectoComponent', () => {
  let component: SobreProyectoComponent;
  let fixture: ComponentFixture<SobreProyectoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SobreProyectoComponent]
    });
    fixture = TestBed.createComponent(SobreProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
