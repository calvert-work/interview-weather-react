import MuiSwitch from '@mui/material/Switch';
import type { TSwitch } from './Switch.types';
import { Label } from '../label/Label';

export const Switch = (props: TSwitch) => {
	const { leftLabel, rightLabel, leftAriaLabel, rightAriaLabel, switchLabel, htmlFor, ...rest } = props;

	return <>
		{leftLabel && <span aria-label={leftAriaLabel}>{leftLabel}</span>}
		{switchLabel}
		<Label htmlFor={htmlFor}>
			<MuiSwitch id={htmlFor} aria-description={`Selected ${props.checked ? rightAriaLabel || rightLabel : leftAriaLabel || leftLabel}`} {...rest} />
		</Label>
		{rightLabel && <span aria-label={rightAriaLabel}>{rightLabel}</span>}
	</>
}