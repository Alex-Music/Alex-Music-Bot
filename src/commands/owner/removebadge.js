const User = require("../../schema/User.js")
const { MessageEmbed, MessageActionRow, MessageButton  } = require("discord.js");
module.exports = {
    name: "removebadge",
    category: "owner",
    aliases: ["remb"],
    description: "Reload Command",
    owneronly: true,
    execute: async (message, args, client, prefix) => {
          
        
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let data = await User.findOne({ userId: member.id });
    if (!data) data = await User.create({ userId: member.id });

     

    if(!args[1]){
        return message.reply(`Please Mention a badge name \n Available badges - \`owner\` , \`dev\`, \`premium\`, \`supporter\`, \`staff\` \`manager\`, \`bughunter\` , \`booster\`,\`supporter\` `)
    }
if(args[1] === "dev"){
data.badge.dev = false;
await data.save();

return message.reply(`${ok} Removed developer badge from ${member.user.username}`)

} else if(args[1] === "owner"){

    data.badge.owner = false;
    await data.save();
    return message.reply(`${ok} Removed Owner Badge from ${member.user.username}`)
}
else if(args[1] === "premium"){
    data.badge.premium = false;
    await data.save();
    return message.reply(`${ok} Removed Premium Badge from ${member.user.username}`)
} 
else if(args[1] === "supporter"){
    data.badge.supporter = false;
    await data.save();
    return message.reply(`${ok} Removed Supporter Badge from ${member.user.username}`)
}

else if(args[1] === "bughunter"){
    data.badge.bughunter = false;
    await data.save();
    return message.reply(`${ok} Removed BugHunter Badge from ${member.user.username}`)
}

else if(args[1] === "staff"){
    data.badge.staff = false;
    await data.save();
    return message.reply(`${ok} Removed Staff Badge from ${member.user.username}`)
}
else if(args[1] === "manager"){
    data.badge.manager = false;
    await data.save();
    return message.reply(`${ok} Removed Manager Badge from ${member.user.username}`)
}
else if(args[1] === "booster"){
    data.badge.booster = false;
    await data.save();
    return message.reply(`${ok} Removed Booster badge from ${member.user.username}`)
}
else if(args[1] === "partner"){
    data.badge.partner = false;
    await data.save();
    return message.reply(`${ok} Removed Partner badge from ${member.user.username}`)
}
else if(args[1] === "vip"){
    data.badge.vip= false;
    await data.save();
    return message.reply(`${ok} Removed Vip badge from ${member.user.username}`)
}
else{
return message.reply(`Invalid Usage`)
    
    }
    }
}