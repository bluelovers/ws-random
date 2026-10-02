/**
 * 隨機種子 (Random Seed) 的來源資料 (Source Data)：統一保存 `random-extra` 的名稱與版本，
 * 作為單一事實來源 (Single Source of Truth)，避免各處硬編碼 (Hardcode) 同一份資訊；
 * 以 `Object.freeze()` 凍結，防止執行期被意外寫入而改變資料。
 * Frozen source data holding the `random-extra` name and version: a single source of truth that avoids hardcoding, frozen to prevent runtime mutation.
 */
export declare const randomSeedStrData: Readonly<{
	name: "random-extra";
	version: "3.6.15";
}>;
/**
 * 由 `randomSeedStrData` 拆出的具名常數 (Named Constant)：
 * 讓使用者可直接 `import { name, version }` 取值，且兩者在模組建立時即固定，不受物件日後變動影響。
 * Named constants destructured from `randomSeedStrData` so callers can import them directly; both are fixed at module creation.
 */
declare const name$1: "random-extra";
export declare const version: "3.6.15";

export {
	name$1 as name,
	randomSeedStrData as default,
};

export {};
