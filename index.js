"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("node:fs"));
const discord_js_1 = require("discord.js");
const { secrets, channelId, guildId, clientId } = require('./config.json');
const client = new discord_js_1.Client({ intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MEMBERS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES], allowedMentions: { parse: ['users'], repliedUser: true } });
const strikes = require('./strikes.json');
client.once('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('[BOT] Ready!');
    setTimeout(() => {
        var _a, _b;
        for (var key in JSON.parse(fs.readFileSync('./strikes.json', 'utf8'))) {
            if (JSON.parse(fs.readFileSync('./strikes.json', 'utf8'))[key] == 5) {
                (_b = (_a = client.guilds.cache.get(guildId)) === null || _a === void 0 ? void 0 : _a.channels.cache.get(channelId)) === null || _b === void 0 ? void 0 : _b.permissionOverwrites.create(key, { SEND_MESSAGES: false });
            }
        }
    }, 60000);
}));
client.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
    const args = message.content.slice(`<@!${clientId}>`.length).trim().split(/ +/);
    const command = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (message.channel.type == 'DM')
        return;
    if (message.author.bot && !message.webhookId)
        return;
    if (message.content.trim() == ('<@!736024048059941014>')) {
        let statisticsEmbed = new discord_js_1.MessageEmbed()
            .setAuthor({ "name": `${(_b = message.member) === null || _b === void 0 ? void 0 : _b.displayName}'s statistics`, "iconURL": `${message.author.avatarURL}` });
    }
    else
        try {
            if (!(message.channel.id == channelId))
                return;
            if (message.channel.id == channelId) {
                if (!JSON.parse(fs.readFileSync('./strikes.json', 'utf8'))[message.author.id]) {
                    let data = JSON.parse(fs.readFileSync('./strikes.json', 'utf8'));
                    data[message.author.id] = 0;
                    fs.writeFileSync('./strikes.json', JSON.stringify(data));
                }
            }
            message.react('✅');
            message.react('❌');
            yield require('util').promisify(setTimeout)(86400000);
            yield message.fetch();
            let checkPlurality;
            let votePlurality;
            let xPlurality;
            let strikePlurality;
            if (((_c = message.reactions.cache.get('✅')) === null || _c === void 0 ? void 0 : _c.count) == ((_d = message.reactions.cache.get('❌')) === null || _d === void 0 ? void 0 : _d.count)) {
                if ((((_e = message.reactions.cache.get('✅')) === null || _e === void 0 ? void 0 : _e.count) == (0 || 1)) && (((_f = message.reactions.cache.get('❌')) === null || _f === void 0 ? void 0 : _f.count) == (0 || 1))) {
                    message.reply('**This meme got no votes!** You\'ve been spared (for now...)');
                    return;
                }
                else {
                    if ((((_g = message.reactions.cache.get('✅')) === null || _g === void 0 ? void 0 : _g.count) == 2)) {
                        votePlurality = "vote";
                    }
                    else {
                        votePlurality = "votes";
                    }
                    // type errors galore past this point. PR's appreciated
                    message.reply(`**This meme was a tie, breaking even at ${((_h = message.reactions.cache.get('✅')) === null || _h === void 0 ? void 0 : _h.count) - 1} ${votePlurality} for each option.** You\'ve been spared (for now...)`);
                    return;
                }
            }
            if (((_j = message.reactions.cache.get('✅')) === null || _j === void 0 ? void 0 : _j.count) > ((_k = message.reactions.cache.get('❌')) === null || _k === void 0 ? void 0 : _k.count)) {
                if ((((_l = message.reactions.cache.get('✅')) === null || _l === void 0 ? void 0 : _l.count) == 2)) {
                    checkPlurality = "check";
                }
                else {
                    checkPlurality = "checks";
                }
                if ((((_m = message.reactions.cache.get('❌')) === null || _m === void 0 ? void 0 : _m.count) == 2)) {
                    xPlurality = "X";
                }
                else {
                    xPlurality = "X's";
                }
                message.reply(`**This meme got ${((_o = message.reactions.cache.get('✅')) === null || _o === void 0 ? void 0 : _o.count) - 1} ${checkPlurality} compared to ${((_p = message.reactions.cache.get('❌')) === null || _p === void 0 ? void 0 : _p.count) - 1} ${xPlurality}!** You've been spared (for now...)`);
                return;
            }
            if (((_q = message.reactions.cache.get('✅')) === null || _q === void 0 ? void 0 : _q.count) < ((_r = message.reactions.cache.get('❌')) === null || _r === void 0 ? void 0 : _r.count)) {
                if (JSON.parse(fs.readFileSync('./strikes.json', 'utf8'))[message.author.id] + 1 == 1) {
                    strikePlurality = "strike";
                }
                else {
                    strikePlurality = "strikes";
                }
                if ((((_s = message.reactions.cache.get('✅')) === null || _s === void 0 ? void 0 : _s.count) == 2)) {
                    checkPlurality = "check";
                }
                else {
                    checkPlurality = "checks";
                }
                if ((((_t = message.reactions.cache.get('❌')) === null || _t === void 0 ? void 0 : _t.count) == 2)) {
                    xPlurality = "X";
                }
                else {
                    xPlurality = "X's";
                }
                message.reply(`**This meme got ${((_u = message.reactions.cache.get('❌')) === null || _u === void 0 ? void 0 : _u.count) - 1} ${xPlurality} compared to ${((_v = message.reactions.cache.get('✅')) === null || _v === void 0 ? void 0 : _v.count) - 1} ${checkPlurality}...** You have ${JSON.parse(fs.readFileSync('./strikes.json', 'utf8'))[message.author.id] + 1} ${strikePlurality}.`);
                let data = JSON.parse(fs.readFileSync('./strikes.json', 'utf8'));
                data[message.author.id] = data[message.author.id] + 1;
                fs.writeFileSync('./strikes.json', JSON.stringify(data));
                return;
            }
        }
        catch (error) {
            console.error(error);
        }
}));
client.login(secrets.token);
