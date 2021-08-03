import path from "path";
import webpack from "webpack";
import autoprefixer from "autoprefixer";

const config: webpack.Configuration = {
  entry: "./src/index.jsx",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.(sass|css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  autoprefixer()
                ]
              }
            },
          },
          'sass-loader',
        ]
      }
    ],
  },
  resolve: {
    extensions: ["", ".tsx", ".ts", ".js", ".jsx"],
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
};

export default config;