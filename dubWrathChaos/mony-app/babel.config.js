module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".android.js",
            ".android.tsx",
            ".ios.js",
            ".ios.tsx",
          ],
          root: ["./"],
          alias: {
            "@assets": "./assets",
            "@components": "./src/shared/components",
            "@utils": "./src/utils",
            "@constants": "./src/shared/constants",
            "@screens": "./src/screens",
            "@services": "./src/services",
            "@api": "./src/services/api/index",
            "@font-size": ".src/shared/theme/font-size",
            "@navigation": "./src/navigation",
            "@fonts": "./src/shared/theme/fonts",
            "@colors": "./src/shared/theme/colors",
            "@theme": "./src/shared/theme",
            "@local-storage": "./src/services/local-storage",
            "@types": "./src/types",
            underscore: "lodash",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
