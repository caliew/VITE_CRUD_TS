/**
 * check if ALL arguments are truthy
 * @param args arbitary number and type of arguments
 */
const checkIfAllErrored = (...args: any[]) =>
  !!args.reduce((acc, cur) => acc && cur);

/**
 * check if ANY arguments are truthy
 * @param args arbitary number and type of arguments
 */
const checkIfAnyErrored = (...args: any[]) =>
  !!args.reduce((acc, cur) => acc || cur);

/**
 * check if SOME but NOT ALL argument(s) are truthy
 * @param args arbitary number and type of arguments
 */
const checkIfAnyErroredButNotAll = (...args: any[]) =>
  checkIfAnyErrored(...args) && !checkIfAllErrored(...args);

export { checkIfAllErrored, checkIfAnyErrored, checkIfAnyErroredButNotAll };
