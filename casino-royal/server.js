// Casino Royal – kleiner Mehrspieler-Server ohne Abhängigkeiten (nur Node.js)
const http = require('http'), fs = require('fs'), path = require('path');
const PORT = process.env.PORT || 3000, rooms = new Map();
const clean = s => String(s || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 32);
const snap = r => JSON.stringify([...r.peers.entries()].map(([id, p]) => ({ id, presence: p.presence })));
function bcast(name) {
  const r = rooms.get(name); if (!r) return;
  const d = 'data: ' + snap(r) + '\n\n';
  for (const p of r.peers.values()) if (p.res) p.res.write(d);
}
http.createServer((req, res) => {
  const u = new URL(req.url, 'http://x');
  if (u.pathname === '/events') {
    const id = clean(u.searchParams.get('id')), rn = clean(u.searchParams.get('room')) || 'main';
    if (!id) { res.writeHead(400); return res.end(); }
    if (!rooms.has(rn)) rooms.set(rn, { peers: new Map() });
    const r = rooms.get(rn);
    if (r.peers.size >= 60 && !r.peers.has(id)) { res.writeHead(503); return res.end('Raum voll'); }
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive', 'X-Accel-Buffering': 'no' });
    res.write('retry: 2000\n\n');
    const p = r.peers.get(id) || { presence: {} }; p.res = res; r.peers.set(id, p); bcast(rn);
    const hb = setInterval(() => res.write(': hb\n\n'), 20000);
    req.on('close', () => { clearInterval(hb); if (p.res === res) { r.peers.delete(id); if (!r.peers.size) rooms.delete(rn); else bcast(rn); } });
    return;
  }
  if (u.pathname === '/presence' && req.method === 'POST') {
    let b = ''; req.on('data', d => { b += d; if (b.length > 16000) req.destroy(); });
    req.on('end', () => {
      try {
        const j = JSON.parse(b), id = clean(j.id), rn = clean(j.room) || 'main', r = rooms.get(rn), p = r && r.peers.get(id);
        if (!p) { res.writeHead(404); return res.end(); }
        Object.assign(p.presence, j.presence || {}); res.writeHead(204); res.end(); bcast(rn);
      } catch (e) { res.writeHead(400); res.end(); }
    });
    return;
  }
  if (u.pathname === '/' || u.pathname === '/index.html') {
    fs.readFile(path.join(__dirname, 'index.html'), (e, d) => {
      if (e) { res.writeHead(500); return res.end(); }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(d);
    });
    return;
  }
  res.writeHead(404); res.end();
}).listen(PORT, () => console.log('Casino Royal läuft auf Port ' + PORT));
