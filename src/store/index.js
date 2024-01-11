import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        data: null
    },
    actions: {
        async fetchData({ commit }) {
            try {
                var response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
                var { time, bpi } = response.data;
                var updatedTime = time.updated;
                var usdRate = bpi.USD.rate_float;
                var gbpRate = bpi.GBP.rate_float;
                var eurRate = bpi.EUR.rate_float;
                var data = { updatedTime, usdRate, gbpRate, eurRate };
                commit('SET_DATA', data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    },
    mutations: {
        SET_DATA(state, data) {
            state.data = data;
        }
    }
});

export default store;