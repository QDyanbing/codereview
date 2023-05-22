import { defineConfig } from '@umijs/max';

export default defineConfig({
  npmClient: 'yarn',
  antd: {},
  model: {},
  initialState: {},
  routes: [{ path: '/', component: './TestPage' }],
});
