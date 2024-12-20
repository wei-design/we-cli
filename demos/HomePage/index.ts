import { App } from 'vue'

import HomePage from './index.vue'

HomePage.install = function (app: App) {
    // 组件注册，按需引入
    app.component(HomePage.name, HomePage)
    return app
}

export default HomePage
