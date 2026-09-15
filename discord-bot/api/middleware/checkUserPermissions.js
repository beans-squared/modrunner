const { PermissionsBitField } = require('discord.js');

const middleware = async (request, response, next) => {
  if (!request.body.guildId || !request.body.userId || !request.body.authToken) {
    return response.status(401).json({
      error: 'A guild ID, user auth token and/or user ID was not provided with this request',
    });
  }

  const res = await fetch('https://discord.com/api/v10/oauth2/@me', { headers: { authorization: `Bearer ${request.body.authToken}` } });
  if (res.status != 200) {
    return response.status(401).json({
      error: 'Could not authenticate user using auth token.',
    });
  }

  const data = await res.json();

  if (data.user.id != request.body.userId) {
    return response.status(401).json({
      error: 'Provided user auth token does not match provided user ID.',
    });
  }

  const guild = request.app.locals.client.guilds.cache.get(request.body.guildId);
  if (!guild) return response.status(404).json({ error: 'Guild not found' });
  const member = await guild.members.fetch(request.body.userId);
  if (!member) return response.status(404).json({ error: 'Member not found' });

  if (!member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
    return response.status(401).json({
      error: 'You are not authorized to use this route',
    });
  }
  next();
};

module.exports = middleware;
