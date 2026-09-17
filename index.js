const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

// ===============================
// CONFIGURATION
// ===============================

const TOKEN = process.env.DISCORD_TOKEN;

// Channel where the embed will be sent
const TARGET_CHANNEL_ID = process.env.TARGET_CHANNEL_ID;

// Roles
const ARTIST_ROLE_ID = "1538257357212094554";
const CONTENT_CREATOR_ROLE_ID = "1537899709686087781";

// Application channel
const APPLICATION_CHANNEL_ID = "1538957346729103480";

// Fan Art Studio
const FAN_ART_INVITE = "https://discord.gg/CfvXjMBH";

// Large image/GIF at the bottom of the embed
// Replace this with your direct GIF/image URL.
const BOTTOM_MEDIA_URL = process.env.BOTTOM_MEDIA_URL;

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
      `Want to become an **Honor of Kings Content Creator**?\n\n` +
      `Go to <#${APPLICATION_CHANNEL_ID}> and click **Claim Role** to claim your **Content Creator** role in the Lampoon Server.\n\n` +

      `## 🎨 Artist & Creator\n\n` +
      `<@&${ARTIST_ROLE_ID}> <@&${CONTENT_CREATOR_ROLE_ID}>\n\n` +
      `Are you an **Artist or Content Creator** looking for extra opportunities and tokens? ` +
      `Join **HONOR OF KINGS FAN ART STUDIO** and become part of the community!\n\n` +

      `### 🖌️ Artist (Non-AIGC-Creator)\n` +
      `• Share your original Honor of Kings fan art\n` +
      `• Showcase your artwork to the community\n` +
      `• Participate in fan-art activities and projects\n` +
      `• Connect and collaborate with other artists\n` +
      `• Get opportunities for extra tokens\n\n` +

      `### 🎬 Content Creator (Video Creator)\n` +
      `• Share your Honor of Kings videos and creative content\n` +
      `• Showcase your content to the community\n` +
      `• Connect with other creators and artists\n` +
      `• Participate in creator activities and projects\n` +
      `• Get opportunities for extra tokens\n\n` +

      `**🎮 Join HONOR OF KINGS FAN ART STUDIO**`
    )
    .setFooter({
      text: "Honor of Kings • Lampoon Creator Program"
    }

  // ===============================
  // LARGE MEDIA AT BOTTOM
  // ===============================

  if (
    BOTTOM_MEDIA_URL &&
    !BOTTOM_MEDIA_URL.startsWith("YOUR_")
  ) {
    embed.setImage(BOTTOM_MEDIA_URL);
  }

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
  // SEND
  // ===============================

  await channel.send({
    content:
      `<@&${ARTIST_ROLE_ID}> <@&${CONTENT_CREATOR_ROLE_ID}>`,
    embeds: [embed],
    components: [row],
    allowedMentions: {
      roles: [
        ARTIST_ROLE_ID,
        CONTENT_CREATOR_ROLE_ID
      ]
    }
  });

  console.log("✅ Creator & Artist embed sent!");
});

// ===============================
// LOGIN
// ===============================

client.login(TOKEN);
