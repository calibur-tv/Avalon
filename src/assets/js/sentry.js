import Vue from "vue";
import Raven from "raven-js";
import RavenVue from "raven-js/plugins/vue";

export default class {
  constructor({ url, version, env }) {
    this.url = url;
    this.version = version;
    this.env = env;
  }

  init() {
    try {
      Raven.config(this.url, {
        release: this.version,
        environment: this.env,
        ignoreUrls: [/^file:\/\//],
        shouldSendCallback(data) {
          let shouldSend = true;
          try {
            const exception = data.exception.values[0];
            shouldSend = exception.stacktrace.frames.length > 1;
          } catch (e) {
            shouldSend = false;
          }
          return shouldSend;
        },
        ignoreErrors: [
          "TuiaMedia is not defined",
          "Can't find variable: $UCBrowser",
          /MyAppGet.*AtPoint/,
          /UCArticleFinderJS/,
          "playBackgroundMusic is not defined",
          "value.hasOwnProperty is not a function",
          "Cannot read property",
          "Unexpected end of JSON input",
          "canvasList.forEach is not a function. (In 'canvasList.forEach', 'canvasList.forEach' is undefined)",
          /<anonymous>/,
          "is not an object (evaluating",
          /('indexOf' of undefined|this.position.indexOf)/, // element-ui notification bug
          "native code"
        ]
      })
        .addPlugin(RavenVue, Vue)
        .install();
    } catch (e) {
      Raven.captureException(e);
    }
  }

  report() {
    try {
      const dom = undefined;
      const rect = dom.getBoundingClientRect();
      return (
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        (rect.left < window.innerWidth && rect.right > 0)
      );
    } catch (e) {
      e.message = "---------- test sentry report ----------";
      Raven.captureException(e);
    }
  }
}
