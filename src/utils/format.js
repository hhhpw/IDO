const format = {
  shortAddress: (address) => {
    return address ? `${address.slice(0, 6)}...${address.slice(-6)}` : "";
  },
};

export default format;
