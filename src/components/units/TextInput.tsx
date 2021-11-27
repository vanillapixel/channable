export const TextInput: any = ({ ...props }) => {
	return (
		<>
			<label htmlFor={props?.id}>{props?.label}</label>
			<input {...props} />
		</>
	);
};
