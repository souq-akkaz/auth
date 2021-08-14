import R from "ramda";

const notNil = R.complement(R.isNil);

export default notNil;
