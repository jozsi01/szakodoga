import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import App from '../App.vue';
import BoardManagement from '../components/BoardManagement.vue';
import Board from '../components/Board.vue';
import PlayingBoard from '../components/PlayingBoard.vue';
import GameEndPopup from '../components/GameEndPopup.vue';


const routes: RouteRecordRaw[] = [
	{
		name: 'home',
		path: '/',
		component: App,
	},
	{
		name: 'boardManagement',
		path: '/boardManagement',
		meta: {
			hideQueryParams: true
		},
		component: BoardManagement,
	},
	{
		name: 'board',
		path: '/boardManagement/board',
		component: Board,
	},
	{
		name: 'playing',
		path: '/playing',
		meta: {
			hideQueryParams: true
		},
		component: PlayingBoard,
	},
	{
		name: 'endGame',
		path: '/endgame',
		component: GameEndPopup,
	},


];

export const router = createRouter({
	routes,
	history: createWebHistory(),
});
