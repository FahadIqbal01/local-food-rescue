import cron from "node-cron";
import donationModels from "../donation/donation.models";

cron.schedule("* * * * *", async () => {
  try {
    console.log("CRON job running at: ", new Date().toDateString());

    const now = new Date();
    const donations = await donationModels.find({ status: "available" });
    for (const donation of donations) {
      const expiry = new Date(donation.expiryDate); // convert string → Date
      console.log(expiry, now);
      if (expiry < now) {
        donation.status = "expired";
        await donation.save();
      }
    }

    console.log(`Expired donations updated: ${donations.length}`);
  } catch (error) {
    console.error(`Error updating expired donations:`, error);
  }
});
