export default {
  match: 'host',
  value: location.host,

  list: [
    { host: 'thinliquid.dev', username: 'thnlqd' },
  ],
  
  defaultWidget: `
    <div>
      <b>Join the webring!</b><br/>
      <span>Ask @thnlqd to add you to the list.</span>
    </div>
  `,

  widget: `
    <div>
      <b>{item.host} ({item.username})</b><br/>
      <a href="https://{prev.host}">&lt;-- ({prev.username})</a>
      <a href="https://{next.host}">({next.username}) --&gt;</a>
    </div>
    <span>
      Last listened on ListenBrainz:
      {(async () => {
        const { payload: data } = await (await fetch('https://api.listenbrainz.org/1/user/' + item.username + '/listens?count=1')).json()
        return "<a href='https://musicbrainz.org/recording/" + data.listens[0].track_metadata.mbid_mapping.recording_mbid + "'>" + data.listens[0].track_metadata.track_name + " - " + data.listens[0].track_metadata.artist_name + "</a>"
      })()}
    </span>
  `,

  style: `
    :webring {
      padding:10px;
      position:relative;
      font-family: Arial, sans-serif;

      &::after {
        content:"💢";
        position:absolute;
        z-index:10;
        top:-20px;
        left:-20px;
        font-size:35px;
        transform:rotate(21deg) scale(1.25);
      }

      &.brat {
        background:#8ACE00;
        font-family:Arial Narrow;
        color:black;

        & > * {
          filter:blur(0.5px)
        }
      }

      &.afterdark {
        background: #141414;
        color: #cbcbcd;

        a { color: #52eea3 }
      }
    }
  `
}