import React, { ReactComponentElement, ReactNode, SVGProps } from "react";

import styles from "../styles/component_styles/IconButton.module.css";

interface PropType extends React.HTMLAttributes<HTMLButtonElement> {
	HeroIcon: (
		props: React.ComponentProps<"svg"> & { title?: string; titleId?: string }
	) => JSX.Element;
	disabled?: boolean;
}

const IconButton: React.FC<React.PropsWithChildren<PropType>> = (props) => {
	const { HeroIcon, children, disabled } = props;

	return (
		<button disabled={disabled} className={`${styles["icon-button"]}`}>
			<div className="flex">
				{children}
				<HeroIcon />
			</div>
		</button>
	);
};

export default IconButton;
