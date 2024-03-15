const fs = require('fs');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Replies with a random quote'),
    
    async execute(interaction) {
        const file = fs.readFileSync('./data.json', 'utf-8');
        const quotes = JSON.parse(file);

        const quote = quotes[Math.floor(Math.random() * quotes.length)];

        await interaction.reply(`${quote.quote} - ${quote.author}, ${quote.book}`);
    },
};
// const fs = require('fs');
// const { SlashCommandBuilder, MessageEmbed } = require('discord.js');

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('quote')
//         .setDescription('Replies with a random quote'),
    
//     async execute(interaction) {
//         const file = fs.readFileSync('./data.json', 'utf-8');
//         const quotes = JSON.parse(file);

//         const quote = quotes[Math.floor(Math.random() * quotes.length)];

//         const embed = new MessageEmbed()
//             .setColor('#0099ff')
//             .setTitle('Random Quote')
//             .setDescription(`${quote.quote}`)
//             .setFooter(`- ${quote.author}, ${quote.book}`);

//         await interaction.reply({ embeds: [embed] });
//     },
// };