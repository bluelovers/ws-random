# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.1](https://github.com/bluelovers/ws-random/compare/@lazy-random/util-distributions@2.0.0...@lazy-random/util-distributions@2.0.1) (2026-10-05)



### ♻️　Chores

* **monorepo:** 更新所有套件的 package.json 與清理開發工具 ([037f509](https://github.com/bluelovers/ws-random/commit/037f5095d3148cb0ae40c06cc31722a4dcb0cced))



# [2.0.0](https://github.com/bluelovers/ws-random/compare/@lazy-random/util-distributions@1.0.10...@lazy-random/util-distributions@2.0.0) (2026-10-04)


### BREAKING CHANGES

* **@lazy-random/util-distributions:** 實施工具函數命名規範化與分層架構優化
* **core:** 移除未使用的參數並優化分佈工具匯出
* **test:** 將測試框架從 jest 改為 Node.js 原生測試



### 🐛　Bug Fixes

* **core:** 移除未使用的參數並優化分佈工具匯出 ([7fae57a](https://github.com/bluelovers/ws-random/commit/7fae57a1f986f58cedb28fb84f9a0ad88792f26c))


### ✨　Features

* **@lazy-random/util-distributions:** 新增陣列相關驗證工具與快照驅動測試 ([9478526](https://github.com/bluelovers/ws-random/commit/947852606c3e6090047eb901929371522656dc5c))
* **@lazy-random/util-distributions:** 匯出 randIndexWithRange 工具函數 ([66201dd](https://github.com/bluelovers/ws-random/commit/66201dd424617cee4d40327501766246093f027b))


### 📦　Code Refactoring

* **@lazy-random/util-distributions:** 將 `randIndex` 重命名為 `randIndexByLength` ([350fc7e](https://github.com/bluelovers/ws-random/commit/350fc7e1dd6a2f31944bab90fe2815d7a38e053c))
* **@lazy-random/util-distributions:** 實施工具函數命名規範化與分層架構優化 ([d2ddd6b](https://github.com/bluelovers/ws-random/commit/d2ddd6b9518365547df4670d8f7536b64e15662f))
* **@lazy-random/util-distributions:** 優化陣列索引解析邏輯並完善測試文件註解 ([8f4f68a](https://github.com/bluelovers/ws-random/commit/8f4f68a222ec4d9e7e8507ace7a0d32b7549b4ba))
* **util-distributions:** 抽離核心驗證邏輯至 src/utils.ts 並擴充單元測試 ([3a13977](https://github.com/bluelovers/ws-random/commit/3a13977e689601bff28c42c1aa2a64bfe5918021))


### 📚　Documentation

* **@lazy-random/util-distributions:** 更新類型定義文件以反映核心驗證架構 ([a80176c](https://github.com/bluelovers/ws-random/commit/a80176c48642777c1dd0170afe1a27b0a7fb10cd))
* **monorepo:** 為全系列套件新增詳細的 JSDoc 註解與技術說明 ([477e362](https://github.com/bluelovers/ws-random/commit/477e362ece38a6206e60f967171f6ea944c96066))
* **monorepo:** 完善全系列套件文件、程式碼註解與技術說明 ([1c6c83b](https://github.com/bluelovers/ws-random/commit/1c6c83ba12424ca60a917bd1d03008f869e1c520))


### 🚨　Tests

* **core:** 優化型別定義與建置流程並強化 RNG 實例檢查 ([3c99a64](https://github.com/bluelovers/ws-random/commit/3c99a64d03f356bb5f199a57bf1f6b4d7364c0ae))
* **test:** 將測試框架從 jest 改為 Node.js 原生測試 ([1531a60](https://github.com/bluelovers/ws-random/commit/1531a60bb9932fd9ed3480c792682efa924b5ce6))
* **util-distributions:** 重構測試架構並強化分佈驗證邏輯 ([8b25ec3](https://github.com/bluelovers/ws-random/commit/8b25ec3483607846daf422a9de1d3e86cee4472a))


### 🛠　Build System

* migrate workspace from yarn to pnpm ([7601043](https://github.com/bluelovers/ws-random/commit/76010433d41a92ff8b3138b3712283e35a94fcce))
* **dist:** 更新所有套件的編譯產物與型別定義 ([b0b05b8](https://github.com/bluelovers/ws-random/commit/b0b05b8454dd0b485bf93cdf4b02e1be8532ac86))
* **monorepo:** 更新全系列套件版本並遷移至 pnpm 工作區 ([9c31210](https://github.com/bluelovers/ws-random/commit/9c31210801dbd93ede78f9dd74627027f8ef3e42))


### ♻️　Chores

* **monorepo:** 更新各子套件 package.json 之描述與關鍵字 ([f058e47](https://github.com/bluelovers/ws-random/commit/f058e4766da801120e6aab08b0db04e2dd553909))


### 🔖　Miscellaneous

* . ([170022b](https://github.com/bluelovers/ws-random/commit/170022b213ffad0aba001c9931dbb0ceed8584d4))
* . ([3148db0](https://github.com/bluelovers/ws-random/commit/3148db01cd5b14349bf84df9c05416daa87dafb5))



# [1.1.0](https://github.com/bluelovers/ws-random/compare/@lazy-random/util-distributions@1.0.10...@lazy-random/util-distributions@1.1.0) (2026-10-02)


### BREAKING CHANGES

* **test:** 將測試框架從 jest 改為 Node.js 原生測試



### 📚　Documentation

* **monorepo:** 為全系列套件新增詳細的 JSDoc 註解與技術說明 ([477e362](https://github.com/bluelovers/ws-random/commit/477e362ece38a6206e60f967171f6ea944c96066))
* **monorepo:** 完善全系列套件文件、程式碼註解與技術說明 ([1c6c83b](https://github.com/bluelovers/ws-random/commit/1c6c83ba12424ca60a917bd1d03008f869e1c520))


### 🚨　Tests

* **core:** 優化型別定義與建置流程並強化 RNG 實例檢查 ([3c99a64](https://github.com/bluelovers/ws-random/commit/3c99a64d03f356bb5f199a57bf1f6b4d7364c0ae))
* **test:** 將測試框架從 jest 改為 Node.js 原生測試 ([1531a60](https://github.com/bluelovers/ws-random/commit/1531a60bb9932fd9ed3480c792682efa924b5ce6))


### 🛠　Build System

* migrate workspace from yarn to pnpm ([7601043](https://github.com/bluelovers/ws-random/commit/76010433d41a92ff8b3138b3712283e35a94fcce))
* **dist:** 更新所有套件的編譯產物與型別定義 ([b0b05b8](https://github.com/bluelovers/ws-random/commit/b0b05b8454dd0b485bf93cdf4b02e1be8532ac86))


### ♻️　Chores

* **monorepo:** 更新各子套件 package.json 之描述與關鍵字 ([f058e47](https://github.com/bluelovers/ws-random/commit/f058e4766da801120e6aab08b0db04e2dd553909))


### 🔖　Miscellaneous

* . ([3148db0](https://github.com/bluelovers/ws-random/commit/3148db01cd5b14349bf84df9c05416daa87dafb5))



## [1.0.10](https://github.com/bluelovers/ws-random/compare/@lazy-random/util-distributions@1.0.8...@lazy-random/util-distributions@1.0.10) (2023-11-19)



### 📦　Code Refactoring

* randIndexWithRange ([8155e63](https://github.com/bluelovers/ws-random/commit/8155e635b73ffa63964dddecf84378167e20b784))


### 🔖　Miscellaneous

* . ([7be09a4](https://github.com/bluelovers/ws-random/commit/7be09a4bc2fc047a3831a2b600d662b2c79e11ed))
* . ([6f6a913](https://github.com/bluelovers/ws-random/commit/6f6a9134e94200862ac5956980cf7046fd9aadac))



## [1.0.9](https://github.com/bluelovers/ws-random/compare/@lazy-random/util-distributions@1.0.8...@lazy-random/util-distributions@1.0.9) (2023-11-19)



### 📦　Code Refactoring

* randIndexWithRange ([8155e63](https://github.com/bluelovers/ws-random/commit/8155e635b73ffa63964dddecf84378167e20b784))


### 🔖　Miscellaneous

* . ([6f6a913](https://github.com/bluelovers/ws-random/commit/6f6a9134e94200862ac5956980cf7046fd9aadac))



## [1.0.8](https://github.com/bluelovers/ws-random/compare/@lazy-random/util-distributions@1.0.7...@lazy-random/util-distributions@1.0.8) (2022-10-29)



### 🛠　Build System

* update build ([a3377a4](https://github.com/bluelovers/ws-random/commit/a3377a45f6e3895378d1b633d02a501464836ea1))


### ♻️　Chores

* update config ([10d8b20](https://github.com/bluelovers/ws-random/commit/10d8b20d2ebc76491ac971bf8b9280f66285e056))



## [1.0.7](https://github.com/bluelovers/ws-random/compare/@lazy-random/util-distributions@1.0.6...@lazy-random/util-distributions@1.0.7) (2022-01-04)

**Note:** Version bump only for package @lazy-random/util-distributions





## [1.0.6](https://github.com/bluelovers/ws-random/compare/@lazy-random/util-distributions@1.0.5...@lazy-random/util-distributions@1.0.6) (2022-01-03)


### 🔖　Miscellaneous

* . ([e58253c](https://github.com/bluelovers/ws-random/commit/e58253c60984cc3947069ea4ae2eb1924cd2940e))





## [1.0.5](https://github.com/bluelovers/ws-random/compare/@lazy-random/util-distributions@1.0.3...@lazy-random/util-distributions@1.0.5) (2021-12-20)


### 🔖　Miscellaneous

* . ([65cf74d](https://github.com/bluelovers/ws-random/commit/65cf74d7a39b1399cff63dd748ea79d8c0fb9a85))





## [1.0.4](https://github.com/bluelovers/ws-random/compare/@lazy-random/util-distributions@1.0.3...@lazy-random/util-distributions@1.0.4) (2021-12-20)

**Note:** Version bump only for package @lazy-random/util-distributions





## 1.0.3 (2021-12-12)


### 📦　Code Refactoring

* `@lazy-random/util-distributions` ([24d5fec](https://github.com/bluelovers/ws-random/commit/24d5fec6642e326bd0b0ccc7ebd926810d566d2f))


### 🚨　Tests

* use `jest-extended/all` ([6d56a49](https://github.com/bluelovers/ws-random/commit/6d56a49e94ec701cd8744632a04871cba4e59ea8))


### 🔖　Miscellaneous

* . ([8d815a9](https://github.com/bluelovers/ws-random/commit/8d815a9451f12cabc9b81680e463d429c45f2506))





## 1.0.2 (2021-12-12)


### 📦　Code Refactoring

* `@lazy-random/util-distributions` ([24d5fec](https://github.com/bluelovers/ws-random/commit/24d5fec6642e326bd0b0ccc7ebd926810d566d2f))


### 🔖　Miscellaneous

* . ([8d815a9](https://github.com/bluelovers/ws-random/commit/8d815a9451f12cabc9b81680e463d429c45f2506))





## 1.0.1 (2021-12-12)


### 📦　Code Refactoring

* `@lazy-random/util-distributions` ([24d5fec](https://github.com/bluelovers/ws-random/commit/24d5fec6642e326bd0b0ccc7ebd926810d566d2f))
