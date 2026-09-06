// Hum yahan in-memory storage use kar rahe hain taaki database table ke naam ka koi TS error na aaye
const otpStore = new Map<string, string>();

export const smsService = {
  async sendOtp(phone: string, purpose: string) {
    // 1. 6-digit ka random OTP generate karo
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 2. OTP ko memory mein save kar lo verify karne ke liye
    otpStore.set(phone, otp);

    // 3. Terminal mein bada bada print karo taaki dur se dikh jaye!
    console.log("\n=========================================");
    console.log(`🚀 NEXAWAVE MOCK SMS SENT!`);
    console.log(`📱 Phone  : ${phone}`);
    console.log(`🔑 OTP    : ${otp}`);
    console.log("=========================================\n");

    return true;
  },

  async verifyOtp(phone: string, enteredOtp: string) {
    // Testing ke liye master OTP (kuch kaam na aaye toh 123456 daal dena)
    if (enteredOtp === "123456") return true; 
    
    // Asli verification check
    const storedOtp = otpStore.get(phone);
    if (storedOtp === enteredOtp) {
        otpStore.delete(phone); // Ek baar use hone ke baad delete kar do
        return true;
    }
    return false;
  }
};