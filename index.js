const Discord = require('discord.js')
const client = new Discord.Client();

const covid = require('novelcovid')
require('dotenv').config()

const TOKEN = process.env.TOKEN
const PREFIX = process.env.PREFIX

client.on('ready', () => 
    console.log('Tracking COVID-19...'),
    client.user.setPresence({ game: { name: 'c?covid', type: "playing"}})
)

client.on('message', async message => {
    if (message.content.startsWith(`${PREFIX}covid`)) {
        const covidStats = await covid.all()

        console.log(`Cases: ${covidStats.cases}`)
        return message.channel.send(new Discord.MessageEmbed()
            .setTitle(`COVID-19 Stats`)
            .setColor("RED")
            .addField(`Cases`, covidStats.cases)
            .addField(`Deaths`, covidStats.deaths)
            .addField(`Recovered`, covidStats.recovered)
            .setFooter(`COVID-19 Tracker | V1.0.0`)
        )
    }

    if (message.content.startsWith(`${PREFIX}testembed`)) {
        
        console.log(`Sending Test Embed`)
        return message.channel.send(new Discord.MessageEmbed() 
            .setTitle(`Embed Test`)
            .setColor("RED")
            .setFooter(`COVID-19 Tracker | V1.0.0`)
            .setTimestamp()
        )
    }
})

client.login(TOKEN)
