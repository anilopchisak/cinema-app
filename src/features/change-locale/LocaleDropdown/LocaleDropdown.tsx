'use client';

import MultiDropdown, { Option } from '@/shared/ui/MultiDropdown';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LocaleDropdown = ({}) => {
  const { t, i18n } = useTranslation('common');

  const languageOptions: Option[] = useMemo(
    () => [
      { key: 'ru', value: 'Русский' },
      { key: 'en', value: 'English' },
    ],
    []
  );

  const [selectedLanguage, setSelectedLanguage] = useState<Option[]>(() => {
    const current = i18n.language?.split('-')[0] || 'ru';
    const found = languageOptions.find((o) => o.key === current);
    return found ? [found] : [languageOptions[0]];
  });

  const handleChangeLanguage = (value: Option[]) => {
    setSelectedLanguage(value);
    const nextLocale = value[0]?.key;

    if (!nextLocale) return;

    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=${60 * 60 * 24 * 30}`;
    void i18n.changeLanguage(nextLocale);
    window.location.reload();
  };

  return (
    <MultiDropdown
      options={languageOptions}
      value={selectedLanguage}
      onChange={handleChangeLanguage}
      getTitle={(value) => value[0]?.value ?? t('ui.language')}
      isMultiple={false}
    />
  );
};

export default LocaleDropdown;
