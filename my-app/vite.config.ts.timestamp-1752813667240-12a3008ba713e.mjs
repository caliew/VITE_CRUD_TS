// vite.config.ts
import { defineConfig, loadEnv } from "file:///C:/WebPortal/VITE_CRUD_TS/my-app/node_modules/vite/dist/node/index.js";
import react from "file:///C:/WebPortal/VITE_CRUD_TS/my-app/node_modules/@vitejs/plugin-react/dist/index.mjs";
import vitePluginImp from "file:///C:/WebPortal/VITE_CRUD_TS/my-app/node_modules/vite-plugin-imp/dist/index.mjs";
import tsconfigPaths from "file:///C:/WebPortal/VITE_CRUD_TS/my-app/node_modules/vite-tsconfig-paths/dist/index.js";
import svgr from "file:///C:/WebPortal/VITE_CRUD_TS/my-app/node_modules/vite-plugin-svgr/dist/index.js";
function htmlPlugin(env) {
  return {
    name: "html-transform",
    transformIndexHtml: {
      order: "pre",
      handler: (html) => html.replace(/<%=(.*?)%>/g, (match, p1) => env[p1] ?? match)
    }
  };
}
function i18nHMR() {
  return {
    name: "i18nHMR",
    enforce: "pre",
    handleHotUpdate({ file, server }) {
      if (file.endsWith(".json") && file.includes("/public/i18n")) {
        server.ws.send({
          type: "full-reload",
          path: "*"
        });
      }
    }
  };
}
var vite_config_default = defineConfig(({ mode }) => {
  const envDir = "./env";
  const env = loadEnv(mode, envDir);
  return {
    plugins: [
      react(),
      htmlPlugin(env),
      tsconfigPaths(),
      vitePluginImp({
        libList: [
          {
            libName: "antd",
            style: (name) => `antd/es/${name}/style/index.js`
          }
        ]
      }),
      i18nHMR(),
      svgr({
        svgrOptions: {
          exportType: "default",
          ref: true,
          titleProp: true,
          memo: true,
          icon: "1rem",
          replaceAttrValues: { white: "currentColor" }
        },
        include: "**/*.svg?react"
      })
    ],
    server: {
      port: 3001
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
            "@layout-sider-background": "white",
            "@layout-header-background": "white",
            "@tooltip-color": "white",
            "@text-color": "#333333",
            "@primary-color": "#30515B"
          },
          additionalData: "@root-entry-name: default;"
        }
      }
    },
    resolve: {
      alias: [{ find: /^~/, replacement: "" }]
    },
    base: "/",
    build: {
      outDir: "build",
      sourcemap: false,
      assetsInclude: ["**/*.svg", "**/*.png", "**/*.ico"]
    },
    envDir
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxXZWJQb3J0YWxcXFxcVklURV9DUlVEX1RTXFxcXG15LWFwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcV2ViUG9ydGFsXFxcXFZJVEVfQ1JVRF9UU1xcXFxteS1hcHBcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1dlYlBvcnRhbC9WSVRFX0NSVURfVFMvbXktYXBwL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgSG1yQ29udGV4dCwgUGx1Z2luT3B0aW9uLCBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcclxuaW1wb3J0IHZpdGVQbHVnaW5JbXAgZnJvbSAndml0ZS1wbHVnaW4taW1wJztcclxuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocyc7XHJcbmltcG9ydCBzdmdyIGZyb20gJ3ZpdGUtcGx1Z2luLXN2Z3InO1xyXG4vLyBpbXBvcnQgZnMgZnJvbSAnZnMnO1xyXG5cclxuZnVuY3Rpb24gaHRtbFBsdWdpbihlbnY6IFJlY29yZDxzdHJpbmcsIHN0cmluZyB8IHVuZGVmaW5lZD4pIHtcclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogJ2h0bWwtdHJhbnNmb3JtJyxcclxuICAgIHRyYW5zZm9ybUluZGV4SHRtbDoge1xyXG4gICAgICBvcmRlcjogJ3ByZScgYXMgY29uc3QsXHJcbiAgICAgIGhhbmRsZXI6IChodG1sOiBzdHJpbmcpID0+IGh0bWwucmVwbGFjZSgvPCU9KC4qPyklPi9nLCAobWF0Y2gsIHAxKSA9PiBlbnZbcDFdID8/IG1hdGNoKSxcclxuICAgIH0sXHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gaTE4bkhNUigpOiBQbHVnaW5PcHRpb24ge1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiAnaTE4bkhNUicsXHJcbiAgICBlbmZvcmNlOiAncHJlJyxcclxuICAgIGhhbmRsZUhvdFVwZGF0ZSh7IGZpbGUsIHNlcnZlciB9OiBIbXJDb250ZXh0KSB7XHJcbiAgICAgIGlmIChmaWxlLmVuZHNXaXRoKCcuanNvbicpICYmIGZpbGUuaW5jbHVkZXMoJy9wdWJsaWMvaTE4bicpKSB7XHJcbiAgICAgICAgc2VydmVyLndzLnNlbmQoe1xyXG4gICAgICAgICAgdHlwZTogJ2Z1bGwtcmVsb2FkJyxcclxuICAgICAgICAgIHBhdGg6ICcqJyxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XHJcbiAgY29uc3QgZW52RGlyID0gJy4vZW52JztcclxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIGVudkRpcik7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHJlYWN0KCksXHJcbiAgICAgIGh0bWxQbHVnaW4oZW52KSxcclxuICAgICAgdHNjb25maWdQYXRocygpLFxyXG4gICAgICB2aXRlUGx1Z2luSW1wKHtcclxuICAgICAgICBsaWJMaXN0OiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxpYk5hbWU6ICdhbnRkJyxcclxuICAgICAgICAgICAgc3R5bGU6IChuYW1lKSA9PiBgYW50ZC9lcy8ke25hbWV9L3N0eWxlL2luZGV4LmpzYCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSksXHJcbiAgICAgIGkxOG5ITVIoKSxcclxuICAgICAgc3Zncih7XHJcbiAgICAgICAgc3Znck9wdGlvbnM6IHtcclxuICAgICAgICAgIGV4cG9ydFR5cGU6ICdkZWZhdWx0JyxcclxuICAgICAgICAgIHJlZjogdHJ1ZSxcclxuICAgICAgICAgIHRpdGxlUHJvcDogdHJ1ZSxcclxuICAgICAgICAgIG1lbW86IHRydWUsXHJcbiAgICAgICAgICBpY29uOiAnMXJlbScsXHJcbiAgICAgICAgICByZXBsYWNlQXR0clZhbHVlczogeyB3aGl0ZTogJ2N1cnJlbnRDb2xvcicgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluY2x1ZGU6ICcqKi8qLnN2Zz9yZWFjdCcsXHJcbiAgICAgIH0pLFxyXG4gICAgXSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBwb3J0OiAzMDAxLFxyXG4gICAgICAvLyBVbmNvbW1lbnQgaWYgZW5hYmxlIENBTSBpbiBsb2NhbGhvc3RcclxuICAgICAgLy8gaHR0cHM6IHtcclxuICAgICAgLy8gICBrZXk6IGZzLnJlYWRGaWxlU3luYygnLi9jZXJ0L2xvY2FsL2VzZXJ2aWNlcy5sb2NhbC5oaHRlc3Quc2cta2V5LnBlbScpLFxyXG4gICAgICAvLyAgIGNlcnQ6IGZzLnJlYWRGaWxlU3luYygnLi9jZXJ0L2xvY2FsL2VzZXJ2aWNlcy5sb2NhbC5oaHRlc3Quc2cucGVtJyksXHJcbiAgICAgIC8vIH0sXHJcbiAgICAgIC8vIGhvc3Q6ICdlc2VydmljZXMubG9jYWwuaGh0ZXN0LnNnJyxcclxuICAgIH0sXHJcbiAgICBjc3M6IHtcclxuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICAgIGxlc3M6IHtcclxuICAgICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgbW9kaWZ5VmFyczoge1xyXG4gICAgICAgICAgICAnQGxheW91dC1zaWRlci1iYWNrZ3JvdW5kJzogJ3doaXRlJyxcclxuICAgICAgICAgICAgJ0BsYXlvdXQtaGVhZGVyLWJhY2tncm91bmQnOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICAnQHRvb2x0aXAtY29sb3InOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICAnQHRleHQtY29sb3InOiAnIzMzMzMzMycsXHJcbiAgICAgICAgICAgICdAcHJpbWFyeS1jb2xvcic6ICcjMzA1MTVCJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogJ0Byb290LWVudHJ5LW5hbWU6IGRlZmF1bHQ7JyxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IFt7IGZpbmQ6IC9efi8sIHJlcGxhY2VtZW50OiAnJyB9XSxcclxuICAgIH0sXHJcbiAgICBiYXNlOiAnLycsXHJcbiAgICBidWlsZDoge1xyXG4gICAgICBvdXREaXI6ICdidWlsZCcsXHJcbiAgICAgIHNvdXJjZW1hcDogZmFsc2UsXHJcbiAgICAgIGFzc2V0c0luY2x1ZGU6IFsnKiovKi5zdmcnLCAnKiovKi5wbmcnLCAnKiovKi5pY28nXSxcclxuICAgIH0sXHJcbiAgICBlbnZEaXIsXHJcbiAgfTtcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFIsU0FBbUMsY0FBYyxlQUFlO0FBQzFWLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLFVBQVU7QUFHakIsU0FBUyxXQUFXLEtBQXlDO0FBQzNELFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLG9CQUFvQjtBQUFBLE1BQ2xCLE9BQU87QUFBQSxNQUNQLFNBQVMsQ0FBQyxTQUFpQixLQUFLLFFBQVEsZUFBZSxDQUFDLE9BQU8sT0FBTyxJQUFJLEVBQUUsS0FBSyxLQUFLO0FBQUEsSUFDeEY7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxTQUFTLFVBQXdCO0FBQy9CLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxJQUNULGdCQUFnQixFQUFFLE1BQU0sT0FBTyxHQUFlO0FBQzVDLFVBQUksS0FBSyxTQUFTLE9BQU8sS0FBSyxLQUFLLFNBQVMsY0FBYyxHQUFHO0FBQzNELGVBQU8sR0FBRyxLQUFLO0FBQUEsVUFDYixNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUixDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxRQUFNLFNBQVM7QUFDZixRQUFNLE1BQU0sUUFBUSxNQUFNLE1BQU07QUFFaEMsU0FBTztBQUFBLElBQ0wsU0FBUztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sV0FBVyxHQUFHO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsUUFDWixTQUFTO0FBQUEsVUFDUDtBQUFBLFlBQ0UsU0FBUztBQUFBLFlBQ1QsT0FBTyxDQUFDLFNBQVMsV0FBVyxJQUFJO0FBQUEsVUFDbEM7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsTUFDRCxRQUFRO0FBQUEsTUFDUixLQUFLO0FBQUEsUUFDSCxhQUFhO0FBQUEsVUFDWCxZQUFZO0FBQUEsVUFDWixLQUFLO0FBQUEsVUFDTCxXQUFXO0FBQUEsVUFDWCxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsVUFDTixtQkFBbUIsRUFBRSxPQUFPLGVBQWU7QUFBQSxRQUM3QztBQUFBLFFBQ0EsU0FBUztBQUFBLE1BQ1gsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU9SO0FBQUEsSUFDQSxLQUFLO0FBQUEsTUFDSCxxQkFBcUI7QUFBQSxRQUNuQixNQUFNO0FBQUEsVUFDSixtQkFBbUI7QUFBQSxVQUNuQixZQUFZO0FBQUEsWUFDViw0QkFBNEI7QUFBQSxZQUM1Qiw2QkFBNkI7QUFBQSxZQUM3QixrQkFBa0I7QUFBQSxZQUNsQixlQUFlO0FBQUEsWUFDZixrQkFBa0I7QUFBQSxVQUNwQjtBQUFBLFVBQ0EsZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTyxDQUFDLEVBQUUsTUFBTSxNQUFNLGFBQWEsR0FBRyxDQUFDO0FBQUEsSUFDekM7QUFBQSxJQUNBLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLFdBQVc7QUFBQSxNQUNYLGVBQWUsQ0FBQyxZQUFZLFlBQVksVUFBVTtBQUFBLElBQ3BEO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
