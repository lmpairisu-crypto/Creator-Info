const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const http = require("http");

// ===============================
// CONFIGURATION
// ===============================

const TOKEN = process.env.DISCORD_TOKEN;

// Channel where the embed and video will be sent
const TARGET_CHANNEL_ID = process.env.TARGET_CHANNEL_ID;

// Roles
const ARTIST_ROLE_ID = "1538257357212094554";
const CONTENT_CREATOR_ROLE_ID = "1537899709686087781";

// Fan Art Studio
const FAN_ART_INVITE = "https://discord.gg/CfvXjMBH";

// Direct Discord VIDEO URL
const VIDEO_URL =
  "https://cdn.discordapp.com/attachments/1546827751758233610/1546836263884038254/video_260908_183628.mp4?ex=6aac6fc8&is=6aab1e48&hm=804557249cc4353e264e128a076ca41e0394926f4dac529f2c978bceae5b872a&";
// ===============================
// HEALTH SERVER FOR RENDER
// ===============================

const PORT = Number(process.env.PORT) || 10000;

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain"
  });

  if (req.url === "/health") {
    res.end("OK");
  } else {
    res.end("Gender Role Bot is online.");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🌐 Health server running on port ${PORT}`);
});

// ===============================
// CLIENT
// ===============================

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
});

// ===============================
// BOT READY
// ===============================

client.once("ready", async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  try {
    const channel = await client.channels
      .fetch(TARGET_CHANNEL_ID)
      .catch(() => null);

    if (!channel) {
      console.log("❌ Target channel not found.");
      return;
    }

    // ===============================
    // EMBED
    // ===============================

    const embed = new EmbedBuilder()
      .setColor("#D4AF37")
      .setTitle("🏆 HONOR OF KINGS CREATOR & ARTIST")
      .setDescription(
        `## 🎥 Honor of Kings Content Creator\n\n` +

`<@&${CONTENT_CREATOR_ROLE_ID}>\n` +
`**Want to become an Honor of Kings Content Creator?**\n\n` +

`Go to the 🎮『hokcreator・application』 upper part of this channel ` +
`<#1538957346729103480>\n\n` +

`Click the **site button at the bottom of that embed** ` +
`and complete your application.\n\n` +

`After completing the application:\n\n` +

`Go to the **bottom part of this channel** and click ` +
`**Claim Role** to claim your **Content Creator** role ` +
`in the Lampoon Server.\n\n`

        `## 🎨 Artist & Creator\n\n` +

        `<@&${ARTIST_ROLE_ID}> <@&${CONTENT_CREATOR_ROLE_ID}>\n\n` +

        `Are you an **Artist or Content Creator** looking for ` +
        `extra opportunities and tokens? ` +
        `Join **HONOR OF KINGS FAN ART STUDIO** and become ` +
        `part of the community!\n\n` +

        `### 🖌️ Artist (Non-AIGC-Creator)\n` +
        `<a:Avisala:1542448826265243660> Share your original Honor of Kings fan art\n` +
        `<a:Avisala:1542448826265243660> Showcase your artwork to the community\n` +
        `<a:Avisala:1542448826265243660> Participate in fan-art activities and projects\n` +
        `<a:Avisala:1542448826265243660> Connect and collaborate with other artists\n` +
        `<a:Avisala:1542448826265243660> Get opportunities for extra tokens\n\n` +

        `### 🎬 Content Creator (Video Creator)\n` +
        `<a:Avisala:1542448826265243660> Share your Honor of Kings videos and creative content\n` +
        `<a:Avisala:1542448826265243660> Showcase your content to the community\n` +
        `<a:Avisala:1542448826265243660> Connect with other creators and artists\n` +
        `<a:Avisala:1542448826265243660> Participate in creator activities and projects\n` +
        `<a:Avisala:1542448826265243660> Get opportunities for extra tokens\n\n` +

        `**🎮 Join HONOR OF KINGS FAN ART STUDIO**`
      )
      .setFooter({
        text: "Seated at Honor of Kings • LMP Creator Program"
      });

    // ===============================
    // BUTTON
    // ===============================

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Join Fan Art Studio")
        .setEmoji("🎨")
        .setStyle(ButtonStyle.Link)
        .setURL(FAN_ART_INVITE)
    );

    // ===============================
    // 1. SEND EMBED
    // ===============================

    await channel.send({
      content:
        `<@&${ARTIST_ROLE_ID}> <@&${CONTENT_CREATOR_ROLE_ID}>`,

      embeds: [embed],

      allowedMentions: {
        roles: [
          ARTIST_ROLE_ID,
          CONTENT_CREATOR_ROLE_ID
        ]
      }
    });

    console.log("✅ Creator & Artist embed sent!");
// ===============================
// 2. SEND VIDEO
// ===============================

await channel.send({
  files: [VIDEO_URL]
});

console.log("🎥 Video sent!");

    // ===============================
    // 3. SEND BUTTON UNDER VIDEO
    // ===============================

    await channel.send({
      components: [row]
    });

    console.log("🎨 Join Fan Art Studio button sent!");

  } catch (error) {
    console.error(
      "❌ Error while sending embed/video/button:",
      error
    );
  }
});

// ===============================
// DISCORD ERROR HANDLING
// ===============================

client.on("error", error => {
  console.error("❌ Discord Client Error:", error);
});

// ===============================
// LOGIN
// ===============================

if (!TOKEN) {
  console.error("❌ DISCORD_TOKEN is missing from Render.");
  process.exit(1);
}

if (!TARGET_CHANNEL_ID) {
  console.error("❌ TARGET_CHANNEL_ID is missing from Render.");
  process.exit(1);
}

client.login(TOKEN)
  .then(() => {
    console.log("🔐 Discord login successful.");
  })
  .catch(error => {
    console.error("❌ Discord login failed:", error);
    process.exit(1);
  });
