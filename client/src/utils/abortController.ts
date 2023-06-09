export const abortController = (controller?: AbortController): AbortController => {
  controller && controller.abort();
  return new AbortController();
};
