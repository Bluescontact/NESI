(function () {
  // GRAIN: forward-only auto-advance chain. 'landing' is deliberately excluded —
  // it is reachable ONLY through crossGate(), never through advance(). This is
  // the true-gate rule enforced in code, not just hidden by the UI.
  var GRAIN = ['intake', 'staging', 'break', 'gate'];

  // CYCLE 2 (diction): the region KEY 'landing' is untouched everywhere in this
  // file — GRAIN, crossGate()'s gate check, data-region/data-lane selectors —
  // only its DISPLAY name changed, in index.html and here. 'standing' is the
  // one considered rename this cycle: everywhere else (gate, hold, compost)
  // was already the right word and renaming it would be decoration, not diction.
  var DISPLAY_NAME = { landing: 'standing' };
  function displayName(region) { return DISPLAY_NAME[region] || region; }

  // LOUDNESS RULE: ordinary travel along the grain (advance, return-to-grain)
  // stays quiet — the plain arrow line only. A mark that actually changes an
  // object's standing (cross, uncross, hold, compost) speaks in full voice.
  // This is the surface's silence rule: most motion says nothing extra.
  var LOUD_VOICE = {
    cross: function (label) { return label + '  crosses  →  standing — held simultaneously now'; },
    uncross: function (label) { return label + '  uncrossed  ←  gate — back at the threshold'; },
    hold: function (label) { return label + '  held ◄ — off the grain, reversible'; },
    compost: function (label) { return label + '  composted ✕ — off the grain, reversible'; }
  };

  var objects = [];
  var selectedId = null;
  var nodeMap = new Map();

  function laneEl(region) {
    return document.querySelector('.lane[data-lane="' + region + '"]');
  }

  function findObj(id) {
    return objects.find(function (o) { return o.id === id; });
  }

  function makeMarkerEl(obj) {
    var el = document.createElement('div');
    el.className = 'marker';
    el.textContent = obj.label;
    el.dataset.id = obj.id;
    el.addEventListener('click', function () { selectObject(obj.id); });
    return el;
  }

  function addObject(id, label) {
    var obj = { id: id, label: label, region: 'intake', preRegion: null };
    objects.push(obj);
    var el = makeMarkerEl(obj);
    nodeMap.set(id, el);
    laneEl('intake').appendChild(el);
  }

  // FLIP-style move: record the marker's rect before reparenting, reparent it
  // (this is the only place an object's region field changes — position is
  // the sole carrier of state, nothing is ever relabeled), then animate from
  // the old visual position to the new one so the crossing reads as travel.
  function moveObject(id, newRegion, opts) {
    opts = opts || {};
    var obj = findObj(id);
    if (!obj) return;
    var el = nodeMap.get(id);
    var firstRect = el.getBoundingClientRect();
    if (opts.remember) obj.preRegion = obj.region;
    obj.region = newRegion;
    laneEl(newRegion).appendChild(el);
    var lastRect = el.getBoundingClientRect();
    var dx = firstRect.left - lastRect.left;
    var dy = firstRect.top - lastRect.top;
    el.style.transition = 'none';
    el.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
    requestAnimationFrame(function () {
      el.style.transition = 'transform 420ms ease';
      el.style.transform = 'translate(0,0)';
    });
    updateSelectedControls();
    setStatus(opts.voice || (obj.label + '  →  ' + displayName(newRegion)));
  }

  function selectObject(id) {
    selectedId = id;
    document.querySelectorAll('.marker').forEach(function (m) {
      m.classList.toggle('selected', m.dataset.id === id);
    });
    updateSelectedControls();
  }

  function advance(id) {
    var obj = findObj(id);
    if (!obj) return;
    var i = GRAIN.indexOf(obj.region);
    if (i === -1 || i === GRAIN.length - 1) return; // at gate, or off the grain: advance is a no-op
    moveObject(id, GRAIN[i + 1]);
  }

  function hold(id) {
    var obj = findObj(id);
    if (!obj || obj.region === 'landing' || obj.region === 'held-bay') return;
    moveObject(id, 'held-bay', { remember: true, voice: LOUD_VOICE.hold(obj.label) });
  }

  function compost(id) {
    var obj = findObj(id);
    if (!obj || obj.region === 'landing' || obj.region === 'compost') return;
    moveObject(id, 'compost', { remember: true, voice: LOUD_VOICE.compost(obj.label) });
  }

  function returnToGrain(id) {
    var obj = findObj(id);
    if (!obj) return;
    moveObject(id, obj.preRegion || 'staging');
  }

  // TRUE GATE: this is the only function that can set region = 'landing'.
  // It only fires from 'gate'. Nothing else in this file writes 'landing'.
  function crossGate(id) {
    var obj = findObj(id);
    if (!obj || obj.region !== 'gate') return;
    moveObject(id, 'landing', { voice: LOUD_VOICE.cross(obj.label) });
    recordDryRunMark(obj, 'cross');
  }

  function uncross(id) {
    var obj = findObj(id);
    if (!obj || obj.region !== 'landing') return;
    moveObject(id, 'gate', { voice: LOUD_VOICE.uncross(obj.label) });
    recordDryRunMark(obj, 'uncross');
  }

  function recordDryRunMark(obj, disposition) {
    var payload = { id: obj.id, label: obj.label, disposition: disposition, at: new Date().toISOString() };
    if (window.pywebview && window.pywebview.api && window.pywebview.api.record_dry_run_mark) {
      window.pywebview.api.record_dry_run_mark(payload);
    }
  }

  function updateSelectedControls() {
    var bar = document.getElementById('controlbar');
    bar.innerHTML = '';
    if (!selectedId) {
      var span = document.createElement('span');
      span.className = 'controlbar-empty';
      span.id = 'controlbar-empty';
      span.textContent = 'click a marker to select it';
      bar.appendChild(span);
      return;
    }
    var obj = findObj(selectedId);
    if (!obj) { selectedId = null; updateSelectedControls(); return; }

    var label = document.createElement('span');
    label.className = 'sel-label';
    label.textContent = obj.label + '  [' + displayName(obj.region) + ']';
    bar.appendChild(label);

    function btn(text, fn) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = text;
      b.addEventListener('click', fn);
      bar.appendChild(b);
    }

    if (obj.region === 'intake' || obj.region === 'staging' || obj.region === 'break') {
      btn('advance →', function () { advance(obj.id); });
      btn('hold ◄', function () { hold(obj.id); });
      btn('compost ✕', function () { compost(obj.id); });
    } else if (obj.region === 'gate') {
      btn('cross ✓', function () { crossGate(obj.id); });
      btn('hold ◄', function () { hold(obj.id); });
      btn('compost ✕', function () { compost(obj.id); });
    } else if (obj.region === 'landing') {
      btn('uncross ↺', function () { uncross(obj.id); });
    } else if (obj.region === 'held-bay' || obj.region === 'compost') {
      btn('back to grain →', function () { returnToGrain(obj.id); });
    }
  }

  function setStatus(t) {
    document.getElementById('footer-status').textContent = t;
  }

  var dropCounter = 0;
  function wireIntake() {
    var input = document.getElementById('drop-input');
    var btn = document.getElementById('drop-btn');
    function doDrop() {
      var val = (input.value || '').trim();
      if (!val) return;
      dropCounter++;
      addObject('drop-' + Date.now() + '-' + dropCounter, val);
      input.value = '';
      setStatus('dropped: ' + val);
    }
    btn.addEventListener('click', doDrop);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') doDrop(); });
  }

  // dev-preview fallback only — used when this file is opened directly in a
  // plain browser (no pywebview bridge). The real run always seeds from
  // mock_feed.json via window.pywebview.api.get_mock_feed().
  var FALLBACK_FEED = [
    { id: 'mock-01', label: 'a note on the inverter manual' },
    { id: 'mock-02', label: 'witnessing-gift instrument, draft' },
    { id: 'mock-03', label: 'floor for a stranger, unbroken' },
    { id: 'mock-04', label: 'probe: engine live?' }
  ];

  function seed(list) {
    list.forEach(function (o) { addObject(o.id, o.label); });
    setStatus(list.length + ' object(s) at intake — click one to select it');
  }

  document.addEventListener('DOMContentLoaded', function () {
    wireIntake();
    updateSelectedControls();
    var booted = false;
    function bootOnce() {
      if (booted) return;
      booted = true;
      if (window.pywebview && window.pywebview.api && window.pywebview.api.get_mock_feed) {
        window.pywebview.api.get_mock_feed().then(seed).catch(function () { seed(FALLBACK_FEED); });
      } else {
        setStatus('no pywebview bridge — inline fallback feed (dev preview mode)');
        seed(FALLBACK_FEED);
      }
    }
    window.addEventListener('pywebviewready', bootOnce);
    setTimeout(bootOnce, 600);
  });
})();
