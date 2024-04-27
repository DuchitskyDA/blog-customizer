import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type TArrowButtonProps = {
	isOpen: boolean;
	toggleOpen: OnClick;
};

export const ArrowButton = ({ isOpen, toggleOpen }: TArrowButtonProps) => {
	/** Стили стрелки зависящие от открыто/закрыто */
	const arrowStyle: string = clsx({
		[styles.arrow]: true,
		[styles.arrow_open]: isOpen,
	});

	/** Стили контейнера зависящие от открыто/закрыто */
	const containerStyle: string = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen,
	});

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={containerStyle}
			onClick={toggleOpen}>
			<img src={arrow} alt='иконка стрелочки' className={arrowStyle} />
		</div>
	);
};
