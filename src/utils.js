function shuffle(orig) {
  let a = Array.from(orig);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function truncateTags(tags) {
  const _internal = (tags) => {
    if (tags.length < 2) {
      return tags;
    }
    const tail = tags;
    const head = tail.shift();
    
    let keep = [ head ];
    const i = tail.findIndex( e => e.indexOf(head) > -1);
    if ( i > -1 && head.length < tail[i].length) {
      keep = [ tail[i] ];
      tail.splice(i,1);
    }
    return keep.concat(_internal(tail));
  };
  return _internal(tags.sort()).sort();
}

module.exports = { shuffle, truncateTags };
