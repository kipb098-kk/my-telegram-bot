exports.handler = async (event) => {
  try {
    const update = JSON.parse(event.body || "{}");
    const message = update.message;

    if (!message) {
      return {
        statusCode: 200,
        body: "OK"
      };
    }

    const text = message.text || "[Non-text message]";

    const name = [
      message.from?.first_name,
      message.from?.last_name
    ].filter(Boolean).join(" ") || "Unknown";

    const username = message.from?.username
      ? `@${message.from.username}`
      : "No username";

    const messageToYou =
      `📩 New Telegram Message\n\n` +
      `👤 Name: ${name}\n` +
      `🔹 Username: ${username}\n` +
      `🆔 User ID: ${message.from?.id || "Unknown"}\n\n` +
      `💬 Message:\n${text}`;

    await fetch(
      `https://api.telegram.org/bot${process.env.8763298250:AAHcOTAare9VHsBSIu_DQGnrX_AqG0KdD9E}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: process.env.8834189732,
          text: messageToYou
        })
      }
    );

    return {
      statusCode: 200,
      body: "OK"
    };

  } catch (error) {
    console.error(error);

    return {
      statusCode: 200,
      body: "OK"
    };
  }
};
