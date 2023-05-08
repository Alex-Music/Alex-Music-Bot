const User = require("../../schema/User.js")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
    name: "addbadge",
    category: "owner",
    aliases: ["addb"],
    description: "Reload Command",
    owneronly: true,
    execute: async (message, args, client, prefix) => {
          
       
    let ok = client.emoji.ok;
    let no = client.emoji.no;
    
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let data = await User.findOne({ userId: member.id });
    if (!data) data = await User.create({ userId: member.id });

     

    if(!args[1]){
        return message.reply(`Please Mention a badge name \n Available badges - \`owner\` , \`dev\`, \`premium\`, \`supporter\`, \`staff\` \`manager\`, \`bughunter\` , \`booster\`,\`partner\`,\`vip\` `)
    }
if(args[1] === "dev"){
data.badge.dev = true;
await data.save();

return message.reply(`${ok} Added developer badge to ${member.user.username}`)

} else if(args[1] === "owner"){

    data.badge.owner = true;
    await data.save();
    return message.reply(`${ok} Added Owner Badge to ${member.user.username}`)
}
else if(args[1] === "premium"){
    data.badge.premium = true;
    await data.save();
    return message.reply(`${ok} Added Premium Badge to ${member.user.username}`)
} 
else if(args[1] === "supporter"){
    data.badge.supporter = true;
    await data.save();
    return message.reply(`${ok} Added Supporter Badge to ${member.user.username}`)
}

else if(args[1] === "bughunter"){
    data.badge.bug = true;
    await data.save();
    return message.reply(`${ok} Added BugHunter Badge to ${member.user.username}`)
}

else if(args[1] === "staff"){
    data.badge.staff = true;
    await data.save();
    return message.reply(`${ok} Added Staff Badge to ${member.user.username}`)
}
else if(args[1] === "manager"){
    data.badge.manager = true;
    await data.save();
    return message.reply(`${ok} Added Manager Badge to ${member.user.username}`)
}
else if(args[1] === "booster"){
    data.badge.booster = true;
    await data.save();
    return message.reply(`${ok} Added Booster badge to ${member.user.username}`)
}
else if(args[1] === "partner"){
    data.badge.partner = true;
    await data.save();
    return message.reply(`${ok} Added Partner badge to ${member.user.username}`)
}
else if(args[1] === "vip"){
    data.badge.vip = true;
    await data.save();
    return message.reply(`${ok} Added Vip badge to ${member.user.username}`)
}
else{
return message.reply(`Invalid Usage`)
    
    }
    }
}