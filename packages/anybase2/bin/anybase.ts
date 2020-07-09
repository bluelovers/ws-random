#!/usr/bin/env node

import anybase from '..';

if (process.argv.length < 4)
{
	console.log('Usage:');
	console.log('  anybase target_numberic_base original_number [original_numeric_base [digits_min [digits_max]]]');
}
else
{
	try
	{
		// @ts-ignore
		console.log(anybase.apply(this, process.argv.slice(2)));
	}
	catch (error)
	{
		error;
		console.error(String(error));
		process.exit(1);
	}
}
