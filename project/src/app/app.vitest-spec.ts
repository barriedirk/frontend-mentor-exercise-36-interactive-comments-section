import { describe, it, beforeEach, expect } from 'vitest';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { RouterTestingHarness } from '@angular/router/testing';
import { Routes, provideRouter } from '@angular/router';
import { App } from './app';

@Component({
  standalone: true,
  template: `<main class="main_content">Hello</main>`,
})
class MockHomeComponent {}

const routes: Routes = [{ path: '', component: MockHomeComponent }];

describe('App (Vitest)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(routes), provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render <main class="main_content"> from routed component', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/');

    const main = harness.routeNativeElement?.querySelector('main');
    expect(main).toBeTruthy();
    expect(main?.classList).toContain('main_content');
  });
});
