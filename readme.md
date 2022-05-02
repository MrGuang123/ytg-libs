## 工具
fx 读JSON数据  node包
majestic  把jest图形化

### jest config comment
展示编译细节
"verbose": true,
测试环境为node
"testEnvironment": "node",
开启收集覆盖率
"collectCoverage": true,
忽略测试
"testPathIgnorePatterns": [
  "/node_modules/"
],
收集覆盖率生成的文件
"coverageReporters": [
  "lcov",
  "json"
],
收集那些位置的测试
"collectCoverageFrom": [
  "**/src/**"
],
遇到ts文件调度ts-jest
"transform": {
  "^.+\\.tsx?$": "ts-jest"
},
测试文件匹配规则
"testRegex": "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
"moduleFileExtensions": [
  "ts",
  "tsx",
  "js",
  "jsx",
  "json",
  "node"
],
可以往jest里面注册一些环境变量
"setupFilesAfterEnv": [
  "./jest.setup.js"
]