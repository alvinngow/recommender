import { CheckCircleIcon } from "@heroicons/react/24/outline";
import style from "../../styles/component_styles/Alert.module.css";

type AlertProps = {
	showAlert: boolean;
};

function Alert(props: AlertProps) {
	return (
		<div className={`${style.alert} ${props.showAlert && "block"}`}>
			<CheckCircleIcon className="text-green-300 h-12 w-12 mr-4" /> Share text
			copied!
		</div>
	);
}

export default Alert;
