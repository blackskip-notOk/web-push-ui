import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		appType: 'spa',
		define: {
			__APP_ENV__: env.APP_ENV,
		},
		plugins: [react()],
		server: {
			// host: 'localhost',
			port: 3001,
			open: true,
		},
		css: {
			modules: {
				scopeBehaviour: 'global',
				localsConvention: 'camelCaseOnly',
			},
			devSourcemap: true,
		},
		resolve: {
			alias: {
				'~': './src', 
			},
		},
	};
});
