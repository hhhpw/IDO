<template>
  <div>
    <button @click="onStakeClick">stake</button>
    <button @click="onUnstakeClick">unstake</button>
    <button @click="payUSDT">payUSDT</button>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { Wallet } from "@contactLogic";
import contractsApi from "@api/contracts.js";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("StoreWallet", ["stcProvider", "stcAccounts", "stcChianID"]),
  },
  methods: {
    getParams() {
      return {
        provider: this.stcProvider,
        account: this.stcAccounts[0],
        chianID: this.stcChianID,
      };
    },
    async projectInfo() {
      let proInfo = await contractsApi.getContractsProjectInfo();
      console.log("------proInfo----", proInfo);
    },
    async onStakeClick() {
      const params = this.getParams();
      const res = await Wallet.stakeSTC({
        ...params,
        amount: 1,
      });
      console.log("stake result:", res);
    },
    async onUnstakeClick() {
      const params = this.getParams();
      const res = await Wallet.unstakeSTC({
        ...params,
        amount: 1,
      });
      console.log("unstake result:", res);
    },
    async payUSDT() {
      const params = this.getParams();
      const res = await Wallet.payUSDT({
        ...params,
        amount: 1,
      });
      console.log("payUSDT result:", res);
    },
  },
};
</script>
<style lang="scss" scoped>
button {
  margin: 20px;
  padding: 5px 10px;
}
</style>
