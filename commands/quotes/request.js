const fs = require('fs');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('request')
        .setDescription('Request a book or an author')
        .addStringOption(option => 
            option.setName('author')
            .setDescription('Author to request')
            .setRequired(true))
        .addStringOption(option => 
            option.setName('book')
            .setDescription('Book to request')
            .setRequired(true)),
    
    async execute(interaction) {
        try {
            const author = interaction.options.getString('author');
            const book = interaction.options.getString('book');
            const userId = interaction.user.id;
            const username = interaction.user.username;

            // Read existing requests
            let requests = [];
            if (fs.existsSync('./requests.json')) {
                const data = fs.readFileSync('./requests.json', 'utf-8');
                requests = JSON.parse(data);
            }

            requests.push({ author, book, userId, username });

            // Write updated requests back to the file
            fs.writeFileSync('./requests.json', JSON.stringify(requests, null, 2));

            await interaction.reply(`Your request for the book "${book}" by "${author}" has been added.`);
        } catch (error) {
            console.error(error);
            await interaction.reply(`An error occurred while processing your request. Please try again later.`);
        }
    },
};
