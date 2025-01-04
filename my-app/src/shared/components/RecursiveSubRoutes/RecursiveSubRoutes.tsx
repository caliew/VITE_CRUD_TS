import { i18n } from 'i18n';
import { memo, useEffect } from 'react';
import { RouteConfig } from 'react-router-config';
import { Route } from 'react-router-dom';

import {
  LAYOUT_COMMON,
  LAYOUT_MOBILE,
  LAYOUT_MOBILE_PUBLIC,
  LAYOUT_PORTAL,
  LAYOUT_PORTAL_PUBLIC,
  LAYOUT_PORTAL_PUBLIC_UNSTYLE_CONTENT,
  LAYOUT_PORTAL_UNSTYLE_CONTENT,
  LAYOUT_STANDARD,
} from '@shared/constants/constants';
import useDocumentTitle from '@shared/hooks/useDocumentTitle';
import { useExtendedRouter } from '@shared/hooks/useExtendedRouter';
import useGlobalLoading from '@shared/hooks/useGlobalLoading';
import { changeDocumentLanguage } from '@shared/utils/multiLanguage';

import { CommonLayout, PortalLayout, RootLayout, StandardLayout } from '../layout';
import { WholePageLoading } from '../WholePageLoading';

const RecursiveSubRoutes = ({ component, customLayout, path }: RouteConfig) => {
  const { displayTitle } = useExtendedRouter();
  const isGlobalLoading = useGlobalLoading();

  useDocumentTitle({ title: displayTitle });

  useEffect(() => {
    changeDocumentLanguage(i18n.language);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, [path]);

  if (isGlobalLoading) {
    return <WholePageLoading />;
  }

  const layoutMapping = {
    [LAYOUT_STANDARD]: (
      <StandardLayout>
        <Route key={`route-${path}`} component={component} exact path={path} />
      </StandardLayout>
    ),
    [LAYOUT_PORTAL]: (
      <PortalLayout contentClassName="lg:max-w-5xl">
        <Route key={`route-${path}`} component={component} exact path={path} />
      </PortalLayout>
    ),
    [LAYOUT_PORTAL_PUBLIC_UNSTYLE_CONTENT]: (
      <PortalLayout isPublic noStyleContent>
        <Route key={`route-${path}`} component={component} exact path={path} />
      </PortalLayout>
    ),
    [LAYOUT_PORTAL_UNSTYLE_CONTENT]: (
      <PortalLayout noStyleContent>
        <Route key={`route-${path}`} component={component} exact path={path} />
      </PortalLayout>
    ),
    [LAYOUT_PORTAL_PUBLIC]: (
      <PortalLayout contentClassName="lg:max-w-5xl" isPublic>
        <Route key={`route-${path}`} component={component} exact path={path} />
      </PortalLayout>
    ),
    [LAYOUT_MOBILE]: (
      <RootLayout>
        <Route key={`route-${path}`} component={component} exact path={path} />
      </RootLayout>
    ),
    [LAYOUT_MOBILE_PUBLIC]: (
      <RootLayout isPublic>
        <Route key={`route-${path}`} component={component} exact path={path} />
      </RootLayout>
    ),
    [LAYOUT_COMMON]: (
      <CommonLayout>
        <Route key={`route-${path}`} component={component} exact path={path} />
      </CommonLayout>
    ),
  };

  return layoutMapping[customLayout];
};

export default memo(RecursiveSubRoutes);
