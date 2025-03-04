# pmoring
> (wish it was written in ts :sob:)<br>
> all you really need is two files.

demo: https://thinliquid.github.io/pmoring/example.html.

## why do we need yet another webring script??
1. a lot of other webring scripts are bloated
2. webrings should be easy to customize
## how the f*** do i use pmoring
check out `example.html` and `pmoring.config.js` its that simple.
### built-in variables
- `item`: The current item in the list
- `prev`: The previous item in the list
- `next`: The next item in the list
- `index`: The current index of the item in the list
- `random`: A random item in the list
- `list`: The entire list
### using inline functions
This is just a basic example, which gets ListenBrainz data
```jsx
<span>
  Last listened on ListenBrainz:
  {(async () => {
    const { payload: data } = await (await fetch('https://api.listenbrainz.org/1/user/' + item.username + '/listens?count=1')).json()
    return "<a href='https://musicbrainz.org/recording/" + data.listens[0].track_metadata.mbid_mapping.recording_mbid + "'>" + data.listens[0].track_metadata.track_name + " - " + data.listens[0].track_metadata.artist_name + "</a>"
  })()}
</span>
```

> **Note:** `pmoring.js` and `pmoring.config.js` have to be in the same directory.