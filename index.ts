// SPDX-License-Identifier: AGPL-3.0-or-later
/*
    Copyright (C) 2022  JBMagination

    This program is free software: you can redistribute it and/or modify 
    it under the terms of the GNU Affero General Public License as published by 
    the Free Software Foundation, either version 3 of the License, or 
    (at your option) any later version.

    In addition, as a special exception, the copyright holders give RoboTop's 
    copyright holders permission to use the code of this program with no restrictions. 
    If you modify file(s) with this exception, you may extend this exception to your 
    version of the file(s), but you are not obligated to do so. If you do not wish 
    to do so, delete this exception statement from your version. If you delete this 
    exception statement from all source files in the program, then also delete it here.

    This program is distributed in the hope that it will be useful, 
    but WITHOUT ANY WARRANTY; without even the implied warranty of 
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the 
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License 
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import * as fs from 'node:fs';
import { Client, Intents, MessageEmbed, Permissions } from 'discord.js';
const { secrets, channelId, guildId, clientId } = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES], allowedMentions: { parse: ['users'], repliedUser: true } });
const strikes = require('./strikes.json');
client.once('ready', async () => {
	console.log('[BOT] Ready!');
    setTimeout(() => { 
        for (var key in JSON.parse(fs.readFileSync('./strikes.json', 'utf8'))) {
            if (JSON.parse(fs.readFileSync('./strikes.json', 'utf8'))[key] == 5) {
                client.guilds.cache.get(guildId)?.channels.cache.get(channelId)?.permissionOverwrites.create(key, { SEND_MESSAGES: false });
            }
        }
    }, 60000);
});

client.on('messageCreate', async message => {
    const args = message.content.slice(`<@!${clientId}>`.length).trim().split(/ +/);
	const command = args.shift()?.toLowerCase();
    if (message.channel.type == 'DM') return;
    if (message.author.bot && !message.webhookId) return;
    if (message.content.trim() == ('<@!736024048059941014>')) {
        let statisticsEmbed = new MessageEmbed()
        .setAuthor({"name": `${message.member?.displayName}'s statistics`, "iconURL": `${message.author.avatarURL}`})
    }
    else try {
            if (!(message.channel.id == channelId)) return;
            if (message.channel.id == channelId) {
                if (!JSON.parse(fs.readFileSync('./strikes.json', 'utf8'))[message.author.id]) {
                    let data = JSON.parse(fs.readFileSync('./strikes.json', 'utf8'))
                    data[message.author.id] = 0;
                    fs.writeFileSync('./strikes.json', JSON.stringify(data))
                }
            }
                message.react('✅');
                message.react('❌');
                await require('util').promisify(setTimeout)(86400000);
                await message.fetch();
                let checkPlurality;
                let votePlurality;
                let xPlurality;
                let strikePlurality;
                if (message.reactions.cache.get('✅')?.count == message.reactions.cache.get('❌')?.count) {
                    if ((message.reactions.cache.get('✅')?.count == (0 || 1)) && (message.reactions.cache.get('❌')?.count == (0 || 1))) {
                        message.reply('**This meme got no votes!** You\'ve been spared (for now...)');
                        return;
                    } else {
                        if ((message.reactions.cache.get('✅')?.count == 2)) {
                            votePlurality = "vote"
                        } else {
                            votePlurality = "votes"
                        }
                        // type errors galore past this point. PR's appreciated
                        message.reply(`**This meme was a tie, breaking even at ${message.reactions.cache.get('✅')?.count - 1} ${votePlurality} for each option.** You\'ve been spared (for now...)`);
                        return;
                    } 
                }
                if (message.reactions.cache.get('✅')?.count > message.reactions.cache.get('❌')?.count) {
                    if ((message.reactions.cache.get('✅')?.count == 2)) {
                        checkPlurality = "check"
                    } else {
                        checkPlurality = "checks"
                    }
                    if ((message.reactions.cache.get('❌')?.count == 2)) {
                        xPlurality = "X"
                    } else {
                        xPlurality = "X's"
                    }
                    message.reply(`**This meme got ${message.reactions.cache.get('✅')?.count - 1} ${checkPlurality} compared to ${message.reactions.cache.get('❌')?.count - 1} ${xPlurality}!** You've been spared (for now...)`);
                    return;
                }
                if (message.reactions.cache.get('✅')?.count < message.reactions.cache.get('❌')?.count) {
                    if (JSON.parse(fs.readFileSync('./strikes.json', 'utf8'))[message.author.id]+1 == 1) {
                        strikePlurality = "strike"
                    } else {
                        strikePlurality = "strikes"
                    }
                    if ((message.reactions.cache.get('✅')?.count == 2)) {
                        checkPlurality = "check"
                    } else {
                        checkPlurality = "checks"
                    }
                    if ((message.reactions.cache.get('❌')?.count == 2)) {
                        xPlurality = "X"
                    } else {
                        xPlurality = "X's"
                    }
                    message.reply(`**This meme got ${message.reactions.cache.get('❌')?.count - 1} ${xPlurality} compared to ${message.reactions.cache.get('✅')?.count-1} ${checkPlurality}...** You have ${JSON.parse(fs.readFileSync('./strikes.json', 'utf8'))[message.author.id]+1} ${strikePlurality}.`);
                    let data = JSON.parse(fs.readFileSync('./strikes.json', 'utf8'))
                    data[message.author.id] = data[message.author.id]+1;
                    fs.writeFileSync('./strikes.json', JSON.stringify(data))
                    return;
                }
            }
    catch (error) {
		console.error(error);
	}
});

client.login(secrets.token);