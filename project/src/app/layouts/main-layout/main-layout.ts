import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule],
  template: `
    <div class="main_layout flex flex-col justify-center">
      <main class="main_content">
        <router-outlet />
      </main>
    </div>
  `,
  styleUrl: './main-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {}
