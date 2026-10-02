// @ts-check

/**
 * Jest 自動配置模組
 * Jest Auto Configuration Module
 *
 * 此模組自動偵測並配置 Jest 測試環境，支援多層級配置解析
 * This module automatically detects and configures Jest test environment with multi-level configuration resolution
 */

const { basename, extname, dirname } = require('path');

/**
 * Jest 配置物件
 * Jest configuration object
 *
 * @type { import('ts-jest').JestConfigWithTsJest }
 */
let jestConfig = {}

/**
 * 嘗試使用 `@yarn-tool/require-resolve` 載入模組的工具函數
 * Utility function for lazy loading modules
 *
 * @param {string} name - 模組名稱 Module name
 * @param {string[]} [paths] - 搜尋路徑 Search paths
 * @private
 */
function _lazyRequire(name, paths)
{
	let m;
	try
	{
		/**
		 * 嘗試使用 require-resolve 工具載入模組
		 * Try to load module using require-resolve tool
		 */
		m = require('@yarn-tool/require-resolve').requireExtra(name, {
			includeCurrentDirectory: true,
			includeGlobal: true,
			paths,
		});
	}
	/**
	 * 解析工具載入失敗時忽略例外，改由下方標準 `require` 作為後備 (Fallback)；
	 * Ignore load failures of the resolver tool and let the standard `require` below act as fallback
	 */
	catch (e)
	{}

	/**
	 * 如果失敗則使用標準 require
	 * If failed, use standard require
	 */
	return typeof m === 'undefined' ? require(name) : m;
}

/**
 * 嘗試使用 `@yarn-tool/require-resolve` 解析模組路徑的工具函數
 * Utility function for resolving module paths
 *
 * @param {string} name - 模組名稱 Module name
 * @returns {string} - 解析後的路徑 Resolved path
 * @private
 */
function _requireResolve(name)
{
	let result;

	try
	{
		/** @type {import('@yarn-tool/require-resolve')} */
		const { requireResolveExtra, requireResolveCore } = _lazyRequire('@yarn-tool/require-resolve');

		/**
		 * 嘗試從多個路徑解析 TSDX 相關模組
		 * Try to resolve TSDX related modules from multiple paths
		 */
		const paths = [
			requireResolveExtra('@bluelovers/tsdx').result,
			requireResolveExtra('tsdx').result,
		].filter(Boolean);

		result = requireResolveCore(name, {
			includeGlobal: true,
			includeCurrentDirectory: true,
			paths,
		})
	}
	/**
	 * 解析失敗時忽略例外，改由下方標準 `require.resolve` 作為後備 (Fallback)；
	 * Ignore resolution failures and let the standard `require.resolve` below act as fallback
	 */
	catch (e)
	{

	}

	/**
	 * 如果都失敗，使用標準 resolve
	 * If all failed, use standard resolve
	 */
	result = result || require.resolve(name);

	console.info('[require.resolve]', name, '=>', result)

	return result
}

/**
 * 配置解析狀態標誌
 * Configuration resolution status flag
 */
let _isNeedConfig = true;

/**
 * 第一層解析：以 try/catch 包裹，是因為工作區中的設定檔可能不存在或載入失敗；
 * 發生例外時靜默忽略，讓流程繼續嘗試第二、三層解析，避免整個設定流程中斷；
 * Wrapped in try/catch because workspace config files may be missing or fail to load;
 * exceptions are silently ignored so resolution continues with the second and third levels instead of aborting
 */
try
{
	/**
	 * 第一層：搜尋工作區中的配置檔案
	 * First level: Search for configuration files in workspace
	 */
	if (!jestConfig.preset)
	{
		/** @type {import('@yarn-tool/ws-find-up-paths')} */
		const { findUpPathsWorkspaces } = _lazyRequire('@yarn-tool/ws-find-up-paths');

		/**
		 * 向上搜尋 jest-preset.js 和 jest.config.js
		 * Search upwards for jest-preset.js and jest.config.js
		 */
		let result = findUpPathsWorkspaces([
			'jest-preset.js',
			'jest.config.js',
		], {
			/** 忽略當前套件 / Ignore current package */
			ignoreCurrentPackage: true,
			/** 只搜尋檔案 / Only search for files */
			onlyFiles: true,
		}).result;

		/**
		 * 找到工作區設定檔才解析其內容；找不到則維持 `_isNeedConfig`，交由下一層接手；
		 * Parse the workspace config only when one is found; otherwise keep `_isNeedConfig` so the next level takes over
		 */
		if (result)
		{
			let name = basename(result, extname(result))

			switch (name)
			{
				/**
				 * 如果是 jest-preset.js，使用其目錄作為 preset
				 * If it's jest-preset.js, use its directory as preset
				 */
				case 'jest-preset':
					// @ts-ignore
					// jestConfig.preset = dirname(result);
					jestConfig.preset = result;
					break;
				/**
				 * 其他情況，載入配置檔案內容
				 * Otherwise, load the configuration file content
				 */
				default:
					/**
					 * TODO: 疑似誤用簡寫屬性 `jestConfig`（應為展開 `...jestConfig`），
					 * 現況會在設定物件上產生無效的 `jestConfig` 鍵，且原本的 `jestConfig` 內容並未以展開語意併入；
					 * Suspected bug: the shorthand property `jestConfig` (likely meant `...jestConfig`) adds an invalid
					 * `jestConfig` key, and the previous `jestConfig` contents are not spread into the result.
					 * 邏輯未修改，僅記錄待確認；Logic left untouched, recorded for follow-up only
					 */
					jestConfig = {
						...require(result),
						jestConfig,
					};
					break;
			}

			_isNeedConfig = false;
		}
	}
}
catch (e)
{

}

/**
 * 第二層解析：同樣以 try/catch 包裹，解析不到共用設定時靜默略過，
 * 讓最後的預設 preset fallback 接手，確保 `jestConfig.preset` 一定有值；
 * Also wrapped in try/catch: when the shared config cannot be resolved it is silently skipped,
 * letting the final default-preset fallback take over so `jestConfig.preset` is always set
 */
try
{
	/**
	 * 第二層：嘗試解析 @bluelovers/jest-config
	 * Second level: Try to resolve @bluelovers/jest-config
	 */
	if (_isNeedConfig && !jestConfig.preset)
	{
		let result = _requireResolve('@bluelovers/jest-config/package.json');
		/**
		 * 成功解析到共用設定路徑才套用 preset；失敗則保留 `_isNeedConfig` 標誌，交由第三層預設值接手；
		 * Apply the preset only when the shared config path resolves; otherwise keep `_isNeedConfig` for the third-level default
		 */
		if (result)
		{
			// @ts-ignore
			jestConfig.preset = dirname(result);
			_isNeedConfig = false;
		}
	}
}
catch (e)
{

}

/**
 * 第三層守衛 (Guard)：僅在前兩層都未成功（`_isNeedConfig` 仍為 true）且尚未取得 preset 時，
 * 才套用預設的 preset，避免覆蓋已解析出來的設定；
 * Third-level guard: only used when both earlier levels failed (`_isNeedConfig` still true) and no preset
 * has been resolved yet, so an already-resolved setting is never overwritten
 */
if (_isNeedConfig && !jestConfig.preset)
{
	/**
	 * 第三層：使用預設的 @bluelovers/jest-config
	 * Third level: Use default @bluelovers/jest-config
	 */
	// @ts-ignore
	jestConfig.preset = '@bluelovers/jest-config';
	_isNeedConfig = false;
}

/**
 * 輸出最終的 preset 設定
 * Output the final preset configuration
 */
console.info(`jest.config.preset: ${jestConfig.preset}`);

module.exports = jestConfig
