const fs = require('fs');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('Lists all authors and books'),
    
    async execute(interaction) {
        const file = fs.readFileSync('./data.json', 'utf-8');
        const quotes = JSON.parse(file);

        const authors = [...new Set(quotes.map(quote => quote.author))];
        const books = [...new Set(quotes.map(quote => quote.book))];

        let response = 'Authors:\n' + authors.join('\n') + '\n\nBooks:\n' + books.join('\n');

        await interaction.reply(response);
    },
};