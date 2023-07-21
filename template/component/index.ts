import { App } from 'vue'

import {{ name }} from './index.vue'

{{ name }}.install = function (app: App) {
    // 组件注册，按需引入
    app.component({{ name }}.name, {{ name }})
    return app
}

export default {{ name }}
