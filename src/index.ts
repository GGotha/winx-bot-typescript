import Discord from "discord.js";
import dotenv from "dotenv";
import fs from "fs";

import { Member, Client } from "~/common.d";

dotenv.config();

const client = new Discord.Client();
client.prefix = process.env.PREFIX;
client.commands = new Discord.Collection();

fs.readdir("./src/commands", (error, files) => {
  if (error) console.log(error);

  const jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("não encontrei comandos");
    return;
  }
  jsfile.forEach(async (f: string, i: number) => {
    const props = await import(`./commands/${f}`);
    console.log(`Carregou o comando ${f}`);
    client.commands.set(props.help.name, props);
  });
});

client.on("ready", () => {
  console.log(
    `Bot iniciado! \n\n Users: ${client.users.size}\n Servidores: ${client.guilds.size}`
  );
  client.user.setPresence({
    status: "online",
    game: {
      name: "WINX ep.1",
      type: "STREAMING",
      url: "https://www.twitch.tv/ggotha"
    }
  });
});

client.on("message", async (message: string) => {
  message.content.toLowerCase();
  if (message.author.bot) {
    return undefined;
  }

  const args = message.content
    .slice(process.env.PREFIX.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  const commandFile = client.commands.get(command);
  if (commandFile) commandFile.run(client, message, args);
});

let memberObject = "";

client.on("raw", (event: any) => {
  const roleLiderForCheckPermission = "307686764149997568";
  const eventNameT = event.t;
  const eventNameD = event.d;

  if (eventNameT === "MESSAGE_REACTION_ADD") {
    if (eventNameD.member.roles[0] === roleLiderForCheckPermission) {
      if (eventNameD.emoji.name === "winx") {
        memberObject.addRole("307686762250108929");
        console.log("add winx");
      }

      if (eventNameD.emoji.name === "friends") {
        memberObject.addRole("307887644518645761");
        console.log("add friends");
      }

      if (eventNameD.emoji.name === "varinha") {
        memberObject.addRole("558062306282438685");
        console.log("add comum");
      }
    }
  }

  if (eventNameT === "MESSAGE_REACTION_REMOVE") {
    if (eventNameD.user_id === "273305955314302976") {
      if (eventNameD.emoji.name === "winx") {
        memberObject.removeRole("307686762250108929");
        console.log("remove winx");
      }

      if (eventNameD.emoji.name === "friends") {
        memberObject.removeRole("307887644518645761");
        console.log("remove friends");
      }

      if (eventNameD.emoji.name === "varinha") {
        memberObject.removeRole("558062306282438685");
        console.log("remove comum");
      }
    }
  }
});

client.on("guildMemberAdd", (member: Member) => {
  memberObject = member;

  const thumbLogo = `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatarURL}.png`;
  const thumbLogoSplit = thumbLogo.split("https://")[2];

  async function sendEmbedWhenMemberJoinOnServer() {
    const welcomeEmbed = new Discord.RichEmbed()
      .setTitle("Entrou no servidor")
      .addBlankField()
      .setDescription(
        `${"O usuário " + "<@"}${member.user.id}>` + " entrou no servidor"
      )
      .setColor("#36393E")
      .setThumbnail(`https://${thumbLogoSplit}`)
      .setTimestamp();

    const getChannelByIdAndSendWelcomeMessage = await client.channels
      .get("609872424028078081")
      .send(welcomeEmbed);
    await getChannelByIdAndSendWelcomeMessage.react("658906811554070528");
    await getChannelByIdAndSendWelcomeMessage.react("659118341721554974");
    await getChannelByIdAndSendWelcomeMessage.react("658906493248208896");
  }

  sendEmbedWhenMemberJoinOnServer();

  if (member) {
    console.log("Mensagem de entrada enviada para o usuario");

    const welcomePrivateMessageForMember = new Discord.RichEmbed()
      .setTitle(
        `Bem-Vindo ao WINX Team! Eu sou o BOT principal do servidor, qualquer dúvida só chamar um adm\n\nPara me chamar, digite ${process.env.PREFIX}comandos, no canal BOTS`
      )
      .setColor("#36393E");

    member.send(welcomePrivateMessageForMember);
  } else {
    console.log("não foi enviada uma mensagem de erro para o usuário");
  }
});

client.login(process.env.TOKEN);
