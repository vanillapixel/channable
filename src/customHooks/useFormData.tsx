import { useState, ChangeEvent } from "react";

export const useFormState = (initialValues: any) => {
	const [data, setData] = useState(initialValues);

	return [
		data,
		(e: ChangeEvent<HTMLInputElement>) => {
			let {
				target: { name, files, type, value },
			} = e;
			if (type === "file") {
				setData({
					...data,
					[name]: files?.item(0),
				});
				return;
			}
			setData({ ...data, [name]: value });
		},
	];
};
