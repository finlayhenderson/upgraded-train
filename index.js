const Discord = require('discord.js')
const client = new Discord.Client();

const covid = require('novelcovid')
require('dotenv').config()

const TOKEN = process.env.TOKEN
const PREFIX = process.env.PREFIX

client.on('ready', () => console.log('Tracking COVID-19...'))

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
            .addField(`---`, ` `)
            .addField(`Cases Today`, covidStats.todayCases)
            .addField(`Deaths Today`, covidStats.todayDeaths)
            .addField(`Recovered Today`, covidStats.todayRecovered)
            //.setThumbnail(client.avatarURL())
            //.addFields(
                // {name: `Cases`, value: covidStats.cases, inline: false},
                // {name: `Cases Today`, value: covidStats.todayCases, inline: false},
                // {name: `Deaths`, value: covidStats.deaths, inline: false},
                // {name: `Deaths Today`, value: covidStats.todayDeaths, inline: false},
            .setFooter(`COVID-19 Tracker | V1.0.0`)
        )
    }

    if (message.content.startsWith(`${PREFIX}testembed`)) {
        return message.channel.send(new Discord.MessageEmbed() 
            .setTitle(`Embed Test`)
            .setColor("RED")
            .setFooter(`COVID-19 Tracker | V1.0.0`)
            .setTimestamp()
        )
    }
})

client.login(TOKEN)
