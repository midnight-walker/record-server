/**
 * Created by tqj <2482366539@qq.com> on 2017/8/7.
 */
import layout from "./components/layout.vue";
import Axios from 'axios'

import baseStyle from './components/style/base.css';

Vue.config.devtools = true;
Vue.config.silent = true;

Axios.interceptors.response.use(function (response) {
    if (response.status !== 200) {
        Vue.prototype.$notify({
            title: '请求错误',
            message: statusText,
            type: 'error'
        });
    }else if(response.data.success===false){
        Vue.prototype.$notify({
            title: '接口调用错误',
            message: response.data.data.msg,
            type: 'error'
        });
    }
    return response.data;
});

Vue.prototype.$ajax = Axios;

Vue.component('layout', layout);

export default Vue
