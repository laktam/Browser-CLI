(() => {
  "use strict";
  chrome.runtime.onMessage.addListener(function (e, n, t) {
    if ("getTabsInfo" === e.action)
      return (
        chrome.tabs.query({}, function (e) {
          t(e);
        }),
        !0
      );
  });
})();
