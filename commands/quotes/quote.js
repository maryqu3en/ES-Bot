const fs = require('fs');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Replies with a random quote')
        .addStringOption(option => 
            option.setName('author')
            .setDescription('Author of the quote')
            .setRequired(false))
        .addStringOption(option => 
            option.setName('book')
            .setDescription('Book of the quote')
            .setRequired(false)),
    
    async execute(interaction) {
        try {
            const file = fs.readFileSync('./data.json', 'utf-8');
            const quotes = JSON.parse(file);

            const author = interaction.options.getString('author');
            const book = interaction.options.getString('book');

            let filteredQuotes = quotes;

            if (author) {
                filteredQuotes = filteredQuotes.filter(quote => quote.author.toLowerCase() === author.toLowerCase());
            }

            if (book) {
                filteredQuotes = filteredQuotes.filter(quote => quote.book.toLowerCase() === book.toLowerCase());
            }

            if (filteredQuotes.length == 0) {
                return await interaction.reply(`No quotes found for the given author/book.`);
            }

            const quote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];

            await interaction.reply(`${quote.quote} - ${quote.author}, ${quote.book}`);
        } catch (error) {
            console.error(error);
            await interaction.reply(`An error occurred while fetching quotes.`);
        }
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