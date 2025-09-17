import * as React from "react";
import { CellEditorOverrides } from "../types";

export const cellEditorOverrides: CellEditorOverrides = {
	["Text"]: (defaultProps, col) => {
		const safeToString = (value: unknown): string => {
			if (value === null || value === undefined) return "";
			if (typeof value === "string") return value;
			if (typeof value === "number" || typeof value === "boolean") return String(value);
			return "";
		};
		const value = safeToString(defaultProps.value);
		return (
			<input
				value={value}
				onChange={(e) => defaultProps.onChange((e.target as HTMLInputElement).value)}
				style={{ width: "100%" }}
				autoFocus
			/>
		);
	},
};
