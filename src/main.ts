import { createApp } from 'vue';

import router, { setupRouter } from '/@/router';
import { setupStore } from '/@/store';
import { setupAntd } from '/@/setup/ant-design-vue';
import { setupErrorHandle } from '/@/setup/error-handle';
import { setupDirectives } from '/@/setup/directives';

import { isDevMode, isProdMode, isUseMock } from '/@/utils/env';
import { setupProdMockServer } from '../mock/_createProductionServer';
import { setApp } from './useApp';

import App from './App.vue';
import '/@/design/index.less';

const app = createApp(App);

// ui
setupAntd(app);
// 路由
setupRouter(app);
// 状态
setupStore(app);

setupDirectives(app);

setupErrorHandle(app);

router.isReady().then(() => {
  app.mount('#app');
});

if (isDevMode()) {
  app.config.performance = true;
  window.__APP__ = app;
}

// 如不需要在生产环境中使用模拟服务，则可以注释代码
if (isProdMode() && isUseMock()) {
  setupProdMockServer();
}

// 用于在其他模块中共享应用程序实例
setApp(app);
