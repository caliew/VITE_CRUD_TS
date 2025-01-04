import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { matchRoutes, RouteConfig } from 'react-router-config';
import { useLocation, useHistory, useParams, useRouteMatch } from 'react-router-dom';

import { ROUTES } from '@features/index';

const flattenByPredicate = (xs, childSelector) =>
  xs.reduce((acc, x) => {
    let accConcat = acc.concat(x);
    const children = childSelector(x);
    if (children) {
      accConcat = acc.concat(flattenByPredicate(children, childSelector));
    }
    return accConcat;
  }, []);

/**
 * Finds and retrieves the display name of a particular path from global application
 * routes. This path should be a valid sub-path from the base URL domain of this application.
 *
 */
const useExtendedRouter = () => {
  const { pathname, search } = useLocation();
  const history = useHistory();

  const flattenedRoutes = useMemo(() => flattenByPredicate(ROUTES, (route) => route.routes), []) as RouteConfig[];
  const matchedPath = matchRoutes(flattenedRoutes, pathname).find((path) => path.match.isExact)?.route ?? {};
  const {
    actionUrl,
    availableLanguages,
    backByIndexEnable,
    backUrl,
    customLayout,
    displayTitle,
    isLandingPage,
    isNavHeaderHide,
    titleTransKey,
    translationFile,
  } = matchedPath;

  const { t } = useTranslation(translationFile);

  const query = new URLSearchParams(search);

  const setSearchParam = (key: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);
    history.replace({ search: searchParams.toString() });
  };

  const getSearchString = (key: string) => query.get(key);

  const navigateBackWithPageLevel = (pageLevel?: number) => {
    if (!pageLevel || history.length <= pageLevel + 1) return;

    history.go(-pageLevel);
  };

  const newDisplayTitle = titleTransKey ? t(titleTransKey) : displayTitle?.();
  const formattedDisplayTitle = newDisplayTitle?.replace(/<[^>]{0,1000}>/g, '');

  return {
    displayTitle: formattedDisplayTitle,
    flattenedRoutes,
    isLandingPage,
    actionUrl,
    backByIndexEnable,
    isNavHeaderHide,
    customLayout,
    getSearchString,
    backUrl,
    titleTransKey,
    translationFile,
    availableLanguages,
    setSearchParam,
    navigateBackWithPageLevel,
  };
};

export { useExtendedRouter, useLocation, useParams, useHistory, useRouteMatch };
