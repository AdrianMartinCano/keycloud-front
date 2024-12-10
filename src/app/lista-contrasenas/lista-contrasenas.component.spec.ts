import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaContrasenasComponent } from './lista-contrasenas.component';

describe('ListaContrasenasComponent', () => {
  let component: ListaContrasenasComponent;
  let fixture: ComponentFixture<ListaContrasenasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaContrasenasComponent]
    });
    fixture = TestBed.createComponent(ListaContrasenasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
