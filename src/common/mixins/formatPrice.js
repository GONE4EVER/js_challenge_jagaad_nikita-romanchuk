const formatPriceMixin = {
  filters: {
    formatPrice(v) {
      return Number(v).toFixed(2);
    },
  },
};

export default formatPriceMixin;
