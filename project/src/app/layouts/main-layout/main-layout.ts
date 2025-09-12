import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, Footer],
  template: `
    <div class="main_layout flex flex-col justify-center">
      <main class="main_content">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {}
