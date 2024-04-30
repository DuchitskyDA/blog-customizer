import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'components/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';

type TArticleParamsProps = {
	appState: ArticleStateType;
	setAppState(props: ArticleStateType): void;
};

export const ArticleParamsForm = ({
	appState,
	setAppState,
}: TArticleParamsProps) => {
	/** Состояние открытия формы */
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState(appState.fontFamilyOption);
	const [fontSize, setFontSize] = useState(appState.fontSizeOption);
	const [fontColor, setFontColor] = useState(appState.fontColor);
	const [bgColor, setBgColor] = useState(appState.backgroundColor);
	const [contentWidth, setContentWidth] = useState(appState.contentWidth);

	/** Хэндлер открытия */
	const handleOpenForm = () => setIsMenuOpen(!isMenuOpen);

	/** Стили в зависимости от открыто/закрыто */
	const containerStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: isMenuOpen,
	});

	/** Хэндлер сабмита формы. При клике принимает все состояния(стили),
	 * полученные из формы и применяет их на страницу */
	const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setAppState({
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: bgColor,
			contentWidth: contentWidth,
		});
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

	/** Обработка клика вне формы */
	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(e.target as Node)) {
				setIsMenuOpen(false);
			}
		};

		if (!isMenuOpen) return; // останавливаем эффект, если закрыто
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} toggleOpen={handleOpenForm} />
			<aside ref={formRef} className={containerStyle}>
				<form
					className={styles.form}
					onSubmit={handleSubmitForm}
					onReset={handleResetForm}>
					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={setFontFamily}
					/>
					<RadioGroup
						selected={fontSize}
						options={fontSizeOptions}
						title={'Размер шрифта'}
						name={'Размер шрифта'}
						onChange={setFontSize}
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						selected={bgColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={setBgColor}
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						title={'Ширина контента'}
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
