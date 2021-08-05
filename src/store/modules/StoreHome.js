import * as types from "../constants/home.js";
// import homeApi from "@api/home.js";
import mockData from "./testdata";
import dayjs from "dayjs";
import utilsNumber from "@utils/number.js";
const mapKey = new Map([
  ["init", "open"],
  ["processing", "will"],
  ["finish", "closed"],
]);
const StoreHome = {
  namespaced: true,
  state: {
    status: "home-list",
    detailCardType: "", // 详情页卡片类型,
    detailCardId: null, // 具体卡片的id
    cardData: null,
  },
  mutations: {
    [types.STORE_HOME_CHANGE_STATUS](state, info) {
      const { cardType, status, cardId } = info;
      state.detailCardType = cardType;
      state.status = status;
      if (cardId) {
        state.detailCardId = cardId;
      }
    },
    [types.STORE_HOME_SET_DATA_LIST](state, payload) {
      state.cardData = payload;
    },
  },
  getters: {
    cardTypeColorInfo: () => (type) => {
      console.log("type", type);
      let obj = {};
      if (type === "open") {
        obj = {
          "list-bg-color": "#192A51",
          "common-color": "#2afefe",
          "label-text-color": "#23B0B4",
        };
      }
      if (type === "will") {
        obj = {
          "list-bg-color": "#303244",
          "common-color": "#bbff8a",
          "label-text-color": "#86B66B",
        };
      }
      if (type === "closed") {
        obj = {
          "list-bg-color": "#303352",
          "common-color": "#A6DFE6",
          "label-text-color": "#7DA2B3",
        };
      }
      obj[
        "list-item-wrap-bg"
      ] = require(`../../assets/card/${type}-card-item.png`);
      if (type !== "closed") {
        obj[
          "detail-input-wrap-bg"
        ] = require(`../../assets/home/${type}-input-border.png`);
      }

      obj[
        "detail-wrap-content-button"
      ] = require(`../../assets/home/${type}-button.png`);
      return obj;
    },
    detailCardInfo: (state) => (id) => {
      return state.cardData
        .filter((d) => d.cardType === state.detailCardType)[0]
        .cardInfoList.filter((dd) => dd.id === id)[0];
    },
  },
  actions: {
    getDataList({ commit }) {
      let results = [];
      const endStates = Object.keys(mockData.data);
      // 做个map，使得key对应，不然前端要该太多地方
      // init，processing，finish',
      for (let i = 0; i < endStates.length; i++) {
        const cardInfoList = mockData.data[endStates[i]].map((d) => {
          const {
            raiseTotal,
            rate,
            startTime,
            pledgeEndTime,
            lockEndTime,
            payTime,
            assignmentTime,
          } = d;
          // startTime: 1628160539076, //'项目开始时间', 质押开始时间
          // pledgeEndTime: 111111111111, //'质押结束时间', 锁仓开始时间
          // lockEndTime: 1628160539076, //'锁仓结束时间',
          // endTime: 1628160539076, // '项目结束时间',
          // payTime: 1628160539076, //'支付时间',
          // assignmentTime: 111111111111, // '代币分配时间',
          const capTotal = utilsNumber.bigNum(raiseTotal).div(rate).toNumber();
          return {
            ...d,
            cardType: mapKey.get(endStates[i]),
            capTotal,
            proTimeList: [
              {
                title: "质押开始时间",
                startDate: dayjs(startTime).format("YYYY MM/DD HH:mm:ss"),
                endDate: dayjs(pledgeEndTime).format("YYYY MM/DD HH:mm:ss"),
              },
              {
                title: "锁仓时间",
                startDate: dayjs(pledgeEndTime).format("YYYY MM/DD HH:mm:ss"),
                endDate: dayjs(lockEndTime).format("YYYY MM/DD HH:mm:ss"),
              },
              {
                title: "支付时间",
                date: dayjs(payTime).format("YYYY MM/DD HH:mm:ss"),
              },
              {
                title: "代币分配时间",
                date: dayjs(assignmentTime).format("YYYY MM/DD HH:mm:ss"),
              },
            ],
            // raiseInfoList: {
            //   raiseTotal,
            //   rate,

            // },
          };
        });
        let obj = {
          cardType: mapKey.get(endStates[i]),
          cardInfoList,
        };
        results.push(obj);
      }
      commit(types.STORE_HOME_SET_DATA_LIST, results);
      console.log("results", results);
    },

    // getTableList({ commit }) {
    //   fetchList().then((res) => {
    //     console.log("res", res);
    //   });
    // },
  },
};

export default StoreHome;
