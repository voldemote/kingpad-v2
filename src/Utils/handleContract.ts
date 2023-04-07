import { toast } from "react-toastify";

export const handleContractFunction = (func: () => Promise<void>, setLoad: (value: React.SetStateAction<boolean>) => void) => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    const promise = new Promise(async function (resolve, reject) {
      try {
        setLoad(true);
        await func();
        resolve('');
      } catch (err) {
        reject(err);
      }
    });
    promise
      .then((result) => {
        console.log({ result });
        // toast.success("Congratulations, you have claimed your Kingpass");
        // toast.success('successMsg');
        setLoad(false);
      })
      .catch((err) => {
        console.log({ err });
        // toast.error(`you need to wait at least 24 hours to withdraw your $KING`, err);
        const revertData = err.reason || err.message;
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        toast.error(`Transaction failed: ${revertData}`);
        // errMsg !== "" ? toast.error(errMsg, err) :
        setLoad(false);
      });
  };