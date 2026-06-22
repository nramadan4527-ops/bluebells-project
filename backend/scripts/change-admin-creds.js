#!/usr/bin/env node
require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/Admin");

const usage = `Usage:
  node change-admin-creds.js --username NEWUSERNAME --password NEWPASSWORD [--old USERNAME] [--email NEWEMAIL]

If --old is provided, the script will look for that admin username and update it. Otherwise it updates the first admin found or creates a new one if none exist.
`;

function parseArgs() {
  const args = process.argv.slice(2);
  const out = {};
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const val = args[i + 1] && !args[i + 1].startsWith("--") ? args[++i] : true;
      out[key] = val;
    }
  }
  return out;
}

(async () => {
  const args = parseArgs();

  const newUsername = args.username;
  const newPassword = args.password;
  const newEmail = args.email;
  const old = args.old;

  if (!newUsername || !newPassword) {
    console.error(usage);
    process.exit(1);
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Error: MONGODB_URI not set in environment. Set it in backend/.env or environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");

    let admin = null;

    if (old) {
      admin = await Admin.findOne({ username: old });
    } else {
      admin = await Admin.findOne();
    }

    if (!admin) {
      console.log("No admin found. Creating a new admin user.");
      admin = new Admin({ username: newUsername, email: newEmail || `${newUsername}@example.com`, password: newPassword });
      await admin.save();
      console.log(`Created admin '${admin.username}' (id: ${admin._id})`);
    } else {
      console.log(`Updating admin '${admin.username}' (id: ${admin._id})`);
      admin.username = newUsername;
      if (newEmail) admin.email = newEmail;
      admin.password = newPassword; // pre-save hook will hash
      await admin.save();
      console.log(`Updated admin to '${admin.username}'`);
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message || err);
    process.exit(1);
  }
})();
