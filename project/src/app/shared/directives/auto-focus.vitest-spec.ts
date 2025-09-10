import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutoFocus } from './auto-focus';
import { By } from '@angular/platform-browser';

@Component({
  template: `<input type="text" appAutoFocus />`,
})
class TestComponent {}

describe('AutoFocus Directive', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, AutoFocus],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directiveInstance = fixture.debugElement
      .query(By.directive(AutoFocus))
      .injector.get(AutoFocus);
    expect(directiveInstance).toBeTruthy();
  });

  it('should focus the input element after view init', async () => {
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

    await new Promise((resolve) => setTimeout(resolve, 0)); // let setTimeout run
    expect(document.activeElement).toBe(inputEl);
  });
});
