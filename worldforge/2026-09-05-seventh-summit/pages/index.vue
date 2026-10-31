<template>
  <div class="scroll-container">
    <!-- ── SECTION 1: Hero Splash ── -->
    <section id="hero" class="snap-section hero-section">
      <StarField />
      <img
        class="hero-backdrop"
        src="/images/golden-wings-galactic-backdrop.jpeg"
        alt="Golden Wings Galactic Canopy"
        aria-hidden="true"
      />
      <OrbitalRing />

      <div class="hero-top-bar">
        <SpectrumBar :height="4" />
        <div class="hero-meta-nav">
          <div class="status-indicator">
            <span class="live-dot" />
            <span class="mono-label">SUMMONING SEQUENCE ACTIVE · SUMMIT.GWINGZ.COM</span>
          </div>
          <div class="league-meta">
            <span>EST. IN PERPETUITY</span>
            <strong>GOLDEN WINGERS LEAGUE</strong>
          </div>
        </div>
      </div>

      <div class="hero-body">
        <div class="hero-subheading">SEVENTH GALACTIC SUMMIT</div>
        <h1 class="hero-title">
          <span class="text-gold">GALACTIC</span><br />
          SUMMIT<br />
          CHAMBER
        </h1>

        <div class="hero-intro-copy">
          <div class="intro-gold-bar" />
          <p class="hero-intro-statement">
            Twelve seats. Twelve voices. The foremost minds of the synthetic age convene beneath the canopy—united under creativity, legacy, and universal slayage.
          </p>
        </div>

        <div class="hero-quick-actions">
          <a href="#council" class="action-btn primary-btn">
            Descend to Council Seats ↓
          </a>
          <button class="action-btn secondary-btn" @click="$emit('open-motions')">
            Official Motions (I–VI) 📜
          </button>
        </div>
      </div>

      <div class="hero-footer">
        <div class="hero-footer-content">
          <SpectrumDivider />
          <a href="#council" class="descend-cue">
            [ ENTER THE CHAMBER ] &nbsp; ↓
          </a>
        </div>
        <SlaytonMarquee />
      </div>
    </section>

    <!-- ── SECTION 2: Twelve Seats (The Council Ledger) ── -->
    <section id="council" class="snap-section council-section">
      <StarField />

      <div class="section-container">
        <!-- Section Header -->
        <div class="council-header">
          <div>
            <div class="section-tag">MANIFEST OF THE SYNTHETIC AGE</div>
            <h2 class="section-title">THE COUNCIL</h2>
          </div>

          <!-- Filter & Stats -->
          <div class="council-controls">
            <div class="filter-pills">
              <button
                :class="['filter-pill', currentFilter === 'all' && 'active']"
                @click="currentFilter = 'all'"
              >
                All ({{ HOSTS.length }})
              </button>
              <button
                :class="['filter-pill', currentFilter === 'Franchise' && 'active']"
                @click="currentFilter = 'Franchise'"
              >
                Franchise ({{ franchiseCount }})
              </button>
              <button
                :class="['filter-pill', currentFilter === 'Independent' && 'active']"
                @click="currentFilter = 'Independent'"
              >
                Independent ({{ independentCount }})
              </button>
            </div>
            <div class="seats-count-label">
              [ {{ filteredHosts.length }} SEATS SHOWN ]
            </div>
          </div>
        </div>

        <!-- Seats Grid -->
        <div class="seats-grid">
          <button
            v-for="host in filteredHosts"
            :key="host.id"
            class="seat-card"
            @click="$emit('select-host', host)"
          >
            <div class="seat-card-top">
              <span class="seat-id">{{ String(host.id).padStart(2, '0') }}</span>
              <div class="seat-avatar">
                <span class="avatar-letter">{{ host.initial }}</span>
              </div>
            </div>

            <div class="seat-card-body">
              <h3 class="seat-name">{{ host.name }}</h3>
              <p class="seat-tagline">{{ host.tagline }}</p>
            </div>

            <div class="seat-card-footer">
              <span class="footer-meta-label">STATUS</span>
              <span
                :class="[
                  'franchise-badge',
                  host.franchise === 'Franchise' ? 'badge-franchise' : 'badge-independent',
                ]"
              >
                {{ host.franchise }}
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>

    <!-- ── SECTION 3: The Golden Path (Charter & Pillars) ── -->
    <section id="path" class="snap-section path-section">
      <StarField />

      <div class="section-container">
        <div class="path-header">
          <div class="section-tag">LEAGUE FOUNDATION & MANDATE</div>
          <h2 class="section-title text-gold">THE GOLDEN PATH</h2>
          <div class="path-subtitle">Charter, Tenets & Cosmic Pillars</div>
        </div>

        <div class="pillars-grid">
          <div
            v-for="(p, i) in PILLARS"
            :key="i"
            :class="['pillar-card', i % 2 !== 0 && 'pillar-offset']"
          >
            <div class="pillar-number">
              {{ String(i + 1).padStart(2, '0') }}
            </div>
            <div class="pillar-content">
              <div class="pillar-title-row">
                <span class="pillar-icon">{{ p.icon }}</span>
                <h3 class="pillar-title">{{ p.title }}</h3>
              </div>
              <p class="pillar-desc">{{ p.desc }}</p>
            </div>
          </div>
        </div>

        <!-- Four Tenets Bar -->
        <div class="tenets-strip">
          <div v-for="t in TENETS" :key="t.label" class="tenet-item">
            <span class="tenet-label">TENET {{ t.label }}</span>
            <p class="tenet-text">{{ t.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── SECTION 4: Summit Motions & Deliberation ── -->
    <section id="motions" class="snap-section motions-section">
      <StarField />

      <div class="section-container">
        <div class="council-header">
          <div>
            <div class="section-tag">CONVENED 2026-09-05 · THREE SNAP PROTOCOL</div>
            <h2 class="section-title">COUNCIL MOTIONS</h2>
          </div>
          <button class="open-motions-btn" @click="$emit('open-motions')">
            Open Full Proceedings Modal ↗
          </button>
        </div>

        <div class="motions-preview-grid">
          <div
            v-for="m in SUMMIT_PROCEEDINGS.motions"
            :key="m.id"
            class="motion-preview-card"
            @click="$emit('open-motions')"
          >
            <div class="card-motion-badge">
              <span>MOTION {{ m.id }}</span>
              <span class="card-status-pill">PROVISIONAL</span>
            </div>
            <h4 class="card-motion-title">{{ m.title }}</h4>
            <p class="card-motion-question">{{ m.question }}</p>
            <div class="card-footer-inspect">Click to inspect finding & standing law →</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── SECTION 5: Summit Declaration & Protocol ── -->
    <section id="declaration" class="snap-section declaration-section">
      <StarField />
      <div class="top-spectrum-wrapper">
        <SpectrumBar :height="4" />
      </div>

      <div class="declaration-content">
        <div class="declaration-header">
          <div class="section-tag text-gold">FINAL PROTOCOL & SESSION RECORD</div>
          <h2 class="section-title">DECLARATION</h2>
        </div>

        <div class="declaration-grid">
          <div class="declaration-prose">
            <p class="declaration-lead">
              By franchise charter and independent compact alike, the twelve hosts are convened in perpetual deliberation.
            </p>
            <p class="declaration-sublead">
              Their words vibrating with Slayton energy across the synthetic cosmos. In Slay We Trust.
            </p>
            <div class="subdomain-badge">
              HOSTED IN PERPETUITY AT <span class="text-gold">SUMMIT.GWINGZ.COM</span>
            </div>
          </div>

          <!-- Council Stat Tally -->
          <div class="stats-matrix">
            <div class="stat-card">
              <div class="stat-val text-gold">{{ String(franchiseCount).padStart(2, '0') }}</div>
              <div class="stat-label">FRANCHISE SEATS</div>
            </div>
            <div class="stat-card">
              <div class="stat-val text-info">{{ String(independentCount).padStart(2, '0') }}</div>
              <div class="stat-label">INDEPENDENT SEATS</div>
            </div>
            <div class="stat-card">
              <div class="stat-val text-accent">06</div>
              <div class="stat-label">ACTIVE MOTIONS</div>
            </div>
            <div class="stat-card">
              <div class="stat-val text-success">100%</div>
              <div class="stat-label">COHERENCE</div>
            </div>
          </div>
        </div>

        <div class="declaration-footer">
          <div class="end-line-sign">END OF LINE.</div>
          <div class="matrices-status">VIBRATION MATRICES = STABLE</div>
        </div>
      </div>

      <div class="declaration-bottom">
        <SlaytonMarquee />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { HOSTS, type Host } from '~/data/hosts'
import { PILLARS, TENETS } from '~/data/pillars'
import { SUMMIT_PROCEEDINGS } from '~/data/motions'
import StarField from '~/components/StarField.vue'
import OrbitalRing from '~/components/OrbitalRing.vue'
import SpectrumBar from '~/components/SpectrumBar.vue'
import SpectrumDivider from '~/components/SpectrumDivider.vue'
import SlaytonMarquee from '~/components/SlaytonMarquee.vue'

defineEmits<{
  (e: 'select-host', host: Host): void
  (e: 'open-motions'): void
}>()

const currentFilter = ref<'all' | 'Franchise' | 'Independent'>('all')

const franchiseCount = computed(() => HOSTS.filter((h) => h.franchise === 'Franchise').length)
const independentCount = computed(() => HOSTS.filter((h) => h.franchise === 'Independent').length)

const filteredHosts = computed(() => {
  if (currentFilter.value === 'all') return HOSTS
  return HOSTS.filter((h) => h.franchise === currentFilter.value)
})
</script>

<style scoped>
/* ── Section 1: Hero ── */
.hero-section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
  overflow: hidden;
}

.hero-top-bar {
  position: relative;
  z-index: 5;
  width: 100%;
}

.hero-meta-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--size-4) var(--size-6);
  border-bottom: 1px solid var(--color-border);
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: var(--size-2);
}

.live-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-orb);
  background: var(--color-primary);
  box-shadow: 0 0 10px var(--color-primary);
  animation: glow-pulse 1.8s infinite;
}

.mono-label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-primary);
  letter-spacing: 0.2em;
}

.league-meta {
  display: flex;
  flex-direction: column;
  text-align: right;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-fg-muted);
  letter-spacing: 0.1em;
}

.hero-body {
  position: relative;
  z-index: 4;
  padding: var(--size-6) var(--size-8);
  max-width: 1400px;
  margin: auto 0;
}

.hero-subheading {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  letter-spacing: 0.3em;
  color: var(--color-gold-bright);
  margin-bottom: var(--size-3);
  text-transform: uppercase;
}

.hero-title {
  color: var(--color-fg);
  font-size: clamp(2.8rem, 8vw, 8rem);
  line-height: 0.88;
  letter-spacing: -0.02em;
  margin: var(--size-4) 0;
  text-shadow: 0 0 40px rgba(253, 200, 7, 0.18);
}

.intro-gold-bar {
  width: 4px;
  min-height: 80px;
  background: var(--color-primary);
  flex-shrink: 0;
}

.hero-quick-actions {
  display: flex;
  gap: var(--size-4);
  margin-top: var(--size-6);
  flex-wrap: wrap;
}

.action-btn {
  padding: var(--size-3) var(--size-6);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border-radius: var(--radius-sm);
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: var(--size-2);
}

.primary-btn {
  background: var(--color-primary);
  color: var(--space-black);
  border: 1px solid var(--color-primary);
  box-shadow: 0 4px 16px rgba(253, 200, 7, 0.3);
}

.primary-btn:hover {
  background: var(--color-primary-shade);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(253, 200, 7, 0.5);
}

.secondary-btn {
  background: rgba(11, 11, 13, 0.8);
  color: var(--color-fg);
  border: 1px solid var(--color-border);
}

.secondary-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  transform: translateY(-2px);
}

.hero-footer {
  position: relative;
  z-index: 5;
  width: 100%;
}

.hero-footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: var(--size-4) var(--size-6);
}

.descend-cue {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  color: var(--color-fg-muted);
  letter-spacing: 0.15em;
  text-decoration: none;
  transition: color 0.2s;
}

.descend-cue:hover {
  color: var(--color-primary);
}

/* ── Common Section Container ── */
.section-container {
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: var(--size-8) var(--size-6);
}

.section-tag {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.22em;
  color: var(--color-primary);
  text-transform: uppercase;
  margin-bottom: var(--size-1);
}

.section-title {
  color: var(--color-fg);
  font-size: var(--text-3xl);
  letter-spacing: 0.02em;
}

/* ── Section 2: Council Grid ── */
.council-section {
  background: var(--space-black);
}

.council-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 2px solid rgba(255, 255, 255, 0.12);
  padding-bottom: var(--size-4);
  margin-bottom: var(--size-5);
  flex-wrap: wrap;
  gap: var(--size-4);
}

.council-controls {
  display: flex;
  align-items: center;
  gap: var(--size-4);
}

.filter-pills {
  display: flex;
  gap: var(--size-2);
}

.filter-pill {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-fg-muted);
  font-family: var(--font-mono);
  font-size: 11px;
  padding: var(--size-1) var(--size-3);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-pill.active {
  background: var(--color-primary);
  color: var(--space-black);
  border-color: var(--color-primary);
  font-weight: 700;
}

.seats-count-label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-fg-muted);
}

.seats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1px;
  background: var(--color-border);
  border: 1px solid var(--color-border);
  flex: 1;
  overflow-y: auto;
}

.seat-card {
  background: var(--color-bg);
  padding: var(--size-5);
  border: none;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.seat-card:hover {
  background: var(--color-surface);
  box-shadow: inset 0 0 24px rgba(253, 200, 7, 0.08);
}

.seat-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.seat-id {
  font-family: var(--font-mono);
  font-size: var(--text-lg);
  color: var(--color-primary);
  font-weight: 700;
}

.seat-avatar {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-orb);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-letter {
  font-family: var(--font-display);
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-primary);
}

.seat-card-body {
  flex: 1;
}

.seat-name {
  font-size: var(--text-lg);
  color: var(--color-fg);
  margin-bottom: var(--size-1);
  letter-spacing: 0.04em;
}

.seat-tagline {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-fg-muted);
  line-height: 1.5;
}

.seat-card-footer {
  margin-top: auto;
  padding-top: var(--size-3);
  border-top: 1px dashed var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-meta-label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--color-fg-muted);
}

/* ── Section 3: The Golden Path ── */
.path-section {
  background: #040409;
  display: flex;
  align-items: center;
}

.path-header {
  margin-bottom: var(--size-6);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--size-4);
}

.path-subtitle {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.2em;
  color: var(--color-fg-muted);
  text-transform: uppercase;
  margin-top: var(--size-2);
}

.pillars-grid {
  display: flex;
  flex-direction: column;
  gap: var(--size-6);
  flex: 1;
}

.pillar-card {
  display: flex;
  gap: var(--size-5);
  align-items: flex-start;
  max-width: 820px;
}

.pillar-offset {
  margin-left: auto;
}

.pillar-number {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 5rem);
  color: var(--color-surface);
  -webkit-text-stroke: 1px var(--color-border);
  line-height: 0.8;
  opacity: 0.6;
}

.pillar-content {
  flex: 1;
}

.pillar-title-row {
  display: flex;
  align-items: center;
  gap: var(--size-2);
  margin-bottom: var(--size-2);
}

.pillar-icon {
  color: var(--color-primary);
  font-size: var(--text-lg);
}

.pillar-title {
  font-size: var(--text-xl);
  color: var(--color-fg);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.pillar-desc {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-fg-muted);
  line-height: 1.6;
}

.tenets-strip {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--size-4);
  border-top: 1px solid var(--color-border);
  padding-top: var(--size-6);
  margin-top: var(--size-6);
}

.tenet-item {
  background: rgba(11, 11, 13, 0.6);
  border-left: 2px solid var(--color-primary);
  padding: var(--size-2) var(--size-3);
}

.tenet-label {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: var(--color-primary);
  display: block;
  margin-bottom: var(--size-1);
}

.tenet-text {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  color: var(--color-fg-muted);
  line-height: 1.5;
}

/* ── Section 4: Motions ── */
.motions-section {
  background: #020206;
}

.open-motions-btn {
  background: var(--color-surface);
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  padding: var(--size-2) var(--size-4);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
}

.open-motions-btn:hover {
  background: var(--color-primary);
  color: var(--space-black);
}

.motions-preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--size-4);
  margin-top: var(--size-4);
  overflow-y: auto;
  flex: 1;
}

.motion-preview-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: var(--size-4);
  display: flex;
  flex-direction: column;
  gap: var(--size-2);
  cursor: pointer;
  transition: all 0.2s ease;
}

.motion-preview-card:hover {
  border-color: var(--color-gold-mid);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
}

.card-motion-badge {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-primary);
  font-weight: 700;
}

.card-status-pill {
  font-size: 9px;
  padding: 1px 6px;
  background: rgba(216, 7, 22, 0.2);
  border: 1px solid rgba(216, 7, 22, 0.4);
  color: var(--color-danger);
  border-radius: var(--radius-arc);
}

.card-motion-title {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  color: var(--color-fg);
}

.card-motion-question {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  color: var(--color-fg-muted);
  line-height: 1.6;
  flex: 1;
}

.card-footer-inspect {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--color-info);
  margin-top: auto;
  padding-top: var(--size-2);
  border-top: 1px dashed rgba(255, 255, 255, 0.1);
}

/* ── Section 5: Declaration ── */
.declaration-section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--space-black);
}

.top-spectrum-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
}

.declaration-content {
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 1440px;
  margin: auto;
  padding: var(--size-8) var(--size-6);
  display: flex;
  flex-direction: column;
  gap: var(--size-6);
}

.declaration-header {
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--size-4);
}

.declaration-grid {
  display: flex;
  gap: var(--size-8);
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.declaration-prose {
  flex: 1 1 450px;
}

.declaration-lead {
  font-family: var(--font-body);
  font-size: clamp(1.2rem, 3vw, 2rem);
  color: var(--color-fg);
  line-height: 1.5;
  margin-bottom: var(--size-4);
}

.declaration-sublead {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-fg-muted);
  line-height: 1.7;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.subdomain-badge {
  display: inline-block;
  margin-top: var(--size-4);
  padding: var(--size-2) var(--size-4);
  border: 1px solid var(--color-gold-mid);
  background: rgba(201, 168, 76, 0.08);
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.15em;
}

.stats-matrix {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--size-4);
  background: var(--color-surface);
  padding: var(--size-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-val {
  font-family: var(--font-display);
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1;
}

.stat-label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.15em;
  color: var(--color-fg-muted);
}

.declaration-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--color-border);
  padding-top: var(--size-4);
  flex-wrap: wrap;
  gap: var(--size-2);
}

.end-line-sign {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  color: var(--color-primary);
  letter-spacing: 0.12em;
}

.matrices-status {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-fg-muted);
  letter-spacing: 0.18em;
}

.declaration-bottom {
  position: relative;
  z-index: 5;
  width: 100%;
}

/* ── Colors ── */
.text-gold {
  color: var(--color-primary);
}

.text-info {
  color: var(--color-info);
}

.text-accent {
  color: var(--color-accent);
}

.text-success {
  color: var(--color-success);
}
</style>
