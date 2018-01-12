/**
 * Created by tqj <2482366539@qq.com> on 2017/12/28.
 */
import layout from "./components/layout.vue";
import Axios from 'axios'
import meta from 'vue-meta';

import baseStyle from './components/style/base.css';
import attachStyle from './components/style/saas-attach.css';

if (process.env.NODE_ENV != 'production') {
    Vue.config.devtools = true
}
Vue.config.silent = true;

Axios.interceptors.response.use(function (response) {
    if (response.status !== 200) {
        Vue.prototype.$notify({
            title: '请求错误',
            message: response.data.message,
            type: 'error'
        });
        return Promise.reject(data.message);
    }else if(response.data.success===false){
        Vue.prototype.$notify({
            title: '接口调用错误',
            message: response.data.message,
            type: 'error'
        });
        return Promise.reject(data.message);
    }else{
        return response.data;
    }
});

Vue.prototype.$ajax = Axios;

Vue.component('layout', layout);

export default Vue