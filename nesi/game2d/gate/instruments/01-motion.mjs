// 01-motion — Card 02. Any signal a machine can increment is disqualified from
// meaning life.
//
// The missing mechanical form: a check that refuses to let maintenance-shaped
// motion satisfy a card. Re-specifying, re-scaffolding, renaming and
// re-architecting all increment the progress signal without moving the thing.
//
// Source finding: apricote/Listory, 1,870 of 2,144 commits written by bots.
// The human wrote 273 and left. The graph stayed green into the archive.
//
// ── RECALIBRATED ──────────────────────────────────────────────────────────
// The first build detected struts by FILE EXTENSION: .md and .html were not
// struts. That rule was imported from a census of self-hosted software repos
// and applied to a project whose substance is language — where a root is
// defined as writing that survived water and light. The result told the person
// whose medium is text that text does not count, and suppressed the entire
// category of work actually being done here.
//
// The real distinction is not documents versus code. It is:
//
//     did this change what the thing DOES        → strut
//     did this restate what the thing IS         → motion
//
// No parser can see that, exactly as no parser can see what a seat costs the
// hand. So it follows the corpus's existing discipline: THE STRUT IS DECLARED,
// NEVER DERIVED. A commit declares itself with a trailer —
//
//     strut: <what it now does that it did not do before>
//
// — and this instrument checks only that the sentence is there and is in the
// right grammar. A document that specifies a mechanism nobody had can declare
// itself and be counted. A fourth rearticulation can declare itself too, and
// then has to write a sentence it cannot honestly fill in.
//
// Executable files still count without a declaration, because moving code is
// self-evidently moving the thing. The declaration is what OPENS the category,
// not what polices it.

import { execFileSync } from 'node:child_process';
import { conf, num, p, PASS, REFUSE, VACUOUS } from '../lib.mjs';

export const id = '01-motion';
export const cost =
  'I refuse to let a window of pure document motion be reported as progress, ' +
  'which means a day spent writing about the build cannot close a card.';

const BOT = /(\[bot\]|^bot$|renovate|dependabot|semantic-release|greenkeeper|github-actions|snyk)/i;

const DOC = new Set(['.md', '.markdown', '.html', '.htm', '.txt', '.rst', '.adoc', '.org', '.pdf']);
const ext = (f) => {
  const i = f.lastIndexOf('.');
  return i < 0 ? '' : f.slice(i).toLowerCase();
};

// `strut:` followed by at least a few characters of sentence.
const STRUT_TRAILER = /^\s*strut:\s*\S.{4,}/im;

const MARK = '\u0001'; // commit-start sentinel
const SEP = '\u001f';  // field separator
const EOM = '\u0002'; // end of message body

function gitWindow(days, repo) {
  const raw = execFileSync(
    'git',
    ['-C', repo, 'log', `--since=${days} days ago`, '--name-only', `--pretty=format:${MARK}%H${SEP}%an${SEP}%B${EOM}`],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
  );
  const commits = [];
  for (const chunk of raw.split(MARK).slice(1)) {
    const [head, tail = ''] = chunk.split(EOM);
    const [hash, author, ...bodyParts] = head.split(SEP);
    commits.push({
      hash,
      author: author || '',
      body: bodyParts.join(SEP),
      files: tail.split('\n').map((l) => l.trim()).filter(Boolean),
    });
  }
  return commits;
}

export function run() {
  const c = conf();
  const days = num(c, 'motion_window_days', 3);
  const botCeiling = num(c, 'motion_bot_ceiling', 0.85);
  const repo = p(c.repo || '.');   // resolved against the gate dir, so the reading does not depend on cwd

  let commits;
  try {
    commits = gitWindow(days, repo);
  } catch {
    return VACUOUS(`no readable git history at "${repo}" — this instrument cannot assert anything, so it does not pass`);
  }

  if (commits.length === 0) {
    return VACUOUS(`no commits in the last ${days} days — nothing examined, so nothing is proven`);
  }

  const human = commits.filter((k) => !BOT.test(k.author));
  const bots = commits.length - human.length;
  const botShare = bots / commits.length;

  if (botShare > botCeiling) {
    return REFUSE(
      `${bots} of ${commits.length} commits in the window are machine-authored (${Math.round(botShare * 100)}%). ` +
        `A falling pile reads as a settling field. The graph is green and the hand has left.`,
      days,
      commits.length
    );
  }

  if (human.length === 0) {
    return REFUSE(
      `every commit in the last ${days} days is machine-authored. No hand moved.`,
      days,
      commits.length
    );
  }

  const touched = [...new Set(human.flatMap((k) => k.files))];
  const executable = touched.filter((f) => !DOC.has(ext(f)));
  const docs = touched.filter((f) => DOC.has(ext(f)));

  // Declared struts: a commit message carrying a `strut:` trailer with a
  // sentence after it. Grammar check only — the same restraint as the cost
  // instrument, which verifies that a seat said something and never judges it.
  const declared = human.filter((k) => STRUT_TRAILER.test(k.body || ''));
  const empty = human.filter((k) => /^\s*strut:\s*$/im.test(k.body || ''));

  if (empty.length) {
    return REFUSE(
      `${empty.length} commit(s) carry an empty \`strut:\` trailer. The declaration is the whole check; ` +
        `a blank one is the only way to fail it.`,
      1,
      commits.length
    );
  }

  if (executable.length === 0 && declared.length === 0) {
    return REFUSE(
      `${human.length} human commit(s) in ${days} days moved no executable file and declared no strut. ` +
        `Unnamed motion: the progress signal moved and the thing did not. ` +
        `If something here changed what the world DOES, say so — \`strut: <what it now does that it did not before>\` ` +
        `— and it counts, whatever its file extension.`,
      days,
      commits.length
    );
  }

  const how = [
    executable.length ? `${executable.length} executable file(s)` : null,
    declared.length ? `${declared.length} declared strut(s)` : null,
  ].filter(Boolean).join(' + ');

  return PASS(
    commits.length,
    `${human.length} human commit(s) moved the thing: ${how}` + (docs.length ? `; ${docs.length} document(s) alongside` : '')
  );
}
