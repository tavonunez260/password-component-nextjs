import React, { useEffect, useState } from 'react';

import { InputProps } from '@/types';
import { validatePasswordRules } from '@/utils';

//By destructuring the rest object, it is possible to pass any prop used by the <input /> element.
export const Input: React.FC<InputProps> = ({
	className,
	label,
	name,
	rules,
	setValidateRules,
	onChange: outerOnChange,
	...rest
}) => {
	const [value, setValue] = useState('');

	useEffect(() => {
		if (rules && setValidateRules) {
			setValidateRules(validatePasswordRules(rules, value));
		}
	}, [value]);

	const innerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setValue(newValue);
		if (outerOnChange) {
			outerOnChange(e);
		}
	};

	return (
		<div>
			<label className="block text-gray-700 mb-2" htmlFor={name}>
				{label}
			</label>
			<input
				className={`border rounded-md shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${className}`}
				id={name}
				name={name}
				value={value}
				onChange={innerOnChange}
				{...rest}
			/>
		</div>
	);
};
