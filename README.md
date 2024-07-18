<article class="markdown-body entry-content container-lg" itemprop="text"><h1 tabindex="-1" dir="auto"><a id="user-content-alex-music-bot" class="anchor" aria-hidden="true" href="#alex-music-bot"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg></a>Alex-Music-Bot</h1>
<p dir="auto">😀 An advanced Discord.js Music Bot, which connects via Lavalink and erela.js! Including Slash-Commands and a Dj System!!</p>
📩 Support Server: <a href="https://discord.gg/etcuFnRqnx" rel="nofollow">Click Here</a><br>
🎵 Play and Listen to Alex Music Bot in the Support Server or <a href="https://discord.com/api/oauth2/authorize?client_id=898941398538158080&permissions=397619359056&scope=bot%20applications.commands" rel="nofollow">Click Here</a> to add it into your server.<br>  

<h2>Let me explain about the bot</h2>
<p>✅ The bot has unique interface which is easy to understand.</p>
<p>✅ The <code>help</code> command is designed in a way such that any discord user can access the commands easily</p>
<img alt="Help Command" src="https://user-images.githubusercontent.com/84668491/237001869-63d021f5-2557-4eb1-8c19-d8ed16cfd6c5.png" height="351" width="331">
<p>✅ There is a special <code>profile</code> command which shows some stats of the user and has access to add badges in <code>Achievements</code> category</p>
<img alt="Profile Command" src="https://user-images.githubusercontent.com/84668491/237003945-4ed836f4-9193-4c2e-aa95-c771f5b406fe.png" height="200" width="400">
<p>✅ There is a vote for premium feature and patreon premium too!</p>
<p>✅ There are many <code>filter</code> commands to heat up the music experience</p>
<p>✅ To maintain and manage the clusters, we use <code>discord-hybrid-sharding</code></p>
<p>✅ The <code>setprefix</code> command allows user to change the prefix for the bot according to their convinience</p>
<p>✅ To maintain premium and validity we have provided some <code>owner</code> comamnds</p>
<p>✅ A command named <code>partners</code> allows bot owners to showcase their bot partners which automatically provides permanent premium</p>
<p>✅ The bot has <code>24/7</code> feature so it stays in vc as long as the hosting runs</p>
<p>✅ For highlighting <code>premium</code> we made filters and some other commands as <code>premium-only-accessible</code></p>
<p>✅ Our <code>play</code> embed is one of the most attractive interface with button commands</p>
<img alt="Play Command" src="https://user-images.githubusercontent.com/84668491/237006929-277f7431-c8a3-4571-a82f-2cdfec3e7b84.png" height="150" width="350">

<h2>Bugs & Issues</h2>
<p>❌ Songs are playing inaccurate because of api errors</p>
<p>❌ Bot is unable to load playlists from spotify</p>


<h2 tabindex="-1" dir="auto"><a id="user-content-config--bot-startup" class="anchor" aria-hidden="true" href="#config--bot-startup"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg></a>Config &amp; Bot Startup</h2>
<p dir="auto">⚙️ Go to config.json</p>
<pre><code class="json">
{
  "token": "YOUR_BOT_TOKEN",  
  "mongourl": "MONGO_URL",
  "embedColor": "HEX_CODE",
  "prefix": "YOUR_BOT_PREFIX",
  "nodes": [
    {
      "host": "LAVALINK_IP",
      "port": 80,
      "password": "Lavalink password",
      "retryDelay": 10000,
      "secure": false
    }
  ]
}
</code></pre>

⚙️ Also dont forget to edit <code>src/commands/music/play.js</code> & <code>src/commands/owner/aup.js</code>

<pre><code>
const clientID = "Spotify_ClientId";
const secretKey = "Spotify_Secret";
</code></pre>

<pre><code>
const web = new WebhookClient({ url: 'your_webhook_link' }); 
</code></pre>

<p dir="auto">ℹ️ Secure Should be False if Your are using local lavalink. If Your node is using ssl keep it to true.</p>
<p dir="auto">🔑 To run the Bot just type <code>node .</code></p>
<blockquote>
<p dir="auto">To Run it using pm2 <code>pm2 start alex-music-bot.js</code></p>
</blockquote>
<h2 tabindex="-1" dir="auto"><a id="user-content-about--info" class="anchor" aria-hidden="true" href="#about--info"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg></a>About &amp; Info</h2>
<p dir="auto">📅 Creation Date: Monday, 08 May 2023<br>
🪪 Team: <a href="https://discord.com/users/703949805457637471" rel="nofollow">S A R K A R#2388</a>,<a href="https://discord.com/users/781882376790736937" rel="nofollow">SuDheeR ⚒#0335</a>,<a href="https://discord.com/users/651110672087908384" rel="nofollow">- KaRthiK#3858</a></p>

<h2 tabindex="-1" dir="auto"><a id="user-content-note--links" class="anchor" aria-hidden="true" href="#note--links"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg></a>Reference</h2>
<blockquote>
<p dir="auto">🗎 Erela Docs: <a href="https://erelajs-docs.netlify.app/guides/introduction.html" rel="nofollow">https://erelajs-docs.netlify.app/guides/introduction.html</a></p>
</blockquote>
</article>
