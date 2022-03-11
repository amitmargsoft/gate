const getSeqNumber = async () => {
  return new Promise(async (resolve) => {
    try {
      const seq_num = Date.now();
      resolve(seq_num);
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = {
  getCaseId: async () => {
    return new Promise(async (resolve) => {
      try {
        const seq_no = await getSeqNumber();
        console.log('case_id seq_no is ', seq_no);
        const rand = seq_no;
        resolve(rand);
      } catch (err) {
        resolve(null);
      }
    });
  },
};
