import twilio from 'twilio'
import dotenv from 'dotenv'
dotenv.config();

const twilioCall = async (phonenumber) => {
  const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  try {
    const callId=await client.calls
      .create({
        url: 'https://demo.twilio.com/welcome/voice/',
        to: phonenumber,
        from: process.env.TWILIO_PHONE_NUMBER,
      });
      console.log(callId.sid)
    const status=await recursiveCheck(callId);
    return status;
  } catch (error) {
    console.error(error);
  }
};

const recursiveCheck=async (callId)=>{
  if(callId.status==="busy"||callId.status==="completed"){
    return callId.status;
  }
  const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  const checkedCall=await client.calls(callId.sid).fetch();
  return await recursiveCheck(checkedCall);
}
export { twilioCall };