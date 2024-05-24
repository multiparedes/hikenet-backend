var nodemailer = require("nodemailer");

const { patchUser } = require("./users");

const { User } = require("../models");

async function resetPassword(req, res) {
  const email = req.params.email;

  if (!email) {
    return res.status(400).json({ message: "Email not provided 📧❌" });
  }

  const rUser = await User.findOne({ where: { email } });

  const numericHash = rUser.password.replace(/\D/g, "");

  // Tomamos los primeros 6 dígitos del hash
  const sixDigitNumber = numericHash.substring(0, 6);

  if (!rUser) {
    return res
      .status(400)
      .json({ message: "This user don't have an account ❌" });
  }

  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.OWN_EMAIL,
        pass: process.env.PASSWORD_EMAIL,
      },
    });

    var mailOptions = {
      from: "HikeNet Support Team",
      to: email,
      subject: `Email recovery for ${rUser.username}`,
      html: `<div style="display: grid; gap: 1em; place-content: center">
      <h1 style="display: inline-flex; gap: 1em; align-items: center">
        Account recovery for ${rUser.username}
      </h1>
  
      <p>The OTP code is ${sixDigitNumber}</p>
  
      <p
        style="
          padding: 0.5em 1em;
          background-color: #708090;
          color: white;
          text-align: center;
        "
      >
        Hiknet Team
      </p>
    </div>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500);
      } else {
        console.log("Email sent: " + info.response);
        res.json(info.response);
      }
    });
  } catch (error) {
    console.error("Error reseting account:", error);
    res.status(400).json({ errors: error.message.split("\n") });
  }
}

async function checkOTP(req, res) {
  const email = req.params.email;
  const { otp } = req.body;

  console.log(req.body);

  if (!email) {
    return res.status(400).json({ message: "Email not provided 📧❌" });
  } else if (!otp) {
    return res.status(400).json({ message: "OTP not provided ❌" });
  }

  const rUser = await User.findOne({ where: { email } });

  console.log(rUser);

  const numericHash = rUser.password.replace(/\D/g, "");

  // Tomamos los primeros 6 dígitos del hash
  const sixDigitNumber = numericHash.substring(0, 6);

  if (sixDigitNumber === otp) {
    return res.json({ message: "Valid OTP code for " + User.username });
  } else {
    return res.status(400).json({ message: "Wrong OTP ❌" });
  }
}

async function updatePassword(req, res) {
  const email = req.params.email;
  const { otp, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email not provided 📧❌" });
  } else if (!otp) {
    return res.status(400).json({ message: "OTP not provided ❌" });
  } else if (!password) {
    return res.status(400).json({ message: "Password not provided ❌" });
  }

  const rUser = await User.findOne({ where: { email } });

  if (!rUser) {
    return res
      .status(400)
      .json({ message: "This user don't have an account ❌" });
  }

  const numericHash = rUser.password.replace(/\D/g, "");

  // Tomamos los primeros 6 dígitos del hash
  const sixDigitNumber = numericHash.substring(0, 6);

  if (otp !== sixDigitNumber) {
    return res.status(400).json({ message: "Wrong OTP ❌" });
  } else {
    return patchUser(req, res);
  }
}

module.exports = {
  resetPassword,
  checkOTP,
  updatePassword,
};
