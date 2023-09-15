import React from 'react';

import { RenderRuleMessage } from '@/types';

export const ValidationOutput: React.FC<RenderRuleMessage> = ({ value, id, message }) => (
	<div
		className="flex gap-4 items-center"
		data-testid={value ? `success_${id}` : `failure_${id}`}
	>
		<div
			className={`flex justify-center items-center w-5 h-5 ${
				value ? 'bg-green-500' : 'bg-red-500'
			} rounded-md inline-block`}
		>
			{value ? '✓' : '✗'}
		</div>
		<div className="text-sm">{message}</div>
	</div>
);
