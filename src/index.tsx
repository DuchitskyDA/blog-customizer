import { createRoot } from 'react-dom/client';
import React, { CSSProperties, StrictMode, useState } from 'react';
import clsx from 'clsx';

import { Article } from 'components/article';
import { ArticleParamsForm } from 'components/article-params-form';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [appState, setAppState] = useState(defaultArticleState);
	const [fontFamily, setFontFamily] = useState(appState.fontFamilyOption);
	const [fontSize, setFontSize] = useState(appState.fontSizeOption);
	const [fontColor, setFontColor] = useState(appState.fontColor);
	const [bgColor, setBgColor] = useState(appState.backgroundColor);
	const [contentWidth, setContentWidth] = useState(appState.contentWidth);

	/** Хэндлер сабмита формы. При клике принимает все состояния(стили),
	 * полученные из формы и применяет их на страницу */
	const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			fontFamily !== appState.fontFamilyOption ||
			fontSize !== appState.fontSizeOption ||
			fontColor !== appState.fontColor ||
			bgColor !== appState.backgroundColor ||
			contentWidth !== appState.contentWidth
		) {
			setAppState({
				fontFamilyOption: fontFamily,
				fontSizeOption: fontSize,
				fontColor: fontColor,
				backgroundColor: bgColor,
				contentWidth: contentWidth,
			});
		}
	};

	/** Хэндлер ресета формы. Возвращает все состояния и стили в исходное состояние */
	const handleResetForm = () => {
		setAppState(defaultArticleState);

		setFontFamily(defaultArticleState.fontFamilyOption);

		setFontSize(defaultArticleState.fontSizeOption);

		setFontColor(defaultArticleState.fontColor);

		setBgColor(defaultArticleState.backgroundColor);

		setContentWidth(defaultArticleState.contentWidth);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appState.fontFamilyOption.value,
					'--font-size': appState.fontSizeOption.value,
					'--font-color': appState.fontColor.value,
					'--container-width': appState.contentWidth.value,
					'--bg-color': appState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				handleSubmitForm={handleSubmitForm}
				handleResetForm={handleResetForm}>
				<Select
					selected={fontFamily}
					options={fontFamilyOptions}
					title={'Шрифт'}
					onChange={(e) => setFontFamily(e)}
				/>
				<RadioGroup
					selected={fontSize}
					options={fontSizeOptions}
					title={'Размер шрифта'}
					name={'Размер шрифта'}
					onChange={(e) => setFontSize(e)}
				/>
				<Select
					selected={fontColor}
					options={fontColors}
					title={'Цвет шрифта'}
					onChange={(e) => setFontColor(e)}
				/>
				<Separator />
				<Select
					selected={bgColor}
					options={backgroundColors}
					title={'Цвет фона'}
					onChange={(e) => setBgColor(e)}
				/>
				<Select
					selected={contentWidth}
					options={contentWidthArr}
					title={'Ширина контента'}
					onChange={(e) => setContentWidth(e)}
				/>
			</ArticleParamsForm>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
