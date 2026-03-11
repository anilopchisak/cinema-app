'use client';

import MultiDropdown, { type Option } from '@/shared/ui/MultiDropdown';
import s from '../Filter.module.scss';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useFimCategoryState from '@/entities/film-category/api/hooks/useFilmCategoryState';
import { debounce } from 'lodash';
import { useUpdateQuery } from '@/entities/cinema/hooks/useUpdateQueryString';
import { CinemaRawParams } from '@/entities/cinema/types/cinema.types';

interface CinemaFiltersProps {
  initCategories: CinemaRawParams['category'];
}

/** Фильтр по жанру фильма */
const CategoryFilter = ({ initCategories }: CinemaFiltersProps) => {
  /** Флаг открытия дропдауна — используется для включения загрузки данных только при необходимости*/
  const [isCategoryOpened, setIsCategoryOpened] = useState(false);
  /** Текущие выбранные опции в формате MultiDropdown  */
  const [selected, setSelected] = useState<Option[]>([]);

  /* Загружаем категории с бесконечной пагинацией.
   * Запрос выполняется только когда дропдаун открыт
   * или уже есть выбранные категории (чтобы подгрузить их названия)
   */
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useFimCategoryState({
    enabled: isCategoryOpened || (initCategories?.length ?? 0) > 0,
  });

  /* Преобразуем полученные с сервера категории в опции для MultiDropdown */
  const categoryOptions = useMemo<Option[]>(() => {
    if (!data) return [];
    return data.items.map((item) => ({
      key: String(item.id),
      value: item.title,
    }));
  }, [data]);

  useEffect(() => {
    if (!categoryOptions.length) return;
    if (!initCategories?.length) return;

    const initSelected = categoryOptions.filter((option) =>
      initCategories.includes(String(option.key))
    );

    setSelected((prev) => {
      const prevKeys = prev.map((o) => o.key).join(',');
      const nextKeys = initSelected.map((o) => o.key).join(',');

      if (prevKeys === nextKeys) return prev;
      return initSelected;
    });
  }, [categoryOptions, initCategories]);

  /**
   * Формирует заголовок дропдауна в зависимости от выбранных опций.
   * Если ничего не выбрано — показываем "Жанр", иначе — список названий через запятую.
   */
  const getDropdownTitle = (selected: Option[]) => {
    if (selected.length === 0) return 'Жанр';
    return selected.map((item) => item.value).join(', ');
  };

  const updateQuery = useUpdateQuery();

  const onCategoryChange = useCallback(
    (categories: string[]) => {
      updateQuery({ category: categories });
    },
    [updateQuery]
  );

  const debouncedUpdate = useMemo(
    () =>
      debounce((value: Option[]) => {
        onCategoryChange(value.map((o) => String(o.key)));
      }, 700),
    [onCategoryChange]
  );

  /** Обновление параметров */
  useEffect(() => {
    debouncedUpdate(selected);
    return () => {
      debouncedUpdate.cancel();
    };
  }, [selected, debouncedUpdate]);

  return (
    <MultiDropdown
      className={s.filter}
      options={categoryOptions}
      value={selected}
      onChange={setSelected}
      getTitle={getDropdownTitle}
      isMultiple={true}
      onOpen={() => setIsCategoryOpened(true)}
      onLoadMore={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
    />
  );
};

export default CategoryFilter;
