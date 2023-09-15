import { NextResponse } from 'next/server';

import { passwordRules } from '@/utils';

export async function GET () {
	return NextResponse.json(passwordRules);
}
