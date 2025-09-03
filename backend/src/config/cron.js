import cron from "cron";
import https from "https";

const job = new cron.CronJob("*/14 * * * *", () => {
  https
    .get(`${process.env.API_URL}/api/favourite`, (res) => {
      if (res.statusCode === 200) {
        console.log("get request successful");
      } else {
        console.log("get request failed");
      }
    })
    .on("error", (e) => {
      console.error(`Error occurred: ${e.message}`);
    });
});


export default job;