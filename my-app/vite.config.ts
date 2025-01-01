import { HmrContext, PluginOption, defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
// import fs from 'fs';

function htmlPlugin(env: Record<string, string | undefined>) {
  return {
    name: 'html-transform',
    transformIndexHtml: {
      order: 'pre' as const,
      handler: (html: string) => html.replace(/<%=(.*?)%>/g, (match, p1) => env[p1] ?? match),
    },
  };
}

function i18nHMR(): PluginOption {
  return {
    name: 'i18nHMR',
    enforce: 'pre',
    handleHotUpdate({ file, server }: HmrContext) {
      if (file.endsWith('.json') && file.includes('/public/i18n')) {
        server.ws.send({
          type: 'full-reload',
          path: '*',
        });
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const envDir = './env';
  const env = loadEnv(mode, envDir);

  return {
    plugins: [
      react(),
      htmlPlugin(env),
      tsconfigPaths(),
      vitePluginImp({
        libList: [
          {
            libName: 'antd',
            style: (name) => `antd/es/${name}/style/index.js`,
          },
        ],
      }),
      i18nHMR(),
      svgr({
        svgrOptions: {
          exportType: 'default',
          ref: true,
          titleProp: true,
          memo: true,
          icon: '1rem',
          replaceAttrValues: { white: 'currentColor' },
        },
        include: '**/*.svg?react',
      }),
    ],
    server: {
      port: 3001,
      // Uncomment if enable CAM in localhost
      // https: {
      //   key: fs.readFileSync('./cert/local/eservices.local.hhtest.sg-key.pem'),
      //   cert: fs.readFileSync('./cert/local/eservices.local.hhtest.sg.pem'),
      // },
      // host: 'eservices.local.hhtest.sg',
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            '@layout-sider-background': 'white',
            '@layout-header-background': 'white',
            '@tooltip-color': 'white',
            '@text-color': '#333333',
            '@primary-color': '#30515B',
          },
          additionalData: '@root-entry-name: default;',
        },
      },
    },
    resolve: {
      alias: [{ find: /^~/, replacement: '' }],
    },
    base: '/',
    build: {
      outDir: 'build',
      sourcemap: false,
      assetsInclude: ['**/*.svg', '**/*.png', '**/*.ico'],
    },
    envDir,
  };
});
