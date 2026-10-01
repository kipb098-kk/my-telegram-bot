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
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: process.env.ADMIN_CHAT_ID,
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
