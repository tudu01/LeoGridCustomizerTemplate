import * as React from "react";
import { CellRendererOverrides } from "../types";

export const cellRendererOverrides: CellRendererOverrides = {
	["Text"]: (props, col) => {
		const safeToString = (value: unknown): string => {
			if (value === null || value === undefined) return "";
			if (typeof value === "string") return value;
			if (typeof value === "number" || typeof value === "boolean") return String(value);
			return "";
		};
		// eslint-disable-next-line react/prop-types
		const formatted = safeToString(props.formattedValue);
		// eslint-disable-next-line react/prop-types
		const raw = safeToString(props.value);
		const textValue = formatted || raw;
		const style: React.CSSProperties | undefined =
			textValue.length > 10 ? { color: "crimson", fontWeight: 600 } : undefined;
		return <span style={style}>{textValue}</span>;
	},
};
