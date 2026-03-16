'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Input from '../Input';
import cn from 'classnames';
import ArrowDownIcon from '../icons/ArrowDownIcon/ArrowDownIcon';
import Text from '../Text';
import s from './MultiDropdown.module.scss';
import Loader from '../Loader';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
  /** Выбор нескольких элементов или один */
  isMultiple?: boolean;
  /** Функция, вызываемся при первом открытии дропдауна */
  onOpen?: () => void;
  /** Функция для подгрузки следующей страницы */
  onLoadMore?: () => void;
  /** Есть ли еще страницы для загрузки */
  hasNextPage?: boolean;
  /** Идет ли загрузка следующей страницы в данный момент */
  isFetchingNextPage?: boolean;
  /** Идет ли загрузка в данный момент */
  isLoading?: boolean;
};

export default function MultiDropdown({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
  isMultiple = true,
  onOpen,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
}: MultiDropdownProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [filter, setFilter] = useState<string>('');
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const observerTarget = useRef<HTMLDivElement | null>(null);

  const open = () => {
    setIsOpened(true);
    setFilter('');
    onOpen?.();
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as HTMLElement)) {
        setIsOpened(false);
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  useInfiniteScroll({
    targetRef: observerTarget,
    rootRef: optionsRef,
    enabled: isOpened,
    hasNextPage,
    isFetching: isFetchingNextPage,
    onLoadMore: () => onLoadMore?.(),
    threshold: 0.1,
    rootMargin: '100px 0px',
  });

  const title = useMemo(() => getTitle(value), [getTitle, value]);

  const isEmpty = value.length === 0;

  const filteredOptions = useMemo(() => {
    const searchStr = filter.toLocaleLowerCase();
    return options.filter((option) => option.value.toLocaleLowerCase().indexOf(searchStr) === 0);
  }, [filter, options]);

  const selectedKeysSet = useMemo<Set<Option['key']>>(
    () => new Set(value.map((option) => option.key)),
    [value]
  );

  const onSelect = useCallback(
    (option: Option) => {
      if (disabled) {
        return;
      }

      if (isMultiple) {
        if (selectedKeysSet.has(option.key)) {
          onChange(value.filter((item) => item.key !== option.key));
        } else {
          onChange([...value, option]);
        }
      } else {
        onChange([option]);
        setIsOpened(false);
      }

      inputRef.current?.focus();
    },
    [disabled, onChange, value, selectedKeysSet, isMultiple]
  );

  const opened = isOpened && !disabled;

  return (
    <div ref={wrapperRef} className={cn(s.multiDropdown, disabled && s.disabled, className)}>
      <Input
        onClick={open}
        ref={inputRef}
        disabled={disabled}
        placeholder={title}
        className={s.field}
        value={opened ? filter : isEmpty ? '' : title}
        onChange={setFilter}
        afterSlot={<ArrowDownIcon color="secondary" />}
      />
      {opened && (
        <div ref={optionsRef} className={s.options}>
          {isLoading && !isFetchingNextPage && <Loader />}
          {filteredOptions.map((option) => (
            <button
              className={cn(s.option, selectedKeysSet.has(option.key) && s.selected)}
              key={option.key}
              onClick={() => onSelect(option)}
            >
              <Text view="p-16" color={(selectedKeysSet.has(option.key) && 'accent') || 'primary'}>
                {option.value}
              </Text>
            </button>
          ))}

          {hasNextPage && (
            <div ref={observerTarget} style={{ padding: '8px', textAlign: 'center' }}>
              {isFetchingNextPage && <Loader />}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
