import { createApp } from 'vue';
import App from './App.vue';
import BattleLog from './components/BattleLog.vue';

const app = createApp(App);

app.component('battle-log', BattleLog)

app.mount('#app')