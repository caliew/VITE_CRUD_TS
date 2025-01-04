/**
 * === NOTE ===
 * DO NOT USE IF YOU ARE USING CLIENT-SIDE ROUTING WITH REACT-ROUTER.
 * The navigation function here "reloads" the web application which means that
 * it actually makes a web call to the specified URL and renders the page, which
 * resets any variables you accumulated during a session.
 *
 * === DESCRIPTION ===
 * Navigates to a specific page from the current window's URL.
 *
 * Uses window.location.assign() to perform the document load,
 * so that the history of the browser is still preserved.
 *
 * This method is used so that the mobile client that embeds this
 * web app into a WebView can control page navigation natively.
 *
 * === USAGE ===
 *
 * Navigate using path without /
 *     navigate("appointmentlist");
 *
 * Navigate using path with /
 *     navigate("/appointmentlist");
 *
 * Navigate using path defined in routes dictionary
 *
 * === SECURITY NOTES ===
 *  * Client DOM Open Redirect
 *      * A configured (hard-coded) URL, obtained from environment vars, is used instead
 *        of the window's origin. This helps to mitigate arbitrary URL redirection.
 *
 * @param {string} subPath The sub-path to navigate to
 * @param {boolean} toAddSlashPrefix whether to add slash as prefix to the subpath
 */
export const navigate = (subPath: string) => {
  window.location.assign(subPath);
};
