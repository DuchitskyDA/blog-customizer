import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

type TArticleParamsProps = {
	children: ReactElement[];
	handleSubmitForm(e: React.FormEvent<HTMLFormElement>): void;
	handleResetForm(): void;
};

export const ArticleParamsForm = ({
	children,
	handleSubmitForm,
	handleResetForm,
}: TArticleParamsProps) => {
	/** Состояние открытия формы */
	const [isOpen, setIsOpen] = useState(false);

	/** Хэндлер открытия */
	const handleOpenForm = () => setIsOpen(!isOpen);

	/** Стили в зависимости от открыто/закрыто */
	const containerStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen,
	});

	/** Обработка клика вне формы */
	const formRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = (e: MouseEvent) => {
		if (formRef.current && !formRef.current.contains(e.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', (e) => handleClickOutside(e));
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} toggleOpen={handleOpenForm} />
			<aside ref={formRef} className={containerStyle}>
				<form
					className={styles.form}
					onSubmit={handleSubmitForm}
					onReset={handleResetForm}>
					{children}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
