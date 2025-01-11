import { createTheme } from "@uiw/codemirror-themes"
import { tags as t } from '@lezer/highlight';

export const editorDarkTheme = createTheme({
	theme: 'dark',
	settings: {
		foreground: '#e56b6f',
		background: '#131517',
		caret: '#ffffff',
		selection: '#00000033',
		selectionMatch: '#00000033',
		lineHighlight: '#0000001a',
		gutterBackground: '#131517',
		fontFamily: 'Fira Code',
		gutterForeground: '#787b8099',
	},
	styles: [
		{ tag: t.comment, color: '#787b8099' },
		{ tag: t.literal, color: '#2A9D8F' },
		{ tag: t.brace, color: '#b56576' },
		{ tag: t.squareBracket, color: '#b56576' },
		{ tag: t.punctuation, color: '#b56576' },
	],
});

export const editorLightTheme = createTheme({
	theme: 'dark',
	settings: {
		foreground: '#e56b6f',
		background: '#e5e7eb',
		caret: '#000',
		selection: '#0000001a',
		selectionMatch: '#0000001a',
		lineHighlight: '#0000001a',
		gutterBackground: '#e5e7eb',
		fontFamily: 'Fira Code',
		gutterForeground: '#787b8099',
	},
	styles: [
		{ tag: t.comment, color: '#787b8099' },
		{ tag: t.literal, color: '#2A9D8F' },
		{ tag: t.brace, color: '#b56576' },
		{ tag: t.squareBracket, color: '#b56576' },
		{ tag: t.punctuation, color: '#b56576' },
	],
});