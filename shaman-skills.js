/*! Shaman Skills v1.0 — compétences exactes et hors-ligne de l’assistant (aucune clé API).
 *  Calcul, pourcentages, TVA, marges, règle de trois, statistiques, conversions d’unités, euro↔FCFA,
 *  dates et jours fériés, âge, heure dans le monde, nombres en lettres, mini-dictionnaire FR↔EN,
 *  et moteur de recherche par synonymes pour retrouver la bonne réponse malgré des mots différents.
 *  Même logique que ShamanSkills.kt (Android). Chargé avant shaman-bot.js.
 */
(function (root) {
'use strict';

/* ---------- outils de texte ---------- */
function stripAcc(s) { return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
/* texte « calcul » : minuscules sans accents, garde chiffres, lettres et symboles utiles */
function nr(raw) {
  var s = stripAcc(String(raw).replace(/[\u00a0\u202f]/g, ' ').toLowerCase());
  s = s.replace(/[\u2019\u2018`\u00b4']/g, ' ').replace(/\u00d7/g, '*').replace(/\u00f7/g, '/').replace(/\u2212|\u2013|\u2014/g, '-');
  s = s.replace(/[^a-z0-9%+\-*\/^().,=\u20ac$ ]/g, ' ');
  s = s.replace(/(\d),(\d)/g, '$1.$2');
  return s.replace(/\s+/g, ' ').trim();
}
function nw(raw) { return nr(raw).replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim(); }
function collapse(s) { return s.replace(/(\d)[ ](?=\d{3}(?!\d))/g, '$1'); }
function numOf(x) { return parseFloat(String(x)); }
function fmt(v) {
  if (!isFinite(v)) return null;
  if (Math.abs(v) >= 1e15) return v.toExponential(4).replace('.', ',');
  var r = Math.round(v * 1e8) / 1e8, s = String(r);
  if (/e/.test(s)) s = r.toFixed(8).replace(/0+$/, '').replace(/\.$/, '');
  var p = s.split('.');
  p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return p.join(',');
}
function fmt2(v) { return fmt(Math.round(v * 100) / 100); }
function fmtSig(v) {
  if (!isFinite(v)) return null;
  if (v === 0) return '0';
  return fmt(parseFloat(v.toPrecision(7)));
}
function cap1(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
function plural(n, a, b) { return Math.abs(n) >= 2 ? b : a; }

/* ---------- nombres en lettres (français) ---------- */
var U = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
var TENS = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante'];
function below100(n, fin) {
  if (n < 20) return U[n];
  var t = Math.floor(n / 10), u = n % 10;
  if (t <= 6) return u === 0 ? TENS[t] : (u === 1 ? TENS[t] + ' et un' : TENS[t] + '-' + U[u]);
  if (t === 7) return u === 1 ? 'soixante et onze' : 'soixante-' + U[10 + u];
  if (t === 8) return u === 0 ? (fin ? 'quatre-vingts' : 'quatre-vingt') : 'quatre-vingt-' + U[u];
  return 'quatre-vingt-' + U[10 + u];
}
function below1000(n, fin) {
  var h = Math.floor(n / 100), r = n % 100, s = '';
  if (h > 0) { s = h === 1 ? 'cent' : U[h] + ' cent'; if (r === 0 && h > 1 && fin) s += 's'; }
  if (r > 0) s += (s ? ' ' : '') + below100(r, fin);
  return s;
}
function words(n) {
  if (n === 0) return 'zéro';
  var parts = [], b = Math.floor(n / 1e9), m = Math.floor((n % 1e9) / 1e6), k = Math.floor((n % 1e6) / 1e3), r = n % 1000;
  if (b) parts.push(below1000(b, true) + ' milliard' + (b > 1 ? 's' : ''));
  if (m) parts.push(below1000(m, true) + ' million' + (m > 1 ? 's' : ''));
  if (k) parts.push(k === 1 ? 'mille' : below1000(k, false) + ' mille');
  if (r) parts.push(below1000(r, true));
  return parts.join(' ');
}
function sNumWords(raw, n) {
  if (!/\ben (toutes )?lettres?\b|\bepelle|\becris le nombre\b/.test(n)) return null;
  var m = /(\d{1,3}(?: \d{3})+|\d+)/.exec(collapseAll(n));
  if (!m) return null;
  var v = numOf(m[1].replace(/ /g, ''));
  if (!(v >= 0) || v > 999999999999) return 'Je sais écrire les nombres jusqu’à 999 milliards.';
  var w = words(v), money = /\b(cfa|fcfa|franc|francs|xof)\b/.test(n);
  return cap1(w) + (money ? ' francs CFA' : '') + '.';
}
function collapseAll(s) { return s.replace(/(\d) (?=\d{3}(?!\d))/g, '$1'); }

/* ---------- calculatrice ---------- */
function evalExpr(s) {
  var i = 0;
  function ws() { while (s.charAt(i) === ' ') i++; }
  function num() { ws(); var m = /^\d+(\.\d+)?/.exec(s.slice(i)); if (!m) throw 'syn'; i += m[0].length; return numOf(m[0]); }
  function prim() {
    ws(); var c = s.charAt(i), v;
    if (c === '(') { i++; v = add().v; ws(); if (s.charAt(i) !== ')') throw 'syn'; i++; }
    else if (c === 'S') { i++; var a = prim(); if (a.v < 0) throw 'syn'; return { v: Math.sqrt(a.v) }; }
    else if (c === '-') { i++; var p = pow(); return { v: -p.v }; }
    else if (c === '+') { i++; return pow(); }
    else v = num();
    ws(); var pc = false;
    while (s.charAt(i) === '%') { i++; v = v / 100; pc = true; ws(); }
    return { v: v, pct: pc };
  }
  function pow() {
    var b = prim(); ws();
    if (s.charAt(i) === '^') { i++; var e = pow(); var r = Math.pow(b.v, e.v); if (!isFinite(r)) throw 'big'; return { v: r }; }
    return b;
  }
  function mul() {
    var a = pow();
    for (;;) {
      ws(); var c = s.charAt(i);
      if (c === '*' || c === '/') {
        i++; var b = pow();
        if (c === '*') a = { v: a.v * b.v }; else { if (b.v === 0) throw 'div0'; a = { v: a.v / b.v }; }
      } else break;
    }
    return a;
  }
  function add() {
    var a = mul();
    for (;;) {
      ws(); var c = s.charAt(i);
      if (c === '+' || c === '-') {
        i++; var b = mul();
        if (b.pct && !a.pct) b = { v: a.v * b.v };
        a = { v: c === '+' ? a.v + b.v : a.v - b.v };
      } else break;
    }
    return a;
  }
  var r = add(); ws();
  if (i < s.length) throw 'syn';
  return r.v;
}
function sCalc(raw, n) {
  var s = ' ' + nr(raw) + ' ';
  if (/\d+\s*[\/-]\s*\d+\s*[\/-]\s*\d+/.test(s)) return null;               /* une date, pas un calcul */
  var cue = /(combien (font|fait|ca fait|vaut|valent|donne)|calcul|resultat|c est quoi|quel est|quelle est|=|\?)/.test(s) || /\?/.test(raw);
  s = s.replace(/combien (font|fait|ca fait|vaut|valent|donne)|calcule[rz]?|calculer|resultat( de| du)?|c est quoi|quel est|quelle est|\bet\b(?=\s*\d)/g, ' ');
  s = s.replace(/\bmultipli\w*\s+(\d+(?:\.\d+)?)\s+par\b/g, '$1 *').replace(/\bdivis\w*\s+(\d+(?:\.\d+)?)\s+par\b/g, '$1 /');
  s = s.replace(/\bmultipli\w* par\b|\bfois\b/g, '*').replace(/\bdivis\w* par\b/g, '/').replace(/\bplus\b/g, '+').replace(/\bmoins\b/g, '-');
  s = s.replace(/(\d)\s*x\s*(?=[\d(])/g, '$1*');
  s = s.replace(/racine carree( de| d)?\s*(\d+(?:\.\d+)?)/g, 'S($2)');
  s = s.replace(/(\d+(?:\.\d+)?)\s*(?:au carre)/g, '($1^2)').replace(/(\d+(?:\.\d+)?)\s*(?:au cube)/g, '($1^3)');
  s = s.replace(/(\d+(?:\.\d+)?)\s*puissance\s*(\d+)/g, '($1^$2)');
  s = s.replace(/\bla moitie de (\d+(?:\.\d+)?)/g, '($1/2)').replace(/\ble double de (\d+(?:\.\d+)?)/g, '($1*2)').replace(/\ble triple de (\d+(?:\.\d+)?)/g, '($1*3)').replace(/\ble quart de (\d+(?:\.\d+)?)/g, '($1/4)');
  s = s.replace(/=/g, ' ').replace(/\s+/g, ' ');
  s = collapse(s).trim();
  var probe = s.replace(/S/g, '');
  if (!/^[\d\s+\-*\/^().%]+$/.test(probe)) return null;
  if (!/\d/.test(probe)) return null;
  var nums = (s.match(/\d+(?:\.\d+)?/g) || []).length;
  var hasOp = /[+*\/^%]|S/.test(s) || /\d\s*-\s*\d/.test(s);
  if (!hasOp || (nums < 2 && !/S|%/.test(s))) return null;
  if (!cue && !/[+*\/^%S]/.test(s)) return null;                             /* « 50000-70000 » = une fourchette */
  if (!cue && /\d\s+\d/.test(s)) return null;
  try {
    var v = evalExpr(s), f = fmt(v);
    if (f === null) return null;
    return 'Le résultat est ' + f + '.';
  } catch (e) {
    if (e === 'div0') return 'On ne peut pas diviser par zéro.';
    return null;
  }
}

/* ---------- pourcentages, TVA, marges, règle de trois, statistiques ---------- */
function nums(s) { return (collapseAll(s).match(/\d+(?:\.\d+)?/g) || []).map(numOf); }
function sPercent(raw, n) {
  var s = nr(raw), m, p, y;
  s = collapseAll(s);
  m = /(\d+(?:\.\d+)?)\s*(?:%|pour ?cent)\s*(?:de|d)\s*(\d+(?:\.\d+)?)/.exec(s);
  if (m) { p = numOf(m[1]); y = numOf(m[2]); return p + ' % de ' + fmt(y) + ' font ' + fmt(p * y / 100) + '.'; }
  var pm = /(\d+(?:\.\d+)?)\s*(?:%|pour ?cent)/.exec(s);
  var all = nums(s);
  if (pm && all.length === 2) {
    p = numOf(pm[1]);
    var base = all[0] === p && all[1] !== p ? all[1] : (all[1] === p ? all[0] : null);
    if (base === null) base = all[0] === p ? all[1] : all[0];
    if (/\b(augment\w*|hausse|majore\w*|majoration|ajout\w*)\b/.test(s)) {
      return 'Après une hausse de ' + fmt(p) + ' %, ' + fmt(base) + ' devient ' + fmt2(base * (1 + p / 100)) + ' (soit +' + fmt2(base * p / 100) + ').';
    }
    if (/\b(remise|reduction|rabais|solde|soldes|baisse|diminu\w*|reduire|promotion|promo)\b/.test(s)) {
      return 'Après une remise de ' + fmt(p) + ' %, ' + fmt(base) + ' devient ' + fmt2(base * (1 - p / 100)) + ' (soit -' + fmt2(base * p / 100) + ').';
    }
  }
  if (/\b(tva|ttc|taxe|taxes)\b/.test(s) || /\b\d+\s*(f|fcfa|cfa|francs?)?\s*ht\b/.test(s)) {
    var rate = 18, rm = /(\d+(?:\.\d+)?)\s*%/.exec(s);
    if (rm) rate = numOf(rm[1]);
    var amounts = all.filter(function (x) { return !(rm && x === numOf(rm[1])); });
    if (amounts.length) {
      var a = amounts[0], toHT = /\bttc\b/.test(s) && !/\b(en|vers) ttc\b/.test(s) && !/\b(ht en|calcule[rz]? (le )?ttc|ajoute\w* (la )?tva)\b/.test(s) && (/\d\s*(f|fcfa|cfa|francs?)?\s*ttc\b/.test(s) || /\bttc (en|vers|a) ht\b/.test(s));
      var def = rm ? '' : ' (TVA à 18 %, taux courant en Côte d’Ivoire)';
      if (toHT) { var ht = a / (1 + rate / 100); return a !== 0 ? fmt(a) + ' TTC correspondent à ' + fmt2(ht) + ' HT, dont ' + fmt2(a - ht) + ' de TVA' + def + '.' : null; }
      return fmt(a) + ' HT font ' + fmt2(a * (1 + rate / 100)) + ' TTC, dont ' + fmt2(a * rate / 100) + ' de TVA' + def + '.';
    }
  }
  if (/\b(pourcentage|en %|quel pourcent)/.test(s) && all.length === 2 && all[1] !== 0) {
    return fmt(all[0]) + ' sur ' + fmt(all[1]) + ' représente ' + fmt2(all[0] / all[1] * 100) + ' %.';
  }
  if (/\bachat\b/.test(s) && /\bvente\b/.test(s) && all.length === 2) {
    var ach = all[0], ven = all[1];
    if (/\bvente\b.*\d.*\bachat\b/.test(s) && !/\bachat\b.*\d.*\bvente\b/.test(s)) { ach = all[1]; ven = all[0]; }
    var mg = ven - ach;
    return (mg >= 0 ? 'Bénéfice : ' : 'Perte : ') + fmt(Math.abs(mg)) + '. Marge sur le prix d’achat : ' + (ach ? fmt2(mg / ach * 100) : '0') + ' %. Part dans le prix de vente : ' + (ven ? fmt2(mg / ven * 100) : '0') + ' %.';
  }
  return null;
}
function sRule3(raw, n) {
  if (!/\bsi\b/.test(n) || !/\bcombien\b/.test(n)) return null;
  var a = nums(nr(raw));
  if (a.length !== 3 || a[0] === 0) return null;
  return 'Par proportionnalité, le résultat est ' + fmt(a[2] * a[1] / a[0]) + '.';
}
function sStats(raw, n) {
  var kind = null, m;
  if ((m = /\b(moyenne|somme|total|additionne\w*|addition|plus grand|plus petit|maximum|minimum|mediane)\b/.exec(n))) kind = m[1]; else return null;
  var a = (nr(raw).match(/\d+(?:\.\d+)?/g) || []).map(numOf);
  if (a.length < 2 || a.length > 60) return null;
  var sum = a.reduce(function (x, y) { return x + y; }, 0), srt = a.slice().sort(function (x, y) { return x - y; });
  var list = a.map(fmt).join(', ');
  if (kind === 'moyenne') return 'La moyenne de ' + list + ' est ' + fmt(sum / a.length) + ' (somme ' + fmt(sum) + ' pour ' + a.length + ' valeurs).';
  if (kind === 'plus grand' || kind === 'maximum') return 'Le plus grand est ' + fmt(srt[srt.length - 1]) + '.';
  if (kind === 'plus petit' || kind === 'minimum') return 'Le plus petit est ' + fmt(srt[0]) + '.';
  if (kind === 'mediane') { var h = srt.length >> 1; return 'La médiane est ' + fmt(srt.length % 2 ? srt[h] : (srt[h - 1] + srt[h]) / 2) + '.'; }
  return 'La somme de ' + list + ' est ' + fmt(sum) + '.';
}

/* ---------- euro ↔ FCFA ---------- */
var PEG = 655.957;
function sCurrency(raw, n) {
  var s = nr(raw) + (raw.indexOf('\u20ac') >= 0 ? ' euro' : '');
  s = collapseAll(s);
  var nm = /(\d+(?:\.\d+)?)/.exec(s);
  if (!nm) return null;
  var hasEur = /\b(euros?|eur)\b|\u20ac/.test(s) || raw.indexOf('\u20ac') >= 0, hasCfa = /\b(fcfa|cfa|xof|xaf|francs?)\b/.test(s);
  var other = /\b(dollars?|usd|livres? sterling|gbp|naira|cedis?|yuans?|dirhams?|yens?|roupies?)\b/.exec(s);
  if (other && (hasCfa || hasEur) && /\b(en|vers|convert\w*|change\w*|valent|vaut|combien)\b/.test(s)) {
    return 'Le cours du ' + other[1].replace(/s$/, '') + ' change chaque jour et je n’ai pas accès au taux en direct. Seul l’euro a un taux fixe : 1 € = 655,957 FCFA.';
  }
  if (!(hasEur && hasCfa)) return null;
  var v = numOf(nm[1]), pos = nm.index + nm[0].length, rest = s.slice(pos, pos + 18);
  var srcEur = /^\s*(euros?|eur|\u20ac)/.test(rest) ? true : (/^\s*(fcfa|cfa|xof|xaf|francs?)/.test(rest) ? false : null);
  if (srcEur === null) { var ie = s.search(/\b(euros?|eur)\b|\u20ac/), ic = s.search(/\b(fcfa|cfa|xof|xaf|francs?)\b/); srcEur = ie < ic; }
  if (srcEur) return fmt(v) + ' ' + plural(v, 'euro', 'euros') + ' = ' + fmt(Math.round(v * PEG)) + ' FCFA (taux fixe : 1 € = 655,957 FCFA).';
  return fmt(v) + ' FCFA = ' + fmt(Math.round(v / PEG * 100) / 100) + ' € (taux fixe : 1 € = 655,957 FCFA).';
}

/* ---------- unités ---------- */
var UN = {};
function defU(cat, f, names, sg, pl) { names.forEach(function (x) { UN[x] = { cat: cat, f: f, sg: sg, pl: pl || sg }; }); }
defU('L', 1, ['m', 'metre', 'metres'], 'mètre', 'mètres');
defU('L', 1000, ['km', 'kilometre', 'kilometres'], 'kilomètre', 'kilomètres');
defU('L', 0.01, ['cm', 'centimetre', 'centimetres'], 'centimètre', 'centimètres');
defU('L', 0.001, ['mm', 'millimetre', 'millimetres'], 'millimètre', 'millimètres');
defU('L', 1609.344, ['mile', 'miles'], 'mile', 'miles');
defU('L', 0.3048, ['pied', 'pieds', 'ft', 'foot', 'feet'], 'pied', 'pieds');
defU('L', 0.0254, ['pouce', 'pouces', 'inch', 'inches'], 'pouce', 'pouces');
defU('L', 0.9144, ['yard', 'yards', 'yd'], 'yard', 'yards');
defU('M', 1, ['kg', 'kilo', 'kilos', 'kilogramme', 'kilogrammes'], 'kilogramme', 'kilogrammes');
defU('M', 0.001, ['g', 'gramme', 'grammes'], 'gramme', 'grammes');
defU('M', 0.000001, ['mg', 'milligramme', 'milligrammes'], 'milligramme', 'milligrammes');
defU('M', 1000, ['tonne', 'tonnes'], 'tonne', 'tonnes');
defU('M', 100, ['quintal', 'quintaux'], 'quintal', 'quintaux');
defU('M', 0.45359237, ['livre', 'livres', 'lb', 'lbs'], 'livre', 'livres');
defU('M', 0.028349523, ['once', 'onces', 'oz'], 'once', 'onces');
defU('V', 1, ['l', 'litre', 'litres'], 'litre', 'litres');
defU('V', 0.001, ['ml', 'millilitre', 'millilitres'], 'millilitre', 'millilitres');
defU('V', 0.01, ['cl', 'centilitre', 'centilitres'], 'centilitre', 'centilitres');
defU('V', 0.1, ['dl', 'decilitre', 'decilitres'], 'décilitre', 'décilitres');
defU('V', 1000, ['m3', 'metre cube', 'metres cubes'], 'mètre cube', 'mètres cubes');
defU('V', 3.785411784, ['gallon', 'gallons'], 'gallon', 'gallons');
defU('A', 1, ['m2', 'metre carre', 'metres carres'], 'mètre carré', 'mètres carrés');
defU('A', 1000000, ['km2', 'kilometre carre', 'kilometres carres'], 'kilomètre carré', 'kilomètres carrés');
defU('A', 10000, ['ha', 'hectare', 'hectares'], 'hectare', 'hectares');
defU('A', 4046.8564224, ['acre', 'acres'], 'acre', 'acres');
defU('S', 1 / 3.6, ['kmh', 'km h'], 'km/h', 'km/h');
defU('S', 1, ['ms', 'm s'], 'm/s', 'm/s');
defU('S', 0.44704, ['mph'], 'mph', 'mph');
defU('S', 0.514444, ['noeud', 'noeuds'], 'nœud', 'nœuds');
defU('T', 1, ['seconde', 'secondes', 's', 'sec'], 'seconde', 'secondes');
defU('T', 60, ['minute', 'minutes', 'min'], 'minute', 'minutes');
defU('T', 3600, ['heure', 'heures', 'h'], 'heure', 'heures');
defU('T', 86400, ['jour', 'jours', 'j'], 'jour', 'jours');
defU('T', 604800, ['semaine', 'semaines'], 'semaine', 'semaines');
defU('T', 31536000, ['an', 'ans', 'annee', 'annees'], 'an', 'ans');
var TEMP = { celsius: ['degré Celsius', 'degrés Celsius'], fahrenheit: ['degré Fahrenheit', 'degrés Fahrenheit'], kelvin: ['kelvin', 'kelvins'] };
function tempAlias(w) {
  if (/^(celsius|c|centigrade|degres? ?c|degres? celsius)$/.test(w)) return 'celsius';
  if (/^(fahrenheit|f|degres? ?f|degres? fahrenheit)$/.test(w)) return 'fahrenheit';
  if (/^(kelvin|k)$/.test(w)) return 'kelvin';
  return null;
}
function sUnits(raw, n) {
  var r = String(raw).replace(/\u00b0\s*c\b/gi, ' celsius ').replace(/\u00b0\s*f\b/gi, ' fahrenheit ').replace(/\u00b0\s*k\b/gi, ' kelvin ');
  r = r.replace(/km\s*\/\s*h/gi, ' kmh ').replace(/m\s*\/\s*s\b/gi, ' ms ').replace(/m\u00b2/gi, ' m2 ').replace(/km\u00b2/gi, ' km2 ').replace(/m\u00b3/gi, ' m3 ');
  var s = collapseAll(nr(r).replace(/-(?=\d)/, ' -'));
  var m = /(-?\d+(?:\.\d+)?)\s*(degres? (?:celsius|fahrenheit|c|f)|[a-z][a-z0-9]*(?: (?:carre|carres|cube|cubes))?)\s*(?:en|vers|to|dans|=|->)\s*(?:des |de |du |d )?([a-z][a-z0-9]*(?: (?:carre|carres|cube|cubes))?)/.exec(s);
  if (!m) return null;
  var v = numOf(m[1]), a = m[2].trim(), b = m[3].trim();
  var ta = tempAlias(a), tb = tempAlias(b);
  if (ta && tb && ta !== tb) {
    var c = ta === 'celsius' ? v : (ta === 'fahrenheit' ? (v - 32) * 5 / 9 : v - 273.15), o = tb === 'celsius' ? c : (tb === 'fahrenheit' ? c * 9 / 5 + 32 : c + 273.15);
    return fmt(v) + ' ' + TEMP[ta][Math.abs(v) >= 2 ? 1 : 0] + ' = ' + fmtSig(o) + ' ' + TEMP[tb][Math.abs(o) >= 2 ? 1 : 0] + '.';
  }
  if (ta || tb) {
    if (!(ta && /^(celsius|fahrenheit)$/.test(b))) return null;
  }
  var ua = UN[a], ub = UN[b];
  if (!ua || !ub) return null;
  if (ua.cat !== ub.cat) return 'Ces deux unités ne se comparent pas : je ne peux pas les convertir l’une en l’autre.';
  var res = v * ua.f / ub.f;
  return fmt(v) + ' ' + (Math.abs(v) >= 2 ? ua.pl : ua.sg) + ' = ' + fmtSig(res) + ' ' + (Math.abs(res) >= 2 ? ub.pl : ub.sg) + '.';
}

/* ---------- dates ---------- */
var MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
var MKEY = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'];
var WDAYS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
var DAY = 86400000;
function utc(y, m, d) { return Date.UTC(y, m, d); }
function todayOf(now) { return utc(now.getFullYear(), now.getMonth(), now.getDate()); }
function easter(y) {
  var a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
  var h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, mm = Math.floor((a + 11 * h + 22 * l) / 451);
  var mo = Math.floor((h + l - 7 * mm + 114) / 31), da = ((h + l - 7 * mm + 114) % 31) + 1;
  return utc(y, mo - 1, da);
}
function fdate(t) { var d = new Date(t); return WDAYS[d.getUTCDay()] + ' ' + d.getUTCDate() + (d.getUTCDate() === 1 ? 'er' : '') + ' ' + MONTHS[d.getUTCMonth()] + ' ' + d.getUTCFullYear(); }
var EVENTS = [
  [/\bnoel\b/, 'Noël', 12, 25], [/\b(nouvel an|jour de l an|saint sylvestre)\b/, 'le Nouvel An', 1, 1], [/\bsaint valentin\b/, 'la Saint-Valentin', 2, 14],
  [/\b(fete du travail|premier mai|1er mai)\b/, 'la fête du Travail', 5, 1], [/\bassomption\b/, 'l’Assomption', 8, 15], [/\btoussaint\b/, 'la Toussaint', 11, 1],
  [/\bindependance\b/, 'la fête de l’Indépendance de la Côte d’Ivoire', 8, 7], [/\bfete de la musique\b/, 'la fête de la musique', 6, 21], [/\bhalloween\b/, 'Halloween', 10, 31],
  [/\barmistice\b/, 'l’Armistice', 11, 11], [/\bpaques\b/, 'Pâques', 0, 0]
];
function nextOcc(ev, today) {
  var y = new Date(today).getUTCFullYear(), t;
  for (var k = 0; k < 2; k++) { t = ev[2] === 0 ? easter(y + k) : utc(y + k, ev[2] - 1, ev[3]); if (t >= today) return t; }
  return t;
}
function validDate(y, m, d) { var t = new Date(utc(y, m - 1, d)); return t.getUTCFullYear() === y && t.getUTCMonth() === m - 1 && t.getUTCDate() === d; }
function findDates(s, today) {
  var out = [], m, re, ty = new Date(today).getUTCFullYear();
  re = /\b(\d{1,2})\s*(?:er)?\s*(janvier|fevrier|mars|avril|mai|juin|juillet|aout|septembre|octobre|novembre|decembre)(?:\s+(\d{4}))?/g;
  while ((m = re.exec(s))) {
    var mo = MKEY.indexOf(m[2]) + 1, d = +m[1], y = m[3] ? +m[3] : ty;
    if (validDate(y, mo, d)) out.push({ i: m.index, t: utc(y, mo - 1, d), ex: !!m[3], lab: null });
  }
  re = /\b(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4}|\d{2})\b/g;
  while ((m = re.exec(s))) {
    var y2 = +m[3]; if (m[3].length === 2) y2 += y2 > 50 ? 1900 : 2000;
    if (validDate(y2, +m[2], +m[1])) out.push({ i: m.index, t: utc(y2, +m[2] - 1, +m[1]), ex: true, lab: null });
  }
  [[/\bapres demain\b/, 2], [/\bavant hier\b/, -2], [/\bdemain\b/, 1], [/\bhier\b/, -1], [/\baujourd hui\b/, 0]].forEach(function (p) {
    var mm = p[0].exec(s);
    if (mm && !(p[1] === 1 && /apres demain/.test(s))) out.push({ i: mm.index, t: today + p[1] * DAY, ex: true, lab: null });
  });
  EVENTS.forEach(function (ev) { var mm = ev[0].exec(s); if (mm) out.push({ i: mm.index, t: nextOcc(ev, today), ex: false, lab: ev[1] }); });
  out.sort(function (a, b) { return a.i - b.i; });
  return out;
}
function addMonths(t, k) {
  var d = new Date(t), y = d.getUTCFullYear(), mo = d.getUTCMonth() + k, dd = d.getUTCDate();
  y += Math.floor(mo / 12); mo = ((mo % 12) + 12) % 12;
  var last = new Date(utc(y, mo + 1, 0)).getUTCDate();
  return utc(y, mo, Math.min(dd, last));
}
function ageOn(b, today) {
  var bd = new Date(b), td = new Date(today), a = td.getUTCFullYear() - bd.getUTCFullYear();
  if (td.getUTCMonth() < bd.getUTCMonth() || (td.getUTCMonth() === bd.getUTCMonth() && td.getUTCDate() < bd.getUTCDate())) a--;
  return a;
}
function spanDays(d) {
  d = Math.abs(d);
  var s = d + ' ' + plural(d, 'jour', 'jours');
  if (d >= 14) { var w = Math.floor(d / 7), r = d % 7; s += ' (' + w + ' ' + plural(w, 'semaine', 'semaines') + (r ? ' et ' + r + ' ' + plural(r, 'jour', 'jours') : '') + ')'; }
  return s;
}
var CITIES = [
  ['abidjan|cote d ivoire', 'Africa/Abidjan', 'à Abidjan'], ['paris|france', 'Europe/Paris', 'à Paris'], ['londres|london|angleterre|royaume uni', 'Europe/London', 'à Londres'],
  ['new york', 'America/New_York', 'à New York'], ['washington', 'America/New_York', 'à Washington'], ['los angeles|californie', 'America/Los_Angeles', 'à Los Angeles'],
  ['montreal|quebec', 'America/Toronto', 'à Montréal'], ['tokyo|japon', 'Asia/Tokyo', 'à Tokyo'], ['dubai', 'Asia/Dubai', 'à Dubaï'], ['pekin|beijing|shanghai|chine', 'Asia/Shanghai', 'à Pékin'],
  ['lagos|nigeria', 'Africa/Lagos', 'à Lagos'], ['dakar|senegal', 'Africa/Dakar', 'à Dakar'], ['accra|ghana', 'Africa/Accra', 'à Accra'], ['douala|yaounde|cameroun', 'Africa/Douala', 'à Douala'],
  ['casablanca|rabat|maroc', 'Africa/Casablanca', 'à Casablanca'], ['le caire|egypte', 'Africa/Cairo', 'au Caire'], ['johannesburg|afrique du sud', 'Africa/Johannesburg', 'à Johannesburg'],
  ['nairobi|kenya', 'Africa/Nairobi', 'à Nairobi'], ['moscou|russie', 'Europe/Moscow', 'à Moscou'], ['sydney|australie', 'Australia/Sydney', 'à Sydney'], ['sao paulo|bresil', 'America/Sao_Paulo', 'à São Paulo'],
  ['berlin|allemagne', 'Europe/Berlin', 'à Berlin'], ['madrid|espagne', 'Europe/Madrid', 'à Madrid'], ['rome|italie', 'Europe/Rome', 'à Rome'], ['bruxelles|belgique', 'Europe/Brussels', 'à Bruxelles'],
  ['istanbul|turquie', 'Europe/Istanbul', 'à Istanbul'], ['delhi|inde', 'Asia/Kolkata', 'à Delhi'], ['bangkok|thailande', 'Asia/Bangkok', 'à Bangkok'], ['singapour', 'Asia/Singapore', 'à Singapour']
];
function hm(now, tz) {
  var p = new Intl.DateTimeFormat('fr-FR', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false, year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(now), o = {};
  p.forEach(function (x) { o[x.type] = x.value; });
  return { h: +o.hour % 24, m: +o.minute, d: +o.day, mo: +o.month, y: +o.year };
}
function sClock(raw, n, now) {
  if (!/\bquelle heure\b|\bheure (actuelle )?(a|au|en|chez|de)\b|\bil est quelle heure\b/.test(n)) return null;
  for (var i = 0; i < CITIES.length; i++) {
    var re = new RegExp('\\b(' + CITIES[i][0] + ')\\b');
    if (re.test(n)) {
      var t = hm(now, CITIES[i][1]), a = hm(now, 'Africa/Abidjan');
      var diff = (t.h * 60 + t.m) - (a.h * 60 + a.m);
      if (t.d !== a.d || t.mo !== a.mo) diff += (t.y * 372 + t.mo * 31 + t.d) > (a.y * 372 + a.mo * 31 + a.d) ? 1440 : -1440;
      var dh = Math.round(diff / 60);
      var rel = dh === 0 ? 'c’est la même heure qu’à Abidjan' : ('soit ' + (dh > 0 ? '+' : '') + dh + ' h par rapport à Abidjan');
      return cap1(CITIES[i][2]) + ', il est ' + t.h + ' h ' + ('0' + t.m).slice(-2) + ' (' + rel + ').';
    }
  }
  return null;
}
function sDates(raw, n, now) {
  var s = nw(raw), today = todayOf(now), ds = findDates(nr(raw), today), m, d;
  var cueDiff = /(combien (de )?(jours?|semaines?|temps)|jours? restants?|dans combien|compte a rebours|il reste combien|reste t il combien|reste combien)/.test(s);
  var cueDay = /\b(quel jour|jour de la semaine|c etait quel jour|c est quel jour)\b/.test(s);
  /* âge */
  if (/\b(quel age|mon age|age ai je|calcule\w* (mon |l )?age|ai je quel age)\b/.test(s)) {
    if (ds.length && ds[0].ex) return 'Vous avez ' + ageOn(ds[0].t, today) + ' ans.';
    if ((m = /\bne(?:e)? (?:en )?(\d{4})\b/.exec(s) || /\b(?:en|annee) (19\d{2}|20\d{2})\b/.exec(s))) {
      var a = new Date(today).getUTCFullYear() - (+m[1]);
      if (a >= 0 && a < 130) return 'Vous avez ' + (a - 1) + ' ou ' + a + ' ans, selon que votre anniversaire est déjà passé cette année ou non.';
    }
  }
  /* dans N unités / il y a N unités */
  var rel = /\b(dans|il y a) (\d{1,4}) (jours?|semaines?|mois|ans?|annees?)\b/.exec(s);
  if (rel && /\b(quelle date|quel jour|on sera|sera t on|quand|a quelle date|la date)\b/.test(s)) {
    var k = +rel[2] * (rel[1] === 'dans' ? 1 : -1), u = rel[3], t;
    if (/^jour/.test(u)) t = today + k * DAY; else if (/^semaine/.test(u)) t = today + 7 * k * DAY; else if (/^mois/.test(u)) t = addMonths(today, k); else t = addMonths(today, 12 * k);
    return (rel[1] === 'dans' ? 'Dans ' : 'Il y a ') + rel[2] + ' ' + u + (rel[1] === 'dans' ? ', ce sera le ' : ', c’était le ') + fdate(t) + '.';
  }
  /* deux dates → écart */
  if (ds.length >= 2 && (cueDiff || /\b(entre|du .* au)\b/.test(s))) {
    var df = Math.round((ds[1].t - ds[0].t) / DAY);
    return 'Il y a ' + spanDays(df) + ' entre le ' + fdate(ds[0].t) + ' et le ' + fdate(ds[1].t) + '.';
  }
  if (ds.length >= 1) {
    d = ds[0];
    if (cueDiff) {
      if (!d.ex && !d.lab && d.t < today) { var dt = new Date(d.t); d = { t: utc(dt.getUTCFullYear() + 1, dt.getUTCMonth(), dt.getUTCDate()), ex: false, lab: null }; }
      var diff = Math.round((d.t - today) / DAY), lab = d.lab || ('le ' + fdate(d.t));
      if (diff === 0) return 'C’est aujourd’hui !';
      if (diff > 0) return 'Il reste ' + spanDays(diff) + ' avant ' + lab + (d.lab ? ' (' + fdate(d.t) + ')' : '') + '.';
      return 'Il y a ' + spanDays(diff) + ' que ' + (d.lab ? d.lab + ' est passé' : 'cette date est passée') + '.';
    }
    if (cueDay) {
      var dd2 = Math.round((d.t - today) / DAY), verb = dd2 === 0 ? 'est' : (dd2 > 0 ? 'sera' : 'était');
      var wd = WDAYS[new Date(d.t).getUTCDay()];
      if (d.lab) return cap1(d.lab) + ' ' + (dd2 >= 0 ? 'tombe' : 'tombait') + ' un ' + wd + ' (' + fdate(d.t) + ').';
      return 'Le ' + fdate(d.t).replace(/^\w+ /, '') + ' ' + verb + ' un ' + wd + '.';
    }
  }
  return null;
}

/* ---------- mini-dictionnaire FR ↔ EN ---------- */
var DICT_RAW = ('bonjour|hello;bonsoir|good evening;salut|hi;au revoir|goodbye;merci|thank you;merci beaucoup|thank you very much;s il vous plait|please;de rien|you are welcome;pardon|sorry;excusez moi|excuse me;oui|yes;non|no;peut etre|maybe;' +
'comment allez vous|how are you;ca va|how are you doing;je vais bien|i am fine;je m appelle|my name is;enchante|nice to meet you;je ne comprends pas|i do not understand;pouvez vous repeter|can you repeat;parlez vous francais|do you speak french;' +
'bienvenue|welcome;bonne nuit|good night;bonne journee|have a nice day;a bientot|see you soon;a demain|see you tomorrow;felicitations|congratulations;bonne chance|good luck;joyeux anniversaire|happy birthday;bonne annee|happy new year;joyeux noel|merry christmas;' +
'je cherche du travail|i am looking for a job;je cherche un emploi|i am looking for a job;je voudrais|i would like;combien ca coute|how much is it;quel est votre prix|what is your price;ou est|where is;quelle heure est il|what time is it;j ai faim|i am hungry;j ai soif|i am thirsty;' +
'travail|work;emploi|job;recrutement|recruitment;candidat|candidate;employeur|employer;employe|employee;salaire|salary;contrat|contract;entretien|interview;entretien d embauche|job interview;experience|experience;competence|skill;competences|skills;diplome|degree;' +
'lettre de motivation|cover letter;cv|resume;reference|reference;references|references;patron|boss;collegue|colleague;entreprise|company;societe|company;bureau|office;reunion|meeting;rendez vous|appointment;horaires|opening hours;conge|leave;vacances|holiday;retraite|retirement;' +
'facture|invoice;devis|quote;paiement|payment;prix|price;cout|cost;remise|discount;reduction|discount;achat|purchase;vente|sale;client|customer;fournisseur|supplier;livraison|delivery;commande|order;reçu|receipt;recu|receipt;' +
'maison|house;appartement|apartment;chambre|bedroom;cuisine|kitchen;salon|living room;salle de bain|bathroom;toilettes|toilet;jardin|garden;porte|door;fenetre|window;toit|roof;mur|wall;sol|floor;escalier|stairs;' +
'famille|family;mere|mother;pere|father;frere|brother;soeur|sister;fils|son;fille|daughter;enfant|child;enfants|children;bebe|baby;mari|husband;femme|wife;ami|friend;amie|friend;voisin|neighbour;grand mere|grandmother;grand pere|grandfather;oncle|uncle;tante|aunt;cousin|cousin;' +
'eau|water;pain|bread;riz|rice;poulet|chicken;poisson|fish;viande|meat;legume|vegetable;legumes|vegetables;fruit|fruit;banane|banana;mangue|mango;ananas|pineapple;orange|orange;pomme|apple;tomate|tomato;oignon|onion;sel|salt;sucre|sugar;huile|oil;lait|milk;cafe|coffee;the|tea;biere|beer;' +
'chien|dog;chat|cat;oiseau|bird;cheval|horse;vache|cow;mouton|sheep;chevre|goat;elephant|elephant;lion|lion;singe|monkey;serpent|snake;' +
'rouge|red;bleu|blue;vert|green;jaune|yellow;noir|black;blanc|white;gris|grey;marron|brown;rose|pink;violet|purple;' +
'un|one;deux|two;trois|three;quatre|four;cinq|five;six|six;sept|seven;huit|eight;neuf|nine;dix|ten;vingt|twenty;cent|one hundred;mille|one thousand;million|million;' +
'lundi|monday;mardi|tuesday;mercredi|wednesday;jeudi|thursday;vendredi|friday;samedi|saturday;dimanche|sunday;aujourd hui|today;demain|tomorrow;hier|yesterday;maintenant|now;matin|morning;soir|evening;nuit|night;semaine|week;mois|month;annee|year;' +
'voiture|car;moto|motorbike;velo|bicycle;bus|bus;avion|plane;bateau|boat;train|train;route|road;ville|city;village|village;pays|country;marche|market;banque|bank;hopital|hospital;ecole|school;eglise|church;mosquee|mosque;pharmacie|pharmacy;police|police;aeroport|airport;gare|station;' +
'medecin|doctor;infirmier|nurse;avocat|lawyer;professeur|teacher;enseignant|teacher;eleve|pupil;etudiant|student;ingenieur|engineer;comptable|accountant;chauffeur|driver;cuisinier|cook;menagere|housekeeper;nounou|nanny;gardien|guard;jardinier|gardener;plombier|plumber;electricien|electrician;macon|mason;peintre|painter;menuisier|carpenter;serrurier|locksmith;vendeur|salesman;vendeuse|saleswoman;secretaire|secretary;' +
'heureux|happy;triste|sad;fatigue|tired;malade|sick;content|glad;en colere|angry;fier|proud;peur|fear;amour|love;amitie|friendship;sante|health;argent|money;temps|time;vie|life;mort|death;paix|peace;travailler|to work;manger|to eat;boire|to drink;dormir|to sleep;parler|to speak;ecouter|to listen;lire|to read;ecrire|to write;acheter|to buy;vendre|to sell;aimer|to love;aider|to help;chercher|to look for;trouver|to find;venir|to come;aller|to go;' +
'grand|big;petit|small;beau|beautiful;joli|pretty;bon|good;mauvais|bad;chaud|hot;froid|cold;nouveau|new;vieux|old;facile|easy;difficile|difficult;rapide|fast;lent|slow;cher|expensive;gratuit|free;ouvert|open;ferme|closed;' +
'telephone|phone;ordinateur|computer;internet|internet;message|message;appel|call;adresse|address;numero|number;mot de passe|password;courriel|email;photo|photo;video|video;livre|book;stylo|pen;table|table;chaise|chair;lit|bed;sac|bag;cle|key;argent liquide|cash').split(';');
var FR2EN = {}, EN2FR = {};
DICT_RAW.forEach(function (p) { var a = p.split('|'); if (a.length === 2) { FR2EN[a[0]] = a[1]; if (!EN2FR[a[1]]) EN2FR[a[1]] = a[0]; } });
function dkey(x) { return nw(x).replace(/^(le |la |les |un |une |l |du |des |the |a |an )/, '').trim(); }
function lookup(map, x) {
  var k = nw(x), v = map[k]; if (v) return v;
  k = dkey(x); v = map[k]; if (v) return v;
  k = k.replace(/s$/, ''); return map[k] || null;
}
function sTranslate(raw, n) {
  var m, dir = null, w = null, soft = false;
  if ((m = /(?:comment (?:dit|dire) on|comment on dit|comment se dit|traduis|traduire|traduction de|traduction du mot|que veut dire|ca veut dire quoi|ca veut dire)\s+(.+?)\s+en (anglais|english|francais|french)\b/.exec(n))) { w = m[1]; dir = /angl|engl/.test(m[2]) ? 'en' : 'fr'; }
  else if ((m = /\bwhat(?: is|s) (.+?) in (french|english)\b/.exec(n)) || (m = /\bhow (?:do you|to) say (.+?) in (french|english)\b/.exec(n))) { w = m[1]; dir = m[2] === 'french' ? 'fr' : 'en'; }
  else if ((m = /\b(?:what does|que veut dire|ca veut dire quoi|signification de)\s+(.+?)(?: mean| en anglais)?$/.exec(n)) && /\b(mean|veut dire|signification)\b/.test(n)) { w = m[1]; dir = 'fr'; var t0 = lookup(EN2FR, w); if (!t0 && lookup(FR2EN, w)) dir = 'en'; }
  else if ((m = /^(.{2,40}?)\s+en (anglais|francais)$/.exec(n)) && n.split(' ').length <= 6) { w = m[1]; dir = m[2] === 'anglais' ? 'en' : 'fr'; soft = true; }
  else if ((m = /^(?:en anglais|in english)\s+(.{2,40})$/.exec(n))) { w = m[1]; dir = 'en'; }
  if (!w || !dir) return null;
  w = w.replace(/^(le mot|la phrase|le terme)\s+/, '');
  var res = dir === 'en' ? lookup(FR2EN, w) : lookup(EN2FR, w);
  if (!res && soft) return null;
  if (res) return dir === 'en' ? '« ' + w + ' » se dit « ' + res + ' » en anglais.' : '« ' + w + ' » se dit « ' + res + ' » en français.';
  return 'Je n’ai pas ce mot dans mon petit dictionnaire. Essayez un mot ou une phrase courte et courante, par exemple « bonjour », « salaire » ou « je cherche du travail ».';
}

/* ---------- synonymes & recherche ---------- */
function stemS(w) { return w.length > 4 ? w.replace(/(s|x)$/, '') : w; }
var SYN_GROUPS = [
  'population habitant peuple demographie', 'prix cout tarif montant', 'salaire remuneration paie paye gage', 'emploi travail boulot job poste taf', 'menagere domestique bonne femme-de-menage',
  'recruter embaucher engager recrutement embauche', 'cv curriculum', 'entretien interview', 'voiture automobile vehicule', 'pays nation', 'monnaie devise', 'superficie surface',
  'medecin docteur toubib', 'maison domicile', 'telephone portable mobile cellulaire', 'plombier plomberie', 'electricien electricite', 'macon maconnerie', 'peintre peinture',
  'menuisier menuiserie', 'jardinier jardinage', 'gardien gardiennage', 'cuisinier cuisiniere cuisine', 'nounou nourrice', 'chauffeur conducteur', 'demenagement demenager',
  'inscrire inscription', 'payer paiement payement reglement', 'horaire ouverture', 'adresse localisation', 'contacter joindre', 'gratuit gratis', 'fonder creer', 'dirigeant patron chef',
  'auteur ecrit ecrivain', 'inventeur invente inventer invention', 'decouvrir decouverte', 'ivoirien ivoirienne', 'diplome certificat', 'etudiant eleve', 'habiter resider', 'naitre naissance', 'mourir deces', 'ancetre aieul', 'debut commencement', 'fin terminer', 'vite rapide', 'difficile dur', 'facile simple'
];
var CANON = {};
SYN_GROUPS.forEach(function (g, gi) { g.split(' ').forEach(function (w) { var k = stemS(w); if (!(k in CANON)) CANON[k] = 'g' + gi; }); });
function canon(t) { return CANON.hasOwnProperty(t) ? CANON[t] : t; }
function lev(a, b) {
  if (a === b) return 0; if (Math.abs(a.length - b.length) > 2) return 9;
  var p = [], c, i, j;
  for (j = 0; j <= b.length; j++) p[j] = j;
  for (i = 1; i <= a.length; i++) { c = [i]; for (j = 1; j <= b.length; j++) c[j] = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); p = c; }
  return p[b.length];
}
function tokMatch(a, b) {
  if (a === b) return true;
  if (canon(a) === canon(b)) return true;
  return a.length >= 5 && b.length >= 5 && lev(a, b) <= (a.length >= 9 ? 2 : 1);
}
/* docs : [{t:[mots], ref:...}] ; renvoie le meilleur document couvrant assez la question */
function makeRetriever(docs) {
  var df = {}, N = docs.length || 1;
  docs.forEach(function (d) { var seen = {}; d.t.forEach(function (w) { var c = canon(w); if (!seen[c]) { seen[c] = 1; df[c] = (df[c] || 0) + 1; } }); });
  function idf(w) { return Math.log(1 + N / (1 + (df[canon(w)] || 0))); }
  return {
    find: function (qt) {
      if (!qt.length) return null;
      var best = null, bs = 0;
      docs.forEach(function (d) {
        if (!d.t.length) return;
        var tot = 0, got = 0, hitQ = 0, i, j;
        for (i = 0; i < d.t.length; i++) {
          var w = idf(d.t[i]); tot += w;
          for (j = 0; j < qt.length; j++) if (tokMatch(qt[j], d.t[i])) { got += w; break; }
        }
        for (j = 0; j < qt.length; j++) for (i = 0; i < d.t.length; i++) if (tokMatch(qt[j], d.t[i])) { hitQ++; break; }
        var cover = got / tot, qcover = hitQ / qt.length;
        var need = d.t.length <= 2 ? 0.99 : (d.t.length === 3 ? 0.66 : 0.7);
        if (cover >= need && qcover >= 0.5) {
          var sc = cover * (0.6 + 0.4 * qcover) + d.t.length * 0.01;
          if (sc > bs) { bs = sc; best = d; }
        }
      });
      return best ? best.ref : null;
    }
  };
}

/* ---------- point d’entrée ---------- */
function answer(text, now) {
  if (!text) return null;
  var raw = String(text);
  if (raw.length > 400) return null;
  now = now || new Date();
  var n = nw(raw);
  if (!n && !/[\d]/.test(raw)) return null;
  var fns = [sNumWords, sClock, sDates, sCurrency, sUnits, sPercent, sRule3, sStats, sTranslate, sCalc];
  for (var i = 0; i < fns.length; i++) {
    try { var r = fns[i](raw, n, now); if (r) return r; } catch (e) { /* une compétence ne doit jamais faire échouer la réponse */ }
  }
  return null;
}

var API = { answer: answer, makeRetriever: makeRetriever, canon: canon, words: words, fmt: fmt, version: '1.0' };
if (typeof module !== 'undefined' && module.exports) module.exports = API; else root.ShamanSkills = API;
})(typeof window !== 'undefined' ? window : this);
