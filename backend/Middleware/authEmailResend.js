const {Resend} = require("resend")

const resend = new Resend("re_8Bydh29F_4r3Q9kcyGVbF73gY6gjFs8qa");

const sendMailFunctionByResendAPI = async (to, subject, message) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "thakullabhaskar456@gmail.com",
      to,
      subject,
      html: message,
    });

    if (error) {
      console.log(error);
    } else {
      console.log("Email Send " + info.response);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendMailFunctionByResendAPI;
