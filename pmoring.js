;(async (s) => {
  let config = (await import('https://thinliquid.github.io/pmoring/pmoring.config.js')).default,
    h = config.value,
    i = config.list.findIndex(v => v[config.match] === h);
    
  function extractAllContentBetweenBraces(str) {
    const contents = [];
    let current = '';
    let depth = 0;
  
    for (const char of str) {
      if (char === '{') {
        // When we see an opening brace,
        // if we're already inside a block, include it.
        if (depth > 0) {
          current += char;
        }
        depth++;
        // When entering a top-level block, reset the current content.
        if (depth === 1) {
          current = '';
        }
      } else if (char === '}') {
        depth--;
        // If we're closing a top-level block, push the accumulated content.
        if (depth === 0) {
          contents.push(current);
        } else {
          // Otherwise, if it's a nested block, include the closing brace.
          current += char;
        }
      } else {
        // Only accumulate characters if we're inside a block.
        if (depth > 0) {
          current += char;
        }
      }
    }
  
    return contents;
  }  

  async function asyncReplace(str, asyncFn) {
    const matches = extractAllContentBetweenBraces(str);
    console.log(matches)
    const replacements = await Promise.all(matches.map(m => asyncFn(m.trim())));
    for (let i = 0; i < matches.length; i++) {
      str = str.replace(`{${matches[i]}}`, replacements[i]);
    }
    return str;
  }

  let widgetHtml = config.defaultWidget;
  if (i > -1) {
    const ctx = {
      prev: config.list.at(i - 1),
      next: config.list.at(i + 1),
      index: i,
      random: config.list[Math.floor(Math.random() * config.list.length)],
      list: config.list,
      item: config.list[i]
    };

    async function evaluateExpression(expr) {
      const keys = Object.keys(ctx);
      const values = Object.values(ctx);
      try {
        const asyncFunc = new Function(...keys, `return (async () => { return ${expr} })();`);
        return await asyncFunc(...values);
      } catch (error) {
        console.error("Error evaluating expression:", expr, error);
        return "";
      }
    }

    widgetHtml = await asyncReplace(config.widget, evaluateExpression);
  }

  const widget = document.createElement('div');
  widget.id = 'pmoring';
  widget.dataset.pmoId = crypto.randomUUID();
  widget.innerHTML = widgetHtml;
  widget.classList.value = `${s?.classList.value}`
  s?.parentElement?.insertBefore(widget, s);

  const style = document.createElement('style');
  style.innerHTML = config.style.replace(/:webring/g, `*[data-pmo-id="${widget.dataset.pmoId}"]`);
  document.head.appendChild(style);

  s?.remove();
})(document.currentScript);