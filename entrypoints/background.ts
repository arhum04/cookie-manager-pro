export default defineBackground(() => {
  console.log('Cookie Manager Background Started');

  browser.cookies.onChanged.addListener((changeInfo) => {
    // Broadcast cookie changes to any open UI components
    browser.runtime.sendMessage({
      type: 'COOKIE_CHANGED',
      payload: changeInfo,
    }).catch(() => {
      // Ignore errors when popup is closed
    });
  });
});
