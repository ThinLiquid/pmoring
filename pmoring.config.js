export default {
  match: 'host',
  value: location.host,

  list: [
    { host: 'thinliquid.github.io', username: 'github' },
    { host: 'thinliquid.dev', username: 'thinliquid' },
    { host: 'maxpixels.moe', username: 'maxpixels' }
  ],

  /*
  * {item} - Current item in the list
  * {prev} - Previous item in the list
  * {next} - Next item in the list
  * {index} - Current host index
  * 
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