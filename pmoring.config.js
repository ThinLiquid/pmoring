export default {
  match: 'host',
  value: location.host,

  list: [
    { host: 'thinliquid.github.io', username: 'github' },
    { host: 'thinliquid.dev', username: 'thinliquid' },
    { host: 'maxpixels.moe', username: 'maxpixels' }
  ],
  default: { host: `you're not in the webring`, username: '...' },

  /*
  * You can also use keys from the list object
  * Example: {list["username"]}, will give you
  * the value of the key "username" from the
  * list object
  */
  widget: `
    <div id="pmoring">
      <a href="https://{prev.host}">Prev ({prev.username})</a>
      <span>{item.host} ({item.username})</span>
      <a href="https://{next.host}">Next ({next.username})</a>
    </div>
  `
}