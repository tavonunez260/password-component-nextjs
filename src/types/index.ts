import React, { InputHTMLAttributes } from 'react';

export type ValidateResponse = {
	id: string;
	name: string;
	message: string;
	validateFunction: string;
};
export interface RenderRuleMessage {
	id: string;
	message: string;
	value: boolean;
}

// Since I am extending from the class InputHTMLAttributes<HTMLInputElement> the <Input /> component is able to use the props
// Of the native <input /> component
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	name: string;
	rules?: ValidateResponse[];
	setValidateRules?: React.Dispatch<React.SetStateAction<RenderRuleMessage[]>>;
}
