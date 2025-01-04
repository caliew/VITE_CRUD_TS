/* eslint-disable class-methods-use-this */
import { ILOidcLocation } from '@axa-fr/react-oidc';

export class OidcLocation implements ILOidcLocation {
  open(url: string) {
    window.location.replace(url);
  }

  reload() {
    window.location.reload();
  }

  getCurrentHref() {
    return window.location.href;
  }

  getPath() {
    const { location } = window;
    return location.pathname + (location.search || '') + (location.hash || '');
  }

  getOrigin(): string {
    return window.origin;
  }
}
