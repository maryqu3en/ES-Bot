const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Provides help information for the bot'),
    
    async execute(interaction) {
        const helpMessage = `
Here are the commands you can use:
- /quote: Replies with a random quote. You can specify an author or a book to get a quote from.
- /list: Lists all authors and books.
- /request: Request a book or an author. These requests are then considered by the developers.
- /help: Provides help information for the bot.
        `;
        await interaction.reply(helpMessage);
    },
};