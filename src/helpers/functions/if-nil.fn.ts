import _ from 'lodash';

const ifNil = (val: any) => ({
  throwError: (error: any) => {
    if (_.isNil(val)) {
      throw error;
    }
  }
});

export default ifNil;
