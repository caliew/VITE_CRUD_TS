import { useContext, useEffect } from 'react';

import { PageTitleContext } from '@shared/context/PageTitleContextWrapper';

import { useExtendedRouter } from '../useExtendedRouter';

interface UseDocumentTitleParams {
  title?: string;
  finalTitle?: string;
  skip?: boolean;
}

const useDocumentTitle = ({ finalTitle, skip, title }: UseDocumentTitleParams) => {
  const { displayTitle } = useExtendedRouter();
  const { setPageTitle } = useContext(PageTitleContext)!;

  useEffect(() => {
    if (!skip && title) {
      document.title = title;
    }
  }, [title, skip, setPageTitle]);

  useEffect(() => {
    // TO BE REMOVED AFTER C1 C2
    if (!skip && finalTitle) {
      document.title = finalTitle;
      setPageTitle(finalTitle);
    }

    return () => {
      document.title = displayTitle;
      setPageTitle(undefined);
    };
  }, [finalTitle, skip, setPageTitle, displayTitle]);
};

export default useDocumentTitle;
