import Vue from "vue";
import Vuex from "vuex";
import UserApi from "~/api/userApi";
import ImageApi from "~/api/imageApi";
import homepage from "./homepage";
import bangumi from "./bangumi";
import video from "./video";
import users from "./users";
import image from "./image";
import post from "./post";
import flow from "./flow";
import comment from "./comment";
import search from "./search";
import admin from "./admin";
import score from "./score";
import editor from "./editor";
import world from "./flow";
import cartoonRole from "./cartoonRole";
import question from "./question";
import app from "./app";

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",
    state: () => ({
      user: null,
      login: false,
      pageData: null
    }),
    mutations: {
      SET_PAGE_DATA(state, data) {
        state.pageData = data;
      },
      SET_USER(state, user) {
        state.user = user;
        state.login = true;
      },
      SET_USER_INFO(state, data) {
        Object.keys(data).forEach(key => {
          state.user[key] = data[key];
        });
      },
      USE_COIN(state) {
        state.user.coin && state.user.coin--;
      },
      UPDATE_USER_INFO(state, { key, value }) {
        state.user[key] = value;
      },
      UPDATE_USER_EXP(state, score) {
        if (!state.user || !score) {
          return;
        }
        if (score > 0) {
          if (state.user.exp.have_exp + score >= state.user.next_level_exp) {
            const newLevel = state.user.exp.level + 1;
            state.user.exp.level = newLevel;
            state.user.exp.have_exp =
              state.user.exp.have_exp + score - state.user.next_level_exp;
            state.user.exp.next_level_exp = newLevel * newLevel + newLevel * 10;
          } else {
            state.user.exp.have_exp = state.user.exp.have_exp + score;
          }
        } else {
          if (state.user.exp.have_exp + score < 0) {
            const newLevel = state.user.exp.level - 1;
            const lastTotalExp = newLevel * newLevel + newLevel * 10;
            state.user.exp.have_exp =
              lastTotalExp + state.user.exp.have_exp + score;
            state.user.exp.next_level_exp = lastTotalExp;
          } else {
            state.user.exp.have_exp = state.user.exp.have_exp + score;
          }
        }
      }
    },
    actions: {
      async initApp({ commit }, { ctx }) {
        const api = new UserApi(ctx);
        const data = await api.getPageData({
          refer: "pc"
        });
        commit("SET_PAGE_DATA", data);
      },
      async initAuth({ commit }, { ctx, must, admin }) {
        const cookie = ctx.header.cookie;
        const throwError = code => {
          const error = new Error();
          error.code = code || 401;
          throw error;
        };
        if (cookie) {
          let token = "";
          cookie.split("; ").forEach(item => {
            const temp = item.split("=");
            if (temp[0] === "JWT-TOKEN") {
              token = temp[1];
            }
          });
          if (token) {
            const api = new UserApi(ctx);
            try {
              const user = await api.getLoginUser();
              if (user) {
                if (admin && !user.is_admin) {
                  return throwError(403);
                }
                commit("SET_USER", user);
              } else if (must) {
                return throwError();
              }
            } catch (e) {
              if (must) {
                return throwError(e.code);
              }
            }
          } else if (must) {
            return throwError();
          }
        } else if (must) {
          return throwError();
        }
      },
      async getUpToken({ state, commit }, ctx) {
        if (!state.user) {
          return;
        }
        if (state.user.uptoken.expiredAt <= parseInt(Date.now() / 1000, 10)) {
          const api = new ImageApi(ctx);
          const data = await api.getUpToken();
          commit("UPDATE_USER_INFO", {
            key: "uptoken",
            value: data
          });
        }
      },
      async getNotification({ state, commit }, ctx) {
        if (!state.user) {
          return;
        }
        const api = new UserApi(ctx);
        const data = await api.getNotificationCount();
        commit("UPDATE_USER_INFO", {
          key: "notification",
          value: data
        });
      }
    },
    getters: {},
    modules: {
      admin,
      homepage,
      bangumi,
      video,
      users,
      image,
      post,
      cartoonRole,
      flow,
      comment,
      search,
      score,
      editor,
      world,
      question,
      app
    }
  });
}
