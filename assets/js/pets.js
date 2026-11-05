// Browser pets: 10 cute pets (cat, dog, bunny, fox, panda, duck, penguin, frog, hamster, shiba)
// that roam the screen, jump onto buttons/headings/cards, walk off edges naturally, and stay spread out.
(() => {
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const OUTLINE = '#2b2233';

  const SVG = {
    cat: `
      <svg viewBox="0 0 64 48" width="100%" height="100%" aria-hidden="true">
        <g class="pet-tail" style="transform-origin: 15px 28px">
          <path d="M15 28 C 6 24, 4 14, 9 8" fill="none" stroke="${OUTLINE}" stroke-width="5" stroke-linecap="round"/>
          <path d="M15 28 C 6 24, 4 14, 9 8" fill="none" stroke="#f4a261" stroke-width="3" stroke-linecap="round"/>
        </g>
        <g class="pet-leg leg-a" style="transform-origin: 20px 34px"><rect x="18" y="33" width="5" height="11" rx="2.5" fill="#e07b39" stroke="${OUTLINE}" stroke-width="1.5"/></g>
        <g class="pet-leg leg-b" style="transform-origin: 42px 34px"><rect x="40" y="33" width="5" height="11" rx="2.5" fill="#e07b39" stroke="${OUTLINE}" stroke-width="1.5"/></g>
        <g class="pet-body">
          <ellipse cx="31" cy="30" rx="17" ry="9.5" fill="#f4a261" stroke="${OUTLINE}" stroke-width="1.8"/>
          <path d="M25 22 q2 4 0 8 M31 21 q2 4 0 9 M37 22 q2 4 0 8" fill="none" stroke="#d9773a" stroke-width="2" stroke-linecap="round"/>
          <g class="pet-head">
            <path d="M42 14 L44 3 L50 10 Z" fill="#f4a261" stroke="${OUTLINE}" stroke-width="1.8" stroke-linejoin="round"/>
            <path d="M52 10 L58 3 L59 14 Z" fill="#f4a261" stroke="${OUTLINE}" stroke-width="1.8" stroke-linejoin="round"/>
            <path d="M45 9 L45.5 6 L48 9 Z M54 9 L57 6 L57 10 Z" fill="#ffb4c8"/>
            <circle cx="50" cy="18" r="10" fill="#f4a261" stroke="${OUTLINE}" stroke-width="1.8"/>
            <g class="pet-eyes">
              <ellipse cx="47" cy="17" rx="1.5" ry="2.1" fill="${OUTLINE}"/>
              <ellipse cx="54.5" cy="17" rx="1.5" ry="2.1" fill="${OUTLINE}"/>
            </g>
            <path d="M50 20.5 l1.2 1 l1.2 -1 Z" fill="#ff7aa2"/>
            <path d="M51.2 21.5 q-1.5 2 -3 1 M51.2 21.5 q1.5 2 3 1" fill="none" stroke="${OUTLINE}" stroke-width="1" stroke-linecap="round"/>
            <path d="M58 20 l5 -1 M58 22 l5 1 M43 20 l-4 -1 M43 22 l-4 1" stroke="${OUTLINE}" stroke-width="0.8" stroke-linecap="round"/>
            <circle cx="45" cy="21.5" r="1.6" fill="#ff9bb5" opacity="0.6"/>
            <circle cx="56.5" cy="21.5" r="1.6" fill="#ff9bb5" opacity="0.6"/>
          </g>
        </g>
        <g class="pet-leg leg-b" style="transform-origin: 24px 34px"><rect x="22" y="33" width="5" height="11" rx="2.5" fill="#f4a261" stroke="${OUTLINE}" stroke-width="1.5"/></g>
        <g class="pet-leg leg-a" style="transform-origin: 46px 34px"><rect x="44" y="33" width="5" height="11" rx="2.5" fill="#f4a261" stroke="${OUTLINE}" stroke-width="1.5"/></g>
      </svg>`,
    dog: `
      <svg viewBox="0 0 64 48" width="100%" height="100%" aria-hidden="true">
        <g class="pet-tail" style="transform-origin: 14px 26px">
          <path d="M14 26 C 8 22, 7 16, 10 12" fill="none" stroke="${OUTLINE}" stroke-width="5.5" stroke-linecap="round"/>
          <path d="M14 26 C 8 22, 7 16, 10 12" fill="none" stroke="#c68b59" stroke-width="3.5" stroke-linecap="round"/>
        </g>
        <g class="pet-leg leg-a" style="transform-origin: 20px 34px"><rect x="18" y="33" width="6" height="11" rx="3" fill="#a86e43" stroke="${OUTLINE}" stroke-width="1.5"/></g>
        <g class="pet-leg leg-b" style="transform-origin: 41px 34px"><rect x="39" y="33" width="6" height="11" rx="3" fill="#a86e43" stroke="${OUTLINE}" stroke-width="1.5"/></g>
        <g class="pet-body">
          <ellipse cx="30" cy="29" rx="18" ry="10.5" fill="#c68b59" stroke="${OUTLINE}" stroke-width="1.8"/>
          <ellipse cx="26" cy="25" rx="6" ry="4" fill="#e8c39e"/>
          <path d="M38 30 h10" stroke="#e63946" stroke-width="3" stroke-linecap="round"/>
          <circle cx="44" cy="33" r="2" fill="#ffd166" stroke="${OUTLINE}" stroke-width="0.8"/>
          <g class="pet-head">
            <circle cx="49" cy="18" r="10.5" fill="#c68b59" stroke="${OUTLINE}" stroke-width="1.8"/>
            <g class="pet-ear" style="transform-origin: 42px 11px">
              <path d="M43 10 C 37 9, 36 18, 39 23 C 42 21, 44 16, 43 10 Z" fill="#7a4a2a" stroke="${OUTLINE}" stroke-width="1.5" stroke-linejoin="round"/>
            </g>
            <ellipse cx="55" cy="22" rx="6.5" ry="5" fill="#e8c39e" stroke="${OUTLINE}" stroke-width="1.4"/>
            <ellipse cx="59" cy="19.8" rx="2.2" ry="1.7" fill="${OUTLINE}"/>
            <g class="pet-eyes">
              <circle cx="48" cy="15.5" r="1.8" fill="${OUTLINE}"/>
              <circle cx="54" cy="14.8" r="1.6" fill="${OUTLINE}"/>
            </g>
            <path d="M55 24.5 q2 1.5 4 0" fill="none" stroke="${OUTLINE}" stroke-width="1" stroke-linecap="round"/>
            <path class="pet-tongue" d="M56 25 q1 4 2.5 0 Z" fill="#ff7aa2" stroke="${OUTLINE}" stroke-width="0.6"/>
          </g>
        </g>
        <g class="pet-leg leg-b" style="transform-origin: 24px 34px"><rect x="22" y="33" width="6" height="11" rx="3" fill="#c68b59" stroke="${OUTLINE}" stroke-width="1.5"/></g>
        <g class="pet-leg leg-a" style="transform-origin: 45px 34px"><rect x="43" y="33" width="6" height="11" rx="3" fill="#c68b59" stroke="${OUTLINE}" stroke-width="1.5"/></g>
      </svg>`,
    bunny: `
      <svg viewBox="0 0 64 48" width="100%" height="100%" aria-hidden="true">
        <g class="pet-tail" style="transform-origin: 14px 29px">
          <circle cx="13" cy="29" r="5" fill="#ffffff" stroke="${OUTLINE}" stroke-width="1.8"/>
        </g>
        <g class="pet-leg leg-a" style="transform-origin: 22px 35px"><ellipse cx="22" cy="40" rx="5.5" ry="3.5" fill="#f3eef6" stroke="${OUTLINE}" stroke-width="1.5"/></g>
        <g class="pet-leg leg-b" style="transform-origin: 41px 35px"><rect x="39" y="34" width="5" height="9" rx="2.5" fill="#f3eef6" stroke="${OUTLINE}" stroke-width="1.5"/></g>
        <g class="pet-body">
          <ellipse cx="30" cy="30" rx="15" ry="10.5" fill="#ffffff" stroke="${OUTLINE}" stroke-width="1.8"/>
          <g class="pet-head">
            <g class="pet-ear" style="transform-origin: 46px 12px">
              <ellipse cx="45" cy="6" rx="3" ry="8" transform="rotate(-12 45 6)" fill="#ffffff" stroke="${OUTLINE}" stroke-width="1.6"/>
              <ellipse cx="45" cy="6.5" rx="1.5" ry="5.5" transform="rotate(-12 45 6.5)" fill="#ffb4c8"/>
            </g>
            <g class="pet-ear" style="transform-origin: 51px 12px">
              <ellipse cx="52" cy="6" rx="3" ry="8" transform="rotate(8 52 6)" fill="#ffffff" stroke="${OUTLINE}" stroke-width="1.6"/>
              <ellipse cx="52" cy="6.5" rx="1.5" ry="5.5" transform="rotate(8 52 6.5)" fill="#ffb4c8"/>
            </g>
            <circle cx="48" cy="20" r="9.5" fill="#ffffff" stroke="${OUTLINE}" stroke-width="1.8"/>
            <g class="pet-eyes">
              <circle cx="47" cy="18.5" r="1.7" fill="#e63946"/>
              <circle cx="53.5" cy="18.5" r="1.6" fill="#e63946"/>
            </g>
            <ellipse cx="55.5" cy="20.5" rx="1.4" ry="1" fill="#ff7aa2"/>
            <circle cx="44" cy="22" r="1.8" fill="#ffb4c8" opacity="0.7"/>
            <circle cx="54" cy="22.5" r="1.6" fill="#ffb4c8" opacity="0.7"/>
          </g>
        </g>
        <g class="pet-leg leg-b" style="transform-origin: 26px 35px"><ellipse cx="26" cy="40.5" rx="5.5" ry="3.5" fill="#ffffff" stroke="${OUTLINE}" stroke-width="1.5"/></g>
        <g class="pet-leg leg-a" style="transform-origin: 44px 35px"><rect x="42" y="34" width="5" height="9" rx="2.5" fill="#ffffff" stroke="${OUTLINE}" stroke-width="1.5"/></g>
      </svg>`,
    fox: `
      <svg viewBox="0 0 64 48" width="100%" height="100%" aria-hidden="true">
        <g class="pet-tail" style="transform-origin: 16px 28px">
          <path d="M16 28 C 4 27, 1 16, 7 10 C 12 12, 16 20, 16 28 Z" fill="#e76f51" stroke="${OUTLINE}" stroke-width="1.8" stroke-linejoin="round"/>
          <path d="M4 15 C 3 12, 5 10, 7 10 C 9 11, 9 14, 7 16 Z" fill="#fff8f0"/>
        </g>
        <g class="pet-leg leg-a" style="transform-origin: 21px 34px"><rect x="19" y="33" width="4.5" height="11" rx="2.2" fill="#2b2233" stroke="${OUTLINE}" stroke-width="1.2"/></g>
        <g class="pet-leg leg-b" style="transform-origin: 41px 34px"><rect x="39" y="33" width="4.5" height="11" rx="2.2" fill="#2b2233" stroke="${OUTLINE}" stroke-width="1.2"/></g>
        <g class="pet-body">
          <ellipse cx="31" cy="29.5" rx="16.5" ry="9" fill="#e76f51" stroke="${OUTLINE}" stroke-width="1.8"/>
          <path d="M23 33 Q 32 37 42 32" fill="#fff8f0"/>
          <g class="pet-head">
            <path d="M41 13 L42 2 L49 10 Z" fill="#e76f51" stroke="${OUTLINE}" stroke-width="1.8" stroke-linejoin="round"/>
            <path d="M51 10 L58 2 L59 13 Z" fill="#e76f51" stroke="${OUTLINE}" stroke-width="1.8" stroke-linejoin="round"/>
            <path d="M43 9 L43.5 5 L47 9 Z M53 9 L56.5 5 L57 10 Z" fill="#2b2233"/>
            <ellipse cx="50" cy="18.5" rx="10" ry="9" fill="#e76f51" stroke="${OUTLINE}" stroke-width="1.8"/>
            <path d="M41 20 Q 46 26 51 25 Q 57 25 61 20 Q 56 20 51 18 Q 45 20 41 20 Z" fill="#fff8f0"/>
            <g class="pet-eyes">
              <ellipse cx="47.5" cy="17" rx="1.4" ry="2" fill="${OUTLINE}"/>
              <ellipse cx="54.5" cy="17" rx="1.4" ry="2" fill="${OUTLINE}"/>
            </g>
            <circle cx="59.5" cy="19.5" r="1.8" fill="${OUTLINE}"/>
          </g>
        </g>
        <g class="pet-leg leg-b" style="transform-origin: 25px 34px"><rect x="23" y="33" width="4.5" height="11" rx="2.2" fill="#3a2e44" stroke="${OUTLINE}" stroke-width="1.2"/></g>
        <g class="pet-leg leg-a" style="transform-origin: 45px 34px"><rect x="43" y="33" width="4.5" height="11" rx="2.2" fill="#3a2e44" stroke="${OUTLINE}" stroke-width="1.2"/></g>
      </svg>`,
    panda: `
      <svg viewBox="0 0 64 48" width="100%" height="100%" aria-hidden="true">
        <g class="pet-tail" style="transform-origin: 14px 29px">
          <circle cx="13" cy="29" r="3.8" fill="#2b2233"/>
        </g>
        <g class="pet-leg leg-a" style="transform-origin: 21px 34px"><rect x="18" y="32" width="6.5" height="11" rx="3.2" fill="#2b2233"/></g>
        <g class="pet-leg leg-b" style="transform-origin: 41px 34px"><rect x="38" y="32" width="6.5" height="11" rx="3.2" fill="#2b2233"/></g>
        <g class="pet-body">
          <ellipse cx="30" cy="29" rx="17" ry="11" fill="#ffffff" stroke="${OUTLINE}" stroke-width="1.8"/>
          <path d="M35 19 Q 41 29 35 39 L 43 37 Q 47 29 42 20 Z" fill="#2b2233"/>
          <g class="pet-head">
            <circle cx="43" cy="9" r="4" fill="#2b2233"/>
            <circle cx="56" cy="9" r="4" fill="#2b2233"/>
            <circle cx="50" cy="18.5" r="10.5" fill="#ffffff" stroke="${OUTLINE}" stroke-width="1.8"/>
            <ellipse cx="47" cy="18" rx="3" ry="3.6" transform="rotate(-15 47 18)" fill="#2b2233"/>
            <ellipse cx="55" cy="18" rx="3" ry="3.6" transform="rotate(15 55 18)" fill="#2b2233"/>
            <g class="pet-eyes">
              <circle cx="47.3" cy="17.5" r="1.2" fill="#ffffff"/>
              <circle cx="54.7" cy="17.5" r="1.2" fill="#ffffff"/>
            </g>
            <ellipse cx="51.5" cy="21" rx="1.8" ry="1.3" fill="#2b2233"/>
            <circle cx="44" cy="22" r="1.6" fill="#ffb4c8" opacity="0.7"/>
            <circle cx="57.5" cy="22" r="1.6" fill="#ffb4c8" opacity="0.7"/>
          </g>
        </g>
        <g class="pet-leg leg-b" style="transform-origin: 25px 34px"><rect x="22" y="32" width="6.5" height="11" rx="3.2" fill="#2b2233"/></g>
        <g class="pet-leg leg-a" style="transform-origin: 45px 34px"><rect x="42" y="32" width="6.5" height="11" rx="3.2" fill="#2b2233"/></g>
      </svg>`,
    duck: `
      <svg viewBox="0 0 64 48" width="100%" height="100%" aria-hidden="true">
        <g class="pet-tail" style="transform-origin: 16px 28px">
          <path d="M16 26 L 9 21 L 12 31 Z" fill="#ffd166" stroke="${OUTLINE}" stroke-width="1.8" stroke-linejoin="round"/>
        </g>
        <g class="pet-leg leg-a" style="transform-origin: 28px 36px">
          <path d="M28 35 v8 m-3 0 h7" fill="none" stroke="#f77f00" stroke-width="2.4" stroke-linecap="round"/>
        </g>
        <g class="pet-body">
          <ellipse cx="29" cy="29" rx="15" ry="9.5" fill="#ffd166" stroke="${OUTLINE}" stroke-width="1.8"/>
          <path d="M22 27 Q 29 34 36 28 Q 33 23 22 27 Z" fill="#fcbf49" stroke="${OUTLINE}" stroke-width="1.4" stroke-linejoin="round"/>
          <g class="pet-head">
            <path d="M43 8 q2 -4 5 -1 q2 -3 1 1" fill="none" stroke="#ffd166" stroke-width="2" stroke-linecap="round"/>
            <circle cx="45" cy="17" r="9" fill="#ffd166" stroke="${OUTLINE}" stroke-width="1.8"/>
            <path d="M52 15 Q 61 15 60 19 Q 59 21 52 20 Z" fill="#f77f00" stroke="${OUTLINE}" stroke-width="1.5" stroke-linejoin="round"/>
            <g class="pet-eyes">
              <circle cx="47.5" cy="15.5" r="1.7" fill="${OUTLINE}"/>
              <circle cx="48" cy="15" r="0.6" fill="#ffffff"/>
            </g>
            <circle cx="44" cy="19.5" r="1.7" fill="#ff9bb5" opacity="0.65"/>
          </g>
        </g>
        <g class="pet-leg leg-b" style="transform-origin: 34px 36px">
          <path d="M34 35 v8 m-3 0 h7" fill="none" stroke="#f77f00" stroke-width="2.4" stroke-linecap="round"/>
        </g>
      </svg>`,
    penguin: `
      <svg viewBox="0 0 64 48" width="100%" height="100%" aria-hidden="true">
        <g class="pet-leg leg-a" style="transform-origin: 29px 39px">
          <ellipse cx="29" cy="42" rx="4.5" ry="2.2" fill="#f77f00" stroke="${OUTLINE}" stroke-width="1.4"/>
        </g>
        <g class="pet-leg leg-b" style="transform-origin: 37px 39px">
          <ellipse cx="37" cy="42" rx="4.5" ry="2.2" fill="#f77f00" stroke="${OUTLINE}" stroke-width="1.4"/>
        </g>
        <g class="pet-body">
          <ellipse cx="33" cy="25" rx="13" ry="16" fill="#323846" stroke="${OUTLINE}" stroke-width="1.8"/>
          <ellipse cx="36" cy="27" rx="8.5" ry="11.5" fill="#ffffff"/>
          <path d="M23 23 C 19 26, 19 33, 24 34" fill="#323846" stroke="${OUTLINE}" stroke-width="1.6" stroke-linecap="round"/>
          <path d="M22 20 h21" stroke="#e63946" stroke-width="3.5" stroke-linecap="round"/>
          <path d="M38 20 l3 6" stroke="#e63946" stroke-width="3" stroke-linecap="round"/>
          <g class="pet-head">
            <g class="pet-eyes">
              <circle cx="35" cy="14.5" r="1.7" fill="${OUTLINE}"/>
              <circle cx="41" cy="14.5" r="1.7" fill="${OUTLINE}"/>
              <circle cx="35.5" cy="14" r="0.6" fill="#ffffff"/>
              <circle cx="41.5" cy="14" r="0.6" fill="#ffffff"/>
            </g>
            <path d="M44 15 L 51 17 L 44 19.5 Z" fill="#ffb703" stroke="${OUTLINE}" stroke-width="1.4" stroke-linejoin="round"/>
            <circle cx="32" cy="17.5" r="1.6" fill="#ff9bb5" opacity="0.75"/>
          </g>
        </g>
      </svg>`,
    frog: `
      <svg viewBox="0 0 64 48" width="100%" height="100%" aria-hidden="true">
        <g class="pet-leg leg-a" style="transform-origin: 20px 35px">
          <ellipse cx="19" cy="39" rx="6" ry="3.5" fill="#52b788" stroke="${OUTLINE}" stroke-width="1.6"/>
        </g>
        <g class="pet-body">
          <ellipse cx="33" cy="31" rx="16" ry="10.5" fill="#74c69d" stroke="${OUTLINE}" stroke-width="1.8"/>
          <ellipse cx="35" cy="34" rx="11" ry="6.5" fill="#d8f3dc"/>
          <g class="pet-head">
            <circle cx="29" cy="19" r="5.2" fill="#74c69d" stroke="${OUTLINE}" stroke-width="1.8"/>
            <circle cx="42" cy="19" r="5.2" fill="#74c69d" stroke="${OUTLINE}" stroke-width="1.8"/>
            <g class="pet-eyes">
              <circle cx="29.5" cy="18.8" r="2.3" fill="${OUTLINE}"/>
              <circle cx="42.5" cy="18.8" r="2.3" fill="${OUTLINE}"/>
              <circle cx="30.2" cy="18" r="0.8" fill="#ffffff"/>
              <circle cx="43.2" cy="18" r="0.8" fill="#ffffff"/>
            </g>
            <path d="M29 28 Q 37 33 45 27" fill="none" stroke="${OUTLINE}" stroke-width="1.6" stroke-linecap="round"/>
            <circle cx="25" cy="27" r="2" fill="#ff9bb5" opacity="0.7"/>
            <circle cx="46" cy="26.5" r="2" fill="#ff9bb5" opacity="0.7"/>
          </g>
        </g>
        <g class="pet-leg leg-b" style="transform-origin: 42px 36px">
          <rect x="40" y="35" width="5" height="8" rx="2.5" fill="#74c69d" stroke="${OUTLINE}" stroke-width="1.5"/>
        </g>
      </svg>`,
    hamster: `
      <svg viewBox="0 0 64 48" width="100%" height="100%" aria-hidden="true">
        <g class="pet-tail" style="transform-origin: 16px 32px">
          <circle cx="15" cy="32" r="2.8" fill="#f6bd60" stroke="${OUTLINE}" stroke-width="1.4"/>
        </g>
        <g class="pet-leg leg-a" style="transform-origin: 25px 39px"><ellipse cx="25" cy="41.5" rx="3.5" ry="2.2" fill="#ffb5a7" stroke="${OUTLINE}" stroke-width="1.3"/></g>
        <g class="pet-leg leg-b" style="transform-origin: 40px 39px"><ellipse cx="40" cy="41.5" rx="3.5" ry="2.2" fill="#ffb5a7" stroke="${OUTLINE}" stroke-width="1.3"/></g>
        <g class="pet-body">
          <ellipse cx="33" cy="28" rx="16" ry="13.5" fill="#f6bd60" stroke="${OUTLINE}" stroke-width="1.8"/>
          <ellipse cx="35" cy="32" rx="11.5" ry="9" fill="#fff8f0"/>
          <g class="pet-head">
            <circle cx="25" cy="15" r="4.2" fill="#f6bd60" stroke="${OUTLINE}" stroke-width="1.6"/>
            <circle cx="25" cy="15" r="2.2" fill="#ffb5a7"/>
            <circle cx="43" cy="15" r="4.2" fill="#f6bd60" stroke="${OUTLINE}" stroke-width="1.6"/>
            <circle cx="43" cy="15" r="2.2" fill="#ffb5a7"/>
            <g class="pet-eyes">
              <circle cx="32" cy="23" r="1.9" fill="${OUTLINE}"/>
              <circle cx="41" cy="23" r="1.9" fill="${OUTLINE}"/>
              <circle cx="32.6" cy="22.3" r="0.6" fill="#ffffff"/>
              <circle cx="41.6" cy="22.3" r="0.6" fill="#ffffff"/>
            </g>
            <ellipse cx="37" cy="25.5" rx="1.4" ry="1" fill="#ff7aa2"/>
            <circle cx="28.5" cy="26.5" r="2.8" fill="#ff9bb5" opacity="0.65"/>
            <circle cx="44" cy="26.5" r="2.8" fill="#ff9bb5" opacity="0.65"/>
          </g>
        </g>
      </svg>`,
    shiba: `
      <svg viewBox="0 0 64 48" width="100%" height="100%" aria-hidden="true">
        <g class="pet-tail" style="transform-origin: 15px 24px">
          <path d="M15 26 C 7 22, 6 12, 13 12 C 18 12, 17 20, 14 22" fill="#fff8f0" stroke="${OUTLINE}" stroke-width="1.8" stroke-linecap="round"/>
        </g>
        <g class="pet-leg leg-a" style="transform-origin: 20px 34px"><rect x="18" y="33" width="5" height="11" rx="2.5" fill="#d98a3c" stroke="${OUTLINE}" stroke-width="1.5"/></g>
        <g class="pet-leg leg-b" style="transform-origin: 41px 34px"><rect x="39" y="33" width="5" height="11" rx="2.5" fill="#d98a3c" stroke="${OUTLINE}" stroke-width="1.5"/></g>
        <g class="pet-body">
          <ellipse cx="30" cy="29" rx="17" ry="10" fill="#e99a49" stroke="${OUTLINE}" stroke-width="1.8"/>
          <path d="M20 33 Q 30 38 42 32" fill="#fff8f0"/>
          <path d="M38 29 h9" stroke="#2a9d8f" stroke-width="3" stroke-linecap="round"/>
          <g class="pet-head">
            <path d="M41 12 L43 2 L49 10 Z" fill="#e99a49" stroke="${OUTLINE}" stroke-width="1.8" stroke-linejoin="round"/>
            <path d="M51 10 L57 2 L59 12 Z" fill="#e99a49" stroke="${OUTLINE}" stroke-width="1.8" stroke-linejoin="round"/>
            <circle cx="50" cy="18.5" r="10" fill="#e99a49" stroke="${OUTLINE}" stroke-width="1.8"/>
            <ellipse cx="52" cy="22.5" rx="7.5" ry="5.5" fill="#fff8f0"/>
            <ellipse cx="47.5" cy="13.5" rx="1.6" ry="1" fill="#fff8f0"/>
            <ellipse cx="54.5" cy="13.5" rx="1.6" ry="1" fill="#fff8f0"/>
            <g class="pet-eyes">
              <circle cx="48" cy="17" r="1.6" fill="${OUTLINE}"/>
              <circle cx="54.5" cy="17" r="1.6" fill="${OUTLINE}"/>
            </g>
            <ellipse cx="57.5" cy="20" rx="1.9" ry="1.4" fill="${OUTLINE}"/>
            <path d="M53.5 23.5 q2 1.8 4.2 0" fill="none" stroke="${OUTLINE}" stroke-width="1.1" stroke-linecap="round"/>
          </g>
        </g>
        <g class="pet-leg leg-b" style="transform-origin: 24px 34px"><rect x="22" y="33" width="5" height="11" rx="2.5" fill="#e99a49" stroke="${OUTLINE}" stroke-width="1.5"/></g>
        <g class="pet-leg leg-a" style="transform-origin: 45px 34px"><rect x="43" y="33" width="5" height="11" rx="2.5" fill="#e99a49" stroke="${OUTLINE}" stroke-width="1.5"/></g>
      </svg>`
  };

  const PET_CONFIGS = [
    { type: 'cat',     label: 'Pet cat',     title: 'Meow!',   speed: 58, sounds: ['Meow!', 'Mew~', 'Purr...'] },
    { type: 'dog',     label: 'Pet dog',     title: 'Woof!',   speed: 72, sounds: ['Woof!', 'Arf!', 'Bark!'] },
    { type: 'bunny',   label: 'Pet bunny',   title: 'Hop!',    speed: 64, sounds: ['Boing!', 'Hop~', 'Squeak!'] },
    { type: 'fox',     label: 'Pet fox',     title: 'Yip!',    speed: 78, sounds: ['Yip!', 'Yap~', 'Kon kon!'] },
    { type: 'panda',   label: 'Pet panda',   title: 'Munch!',  speed: 44, sounds: ['Nom nom~', 'Yawn...', 'Munch!'] },
    { type: 'duck',    label: 'Pet duck',    title: 'Quack!',  speed: 52, sounds: ['Quack!', 'Quack quack!', 'Waddle~'] },
    { type: 'penguin', label: 'Pet penguin', title: 'Noot!',   speed: 50, sounds: ['Noot noot!', 'Waddle~', 'Peep!'] },
    { type: 'frog',    label: 'Pet frog',    title: 'Ribbit!', speed: 60, sounds: ['Ribbit!', 'Croak~', 'Boing!'] },
    { type: 'hamster', label: 'Pet hamster', title: 'Squeak!', speed: 66, sounds: ['Squeak!', 'Chomp~', 'Pui pui!'] },
    { type: 'shiba',   label: 'Pet shiba',   title: 'Bork!',   speed: 74, sounds: ['Bork!', 'Much wow!', 'Awoo~'] }
  ];

  // Elements across the page that pets can perch on and walk across.
  const PLATFORM_SELECTOR = [
    '.cyber-social-btn',
    '.cyber-badge',
    '.cyber-avatar-wrapper',
    '.cyber-about-body',
    'main article .card',
    '#post-list .card-wrapper',
    'main .content h2',
    'main .content h3',
    '.resume-timeline-item',
    'main .btn',
    '#sidebar .nav-item',
    '#sidebar .profile-wrapper',
    '.post-tag',
    'pre',
    'blockquote'
  ].join(', ');

  const style = document.createElement('style');
  style.textContent = `
    .web-pet {
      position: fixed;
      left: 0;
      bottom: 2px;
      width: 92px;
      height: 69px;
      z-index: 1040;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      will-change: transform;
      contain: layout style;
      backface-visibility: hidden;
    }
    .web-pet-sprite {
      width: 100%;
      height: 100%;
      will-change: transform;
      backface-visibility: hidden;
    }
    .web-pet-sprite svg { display: block; width: 100%; height: 100%; overflow: visible; }
    .web-pet .pet-leg, .web-pet .pet-tail, .web-pet .pet-body, .web-pet .pet-head, .web-pet .pet-ear { transform-box: view-box; }

    .web-pet .pet-tail { animation: pet-tail-wag 0.9s ease-in-out infinite alternate; }
    .web-pet.dog .pet-tail, .web-pet.fox .pet-tail, .web-pet.shiba .pet-tail { animation-duration: 0.28s; }
    .web-pet .pet-eyes { transform-box: fill-box; transform-origin: center; animation: pet-blink 4s infinite; }

    .web-pet.walk .leg-a, .web-pet.run .leg-a { animation: pet-leg 0.34s ease-in-out infinite alternate; }
    .web-pet.walk .leg-b, .web-pet.run .leg-b { animation: pet-leg 0.34s ease-in-out infinite alternate-reverse; }
    .web-pet.run .leg-a, .web-pet.run .leg-b { animation-duration: 0.18s; }
    .web-pet.walk .pet-body, .web-pet.run .pet-body { animation: pet-bob 0.34s ease-in-out infinite alternate; }
    .web-pet.run .pet-body { animation-duration: 0.18s; }
    .web-pet.dog.walk .pet-ear, .web-pet.dog.run .pet-ear,
    .web-pet.bunny.walk .pet-ear, .web-pet.bunny.run .pet-ear { animation: pet-ear 0.34s ease-in-out infinite alternate; }

    .web-pet.bunny.walk .pet-body, .web-pet.frog.walk .pet-body { animation: pet-hop 0.42s ease-in-out infinite alternate; }
    .web-pet.bunny.run .pet-body, .web-pet.frog.run .pet-body { animation: pet-hop 0.26s ease-in-out infinite alternate; }

    .web-pet.sit .pet-body { transform: rotate(-12deg) translate(-2px, 2px); transform-origin: 20px 40px; }
    .web-pet.sit .pet-head { transform: rotate(12deg); transform-origin: 48px 22px; }

    .web-pet.sleep .pet-body { transform: translateY(4px); }
    .web-pet.sleep .pet-leg { transform: scaleY(0.45); }
    .web-pet.sleep .pet-eyes { animation: none; transform: scaleY(0.15); }
    .web-pet.sleep .pet-tail { animation-duration: 2.5s; }

    .web-pet-bubble {
      position: absolute;
      left: 50%;
      bottom: 100%;
      transform: translateX(-50%);
      font: 700 15px/1 "Lato", sans-serif;
      color: #7b2ff7;
      pointer-events: none;
      white-space: nowrap;
      animation: pet-bubble 1.4s ease-out forwards;
      text-shadow: 0 0 6px rgba(255, 255, 255, 0.85);
    }

    @keyframes pet-leg { from { transform: rotate(-22deg); } to { transform: rotate(22deg); } }
    @keyframes pet-bob { from { transform: translateY(0); } to { transform: translateY(-2px); } }
    @keyframes pet-hop { from { transform: translateY(0); } to { transform: translateY(-9px); } }
    @keyframes pet-tail-wag { from { transform: rotate(-14deg); } to { transform: rotate(16deg); } }
    @keyframes pet-ear { from { transform: rotate(-6deg); } to { transform: rotate(10deg); } }
    @keyframes pet-blink { 0%, 92%, 100% { transform: scaleY(1); } 95% { transform: scaleY(0.1); } }
    @keyframes pet-bubble {
      from { opacity: 0; transform: translate(-50%, 4px) scale(0.6); }
      20% { opacity: 1; transform: translate(-50%, -4px) scale(1); }
      to { opacity: 0; transform: translate(-50%, -34px) scale(1.1); }
    }

    @media (max-width: 576px) {
      .web-pet { width: 68px; height: 51px; }
    }
    @media print { .web-pet { display: none; } }
  `;
  document.head.appendChild(style);

  const GRAVITY = 1500;
  const MIN_SPACING = 95; // Minimum distance before pets gently steer away from each other
  const mouse = { x: -1, y: -1, lastMove: 0 };
  window.addEventListener('pointermove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.lastMove = performance.now();
  }, { passive: true });

  const rand = (min, max) => min + Math.random() * (max - min);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  const petWidth = () => (window.innerWidth <= 576 ? 68 : 92);
  const petHeight = () => (window.innerWidth <= 576 ? 51 : 69);

  const platformMap = new Map();
  let platforms = [];
  let pets = [];

  const updatePlatforms = () => {
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const pw = petWidth();
    const ph = petHeight();
    const nextList = [];
    const seen = new Set();

    document.querySelectorAll(PLATFORM_SELECTOR).forEach((el) => {
      if (el.offsetParent === null) return;
      const rect = el.getBoundingClientRect();
      if (rect.width < 48 || rect.height < 14) return;
      if (rect.top < ph + 8 || rect.top > vh - 24) return;
      if (rect.right < 24 || rect.left > vw - 24) return;

      const y = vh - rect.top - 4;
      const minX = clamp(rect.left - pw * 0.35, 0, vw - pw);
      const maxX = clamp(rect.right - pw * 0.65, minX, vw - pw);

      let entry = platformMap.get(el);
      if (!entry) {
        entry = { el, y, left: rect.left, right: rect.right, minX, maxX };
        platformMap.set(el, entry);
      } else {
        entry.y = y;
        entry.left = rect.left;
        entry.right = rect.right;
        entry.minX = minX;
        entry.maxX = maxX;
      }

      seen.add(el);
      nextList.push(entry);
    });

    platformMap.forEach((_, el) => {
      if (!seen.has(el)) platformMap.delete(el);
    });

    platforms = nextList;
  };

  let scrollRaf = null;
  const schedulePlatformUpdate = () => {
    if (scrollRaf !== null) return;
    scrollRaf = window.requestAnimationFrame(() => {
      scrollRaf = null;
      updatePlatforms();
    });
  };
  window.addEventListener('scroll', schedulePlatformUpdate, { passive: true });
  window.addEventListener('resize', schedulePlatformUpdate);

  const countPetsOnPlatform = (plat, excludePet) => {
    let count = 0;
    for (let i = 0; i < pets.length; i += 1) {
      if (pets[i] !== excludePet && pets[i].platform === plat) count += 1;
    }
    return count;
  };

  const isSpotCrowded = (x, y, excludePet, radius = 110) => {
    for (let i = 0; i < pets.length; i += 1) {
      const other = pets[i];
      if (other !== excludePet && Math.hypot(other.x - x, other.y - y) < radius) {
        return true;
      }
    }
    return false;
  };

  const createPet = (cfg, startX, homeZoneX) => {
    const el = document.createElement('div');
    el.className = `web-pet ${cfg.type}`;
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', cfg.label);
    el.title = cfg.title;
    const sprite = document.createElement('div');
    sprite.className = 'web-pet-sprite';
    sprite.innerHTML = SVG[cfg.type];
    el.appendChild(sprite);
    document.body.appendChild(el);

    const pet = {
      type: cfg.type,
      el,
      sprite,
      x: startX,
      y: 0,
      vy: 0,
      vxAir: 0,
      homeZoneX,
      platform: null,
      ignorePlatformsUntil: 0,
      turnCooldown: 0,
      dir: Math.random() < 0.5 ? -1 : 1,
      lastDir: 0,
      state: 'walk',
      timer: rand(1.5, 4.5),
      speed: cfg.speed,
      sound: cfg.sounds
    };

    el.addEventListener('click', () => {
      if (!launchToRandomPlatform(pet)) {
        jump(pet, 540, pet.dir * pet.speed);
      }
      say(pet, Math.random() < 0.45 ? '❤' : pick(pet.sound));
    });

    return pet;
  };

  const say = (pet, text) => {
    const bubble = document.createElement('span');
    bubble.className = 'web-pet-bubble';
    bubble.textContent = text;
    bubble.addEventListener('animationend', () => bubble.remove(), { once: true });
    pet.el.appendChild(bubble);
  };

  const groundY = (pet) => (pet.platform ? pet.platform.y : 0);
  const onSurface = (pet) => Math.abs(pet.y - groundY(pet)) < 1.5 && pet.vy <= 0;

  const jump = (pet, power, vx = 0) => {
    if (onSurface(pet)) {
      pet.vy = power;
      pet.vxAir = vx;
      pet.platform = null;
      if (pet.state === 'sleep' || pet.state === 'sit') {
        setState(pet, 'walk', rand(2, 4));
      }
    }
  };

  const launchToPlatform = (pet, targetPlat) => {
    if (!targetPlat) return false;
    const targetX = rand(targetPlat.minX, targetPlat.maxX);
    const targetY = targetPlat.y;
    const peakAbove = rand(65, 125);
    const peakY = Math.max(pet.y, targetY) + peakAbove;
    const vy = Math.sqrt(2 * GRAVITY * Math.max(40, peakY - pet.y));
    const tUp = vy / GRAVITY;
    const tDown = Math.sqrt((2 * Math.max(10, peakY - targetY)) / GRAVITY);
    const totalTime = Math.max(0.35, tUp + tDown);
    const vx = clamp((targetX - pet.x) / totalTime, -500, 500);

    pet.vy = vy;
    pet.vxAir = vx;
    pet.platform = null;
    pet.ignorePlatformsUntil = performance.now() + tUp * 750;
    if (Math.abs(vx) > 8) pet.dir = vx > 0 ? 1 : -1;
    setState(pet, 'walk', rand(3, 6));
    return true;
  };

  const launchToRandomPlatform = (pet) => {
    if (platforms.length === 0) return false;
    // Prefer unoccupied platforms so pets don't pile up on the same button/heading
    const free = platforms.filter(
      (p) =>
        p !== pet.platform &&
        countPetsOnPlatform(p, pet) === 0 &&
        !isSpotCrowded((p.minX + p.maxX) / 2, p.y, pet, 95) &&
        Math.hypot((p.minX + p.maxX) / 2 - pet.x, p.y - pet.y) < 650
    );
    const pool = free.length > 0 ? free : platforms.filter((p) => p !== pet.platform);
    if (pool.length === 0) return false;
    return launchToPlatform(pet, pick(pool));
  };

  const walkOffPlatform = (pet) => {
    if (!pet.platform) return;
    pet.platform = null;
    pet.vy = 40; // Slight step-off pop, then gravity pulls it down naturally
    pet.vxAir = pet.dir * pet.speed * 1.05;
    pet.ignorePlatformsUntil = performance.now() + 260;
  };

  const setState = (pet, state, duration) => {
    pet.state = state;
    pet.timer = duration;
    if (state === 'sleep') say(pet, 'Zzz');
  };

  const chooseNextState = (pet) => {
    const r = Math.random();
    const mouseActive = performance.now() - mouse.lastMove < 3000 && mouse.x >= 0;

    // Jump onto a platform or step off the current one
    if (onSurface(pet) && platforms.length > 0 && r < 0.34) {
      if (pet.platform && Math.random() < 0.45) {
        walkOffPlatform(pet);
        return setState(pet, 'walk', rand(2.5, 5));
      }
      if (launchToRandomPlatform(pet)) return;
    }

    // Only 1-2 closest pets chase the mouse at a time so all 10 don't clump on the cursor
    if (mouseActive && r < 0.44) {
      const distToMouse = Math.abs(pet.x - mouse.x);
      const closerPets = pets.filter((p) => p !== pet && Math.abs(p.x - mouse.x) < distToMouse).length;
      if (closerPets < 2) {
        return setState(pet, 'chase', rand(2.5, 4.5));
      }
    }

    if (r < 0.72) {
      // Gently bias walking direction toward the pet's own spread-out home zone
      const toHome = pet.homeZoneX - pet.x;
      if (Math.abs(toHome) > window.innerWidth * 0.25 && Math.random() < 0.7) {
        pet.dir = toHome > 0 ? 1 : -1;
      } else {
        pet.dir = Math.random() < 0.5 ? -1 : 1;
      }
      return setState(pet, 'walk', rand(3, 6));
    }
    if (r < 0.86) return setState(pet, 'sit', rand(2, 4.5));
    if (r < 0.94) return setState(pet, 'run', rand(1.5, 3));
    return setState(pet, 'sleep', rand(5, 9));
  };

  const update = (pet, dt, now) => {
    const pw = petWidth();
    const screenMaxX = Math.max(0, window.innerWidth - pw);
    if (pet.turnCooldown > 0) pet.turnCooldown -= dt;

    if (pet.platform) {
      if (!platformMap.has(pet.platform.el)) {
        pet.platform = null;
      } else {
        pet.y = pet.platform.y;
      }
    }

    pet.timer -= dt;
    if (pet.timer <= 0) chooseNextState(pet);

    const grounded = onSurface(pet);

    // Anti-crowding: if another pet is too close on the same level, steer away or walk off
    if (grounded && pet.turnCooldown <= 0) {
      for (let i = 0; i < pets.length; i += 1) {
        const other = pets[i];
        if (other === pet) continue;
        const dx = pet.x - other.x;
        const dy = Math.abs(pet.y - other.y);
        if (dy < 24 && Math.abs(dx) < MIN_SPACING) {
          const awayDir = dx >= 0 ? 1 : -1;
          pet.dir = awayDir;
          pet.turnCooldown = 0.7;
          if (pet.state === 'sit' || pet.state === 'sleep') {
            setState(pet, 'walk', rand(2, 4));
          }
          break;
        }
      }
    }

    let moving = false;

    if (!grounded) {
      pet.x += pet.vxAir * dt;
      if (Math.abs(pet.vxAir) > 8) pet.dir = pet.vxAir > 0 ? 1 : -1;
      moving = true;
    } else if (pet.state === 'walk' || pet.state === 'run') {
      const speed = pet.state === 'run' ? pet.speed * 2.1 : pet.speed;
      pet.x += pet.dir * speed * dt;
      moving = true;
      if (!pet.platform && Math.random() < dt * 0.18) {
        jump(pet, rand(380, 500), pet.dir * speed * 0.85);
      }
    } else if (pet.state === 'chase') {
      if (grounded && Math.random() < dt * 1.1 && mouse.y >= 0) {
        const cursorY = window.innerHeight - mouse.y;
        const nearCursor = platforms.find(
          (p) =>
            Math.abs(p.y - cursorY) < 90 &&
            mouse.x >= p.left - 40 &&
            mouse.x <= p.right + 40 &&
            countPetsOnPlatform(p, pet) === 0
        );
        if (nearCursor && nearCursor !== pet.platform) {
          launchToPlatform(pet, nearCursor);
        }
      }
      const target = clamp(mouse.x - pw / 2, 0, screenMaxX);
      const diff = target - pet.x;
      if (Math.abs(diff) > 30) {
        pet.dir = diff > 0 ? 1 : -1;
        pet.x += pet.dir * pet.speed * 1.85 * dt;
        moving = true;
      }
    }

    // Platform & screen boundaries:
    // When on a platform, pets can naturally walk right off the edge and fall down!
    if (grounded && pet.platform) {
      const p = pet.platform;
      if (pet.x < p.minX - 6 || pet.x > p.maxX + 6) {
        walkOffPlatform(pet);
      }
    }

    // Keep inside screen horizontally
    if (pet.x <= 0) {
      pet.x = 0;
      pet.dir = 1;
      if (!grounded) pet.vxAir = Math.abs(pet.vxAir);
    } else if (pet.x >= screenMaxX) {
      pet.x = screenMaxX;
      pet.dir = -1;
      if (!grounded) pet.vxAir = -Math.abs(pet.vxAir);
    }

    // Gravity + landing detection (avoid landing on already-occupied platforms)
    const floor = groundY(pet);
    if (pet.y > floor || pet.vy !== 0) {
      const prevY = pet.y;
      pet.vy -= GRAVITY * dt;
      pet.y += pet.vy * dt;

      if (pet.vy < 0 && now > pet.ignorePlatformsUntil) {
        const centerX = pet.x + pw / 2;
        for (let i = 0; i < platforms.length; i += 1) {
          const p = platforms[i];
          if (
            centerX >= p.left &&
            centerX <= p.right &&
            prevY >= p.y - 6 &&
            pet.y <= p.y + 6 &&
            countPetsOnPlatform(p, pet) === 0
          ) {
            pet.platform = p;
            pet.y = p.y;
            pet.vy = 0;
            pet.vxAir = 0;
            break;
          }
        }
      }

      const newFloor = groundY(pet);
      if (pet.y <= newFloor) {
        pet.y = newFloor;
        pet.vy = 0;
        pet.vxAir = 0;
      }
    }

    let cls = pet.state === 'chase' ? (moving ? 'run' : 'sit') : pet.state;
    if (!moving && (cls === 'walk' || cls === 'run')) cls = 'sit';
    const className = `web-pet ${pet.type} ${cls}`;
    if (pet.el.className !== className) pet.el.className = className;

    pet.el.style.transform = `translate3d(${pet.x}px, ${-pet.y}px, 0)`;
    if (pet.lastDir !== pet.dir) {
      pet.lastDir = pet.dir;
      pet.sprite.style.transform = `scaleX(${pet.dir})`;
    }
  };

  const shuffle = (arr) => {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const start = () => {
    updatePlatforms();
    const maxX = Math.max(100, window.innerWidth - petWidth());
    const shuffledConfigs = shuffle(PET_CONFIGS);
    const step = maxX / shuffledConfigs.length;

    pets = shuffledConfigs.map((cfg, idx) => {
      // Spread evenly across slots in random order, with random jitter inside each slot
      const slotStart = step * idx;
      const startX = clamp(slotStart + rand(step * 0.1, step * 0.9), 0, maxX);
      const homeZoneX = clamp(slotStart + step * 0.5 + rand(-step * 0.35, step * 0.35), 0, maxX);
      const pet = createPet(cfg, startX, homeZoneX);
      pet.state = pick(['walk', 'walk', 'sit', 'run']);
      return pet;
    });

    // Randomly perch a subset of pets across shuffled platforms on every page/tab load
    const shuffledPlatforms = shuffle(platforms);
    const usedPlatforms = new Set();
    pets.forEach((pet) => {
      if (shuffledPlatforms.length > 0 && Math.random() < 0.55) {
        const candidate = shuffledPlatforms.find(
          (p) => !usedPlatforms.has(p) && !isSpotCrowded(rand(p.minX, p.maxX), p.y, pet, 105)
        );
        if (candidate) {
          usedPlatforms.add(candidate);
          pet.platform = candidate;
          pet.x = clamp(rand(candidate.minX, candidate.maxX), 0, maxX);
          pet.y = candidate.y;
          // Occasionally drop in from slightly above the platform on page entry
          if (Math.random() < 0.35) {
            pet.y += rand(25, 70);
            pet.platform = null;
          }
        }
      } else if (Math.random() < 0.25) {
        // Some floor pets hop/drop in from varying heights on load
        pet.y = rand(30, 110);
      }
    });

    if (reduceMotion) {
      pets.forEach((p) => {
        p.state = 'sit';
        update(p, 0, 0);
      });
      return;
    }

    let last = performance.now();
    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.033);
      last = now;

      for (let i = 0; i < pets.length; i += 1) {
        update(pets[i], dt, now);
      }

      window.requestAnimationFrame(loop);
    };
    window.requestAnimationFrame(loop);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
