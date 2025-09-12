// import { defineConfig } from 'vitest/config';
// import angular from '@analogjs/vite-plugin-angular';
// import path from 'node:path';

// export default defineConfig({
//   plugins: [angular()],
//   resolve: {
//     alias: {
//       '@environment': path.resolve(__dirname, 'src/environments'),
//       '@store': path.resolve(__dirname, 'src/app/store/index.ts'),
//       '@features': path.resolve(__dirname, 'src/app/features'),
//       '@layouts': path.resolve(__dirname, 'src/app/layouts'),
//       '@components': path.resolve(__dirname, 'src/app/components'),
//       '@models': path.resolve(__dirname, 'src/app/shared/models'),
//       '@services': path.resolve(__dirname, 'src/app/shared/services'),
//       '@modals': path.resolve(__dirname, 'src/app/shared/modals'),
//       '@app': path.resolve(__dirname, 'src/app'),
//     },
//   },
//   test: {
//     environment: 'jsdom',
//     globals: true,
//     setupFiles: './src/test-setup.ts',
//     include: ['src/**/*.vitest-spec.ts'],
//   },
// });

import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [angular(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-setup.ts',
    include: ['src/**/*.vitest-spec.ts'],
  },
});
