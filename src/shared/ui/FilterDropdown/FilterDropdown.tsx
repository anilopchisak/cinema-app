'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import MultiDropdown, { Option } from '../MultiDropdown';
import s from './FilterDropdown.module.scss';
import { debounce } from 'lodash';

interface FilterDropdownProps {
  /** Массив доступных опций для выбора */
  options: Option[];
  /** Начальное выбранное значение (опционально) */
  initialSelected?: Option[];
  /** Плейсхолдер, отображаемый когда ничего не выбрано */
  placeholder: string;
  /** Разрешить множественный выбор (по умолчанию false) */
  isMultiple?: boolean;
  /** Колбэк, вызываемый при изменении выбранных опций (с debounce) */
  onChangeFilter: (selected: Option[]) => void;
  /** Колбэк, вызываемый при открытии дропдауна */
  onOpen?: () => void;
  /** Колбэк для подгрузки дополнительных опций (пагинация) */
  onLoadMore?: () => void;
  /** Флаг наличия следующих страниц для пагинации */
  hasNextPage?: boolean;
  /** Флаг загрузки следующей страницы */
  isFetchingNextPage?: boolean;
  /** Флаг начальной загрузки опций */
  isLoading?: boolean;
}

/** Компонент фильтра с выпадающим списком и debounce-обработкой изменений */
const FilterDropdown = ({
  options,
  initialSelected = [],
  placeholder,
  isMultiple = false,
  onChangeFilter,
  onOpen,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
}: FilterDropdownProps) => {
  /** Локальное состояние выбранных опций */
  const [selected, setSelected] = useState<Option[]>(initialSelected);

  /**
   * Синхронизируем локальный стейт с входными параметрами.
   * Важно для сценариев, когда фильтры меняются извне (например, кнопка "Очистить").
   */
  useEffect(() => {
    setSelected(initialSelected);
  }, [initialSelected]);

  /** Формирует заголовок дропдауна на основе выбранных элементов */
  const getDropdownTitle = (selected: Option[]) => {
    if (!selected.length) return placeholder;
    return selected.map((item) => item.value).join(', ');
  };

  /** Debounced-версия onChangeFilter для предотвращения частых вызовов */
  const debouncedUpdate = useMemo(
    () =>
      debounce((value: Option[]) => {
        onChangeFilter(value);
      }, 400),
    [onChangeFilter]
  );

  /** Отмена debounced-вызова при размонтировании компонента */
  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  /** Обработчик изменения выбранных опций,
   * обновляет локальное состояние и вызывает debounced-функцию */
  const handleChange = useCallback(
    (newSelected: Option[]) => {
      setSelected(newSelected);
      debouncedUpdate(newSelected);
    },
    [debouncedUpdate]
  );

  return (
    <MultiDropdown
      className={s.filter}
      options={options}
      value={selected}
      onChange={handleChange}
      getTitle={getDropdownTitle}
      isMultiple={isMultiple}
      onOpen={onOpen}
      onLoadMore={onLoadMore}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
    />
  );
};

export default FilterDropdown;
