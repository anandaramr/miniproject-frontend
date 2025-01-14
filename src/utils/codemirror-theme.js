import { createTheme } from "@uiw/codemirror-themes"
import { tags as t } from '@lezer/highlight';

export const editorDarkTheme = createTheme({
	theme: 'dark',
	settings: {
		foreground: '#f79498',
		background: '#131517',
		caret: '#ffffff',
		selection: '#ffffff20',
		selectionMatch: '#ffffff10',
		lineHighlight: '#13151700',
		gutterBackground: '#131517',
		fontFamily: 'Fira Code',
		gutterForeground: '#787b8099',
	},
	styles: [
		{ tag: t.literal, color: '#7be8db' },
		{ tag: t.brace, color: '#eba2b1' },
		{ tag: t.squareBracket, color: '#d18a99' },
		{ tag: t.punctuation, color: '#d18a99' },
	],
});

export const editorLightTheme = createTheme({
	theme: 'dark',
	settings: {
		foreground: '#fc2d36',
		background: '#fff',
		caret: '#000',
		selection: '#0000002a',
		selectionMatch: '#0000001a',
		lineHighlight: '#00000000',
		gutterBackground: '#fff',
		fontFamily: 'Fira Code',
		gutterForeground: '#787b8099',
	},
	styles: [
		{ tag: t.literal, color: '#02baa5' },
		{ tag: t.brace, color: '#a85867' },
		{ tag: t.squareBracket, color: '#a85867' },
		{ tag: t.punctuation, color: '#a85867' },
	],
});