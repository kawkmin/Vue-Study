import { defineStore } from 'pinia';

// use로 시작
export const useCounterStore = defineStore('counter', {
	state: () => ({
		counter: 1,
	}),
	getters: {
		doubleCount: state => state.counter * 2,
		doubleCountPlusOne() {
			return this.doubleCount + 1;
		},
	},
	actions: {
		increment() {
			this.counter++;
		},
	},
});
