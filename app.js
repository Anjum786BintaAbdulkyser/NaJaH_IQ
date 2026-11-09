(function () {
  var SC = [
    { q: "Amina wants a car without an interest-based loan. The bank buys the car and sells it to her at a disclosed profit, paid monthly.", o: ["Murabaha", "Conventional loan", "Sukuk"], a: 0, e: "This is murabaha: a real sale of an asset at a disclosed mark-up." },
    { q: "A bakery owner needs capital. The bank invests and shares profit and loss in proportion to what each puts in.", o: ["Takaful", "Musharaka", "Riba"], a: 1, e: "Musharaka is a partnership: profit follows agreed ratios, loss follows capital contributed." },
    { q: "A saver gives money to the bank to invest. The bank, as expert manager, shares profit with the saver by a pre-agreed ratio.", o: ["Mudaraba", "Ijara", "Murabaha"], a: 0, e: "This is mudaraba. The saver provides capital, the bank provides management." },
    { q: "A family wants protection against vehicle loss through a shared fund based on mutual help, not a commercial insurance policy.", o: ["Sukuk", "Takaful", "Ijara"], a: 1, e: "Takaful members contribute to a pool that supports members who suffer covered losses." },
    { q: "A company funds a new road and pays investors from the income the road earns. Investors own a share of the asset.", o: ["Sukuk", "Musharaka", "Conventional bond"], a: 0, e: "Sukuk are asset-backed certificates, unlike a debt bond paying fixed interest." },
    { q: "A clinic needs costly equipment. The bank buys it and leases it to the clinic for monthly rent, staying the owner.", o: ["Murabaha", "Mudaraba", "Ijara"], a: 2, e: "This is ijara: a lease where the bank owns the asset and earns rent." }
  ];
 
  function store(k, v) {
    try {
      if (v === undefined) { var r = localStorage.getItem(k); return r ? JSON.parse(r) : null; }
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) { return null; }
  }
 
  function run(boxId, picker, onDone) {
    var box = document.getElementById(boxId);
    if (!box) return;
    var list = picker(), i = 0, score = 0;
 
    function el(tag, cls, text) {
      var n = document.createElement(tag);
      if (cls) n.className = cls;
      if (text) n.textContent = text;
      return n;
    }
 
    function step() {
      box.innerHTML = "";
      if (i >= list.length) { onDone(box, score, list.length, el, step, function () { i = 0; score = 0; step(); }); return; }
      var c = list[i];
      var bar = el("div", "g-bar"), fill = el("i");
      fill.style.width = (i / list.length * 100) + "%";
      bar.appendChild(fill);
      box.appendChild(bar);
      box.appendChild(el("p", "g-count", "Question " + (i + 1) + " of " + list.length));
      box.appendChild(el("p", "g-q", c.q));
      var fb = el("div", "g-fb");
      c.o.forEach(function (t, k) {
        var b = el("button", "g-opt", t);
        b.type = "button";
        b.onclick = function () {
          box.querySelectorAll(".g-opt").forEach(function (z, m) {
            z.disabled = true;
            if (m === c.a) z.classList.add("ok");
          });
          if (k === c.a) score++; else b.classList.add("bad");
          fb.appendChild(el("p", "", (k === c.a ? "Correct. " : "Not quite. ") + c.e));
          var n = el("button", "btn btn-primary btn-sm", i === list.length - 1 ? "See result" : "Next");
          n.type = "button";
          n.onclick = function () { i++; step(); };
          fb.appendChild(n);
        };
        box.appendChild(b);
      });
      box.appendChild(fb);
    }
    step();
  }
 
  // Bank Day simulation: all six customers
  run("bankGame", function () { return SC.slice(); }, function (box, s, n, el, _s, again) {
    var best = Math.max(store("najah_best") || 0, s);
    store("najah_best", best);
    box.appendChild(el("h4", "", "Day complete"));
    box.appendChild(el("p", "", "You matched " + s + " of " + n + " customers. Best score: " + best + "."));
    var b = el("button", "btn btn-ghost btn-sm", "Play again");
    b.type = "button"; b.onclick = again; box.appendChild(b);
  });
 
  // Daily quiz: two questions that change each day, with points and a streak
  var today = new Date().toISOString().slice(0, 10);
  var prog = store("najah_daily") || { last: "", streak: 0, points: 0 };
  function stats() {
    var s = document.getElementById("dailyStats");
    if (s) s.textContent = "Streak: " + prog.streak + " day(s)  |  Points: " + prog.points;
  }
  stats();
  run("dailyQuiz", function () {
    var d = Math.floor(Date.now() / 86400000) % SC.length;
    return [SC[d], SC[(d + 3) % SC.length]];
  }, function (box, s, n, el, _s, again) {
    if (prog.last !== today) {
      var y = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      prog.streak = prog.last === y ? prog.streak + 1 : 1;
      prog.points += s * 10;
      prog.last = today;
      store("najah_daily", prog);
    }
    stats();
    box.appendChild(el("h4", "", "Today's quiz done"));
    box.appendChild(el("p", "", "You scored " + s + " of " + n + ". Points are counted once per day. Come back tomorrow to keep your streak."));
  });
})();
