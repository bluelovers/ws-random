#!/usr/bin/env node

import anybase from '..';

/**
 * 參數不足時僅印出用法 (Usage) 並結束
 *
 * 這裡刻意不呼叫 process.exit(1)：顯示用法是「協助」而非「失敗」，
 * 以一般結束碼回傳可讓 shell 進程將其視為正常結束。
 *
 * Print usage and exit when arguments are insufficient.
 *
 * Deliberately does not call process.exit(1): showing usage is assistance,
 * not failure, so a normal exit code keeps shell callers happy.
 */
if (process.argv.length < 4)
{
	console.log('Usage:');
	console.log('  anybase target_numberic_base original_number [original_numeric_base [digits_min [digits_max]]]');
}
else
{
	/**
	 * 執行進位制轉換並輸出結果
	 *
	 * 以 apply() 轉發其餘位置參數 (Positional Arguments)，而非展開陣列，
	 * 是為了保留呼叫端傳入的參數順序與長度。
	 *
	 * Run the base conversion and print the result.
	 *
	 * Forwards the remaining positional arguments via apply() instead of
	 * spreading them, preserving the caller's argument order and length.
	 */
	try
	{
		// @ts-ignore
		console.log(anybase.apply(this, process.argv.slice(2)));
	}
	/**
	 * CLI 失敗時以結束碼 1 結束
	 *
	 * 非零結束碼 (Exit Code) 是給 shell / CI 判斷失敗用的；
	 * 錯誤訊息同時寫入 stderr 與 stdout 分流，避免被正常輸出淹沒。
	 *
	 * Exit with code 1 on CLI failure.
	 *
	 * A non-zero exit code is what shell scripts and CI check for, and the
	 * message goes to stderr so it is not lost among normal output.
	 */
	catch (error)
	{
		error;
		console.error(String(error));
		process.exit(1);
	}
}
