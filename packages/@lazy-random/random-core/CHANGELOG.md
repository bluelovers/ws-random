# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.1](https://github.com/bluelovers/ws-random/compare/@lazy-random/random-core@3.0.0...@lazy-random/random-core@3.0.1) (2026-10-05)


### BREAKING CHANGES

* **rng-abstract:** 實作品牌鍵驗證機制以解決 ESM/CJS 重複載入問題



### 📦　Code Refactoring

* **rng-abstract:** 實作品牌鍵驗證機制以解決 ESM/CJS 重複載入問題 ([a34f735](https://github.com/bluelovers/ws-random/commit/a34f735bc660cb89604e8c69a7d69c007101d8e7))
* **rng-abstract:** 實作品牌鍵驗證機制以解決 ESM/CJS 重複載入問題 ([755fbab](https://github.com/bluelovers/ws-random/commit/755fbab70ce9c42da10c0fb906ec1c170519d8dd))


### 💎　Styles

* **random-core:** 移除編譯後檔案中的多餘空白行 ([e2e3122](https://github.com/bluelovers/ws-random/commit/e2e31225b75faecbf043340119d48218bf8b635a))


### 🛠　Build System

* **monorepo:** 優化各套件的 DTS 編譯腳本流程 ([4fbdb78](https://github.com/bluelovers/ws-random/commit/4fbdb78e8c0ba2079cd96e4f91a123ebac7b17dc))


### ♻️　Chores

* **deps:** 調整依賴關係並移除未使用的套件 ([df91257](https://github.com/bluelovers/ws-random/commit/df9125793528c22bacdcbe048c340f58b5717915))
* **monorepo:** 更新所有套件的 package.json 與清理開發工具 ([037f509](https://github.com/bluelovers/ws-random/commit/037f5095d3148cb0ae40c06cc31722a4dcb0cced))



# [3.0.0](https://github.com/bluelovers/ws-random/compare/@lazy-random/random-core@2.0.3...@lazy-random/random-core@3.0.0) (2026-10-04)


### BREAKING CHANGES

* **core:** 移除未使用的參數並優化分佈工具匯出
* **random-core:** 移除 core-decorators 依賴並實作內部綁定與棄用機制



### 🐛　Bug Fixes

* **core:** 移除未使用的參數並優化分佈工具匯出 ([7fae57a](https://github.com/bluelovers/ws-random/commit/7fae57a1f986f58cedb28fb84f9a0ad88792f26c))


### 📦　Code Refactoring

* **@lazy-random/util-distributions:** 將 `randIndex` 重命名為 `randIndexByLength` ([350fc7e](https://github.com/bluelovers/ws-random/commit/350fc7e1dd6a2f31944bab90fe2815d7a38e053c))
* **random-core:** 移除 core-decorators 依賴並實作內部綁定與棄用機制 ([75b771a](https://github.com/bluelovers/ws-random/commit/75b771a95dbe33762265cb5ce5860faa06e3b23d))


### 📚　Documentation

* **monorepo:** 為全系列套件新增詳細的 JSDoc 註解與技術說明 ([477e362](https://github.com/bluelovers/ws-random/commit/477e362ece38a6206e60f967171f6ea944c96066))
* **monorepo:** 完善全系列套件文件、程式碼註解與技術說明 ([1c6c83b](https://github.com/bluelovers/ws-random/commit/1c6c83ba12424ca60a917bd1d03008f869e1c520))


### 🚨　Tests

* **core:** 優化型別定義與建置流程並強化 RNG 實例檢查 ([3c99a64](https://github.com/bluelovers/ws-random/commit/3c99a64d03f356bb5f199a57bf1f6b4d7364c0ae))


### 🛠　Build System

* migrate workspace from yarn to pnpm ([7601043](https://github.com/bluelovers/ws-random/commit/76010433d41a92ff8b3138b3712283e35a94fcce))
* **dist:** 更新各套件編譯產物與優化型別定義 ([a5ef5e0](https://github.com/bluelovers/ws-random/commit/a5ef5e0f7a6226bd6030b382a1213eb66ad8c0cd))
* **dist:** 更新所有套件的編譯產物與型別定義 ([b0b05b8](https://github.com/bluelovers/ws-random/commit/b0b05b8454dd0b485bf93cdf4b02e1be8532ac86))
* **monorepo:** 更新全系列套件版本並遷移至 pnpm 工作區 ([9c31210](https://github.com/bluelovers/ws-random/commit/9c31210801dbd93ede78f9dd74627027f8ef3e42))


### ♻️　Chores

* 不存在測試的模組 將 scripts 的 test 加上 echo 來忽略測試 ([4a0b213](https://github.com/bluelovers/ws-random/commit/4a0b21315f09a29b855248c8f9e890fcd9ed7d56))
* **monorepo:** 更新各子套件 package.json 之描述與關鍵字 ([f058e47](https://github.com/bluelovers/ws-random/commit/f058e4766da801120e6aab08b0db04e2dd553909))


### 🔖　Miscellaneous

* . ([170022b](https://github.com/bluelovers/ws-random/commit/170022b213ffad0aba001c9931dbb0ceed8584d4))
* . ([3148db0](https://github.com/bluelovers/ws-random/commit/3148db01cd5b14349bf84df9c05416daa87dafb5))



# [2.1.0](https://github.com/bluelovers/ws-random/compare/@lazy-random/random-core@2.0.3...@lazy-random/random-core@2.1.0) (2026-10-02)


### BREAKING CHANGES

* **random-core:** 移除 core-decorators 依賴並實作內部綁定與棄用機制



### 📦　Code Refactoring

* **random-core:** 移除 core-decorators 依賴並實作內部綁定與棄用機制 ([75b771a](https://github.com/bluelovers/ws-random/commit/75b771a95dbe33762265cb5ce5860faa06e3b23d))


### 📚　Documentation

* **monorepo:** 為全系列套件新增詳細的 JSDoc 註解與技術說明 ([477e362](https://github.com/bluelovers/ws-random/commit/477e362ece38a6206e60f967171f6ea944c96066))
* **monorepo:** 完善全系列套件文件、程式碼註解與技術說明 ([1c6c83b](https://github.com/bluelovers/ws-random/commit/1c6c83ba12424ca60a917bd1d03008f869e1c520))


### 🚨　Tests

* **core:** 優化型別定義與建置流程並強化 RNG 實例檢查 ([3c99a64](https://github.com/bluelovers/ws-random/commit/3c99a64d03f356bb5f199a57bf1f6b4d7364c0ae))


### 🛠　Build System

* migrate workspace from yarn to pnpm ([7601043](https://github.com/bluelovers/ws-random/commit/76010433d41a92ff8b3138b3712283e35a94fcce))
* **dist:** 更新各套件編譯產物與優化型別定義 ([a5ef5e0](https://github.com/bluelovers/ws-random/commit/a5ef5e0f7a6226bd6030b382a1213eb66ad8c0cd))
* **dist:** 更新所有套件的編譯產物與型別定義 ([b0b05b8](https://github.com/bluelovers/ws-random/commit/b0b05b8454dd0b485bf93cdf4b02e1be8532ac86))


### ♻️　Chores

* 不存在測試的模組 將 scripts 的 test 加上 echo 來忽略測試 ([4a0b213](https://github.com/bluelovers/ws-random/commit/4a0b21315f09a29b855248c8f9e890fcd9ed7d56))
* **monorepo:** 更新各子套件 package.json 之描述與關鍵字 ([f058e47](https://github.com/bluelovers/ws-random/commit/f058e4766da801120e6aab08b0db04e2dd553909))


### 🔖　Miscellaneous

* . ([3148db0](https://github.com/bluelovers/ws-random/commit/3148db01cd5b14349bf84df9c05416daa87dafb5))



## [2.0.3](https://github.com/bluelovers/ws-random/compare/@lazy-random/random-core@2.0.2...@lazy-random/random-core@2.0.3) (2023-11-20)

**Note:** Version bump only for package @lazy-random/random-core





## [2.0.2](https://github.com/bluelovers/ws-random/compare/@lazy-random/random-core@1.0.5...@lazy-random/random-core@2.0.2) (2023-11-19)


### BREAKING CHANGES

* add `dfArrayItemOne` and support readonly array
* update deps



### 📦　Code Refactoring

* add `dfArrayItemOne` and support readonly array ([19050b3](https://github.com/bluelovers/ws-random/commit/19050b35398cc23112f286df051272bd5fbe5600))


### 📌　Dependencies

* update deps ([01283f2](https://github.com/bluelovers/ws-random/commit/01283f2965c23c70d2e3c2d3cbdedbfe55df51e5))


### 🔖　Miscellaneous

* . ([7be09a4](https://github.com/bluelovers/ws-random/commit/7be09a4bc2fc047a3831a2b600d662b2c79e11ed))



## [2.0.1](https://github.com/bluelovers/ws-random/compare/@lazy-random/random-core@1.0.5...@lazy-random/random-core@2.0.1) (2023-11-19)


### BREAKING CHANGES

* add `dfArrayItemOne` and support readonly array
* update deps



### 📦　Code Refactoring

* add `dfArrayItemOne` and support readonly array ([19050b3](https://github.com/bluelovers/ws-random/commit/19050b35398cc23112f286df051272bd5fbe5600))


### 📌　Dependencies

* update deps ([01283f2](https://github.com/bluelovers/ws-random/commit/01283f2965c23c70d2e3c2d3cbdedbfe55df51e5))



## [1.0.5](https://github.com/bluelovers/ws-random/compare/@lazy-random/random-core@1.0.4...@lazy-random/random-core@1.0.5) (2022-10-29)



### 🛠　Build System

* update build ([a3377a4](https://github.com/bluelovers/ws-random/commit/a3377a45f6e3895378d1b633d02a501464836ea1))


### ♻️　Chores

* update config ([10d8b20](https://github.com/bluelovers/ws-random/commit/10d8b20d2ebc76491ac971bf8b9280f66285e056))



## [1.0.4](https://github.com/bluelovers/ws-random/compare/@lazy-random/random-core@1.0.3...@lazy-random/random-core@1.0.4) (2022-01-04)

**Note:** Version bump only for package @lazy-random/random-core





## [1.0.3](https://github.com/bluelovers/ws-random/compare/@lazy-random/random-core@1.0.2...@lazy-random/random-core@1.0.3) (2022-01-03)

**Note:** Version bump only for package @lazy-random/random-core





## 1.0.2 (2021-12-20)


### 🐛　Bug Fixes

* `Symbol.toStringTag` ([3ad533f](https://github.com/bluelovers/ws-random/commit/3ad533ffbbea30bd69475e30125e106dc3577b35))


### 📦　Code Refactoring

* use `@lazy-random/random-core` ([166977f](https://github.com/bluelovers/ws-random/commit/166977f61f48cf397b255e9b5fc950457b6cdef9))


### 🔖　Miscellaneous

* . ([bfa2b41](https://github.com/bluelovers/ws-random/commit/bfa2b41d11230fb305e25cd0c2c667e6c7b3aca3))





## 1.0.1 (2021-12-20)


### 📦　Code Refactoring

* use `@lazy-random/random-core` ([166977f](https://github.com/bluelovers/ws-random/commit/166977f61f48cf397b255e9b5fc950457b6cdef9))


### 🔖　Miscellaneous

* . ([bfa2b41](https://github.com/bluelovers/ws-random/commit/bfa2b41d11230fb305e25cd0c2c667e6c7b3aca3))
