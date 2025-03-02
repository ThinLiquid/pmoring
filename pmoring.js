(async (s) => {
  let $ = (await import('./pmoring.config.js')).default,
    h = $.value,
    i = $.list.findIndex(v => v[$.match] === h),
    ctx = { prev: $.list.at(i - 1), next: $.list.at(i + 1), index: i };

  ctx.item = i < 0 ? $.default : $.list[i];

  s?.parentElement?.insertAdjacentHTML('beforeend',$.widget.replace(/\{([\w\[\]'.]+)\}/g,(_,k)=>k.split(/\.|\[["']/).reduce((a,k)=>a[k],ctx))),
  s?.remove()
})(document.currentScript);
