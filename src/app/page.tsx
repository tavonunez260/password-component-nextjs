'use client';

import fetch from 'node-fetch';
import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';

import { Input } from '@/components';
import { fetchPassword } from '@/services';
import { RenderRuleMessage, ValidateResponse } from '@/types';

export default function Home() {
	const [validateRules, setValidateRules] = useState<RenderRuleMessage[]>([]);
	const [passwordRules, setPasswordRules] = useState<ValidateResponse[]>([]);


	useEffect(() => {
		fetchPassword().then((data: ValidateResponse[]) => {
			setPasswordRules(data);
			setValidateRules(data.map(item => ({ id: item.id, message: item.message, value: false })));
		});
	}, []);

	return (
		<main className="w-[1200px] mx-auto">
			<section className="w-full flex flex-col">
				<h1 className="text-2xl font-semibold text-gray-800 text-center my-4 mx-2 p-4">
					Password component
				</h1>
				<form noValidate className="w-full flex flex-col">
					<div className="flex w-full mb-8">
						<div className="basis-1/2 flex justify-center">
							<Input
								label="Password"
								name="password"
								type="password"
								rules={passwordRules}
								setValidateRules={setValidateRules}
							/>
						</div>
						<div className="basis-1/2 flex flex-col gap-4">
							{validateRules.map(rule => (
								<div className="flex gap-4 items-center" key={uuid()} data-testid={rule.value ? `success_${rule.id}` : `failure_${rule.id}`}>
									<div
										className={`flex justify-center items-center w-5 h-5 ${
											rule.value ? 'bg-green-500' : 'bg-red-500'
										} rounded-md inline-block`}
									>
										{rule.value ? '✓' : '✗'} {/* Checkmark or cross */}
									</div>
									<div className="text-sm">
										{rule.message} {/* Validation message */}
									</div>
								</div>
							))}
						</div>
					</div>
					<button
						type="button"
						className={`px-4 py-2 mx-auto rounded-md text-white ${
							validateRules.some(rule => !rule.value)
								? 'bg-gray-400 cursor-not-allowed'
								: 'bg-blue-500 hover:bg-blue-700'
						} focus:outline-none focus:ring focus:ring-blue-300`}
						disabled={validateRules.some(rule => !rule.value)}
					>
						Submit
					</button>
				</form>
			</section>
		</main>
	);
}
