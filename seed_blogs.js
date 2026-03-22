const API_URL = 'http://localhost:3000/api';

const blogsToAdd = [
  {
    date: '15 Mar 2026',
    category: 'Thought Leadership',
    title: 'The Private Credit Reckoning: How the $2 Trillion Market Faces Its First True Stress Test in 2026',
    subtitle: 'Covenant erosion, liquidity mismatches, and the structural fault lines that managers, borrowers, and LPs can no longer afford to ignore.',
    author: 'Jayden Ohen | Managing Partner, Mayspear Global',
    issue: 'Issue 01 | Q1 2026',
    description: `
<div class="blog-document">
  <section class="intro">
    <p><em>Jayden Ohen, Managing Partner, Mayspear Global</em></p>
    <div class="report-box">
      <h3>IN THIS REPORT</h3>
      <ol>
        <li>The structural fault lines in direct lending — covenant-lite exposure, PIK accumulation, maturity walls</li>
        <li>Why NAV lending has become the hidden leverage bomb inside LP portfolios</li>
        <li>The liquidity illusion: how semi-liquid credit vehicles are mis-sold and mis-understood</li>
        <li>Distressed-for-control: why 2026 creates a generational entry point for disciplined capital</li>
        <li>The Mayspear Global framework for advising GPs, LPs, and borrowers at this inflection</li>
      </ol>
    </div>
  </section>

  <section class="executive-summary">
    <h2>EXECUTIVE SUMMARY</h2>
    <p>Private credit has had its decade in the sun. From 2012 to 2024 the asset class grew from a niche alternative into a $2 trillion institutional cornerstone, seducing LPs with spread premiums, direct relationships, and an apparent immunity to the volatility afflicting public markets. That narrative is now under siege.</p>
    <p>The confluence of a higher-for-longer rate environment, structural covenant erosion, borrower stress in lower-middle-market portfolios, and capital call obligations that have outpaced distributions has created conditions that few vintage-2019 or vintage-2021 managers have navigated before. 2026 is not a crash — but it is, emphatically, a reckoning. And the firms that understand its anatomy will be positioned to exploit it with precision.</p>
    
    <div class="themes-box">
      <h3>KEY THEMES IN THIS REPORT</h3>
      <ul>
        <li>01 The structural fault lines in direct lending — covenant-lite exposure, PIK accumulation, and maturity walls</li>
        <li>02 Why NAV lending has become the hidden leverage bomb inside LP portfolios</li>
        <li>03 The liquidity illusion: how semi-liquid credit vehicles are mis-sold and mis-understood</li>
        <li>04 Distressed-for-control: why 2026 creates a generational entry point for disciplined capital</li>
        <li>05 Mayspear Global's framework for advising GPs, LPs, and borrowers at this inflection</li>
      </ul>
    </div>
  </section>

  <section class="section-one">
    <span class="section-label">SECTION ONE</span>
    <h2>The Architecture of a Market Built for a Different Rate World</h2>
    <p>To understand where private credit is vulnerable, one must first understand the conditions under which it was built. The modern direct lending ecosystem was architected principally between 2010 and 2021 — a period defined by near-zero base rates, abundant liquidity, compressed volatility, and a relentless institutional chase for yield. Managers who entered that decade with disciplined underwriting standards were, unfortunately, in the minority. The majority of capital deployment occurred in an environment where the cost of mistakes was low because the cost of money was lower.</p>
    <p>The structural choices made during this period now define the fault lines of 2026. Three architectural realities are shaping the current stress:</p>
    
    <h3>1. The Covenant-Lite Contagion</h3>
    <p>When banks dominated leveraged lending, financial maintenance covenants — leverage ratios, interest coverage tests, liquidity minimums — triggered early warning systems that gave lenders the ability to engage borrowers before situations deteriorated into insolvency. The 2015–2021 vintage of direct lending transactions quietly eroded this protection. Under competitive pressure from broadly syndicated markets and LP mandates to deploy capital efficiently, managers accepted covenant-lite or incurrence-only structures that provide materially less protection.</p>
    <p>With base rates now meaningfully higher than the assumptions embedded in original underwriting models, interest coverage ratios across the lower-middle market have compressed to levels that — under a traditional covenant framework — would have triggered technical defaults and lender engagement twelve to eighteen months ago. Instead, managers are largely flying blind into deteriorating credits.</p>
    
    <blockquote>
      "The interest coverage compression happening inside lower-middle-market portfolios today is not an anomaly. It is the structural bill coming due on a decade of covenant erosion. The only question is who has provisioned for it."
      <footer style="font-size: 0.9rem; margin-top: 10px; opacity: 0.7;">— Jayden Ohen, Managing Partner, Mayspear Global</footer>
    </blockquote>

    <h3>2. PIK Accumulation — Deferred Pain, Concentrated Risk</h3>
    <p>Payment-in-kind toggle mechanisms were originally designed as short-term flexibility tools for genuinely cyclical businesses with predictable recovery profiles. In the 2020–2023 deployment environment, PIK became a structural feature of transactions that would not have passed credit committee at any rigorous institution. The market now carries an estimated $180 billion in accrued PIK obligations across private credit portfolios, sitting quietly in NAV calculations that may or may not reflect the true probability of cash collection.</p>
    <p>PIK income accrues on the income statement and inflates NAV even as the underlying borrower's ability to service that debt in cash remains unverified. For LPs relying on reported performance metrics, this represents a material information asymmetry — one that Mayspear Global has consistently flagged in LP advisory mandates.</p>

    <h3>3. The 2025–2027 Maturity Wall</h3>
    <p>Approximately $400 billion in private credit transactions originated between 2020 and 2022 are scheduled to mature or require refinancing by the end of 2027. These transactions were underwritten at LIBOR-plus spreads assuming a low floor rate environment. They now face refinancing into a market where all-in cost of capital is 200 to 350 basis points higher than original underwriting assumptions.</p>
    <p>A $50 million senior secured facility underwritten at 6.5% all-in is refinancing at 9.0% to 10.5%. For a business generating $8 million in EBITDA with $5 million in original debt service, the incremental carrying cost is not trivially manageable. Extend that across an entire vintage and the maturity wall is a solvency test for a subset of the market that will be impossible to paper over.</p>
  </section>

  <section class="indicators">
    <span class="section-label">PRIVATE CREDIT MARKET STRESS INDICATORS — 2026</span>
    <table>
      <thead>
        <tr>
          <th>INDICATOR</th>
          <th>ESTIMATED SCALE</th>
          <th>RISK LEVEL</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>PIK Accrual Exposure</td>
          <td>~$180 Billion</td>
          <td><span class="risk-level risk-high">HIGH</span></td>
        </tr>
        <tr>
          <td>2025–2027 Maturity Wall</td>
          <td>~$400 Billion</td>
          <td><span class="risk-level risk-critical">CRITICAL</span></td>
        </tr>
        <tr>
          <td>Covenant-Lite Share (2018–2022 Vintage)</td>
          <td>&gt;65% of Vintage</td>
          <td><span class="risk-level risk-high">HIGH</span></td>
        </tr>
        <tr>
          <td>NAV Loan Leverage (Aggregate)</td>
          <td>Est. $80–120 Billion</td>
          <td><span class="risk-level risk-elevated">ELEVATED</span></td>
        </tr>
        <tr>
          <td>Semi-Liquid Vehicle Redemption Queue</td>
          <td>Est. $35–55 Billion</td>
          <td><span class="risk-level risk-moderate">MODERATE–HIGH</span></td>
        </tr>
        <tr>
          <td>Lower-MM Interest Coverage &lt; 1.5x</td>
          <td>~22% of Portfolio Cos</td>
          <td><span class="risk-level risk-high">HIGH</span></td>
        </tr>
      </tbody>
    </table>
    <p class="source">Sources: Preqin, LCD, Pitchbook, Mayspear Global analysis. Figures are estimates.</p>
  </section>

  <section class="section-two">
    <span class="section-label">SECTION TWO</span>
    <h2>NAV Lending: The Leverage-on-Leverage Problem LPs Are Not Pricing</h2>
    <p>Among the structural innovations of the last cycle, few carry more systemic risk than the proliferation of NAV-based lending. NAV loans — credit facilities extended to fund vehicles secured by the net asset value of the underlying portfolio — have grown from a boutique tool used by the most sophisticated institutional managers into a mainstream liquidity mechanism used by a surprisingly broad range of GPs.</p>
    <p>A manager with a $500 million fund showing $700 million in NAV borrows $70–$100 million at the fund level, typically at 10:1 LTV or lower, to fund distributions, cover management fees, or finance new investments without triggering capital calls. From the GP's perspective this is efficient capital management. From an LP's perspective — particularly one not reading quarterly letters carefully — this is an undisclosed leverage overlay on top of the already-levered underlying portfolio.</p>
    
    <h3>The Double-Count Problem</h3>
    <p>The fundamental problem with NAV lending at scale is the valuation circularity it creates. NAV loans are secured by a reported NAV that is itself subject to manager discretion. In a market where underlying portfolio company performance is deteriorating, managers face an obvious incentive to delay NAV write-downs that would trigger loan-to-value covenant breaches on their NAV facilities. The result is a daisy-chain of optimistic valuations, each depending on the one before it, all of which require a static or improving macro environment to remain coherent.</p>
    <p>Mayspear Global has advised multiple institutional LPs in the past 18 months on secondary market strategies specifically designed to identify and discount NAV exposure within fund portfolios. The haircuts warranted in the current environment range from 8% to 23% depending on vintage, sector concentration, and the extent of PIK accumulation in the underlying book.</p>
    
    <div class="advisory-note">
      <h3>MAYSPEAR GLOBAL ADVISORY NOTE</h3>
      <p>LPs negotiating side letters or participating in secondary transactions should require full disclosure of NAV facility terms, drawdown history, and current LTV ratios as a condition of any transaction. The absence of this disclosure is itself a material due diligence finding.</p>
    </div>
  </section>

  <section class="section-three">
    <span class="section-label">SECTION THREE</span>
    <h2>The Liquidity Illusion: Semi-Liquid Vehicles and the Gap Between Promise and Reality</h2>
    <p>The democratisation of private credit — the movement to make the asset class accessible to high-net-worth individuals and smaller institutions through semi-liquid, interval fund, or non-traded BDC structures — has been one of the most commercially successful product innovations of the 2020s. It has also created a structural fragility that the market has not yet confronted at scale.</p>
    <p>Private credit is, by its nature, illiquid. Senior secured direct lending transactions to lower-middle-market companies cannot be marked to market in real time, cannot be sold on demand at par, and require patient capital with genuine illiquidity tolerance. The semi-liquid wrapper does not change any of these underlying realities — it merely disguises them behind a quarterly redemption mechanism that functions only when redemption demand is modest.</p>
    <p>The Blackstone BREIT episode of late 2022 provided the template: redemption gates triggered, secondary market discounts emerged, and retail investors experienced precisely the illiquidity they had been assured did not exist. That episode was contained. The next one — arriving against a backdrop of $400 billion in maturing credit, PIK accumulation, and broader LP fatigue with capital calls — may not be.</p>
    
    <h3>What Sophisticated Allocators Are Doing Differently</h3>
    <p>Across our LP advisory work, the most sophisticated institutional allocators have responded to this environment with a series of structural adjustments that represent the new standard of best practice:</p>
    <ul>
      <li><strong>Liquidity bucketing:</strong> Segregating true illiquid allocations from semi-liquid exposures and applying separate risk frameworks to each.</li>
      <li><strong>GP transparency requirements:</strong> Demanding quarterly disclosure of NAV facility balances, PIK accrual as a percentage of total income, and interest coverage distribution across the portfolio.</li>
      <li><strong>Vintage diversification discipline:</strong> Actively reducing 2019–2021 vintage exposure through secondary sales — even at discounts — to redeploy into 2025–2027 vintage transactions at superior entry points.</li>
      <li><strong>Covenant quality scoring:</strong> Developing internal scoring frameworks to assess the covenant quality of new GP relationships before committing, with explicit minimum standards for financial maintenance protections.</li>
      <li><strong>Secondary market opportunism:</strong> Treating the current environment as a rotation opportunity — selling challenged vintages and buying into distressed situations at material discounts to par.</li>
    </ul>
  </section>

  <section class="section-four">
    <span class="section-label">SECTION FOUR</span>
    <h2>Distressed-for-Control and the Generational Entry Point</h2>
    <p>Every dislocation produces an opportunity set visible only to those who have been through the cycle before. The distress embedded in vintage 2019–2021 direct lending books is not uniformly distributed — it is concentrated in specific sectors, specific capital structures, and specific manager relationships. For disciplined capital with genuine operational capabilities, this concentration is not a risk. It is a roadmap.</p>
    
    <blockquote>
      "We are in the early stages of a distressed-for-control cycle that will define the private equity and private credit returns of the next decade. The managers who move in 2026 with precision will collect the vintage. Those who wait for certainty will collect what is left."
      <footer style="font-size: 0.9rem; margin-top: 10px; opacity: 0.7;">— Jayden Ohen, Managing Partner, Mayspear Global</footer>
    </blockquote>

    <h3>Highest-Conviction Opportunity Sectors — 2026</h3>
    <p>Based on our current transaction advisory pipeline and market intelligence, the following represent the highest-conviction distressed-for-control sectors:</p>
    <table>
      <thead>
        <tr>
          <th>SECTOR</th>
          <th>THESIS</th>
          <th>ENTRY MECHANISM</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Healthcare Services (Lower-MM)</strong></td>
          <td>High PIK exposure, reimbursement headwinds, and operational leverage create distress in covenant-lite structures with EBITDA &lt; $25M</td>
          <td>Loan-to-own via secondary purchase</td>
        </tr>
        <tr>
          <td><strong>Software / Tech-Enabled Services (2020–2021)</strong></td>
          <td>Revenue multiple compression forces down-rounds; sponsors walking away from over-equitised structures creates clean entry</td>
          <td>Preferred equity recapitalisation</td>
        </tr>
        <tr>
          <td><strong>Specialty Finance (Consumer / SME)</strong></td>
          <td>Rising charge-off rates and funding cost compression creating distress in warehouse facilities and ABS stacks</td>
          <td>Distressed debt purchase at discount</td>
        </tr>
        <tr>
          <td><strong>Industrials / Manufacturing (Supply Chain Exposed)</strong></td>
          <td>Input cost lag and working capital cycle extension creating near-term covenant breach risk in otherwise viable businesses</td>
          <td>Rescue financing with equity kicker</td>
        </tr>
      </tbody>
    </table>
  </section>

  <section class="conclusion">
    <span class="section-label">CONCLUSION</span>
    <h2>The Reckoning Is Not the End. It Is the Beginning.</h2>
    <p>Private credit has earned its place in the institutional portfolio. The fundamental value proposition — direct origination, relationship-based underwriting, spread premiums unavailable in public markets — remains intact. What is being tested in 2026 is not the asset class itself, but the execution quality of the managers, structures, and terms that proliferated during an anomalously forgiving decade.</p>
    <p>The firms that will define the next decade of private credit are being sorted right now. They are the ones stress-testing their portfolios while competitors are still marking to hope. They are the ones rebuilding covenant discipline into their origination standards while peers are still competing on price. They are the ones identifying the distressed-for-control entry points that will generate the vintage-defining returns of 2025–2028.</p>
    <p>At Mayspear Global, we have built our practice around the conviction that moments of market stress are the moments that reward analytical clarity above everything else. We do not offer opinions on the market. We offer executable intelligence, transaction-tested frameworks, and advisory relationships built to perform under pressure — because that is precisely when they matter.</p>
    
    <blockquote>
      "The managers who built their platforms for the market of 2015 are fighting the last war. The managers building for the market of 2026 will own the next decade. The question is simply which category you intend to be in."
      <footer style="font-size: 0.9rem; margin-top: 10px; opacity: 0.7;">— Jayden Ohen, Managing Partner, Mayspear Global</footer>
    </blockquote>
  </section>
</div>
    `
  },
  {
    date: '20 Mar 2026',
    category: 'Special Report',
    title: 'Capital at War: Why Private Credit and Infrastructure Thrive When the World Does Not',
    subtitle: 'Geopolitical fracture, defence spending surges, and the re-wiring of global supply chains are creating the most consequential private capital opportunity of the decade.',
    author: 'Jayden Ohen | Managing Partner, Mayspear Global',
    issue: 'Issue 02 | Q2 2026',
    description: `
<div class="blog-document">
  <section class="hero-stats">
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: rgba(184,150,74,0.1); margin-bottom: 48px;">
      <div style="background: var(--ch3); padding: 30px; text-align: center;">
        <span style="font-family: var(--serif); font-size: 2rem; color: var(--brass2);">$3.5 Trillion</span>
        <p style="font-family: var(--mono); font-size: 0.55rem; color: var(--textF); text-transform: uppercase;">Projected defence & infra spend 2026–2030</p>
      </div>
      <div style="background: var(--ch3); padding: 30px; text-align: center;">
        <span style="font-family: var(--serif); font-size: 2rem; color: var(--brass2);">$890 Billion</span>
        <p style="font-family: var(--mono); font-size: 0.55rem; color: var(--textF); text-transform: uppercase;">Opportunity in conflict-adjacent infra</p>
      </div>
      <div style="background: var(--ch3); padding: 30px; text-align: center;">
        <span style="font-family: var(--serif); font-size: 2rem; color: var(--brass2);">340–520 bps</span>
        <p style="font-family: var(--mono); font-size: 0.55rem; color: var(--textF); text-transform: uppercase;">Target yield premium for private credit</p>
      </div>
    </div>
  </section>

  <section class="intro">
    <p><em>Jayden Ohen, Managing Partner, Mayspear Global</em></p>
    <div class="report-box">
      <h3>IN THIS REPORT</h3>
      <ol>
        <li>Conflict economics: how geopolitical fracture reshapes capital flows</li>
        <li>The infrastructure imperative — defence, energy security & supply chain re-shoring</li>
        <li>Private credit as the essential engine of conflict-era financing</li>
        <li>Risk-adjusted return framework: where to deploy, what to avoid</li>
        <li>Mayspear Global's mandate strategy for the new geopolitical order</li>
      </ol>
    </div>
  </section>

  <section class="executive-summary">
    <h2>EXECUTIVE SUMMARY</h2>
    <p>The world is more fractured than at any point since the Cold War. Active military conflicts spanning Eastern Europe, the Middle East, and the South China Sea periphery have not merely disrupted trade flows and energy markets — they have permanently restructured the assumptions underpinning how sovereign governments, corporations, and institutional investors think about capital allocation, supply chain resilience, and national security.</p>
    <p>For most asset classes, this is an environment of elevated uncertainty and compressed returns. For private credit and infrastructure finance, it is something else entirely. It is a mandate. The re-armament of Europe, the re-shoring of critical manufacturing, the hardening of energy grids, the construction of dual-use logistics networks, and the financing of defence-adjacent technology — these are not cyclical themes. They are structural, government-backed, multi-decade capital programmes that require the kind of patient, flexible, covenant-protective financing that only private markets can provide at the required speed and scale.</p>
    
    <div class="themes-box">
      <h3>KEY THEMES IN THIS REPORT</h3>
      <ul>
        <li>01 Conflict economics — how geopolitical fracture permanently reshapes capital flows and risk pricing</li>
        <li>02 The infrastructure imperative — defence, energy security, supply chain re-shoring, and dual-use assets</li>
        <li>03 Private credit as the indispensable financing engine of the new geopolitical order</li>
        <li>04 Risk-adjusted return framework — where to deploy, what to avoid, and how to structure</li>
        <li>05 Mayspear Global's mandate strategy for clients operating at the intersection of capital and conflict</li>
      </ul>
    </div>
  </section>

  <section class="section-one">
    <span class="section-label">SECTION ONE</span>
    <h2>Conflict Economics: How War Restructures Capital</h2>
    <p>The conventional financial narrative around geopolitical conflict centres on risk: supply disruption, inflationary pressure, currency volatility, and sovereign credit stress. That narrative is not wrong — but it is profoundly incomplete. History demonstrates with consistency that periods of sustained geopolitical stress do not merely destroy capital. They redirect it. And the institutions that understand where that redirection is flowing — and why — generate returns that bear no resemblance to the consensus.</p>
    <p>The post-2022 global environment has already produced five structural capital redirections that are, in aggregate, creating the most substantial private market opportunity set of the past generation:</p>
    
    <div class="section-box">
      <p><strong>01 NATO Re-Armament:</strong> The 2024 NATO Vilnius Summit commitment to 2%+ GDP defence spending has triggered $380 billion in incremental annual procurement across 31 member states. The majority of this capital flows through private supply chains that require working capital, capex financing, and project debt — not equity.</p>
      <p><strong>02 Energy Independence Imperative:</strong> European dependence on Russian hydrocarbons — exposed catastrophically in 2022 — has driven $620 billion in committed LNG infrastructure, renewable baseload, nuclear life-extension, and grid hardening investment across the EU and UK through 2030. Each project requires long-duration, non-recourse project finance.</p>
      <p><strong>03 Supply Chain Re-Shoring:</strong> The semiconductor decoupling from China, pharmaceutical API re-shoring, and rare earth processing localisation programmes in the US, EU, and allied nations represent a $1.2 trillion capital formation event over ten years — almost entirely financed through private debt and structured credit, not public capital markets.</p>
      <p><strong>04 Dual-Use Technology Financing:</strong> The intersection of defence technology and commercial application — AI-enabled ISR, drone logistics, satellite communications, and cyber infrastructure — is producing a generation of companies that carry government contract revenue but cannot access investment grade public markets. Private credit is their only institutional financing option.</p>
      <p><strong>05 Reconstruction Capital:</strong> Ukraine reconstruction alone is estimated at $486 billion by the World Bank. Beyond Ukraine, post-conflict reconstruction in the Middle East and broader Belt-and-Road re-alignment in Central Asia and Africa creates a reconstruction finance cycle with no modern precedent in scale.</p>
    </div>

    <blockquote>
      "Geopolitical fracture does not destroy the need for capital — it concentrates it. Governments at war, or preparing for war, do not stop spending. They spend differently. And that difference is the mandate."
      <footer style="font-size: 0.9rem; margin-top: 10px; opacity: 0.7;">— Jayden Ohen, Managing Partner, Mayspear Global</footer>
    </blockquote>
  </section>

  <section class="section-two">
    <span class="section-label">SECTION TWO</span>
    <h2>The Infrastructure Imperative: Defence, Energy, and the Re-Wiring of the World</h2>
    <p>Infrastructure has always been the most durable of real asset categories. Long-duration cash flows, inflation linkage, regulatory protection, and essential-service characteristics provide a risk profile that institutional investors have valued across cycles. What the current geopolitical environment has done is not merely preserve these characteristics — it has weaponised them. Critical infrastructure is now a matter of national security, and governments are underwriting the return profiles accordingly.</p>
    
    <h3>Defence Infrastructure: Beyond Weapons Procurement</h3>
    <p>The popular narrative around defence spending focuses on weapons systems and military hardware. The capital opportunity for private markets lies elsewhere — in the infrastructure that makes modern defence possible. Forward operating bases, hardened logistics networks, secure communications fibre, military-grade data centres, and border surveillance systems are physical assets with long useful lives, sovereign-guaranteed revenue streams, and a financing requirement that traditional defence procurement budgets cannot fully absorb.</p>
    
    <h3>Energy Security: The Infrastructure Supercycle</h3>
    <p>Energy security has become the dominant infrastructure theme of the decade. The Russia-Ukraine conflict permanently restructured European energy procurement strategy: the question is no longer cost optimisation but supply sovereignty. This has produced a capital formation environment unlike anything seen since the post-war electrification of Western economies.</p>
    
    <table>
      <thead>
        <tr>
          <th>ASSET TYPE</th>
          <th>COMMITTED CAPEX 2026–2030</th>
          <th>PRIVATE DEBT ROLE</th>
          <th>YIELD PROFILE</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>LNG Terminals &amp; Regasification</td>
          <td>$190 Billion</td>
          <td>Project finance, construction debt, mini-perms</td>
          <td>S+350–450bps</td>
        </tr>
        <tr>
          <td>Offshore Wind (EU &amp; UK)</td>
          <td>$210 Billion</td>
          <td>Construction bridge, holdco debt, refinancing</td>
          <td>S+280–380bps</td>
        </tr>
        <tr>
          <td>Nuclear Life Extension &amp; SMR</td>
          <td>$85 Billion</td>
          <td>Government-backed project debt, hybrid structures</td>
          <td>S+300–420bps</td>
        </tr>
        <tr>
          <td>Grid Hardening &amp; Storage</td>
          <td>$145 Billion</td>
          <td>Utility senior debt, mezzanine, subordinated notes</td>
          <td>S+320–480bps</td>
        </tr>
        <tr>
          <td>Hydrogen Infrastructure</td>
          <td>$62 Billion</td>
          <td>Development capital, construction debt, offtake-backed senior</td>
          <td>S+400–550bps</td>
        </tr>
      </tbody>
    </table>
    <p class="source">Sources: IEA, BloombergNEF, S&P Global, Mayspear Global analysis.</p>
  </section>

  <section class="section-three">
    <span class="section-label">SECTION THREE</span>
    <h2>Private Credit as the Indispensable Engine of Conflict-Era Financing</h2>
    <p>The financing requirements of the geopolitical re-ordering cannot be met by traditional capital sources. Public capital markets move too slowly, price security concerns too bluntly, and cannot accommodate the structural complexity of dual-use assets, sovereign-adjacent counterparties, and non-standard cash flow profiles. Bank balance sheets are constrained by Basel IV capital adequacy requirements and regulatory restrictions on certain defence-adjacent exposures. Export credit agencies and development finance institutions can catalyse transactions but cannot carry them at the required scale.</p>
    <p>Private credit — specifically direct lending, infrastructure debt, and structured credit managed by specialist managers — is structurally positioned to fill this gap. The characteristics that define the asset class are precisely what these situations demand: speed to close, bespoke structuring, covenant protection, relationship-based counterparty engagement, and an ability to hold complexity that public markets cannot price.</p>
    
    <div class="advisory-note">
      <h3>MAYSPEAR GLOBAL ADVISORY NOTE</h3>
      <p>The most compelling re-shoring credit opportunities are not the headline semiconductor or battery gigafactories — they are the tier-2 and tier-3 supply chain companies that serve them. These businesses carry quasi-sovereign demand visibility through offtake agreements and government programme linkage, while accessing private credit at spreads 150–250bps wider than the primary facility operators. This is where Mayspear Global is actively advising GP clients on origination strategy.</p>
    </div>
  </section>

  <section class="conclusion">
    <span class="section-label">CONCLUSION</span>
    <h2>The World Does Not Stop Needing Capital. It Needs Different Capital.</h2>
    <p>The conflicts and geopolitical fractures reshaping the world in 2026 are not temporary disruptions to be waited out. They are structural re-orderings of where economic activity occurs, how supply chains are configured, how energy is produced and distributed, and how governments define national security. Each of these re-orderings requires capital — specifically, the kind of patient, structured, covenant-protective, relationship-driven capital that private markets have spent the last decade building the capacity to provide.</p>
    
    <blockquote>
      "The world is not going to stop being geopolitically complex. The supply chains are not going to re-concentrate in Asia. The energy grids are not going back to Russian gas. The defence budgets are not going back to 1.5% of GDP. This is the permanent landscape. And it is a magnificent landscape for patient, intelligent private capital."
      <footer style="font-size: 0.9rem; margin-top: 10px; opacity: 0.7;">— Jayden Ohen, Managing Partner, Mayspear Global</footer>
    </blockquote>
  </section>
</div>
    `
  }
];

async function restartBlogs() {
  try {
    // 1. Get all blogs
    const response = await fetch(`${API_URL}/blogs`);
    const existingBlogs = await response.json();
    
    // 2. Delete all blogs
    console.log(`Found ${existingBlogs.length} blogs. Deleting all...`);
    for (const blog of existingBlogs) {
      await fetch(`${API_URL}/blogs/${blog._id}`, { method: 'DELETE' });
      console.log(`Deleted: ${blog.title}`);
    }
    
    // 3. Add the 2 PDF blogs
    console.log('Adding the 2 specific blogs...');
    for (const blog of blogsToAdd) {
      const res = await fetch(`${API_URL}/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blog)
      });
      const data = await res.json();
      console.log(`Added: ${blog.title}`, data._id);
    }
    
    console.log('Done! Now there are only 2 blogs.');
  } catch (error) {
    console.error('Error in restartBlogs:', error);
  }
}

restartBlogs();
