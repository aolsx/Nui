import {createApp} from 'vue';
import Nui from '../nui';
import demo from './demo';

import VewsList from './vews/VewsList.vue';
import VewsDemo from './vews/VewsDemo.vue';
import VewsTemp from './vews/VewsTemp.vue';


import App from './App.vue';

const app = createApp(App);
demo.map(component=>app.component(component.name,component));
app.component(VewsList.name,VewsList);
app.component(VewsDemo.name,VewsDemo);
app.component(VewsTemp.name,VewsTemp);

app.use(Nui);
app.mount('#app');

// app.config.errorHandler = (err, vm, info) => {
//   // 处理错误
//   // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
// }
