import { useEffect, useState, type ReactNode } from 'react'
import {
  Bot,
  ChevronRight,
  Database,
  GitBranch,
  Layers3,
  Menu,
  X,
} from 'lucide-react'
import chemistryPeoplePermissionImage from './assets/crawl-examples/chemistry-people-permission.png'
import chemFinanceNavBodyImage from './assets/crawl-examples/chem-finance-nav-body.png'
import dpBlogEmptyArchiveImage from './assets/crawl-examples/dp-blog-empty-archive.png'
import learnAssignmentAccordionsImage from './assets/crawl-examples/learn-assignment-accordions.png'
import researchSupportLinksTableImage from './assets/crawl-examples/research-support-links-table.png'
import sharepointResourcesNavImage from './assets/crawl-examples/sharepoint-resources-nav.png'
import sharepointResourcesRolesImage from './assets/crawl-examples/sharepoint-resources-roles.png'
import './App.css'

type PageKey = 'crawler' | 'agent' | 'decisions'

type DecisionRow = {
  id: string
  title: string
  paragraphs: string[]
  testUrl?: string
  testLabel?: string
  testNote?: string
}

const pageSections: Array<{
  key: PageKey
  label: string
  eyebrow: string
  icon: typeof Database
  subitems: Array<{ label: string; target: string }>
}> = [
  {
    key: 'crawler',
    label: 'Crawler',
    eyebrow: 'Corpus building',
    icon: Database,
    subitems: [
      { label: 'Run snapshot', target: 'run-snapshot' },
      { label: 'Corpus readiness', target: 'corpus-readiness' },
      { label: 'Cold rebuild', target: 'cold-rebuild' },
    ],
  },
  {
    key: 'agent',
    label: 'Agent',
    eyebrow: 'Roadmap',
    icon: Bot,
    subitems: [
      { label: 'Current mode', target: 'current-agent-mode' },
      { label: 'SuperAgent tools', target: 'superagent-execution' },
      { label: 'Visual answers', target: 'visual-answering' },
      { label: 'Later phases', target: 'later-phases' },
    ],
  },
  {
    key: 'decisions',
    label: 'Decisions',
    eyebrow: 'Next phase',
    icon: GitBranch,
    subitems: [
      { label: 'External crawl', target: 'external-crawl' },
      { label: 'Access scope', target: 'access-scope' },
    ],
  },
]

const snapshotRows = [
  ['Done web nodes', '8,530', 'Converted SharePoint pages with Markdown output.'],
  ['Done PDF nodes', '1,577', 'Downloaded PDFs with non-empty files and valid PDF headers.'],
  ['Failed web nodes', '282', 'Recorded in SQLite and bucketed for retry or policy handling.'],
  ['Failed PDF nodes', '106', 'Mostly missing-download cases that can be retried later.'],
  ['Skipped external web nodes', '9,861', 'Recorded but not crawled because this run was SharePoint-scoped.'],
  ['Skipped external PDF nodes', '598', 'External PDFs are preserved as link targets, not corpus documents yet.'],
  ['Unsupported file nodes', '1,788', 'Office and other non-PDF files that need a later conversion policy.'],
  ['DB-referenced Markdown files', '7,522', 'The safe set for ingestion. Load through the frontier database and audit flags.'],
  ['Physical Markdown files', '7,772', 'Includes helper files and non-node pages, so it is larger than the DB set.'],
  ['Parent-child edges', '136,172', 'Graph evidence for crawl provenance and related-link browsing.'],
  ['Navigation/body links', '49,461', 'Extracted link evidence for resolve-url and agent navigation.'],
  ['Crawl window', '31.6 h', 'Total logged runtime across the crawl sessions over about a week.'],
]

const readinessRows = [
  ['Primary web content', '4,231', 'Normal retrieval chunks. This is the clean first web corpus slice.'],
  ['Document-listing link hubs', '1,065', 'Keep as link/index metadata, but downweight as prose.'],
  ['Needs manual review', '98', 'Mixed cases that should not be high-weight until checked.'],
  ['Access/error records', '662', 'Keep as unavailable/access evidence or exclude from normal retrieval.'],
  ['Low-value empty pages', '1,116', 'Mostly empty DPBlog date archives; exclude from retrieval.'],
  ['System/admin/people pages', '350', 'Usually metadata only, unless the query is about permissions or groups.'],
]

const unavailableRows = [
  [
    'Access denied / request access',
    '434 nodes',
    'The link is real, but the crawl account cannot see the target content.',
  ],
  [
    '404 / page not found',
    '114 nodes',
    'Existing SharePoint pages still point to removed, unpublished, or stale targets.',
  ],
  [
    'Other SharePoint error shells',
    '32 nodes',
    'Generic SharePoint error pages; keep as unavailable evidence, not answer content.',
  ],
  [
    'Post-crawl access/error candidates',
    '84 files',
    'Classic pages where the machine-readable crawl record still says ok but the body contains strong access/error markers.',
  ],
  [
    'Auth/login failures',
    '5 failed web nodes',
    'Likely pages needing a different session or account; retry only after an access policy decision.',
  ],
]

const rebuildRows = [
  {
    artifact: 'Frontier state',
    keeps: [
      'Requested URL',
      'Final browser URL',
      'Status and attempts',
      'Output identity',
      'Failure reason',
    ],
    reason: 'Resume work without starting from the root page again.',
  },
  {
    artifact: 'Retained page captures',
    keeps: [
      'Intermediate rendered extraction',
      'Page title and visible text',
      'Extracted navigation/body links',
      'Converter input for rebuilt Markdown',
    ],
    reason: 'Re-run the converter against captured material when Markdown rules improve.',
  },
  {
    artifact: 'PDF manifest and files',
    keeps: ['Downloaded PDF files', 'Integrity checks', 'PDF output rows', 'Missing-download cases'],
    reason: 'Retry missing PDFs or rebuild PDF index metadata without touching web captures.',
  },
  {
    artifact: 'Link graph',
    keeps: ['Parent-child crawl edges', 'Navigation links', 'Body links', 'Alias/provenance evidence'],
    reason: 'Preserve provenance and URL resolution even when a document is deduplicated.',
  },
  {
    artifact: 'Audit flags',
    keeps: [
      'Primary content classification',
      'Link hub and empty-page markers',
      'Permission/error shell markers',
      'External-link and failure buckets',
    ],
    reason: 'Change ingestion policy without editing the original crawl output.',
  },
]

const visualExamples = [
  {
    title: 'Modern SitePage: navigation and anchors',
    liveUrl: 'https://uoe.sharepoint.com/sites/inf-comms/SitePages/SharePoint-Resources.aspx',
    mdPath: 'Converted corpus page: SharePoint Resources',
    image: sharepointResourcesNavImage,
    imageAlt: 'SharePoint Resources page showing top navigation and jump-to anchor buttons.',
    excerpt: `## Page footer
- [Content of this page is managed by InfComms](...)

## Page navigation
### Top navigation
- Informatics Hub
- SharePoint Resources

### Professional Services
- Building and Technical Services
- Computing
- Finance
- Research Services
- Student Services

## Jump to:
- Roles and Responsibilities
- Training
- Teams Channel
- SharePoint Content Best Practice`,
    note:
      'This page shows why the crawler cannot just extract the article body. The useful page includes footer ownership, hub navigation, grouped menu links, and anchor buttons.',
  },
  {
    title: 'Modern SitePage: table and callout content',
    liveUrl: 'https://uoe.sharepoint.com/sites/inf-comms/SitePages/SharePoint-Resources.aspx#roles-and-responsibilities',
    mdPath: 'Converted corpus page: SharePoint Resources',
    image: sharepointResourcesRolesImage,
    imageAlt: 'SharePoint Resources roles and responsibilities table with a directory callout.',
    excerpt: `## Roles and Responsibilities

- **Champions** manage structure, navigation, ownership,
  content and access decisions.
- **Editors** support day-to-day updates and keep pages
  accurate and accessible.

| Task | Champion | Editor |
| --- | --- | --- |
| Edit existing pages | ✔️ | ✔️ |
| Fix broken links | ✔️ | ✔️ |
| Improve page structure | ✔️ | ✔️ |
| Create new pages | ✔️ | ❌ |

### See who maintains each InfHub site...
- [Open See who maintains each InfHub site...](...)`,
    note:
      'The page is visually a table plus a callout. The Markdown keeps the table shape and converts the button-style callout into a normal traceable link.',
  },
  {
    title: 'Page-specific navigation: Chemistry Finance',
    liveUrl: 'https://uoe.sharepoint.com/sites/chem-finance',
    mdPath: 'Converted corpus page: Chemistry Finance home',
    image: chemFinanceNavBodyImage,
    imageAlt: 'Chemistry Finance home page showing page navigation and finance team body content.',
    excerpt: `## Page navigation
### Top navigation
- Chemistry Hub

### Intranet
- Admin
- Committees
- Finance
- HR
- Research, Impact and Consultancy
- Teaching

### Storage & Communication
- Professional Services (Locked)
- Admin Team
- Finance Team
- Student Support

## The Finance Team
The School of Chemistry Finance Team are here to help...`,
    note:
      'This is why page navigation lives with the page. A single shared `_site_navigation.md` is only a fallback; some pages have their own visible menu and body context.',
  },
  {
    title: 'Dense link hub: research support links',
    liveUrl: 'https://uoe.sharepoint.com/sites/chem-research/SitePages/Research-support-links.aspx',
    mdPath: 'Converted corpus page: Research support links',
    image: researchSupportLinksTableImage,
    imageAlt: 'Research support links page showing table-like link blocks.',
    excerpt: `## Research support in the School of Chemistry

- Pure and Edinburgh Research Explorer | How to set up
  and maintain your profile...
  - Pure and Edinburgh Research Explorer pages
- Open access | How to meet funder and University
  requirements...
  - Open Access pages

## Research support services across UoE
### Institute for Academic Development (IAD)
- Click here about Institute for Academic Development
- Sign up for IAD Updates`,
    note:
      'This is mostly a routing surface rather than prose. The crawler has to preserve links, labels, and source-page context, even when the current run skips external targets.',
  },
  {
    title: 'Accordion content: Learn assignment marking',
    liveUrl: 'https://uoe.sharepoint.com/sites/Learn/SitePages/Marking-an-Assignment.aspx',
    mdPath: 'Converted corpus page: Marking a Learn Assignment',
    image: learnAssignmentAccordionsImage,
    imageAlt: 'Marking a Learn Assignment page showing collapsed accordion sections.',
    excerpt: `## Accessing student submissions
...
When accessing a student's submission you have a
student panel, the student submission area and the
grading panel. The panels can be collapsed...

### The Grading panel
... click on the Audio/Video button.
... Start recording / Pause recording / Save Video.

## Marking using a Rubric
Each criterion can be expanded and collapsed...
By default, the marking descriptions are hidden.`,
    note:
      'The browser screenshot starts with collapsed sections, but the Markdown contains the useful instructions. A lot of agent-facing knowledge is hidden behind UI panels, buttons, and toggles.',
  },
  {
    title: 'Permission shell: People and Groups',
    liveUrl: 'https://uoe.sharepoint.com/sites/ChemistryHub/_layouts/15/people.aspx?MembershipGroupId=16',
    mdPath: 'Corpus record: permission-limited People and Groups page',
    image: chemistryPeoplePermissionImage,
    imageAlt: 'Classic SharePoint People and Groups page showing a permission message.',
    excerpt: `# 人员和组

## Page content
...
- ChemistryHub Members
- ChemistryHub Visitors
- ChemistryHub Owners

- 您没有查看该组的成员身份的权限。`,
    note:
      'This is not a normal content page. It records that the URL exists and that this account lacks access, but the classic SharePoint shell should not rank like real content.',
  },
  {
    title: 'Low-value archive page: empty DP Blog month',
    liveUrl:
      'https://uoe.sharepoint.com/sites/DataProcessingRegisters/DPBlog/Lists/Posts/Date.aspx?StartDateTime=2026-06-01T07%3A00%3A00Z&EndDateTime=2026-06-21T00%3A16%3A16Z&LMY=June+2026',
    mdPath: 'Corpus record: empty DP Blog archive page',
    image: dpBlogEmptyArchiveImage,
    imageAlt: 'DP Blog June archive page saying there are no posts in this month.',
    excerpt: `# June - DP Blog

## Page navigation
- Home Currently selected

## Page content
- Categories
  - Events
  - Ideas
  - Opinions
- Archives
  - June
  - May
  - April
- There are no posts in this month.`,
    note:
      'The crawler worked, but this is not useful retrieval content. These timestamped archive URLs should be kept as crawl evidence or link metadata, then excluded or downweighted.',
  },
]

const decisionRows: DecisionRow[] = [
  {
    id: 'external-crawl',
    title: 'Decision 1: External crawl scope',
    paragraphs: [
      'The SharePoint-scoped run already recorded 9,861 external web links and 598 external PDF links — that\'s 10,868 external nodes across 2,232 hosts. This is why external crawl depth is the first thing we need to decide before running another big crawl.',
      'Those links matter because SharePoint pages often point to central University guidance, forms, media, SafeLinks, and other team sites. But actually crawling them turns the project from a SharePoint corpus into a wider University web crawl. So it\'s really about depth, not just whether external links exist.',
      'The safe default for the demo is to record external links only. If we need more coverage, the next step would be a one-hop crawl over selected University hosts. A multi-hop crawl would need strict host allowlists and depth limits, otherwise the frontier can spread through ed.ac.uk and balloon way beyond the Informatics Hub scope.',
    ],
  },
  {
    id: 'access-scope',
    title: 'Decision 2: Access and permissions',
    paragraphs: [
      'The crawl also hit a real access boundary. The audit shows 662 access/error records, including 434 access-denied or request-access pages and 114 not-found pages. The not-found cases usually mean an old SharePoint page still points at something that\'s been deleted, unpublished, or moved. The access-denied cases mean the link is probably real, but this crawl account can\'t see it.',
      'Keeping the current account boundary is simple and safe. The downside is that staff or students who do have access to a restricted page would still get no answer from the agent, because the content was never captured. A higher-permission crawl would fill more of those gaps, but then the agent would need authorization checks before retrieval and before citation.',
      'So the question isn\'t just whether we can crawl those pages — it\'s whether the next prototype should stay at the current permission boundary, or whether better coverage is worth the extra security work.',
    ],
    testUrl: 'https://uoe.sharepoint.com/sites/InformaticsTeachingRequirements',
    testLabel: 'Informatics Teaching Requirements',
    testNote:
      'The crawl account got redirected to SharePoint AccessDenied for this URL. If you can open it while logged in and see real content, that\'s a concrete example of what the current permission boundary misses.',
  },
]

function isPageKey(value: string | undefined): value is PageKey {
  return value === 'crawler' || value === 'agent' || value === 'decisions'
}

function routeFromHash(): PageKey {
  const page = window.location.hash.replace(/^#/, '').split('/')[0]
  return isPageKey(page) ? page : 'crawler'
}

function anchorFromHash(): string | null {
  const anchor = window.location.hash.replace(/^#/, '').split('/')[1]
  return anchor || null
}

function canUseNativeScroll() {
  return !/jsdom/i.test(window.navigator.userAgent)
}

function scrollToTop() {
  if (canUseNativeScroll()) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function scrollToAnchor(anchor: string) {
  window.setTimeout(() => {
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 0)
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activePage, setActivePage] = useState<PageKey>(() => routeFromHash())
  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    const onHashChange = () => setActivePage(routeFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    const anchor = anchorFromHash()
    if (!anchor) {
      scrollToTop()
      return
    }

    scrollToAnchor(anchor)
  }, [activePage])

  function selectPage(page: PageKey) {
    setActivePage(page)
    window.history.pushState(null, '', `#${page}`)
    closeMenu()
  }

  function selectAnchor(page: PageKey, anchor: string) {
    setActivePage(page)
    window.history.pushState(null, '', `#${page}/${anchor}`)
    closeMenu()
    scrollToAnchor(anchor)
  }

  return (
    <div className="app-shell">
      <header className="mobile-topbar">
        <Brand />
      </header>

      <button
        className="mobile-menu-button"
        type="button"
        aria-controls="project-sidebar"
        aria-expanded={isMenuOpen}
        aria-label="Open navigation"
        onClick={() => setIsMenuOpen(true)}
      >
        <Menu size={20} />
      </button>

      {isMenuOpen && (
        <button
          className="mobile-cover"
          type="button"
          aria-label="Dismiss navigation cover"
          onClick={closeMenu}
        />
      )}

      <aside
        id="project-sidebar"
        className={`sidebar ${isMenuOpen ? 'is-open' : ''}`}
        aria-label={isMenuOpen ? 'Mobile navigation panel' : 'Project navigation'}
        data-variant={isMenuOpen ? 'card-menu' : undefined}
      >
        {isMenuOpen && (
          <button className="sidebar-close" type="button" aria-label="Close navigation" onClick={closeMenu}>
            <X size={18} />
          </button>
        )}

        <Brand />

        <nav className="section-nav" aria-label="Demo sections">
          {pageSections.map((section) => {
            const Icon = section.icon
            const isActive = section.key === activePage

            return (
              <article className="nav-group" data-active={isActive} key={section.key}>
                <a
                  className="nav-card-link"
                  href={`#${section.key}`}
                  aria-label={section.label}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(event) => {
                    event.preventDefault()
                    selectPage(section.key)
                  }}
                />
                <div className="nav-main" aria-hidden="true">
                  <span className="nav-icon" aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  <span>
                    <span className="nav-label">{section.label}</span>
                    <span className="nav-eyebrow">{section.eyebrow}</span>
                  </span>
                  <ChevronRight className="nav-chevron" size={16} aria-hidden="true" />
                </div>
                <span className="nav-subitems">
                  {section.subitems.map((item) => (
                    <a
                      key={item.target}
                      href={`#${section.key}/${item.target}`}
                      onClick={(event) => {
                        event.preventDefault()
                        selectAnchor(section.key, item.target)
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
                </span>
              </article>
            )
          })}
        </nav>
      </aside>

      <main className="content">
        {activePage === 'crawler' && <CrawlerReport />}
        {activePage === 'agent' && <AgentReport />}
        {activePage === 'decisions' && <DecisionsReport />}
      </main>
    </div>
  )
}

function Brand() {
  return (
    <div className="brand-block">
      <div className="brand-mark" aria-hidden="true">
        <Layers3 size={18} />
      </div>
      <div>
        <p>Report - 22 June 2026</p>
        <strong>Informatics Hub Agent</strong>
      </div>
    </div>
  )
}

function ReportHeader({
  page,
  title,
  children,
}: {
  page: string
  title: string
  children: ReactNode
}) {
  return (
    <header className="report-header">
      <p className="report-kicker">{page} report</p>
      <h1>{title}</h1>
      <div className="lead-block">{children}</div>
    </header>
  )
}

function CrawlerReport() {
  return (
    <article id="crawler" className="report">
      <ReportHeader page="Crawler" title="SharePoint full-crawl corpus — completed">
        <p className="lead">
          This is a summary of where the crawler stands: what we grabbed, what made SharePoint
          tricky to convert, how the outputs should feed into the agent, and why the intermediate
          files we saved will make fixing things later much easier.
        </p>
        <p>
          The short version: the full crawl is ready to use as a corpus, but we should load it
          through the frontier database and the quality flags rather than just dumping every
          Markdown file in blindly.
        </p>
      </ReportHeader>

      <section className="report-section">
        <h2>What was built</h2>
        <p>
          The crawler works through a real logged-in browser — not a password form or a bare
          HTTP scraper. I manually log in with a University Chrome profile, and Playwright reuses
          that session for the crawl workers. So each worker already has the SharePoint / Microsoft
          login state and can see intranet pages without needing to automate ADFS, MFA, or any
          login screens. There's a small pool of long-lived worker profiles, so if a run stops
          and restarts it doesn't have to rebuild browser state from scratch.
        </p>
        <p>
          Scheduling uses a bag/frontier pattern backed by SQLite — every discovered URL becomes
          a row with status, attempts, original URL, final URL, output path, worker id, error
          reason, and content status. Eight workers grab the next pending item, render it, write
          Markdown or PDF output, extract new links, then mark the node done / failed / skipped.
          If the laptop moves, the disk is unplugged, or a browser hangs, the bag still knows
          what happened and the run picks up where it left off. The logged runtime adds up to
          about 31.6 hours, but the whole crawl-and-debug cycle took roughly a week because I
          kept stopping to inspect bad outputs, fix converter rules, clean up profile and cache
          issues, then resume. When things were running smoothly the eight workers were doing
          around 21 items per minute.
        </p>
        <p>
          This setup also gives the agent the provenance it will need later. Markdown is just the
          readable document; the database keeps everything else — original requested URLs,
          browser final URLs, duplicate aliases, parent-child edges, navigation/body links,
          skipped external links, PDF rows, and failure buckets. That's why a short SharePoint
          link, an old <code>web.inf.ed.ac.uk</code> link, a canonical SitePage URL, and a PDF
          download URL can all still be resolved after deduplication.
        </p>
        <p>
          SharePoint made this harder than expected because each page is really assembled from
          lots of separate pieces. A modern SitePage can have canvas JSON for the body, web parts
          for hero cards or quick links, a hub nav menu, a local site nav, footer links maintained
          by a different team, anchor links, file/library views, people widgets, PDF viewers,
          and permission-dependent error shells. Some useful links only appear after the page JS
          hydrates. Some menu groups are basically hidden until you open the nav component.
          Some classic pages render a giant SharePoint UI shell where the only real signal is one
          permission sentence or an empty archive message. A simple HTML-to-Markdown scraper
          would either miss content, mix global chrome into body text, or treat error pages as
          real content.
        </p>
        <p>
          So the converter doesn't treat a rendered page as one flat blob. It separates page
          footer, page navigation, grouped menu links, main content, tables, buttons,
          "Open …" callouts, source links, PDF outputs, and error markers. Page-specific
          navigation is saved with the page; the shared site nav file is just a fallback.
        </p>
        <pre className="code-block">{`Authenticated SharePoint page
  -> manually authenticated browser state reused by 8 Playwright workers
  -> SQLite frontier bag claims pending URLs and records status
  -> SharePoint render waits for dynamic web parts/navigation to settle
  -> converter writes Markdown/PDF plus final URL and content status
  -> edges/navigation_links preserve crawl graph and link context
  -> audit flags classify primary content, aliases, low-value pages, and failures
  -> agent tools search/read/resolve URL against the project corpus`}</pre>

        <h3>Visual conversion examples</h3>
        <p>
          Each example shows a real SharePoint screenshot on the left and the Markdown we
          extracted on the right. The note explains what made that page awkward to crawl or why
          it needs a decision before ingestion.
        </p>
        <div className="visual-example-list" aria-label="Visual SharePoint to Markdown examples">
          {visualExamples.map((example) => (
            <article className="visual-example" key={example.title}>
              <header className="visual-example-header">
                <div>
                  <h4>{example.title}</h4>
                  <a href={example.liveUrl} target="_blank" rel="noreferrer">
                    {example.liveUrl}
                  </a>
                  <code>{example.mdPath}</code>
                </div>
              </header>
              <div className="visual-comparison">
                <figure>
                  <a className="example-image-link" href={example.image} target="_blank" rel="noreferrer">
                    <img src={example.image} alt={example.imageAlt} />
                  </a>
                  <figcaption>Live SharePoint page</figcaption>
                </figure>
                <div className="markdown-panel">
                  <strong>Converted Markdown excerpt</strong>
                  <pre>{example.excerpt}</pre>
                </div>
              </div>
              <p className="example-note">{example.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="run-snapshot" className="report-section">
        <h2>Run snapshot</h2>
        <p>
          Here are the numbers from the full crawl, finished on 21 June 2026.
        </p>
        <table className="data-table" aria-label="Full crawl run snapshot">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Count</th>
              <th>Meaning</th>
            </tr>
          </thead>
          <tbody>
            {snapshotRows.map(([metric, count, meaning]) => (
              <tr key={metric}>
                <th>{metric}</th>
                <td>{count}</td>
                <td>{meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Decision 1: external crawl depth</h3>
        <p>
          The crawl also turned up the next scope question. It recorded 9,861 external web links
          and 598 external PDF links — that's 10,868 external nodes across 2,232 hosts.
        </p>
        <p>
          Those links matter because SharePoint pages often point to central University guidance,
          forms, media, SafeLinks, and other team sites. But actually crawling them would turn
          the project from a SharePoint corpus into a much wider University web crawl. So it's
          really a question of depth, not just whether external links exist.
        </p>
        <p>
          The safe default for now is to record external links only. A one-hop crawl would grab
          the pages directly linked from SharePoint. A multi-hop crawl would need strict host
          allowlists and depth limits, otherwise the frontier can spread through
          <code>ed.ac.uk</code> and balloon way beyond the Informatics Hub scope.
        </p>
      </section>

      <section id="corpus-readiness" className="report-section">
        <h2>Corpus readiness tiers</h2>
        <p>
          The cleanest first slice for retrieval is primary SitePages, site homes, and PDFs.
          Classic list/library pages are useful too, but mostly as link hubs. Empty archives,
          system pages, profile redirects, stale links, and permission shells shouldn't be
          ranked the same way as real content.
        </p>
        <table className="data-table" aria-label="Corpus readiness tiers">
          <thead>
            <tr>
              <th>Tier</th>
              <th>Count</th>
              <th>Suggested treatment</th>
            </tr>
          </thead>
          <tbody>
            {readinessRows.map(([tier, files, treatment]) => (
              <tr key={tier}>
                <th>{tier}</th>
                <td>{files}</td>
                <td>{treatment}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Unavailable and stale-link evidence</h3>
        <p>
          A real institutional SharePoint crawl doesn't just find good pages — it also hits
          dead links and links that need a higher permission level. That's still useful evidence,
          but it shouldn't be treated as normal answerable text.
        </p>
        <table className="data-table" aria-label="Unavailable and stale-link evidence">
          <thead>
            <tr>
              <th>Case</th>
              <th>Count</th>
              <th>Meaning for ingestion</th>
            </tr>
          </thead>
          <tbody>
            {unavailableRows.map(([caseName, count, meaning]) => (
              <tr key={caseName}>
                <th>{caseName}</th>
                <td>{count}</td>
                <td>{meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          The 404s usually mean an existing SharePoint page still points at something that's been
          deleted, unpublished, or moved. For the agent the right thing is to say the link is
          unavailable, not pretend the page exists.
        </p>
        <p>
          The permission cases are a separate question. Keeping the current account boundary is
          simple and low-risk, but it means some staff or students who actually have access to
          restricted material would still get no answer from the agent. Crawling with a
          higher-permission account would fill more gaps, but then we'd need authorization
          checks before retrieval and before citation.
        </p>
        <h3>Decision 2: access scope</h3>
        <p>
          So the question for next phase is: should restricted pages stay as explicit
          "unavailable with this account" records, or is a higher-permission crawl worth the
          extra security work? The second option only really makes sense if the agent can check
          who's asking — otherwise it could end up showing content the person shouldn't see.
        </p>
      </section>

      <section id="cold-rebuild" className="report-section">
        <h2>Cold rebuild without crawling again</h2>
        <p>
          The expensive part of this project isn't writing Markdown files — it's opening
          thousands of authenticated SharePoint pages in a real browser, waiting for dynamic
          content, following redirects, downloading PDFs, and recording what each URL actually
          turned into. The crawl keeps all those intermediate artifacts, so we can improve
          conversion later without making SharePoint serve every page again.
        </p>
        <p>
          This matters because the converter is still something we'll keep improving. If a
          future audit shows that some class of navigation, table, accordion, permission shell,
          or low-value page should be handled differently, we can do a cold rebuild over the
          saved captures and structured state. That regenerates the Markdown and audit flags
          from existing crawl evidence instead of re-running the whole authenticated crawl.
        </p>
        <table className="data-table rebuild-table" aria-label="Cold rebuild artifacts">
          <thead>
            <tr>
              <th>Saved artifact</th>
              <th>What it keeps</th>
              <th>Why it matters</th>
            </tr>
          </thead>
          <tbody>
            {rebuildRows.map(({ artifact, keeps, reason }) => (
              <tr key={artifact}>
                <th>{artifact}</th>
                <td>
                  <ul className="cell-lines">
                    {keeps.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </td>
                <td>{reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          In practice, improving the converter goes like this: tweak the conversion logic, rebuild
          Markdown from the saved captures, rerun the audit, compare the affected page classes,
          and only crawl again if the source page itself changed, the access account changed, or
          the saved capture is missing. This keeps iteration fast and avoids hammering SharePoint
          unnecessarily.
        </p>
        <pre className="code-block">{`Saved crawl evidence
  -> improve converter rule
  -> rebuild Markdown and audit flags locally
  -> compare corpus quality
  -> ingest the approved rebuilt corpus`}</pre>
      </section>
    </article>
  )
}

function AgentReport() {
  return (
    <article id="agent" className="report">
      <ReportHeader page="Agent" title="SharePoint assistant — current build">
        <p className="lead">
          The build isn't a single black-box RAG call anymore. It's now a two-role agent loop:
          MainAgent decides what needs to be researched, SuperAgent searches the SharePoint corpus
          with tools, and MainAgent writes the final answer from cited evidence.
        </p>
        <p>
          This page covers the version we're building now, plus the visual evidence feature
          that's still in progress. The goal is a document assistant that can answer policy and
          process questions, show its research trail, and eventually return the original
          screenshot, PDF page, form, or table when the answer depends on visual context.
        </p>
        <p>
          The near-term target is to get an early version online with the new SuperAgent; once
          it's deployed on my server, people can access and test it directly.
        </p>
      </ReportHeader>

      <section id="current-agent-mode" className="report-section">
        <h2>Current mode</h2>
        <p>
          The earlier FAgent prototype showed the key interaction pattern: the model shouldn't
          answer from memory — it should search, read source excerpts, keep a visible trace of
          what it tried, then write the answer only from evidence with file paths and line ranges.
          This version keeps that idea but separates planning from search, so the trace is easier
          to follow and the search worker can get stronger over time.
        </p>
        <p>
          MainAgent handles the user-facing reasoning — it decides whether a question needs
          SharePoint evidence, rewrites multilingual questions into an English search brief when
          the corpus is English, and delegates a compact research task. SuperAgent picks up that
          task and only does retrieval work: fuzzy search, strict keyword search, source reading,
          and link resolution. When SuperAgent comes back with evidence, MainAgent writes the
          final answer in the user's language.
        </p>
        <p>
          For model serving I'm using the remote OpenAI-compatible vLLM endpoint instead of local
          MLX or Transformers. MainAgent and SuperAgent share the same remote Qwen model but with
          different prompts and responsibilities. Qwen runs in no-thinking mode via
          <code>chat_template_kwargs.enable_thinking = false</code>, so any visible reasoning in
          the UI is our own trace events, not hidden model chain-of-thought.
        </p>
        <table className="data-table" aria-label="Current MainAgent and SuperAgent mode">
          <thead>
            <tr>
              <th>Role</th>
              <th>Mode</th>
              <th>Responsibility</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>MainAgent</th>
              <td>Planner</td>
              <td>
                Understands the user question, decides what SharePoint evidence is needed,
                creates the delegated task, and writes the final answer from evidence only.
              </td>
            </tr>
            <tr>
              <th>SuperAgent</th>
              <td>Searcher</td>
              <td>
                Executes corpus tools, mixes fuzzy and strict search, follows resolved links,
                reads source excerpts, and returns a compact evidence bundle.
              </td>
            </tr>
            <tr>
              <th>UI</th>
              <td>Trace</td>
              <td>
                Shows the chat answer first, with expandable SuperAgent steps for search, reads,
                link resolution, citations, and confidence.
              </td>
            </tr>
          </tbody>
        </table>
        <pre className="code-block">{`User question
  -> MainAgent decides the research task
  -> MainAgent delegates task and English corpus search terms
  -> SuperAgent runs fuzzy search, strict search, read, and link-resolve tools
  -> SuperAgent returns evidence with source, lines, links, and confidence
  -> MainAgent writes the final answer in the user's language
  -> UI shows the answer plus an expandable evidence trace`}</pre>
      </section>

      <section id="superagent-execution" className="report-section">
        <h2>SuperAgent execution</h2>
        <p>
          SuperAgent is meant to act more like a small research worker than a single search
          function. It gets a task like "find the sick-leave documentation rules for staff who
          have been absent for more than seven days", then tries multiple retrieval paths before
          reporting back. It can mix fuzzy search for broad discovery with strict keyword search
          for exact phrases, titles, forms, and policy names.
        </p>
        <p>
          The big new tool is link resolution. SharePoint pages often mention a form or linked
          document without putting the actual useful text on the same page. SuperAgent can now use
          the crawl link table to resolve a URL, Office viewer target, or canonical SharePoint
          alias back to a local Markdown/PDF record, then read that linked source before answering.
          This is what makes questions about forms, procedures, and nested policy pages way more
          reliable than the old prototype.
        </p>
        <p>
          The first version still starts with lexical/fuzzy SQLite retrieval. Embeddings can be
          added as a swappable scoring layer once the corpus import is stable. The key rule stays
          the same either way: SuperAgent returns extracted evidence, not a final user answer.
        </p>
        <ol className="numbered-list">
          <li>Receive the delegated research task from MainAgent.</li>
          <li>Run fuzzy search to find likely policy or process pages.</li>
          <li>Run strict keyword search for exact forms, titles, phrases, and department names.</li>
          <li>Read the strongest chunks with enough surrounding lines to avoid cherry-picking.</li>
          <li>Resolve relevant links through the crawl database and read linked documents.</li>
          <li>Return compact evidence with citations, useful links, unresolved gaps, and confidence.</li>
        </ol>
      </section>

      <section id="visual-answering" className="report-section">
        <h2>Visual answers in development</h2>
        <p>
          The image-and-text answer mode isn't finished yet. The idea is that the agent can return
          the original visual evidence when the source is easier to verify as an image — a PDF
          page, a form screenshot, a SharePoint table, a diagram, or a page region whose layout
          matters. The text answer still cites the Markdown/PDF source, but the UI shows the
          visual crop beside the answer so the user can inspect it directly.
        </p>
        <p>
          The crawler already gives us a good base for this: we have rendered SharePoint page
          captures, converted Markdown, link metadata, and PDF files. What's still missing is
          storing stable visual references alongside retrieval chunks and letting SuperAgent
          return a visual evidence object together with the text citation.
        </p>
        <table className="data-table" aria-label="Visual evidence implementation status">
          <thead>
            <tr>
              <th>Part</th>
              <th>Status</th>
              <th>Next implementation step</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Text evidence</th>
              <td>Working</td>
              <td>Keep returning source path, line range, URL metadata, and confidence.</td>
            </tr>
            <tr>
              <th>Visual evidence</th>
              <td>Developing</td>
              <td>
                Attach page screenshot, PDF page image, table crop, or form image references to
                the chunks that produced the answer.
              </td>
            </tr>
            <tr>
              <th>User uploads</th>
              <td>Planned</td>
              <td>
                Accept PDF or table screenshots, use OCR/vision to extract intent, and retrieve
                matching SharePoint evidence.
              </td>
            </tr>
          </tbody>
        </table>
        <div className="visual-example-list" aria-label="Planned visual answer example">
          <article className="visual-example">
            <header className="visual-example-header">
              <h4>Example target: answer with the source table visible</h4>
              <code>Question: Who can edit existing SharePoint pages and fix broken links?</code>
            </header>
            <div className="visual-comparison">
              <figure>
                <a
                  className="example-image-link"
                  href={sharepointResourcesRolesImage}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={sharepointResourcesRolesImage}
                    alt="SharePoint Resources roles and responsibilities table used as visual evidence."
                  />
                </a>
                <figcaption>
                  Visual evidence: the original SharePoint roles table the assistant should show
                  beside the text answer.
                </figcaption>
              </figure>
              <div className="markdown-panel">
                <strong>Planned answer shape</strong>
                <pre>{`MainAgent answer:
Champions and Editors can both edit existing pages and fix broken links.
Champions also own structure, navigation, ownership, content, and access decisions.

Text citation:
SharePoint Resources > Roles and Responsibilities

Visual evidence:
Show the captured roles table so the user can verify the task columns directly.`}</pre>
              </div>
            </div>
            <p className="example-note">
              This is the kind of rich answer we want for tables, forms, PDF pages, and screenshots.
              SuperAgent would return both the text citation and a visual reference; the UI would
              render the image only when it helps the user verify the answer.
            </p>
          </article>
        </div>
      </section>

      <section id="later-phases" className="report-section">
        <h2>Later phases</h2>
        <p>
          More subagents can wait until this single SuperAgent is reliable. When they come in,
          they should be general-purpose research agents rather than narrow hardcoded tools —
          MainAgent delegates two or three scoped research tasks in parallel, compares the
          returned evidence, deduplicates sources, and writes one final answer.
        </p>
        <p>
          The longer-term fallback is browsing-style navigation. If search doesn't turn up
          enough, the assistant can start from the SharePoint hub or site nav, read headings,
          follow likely department or policy links with bounded depth, and report back when it
          can't find enough evidence.
        </p>
        <p>
          The UI keeps separating user-facing conversation from expandable research traces. The
          default answer stays simple, while the trace exposes MainAgent delegation, SuperAgent
          searches, reads, link resolves, visual evidence, and unresolved gaps for debugging
          and assessment.
        </p>
      </section>
    </article>
  )
}

function DecisionsReport() {
  return (
    <article id="decisions" className="report">
      <ReportHeader page="Decisions" title="Questions for the next crawl phase">
        <p className="lead">
          The crawler result is solid enough to start a SharePoint-first agent demo. The remaining
          questions are about how far the next crawl should go, which permissions to use, and how
          strict we want the ingestion policy to be.
        </p>
        <p>
          These aren't purely engineering choices — they affect the shape of the corpus, the
          privacy model, and what the agent is ultimately allowed to answer.
        </p>
      </ReportHeader>

      <div className="decision-list">
        {decisionRows.map((decision) => (
          <section id={decision.id} className="report-section decision-item" key={decision.id}>
            <h2>{decision.title}</h2>
            {decision.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {decision.testUrl && (
              <p className="decision-test-link">
                Try this in the meeting:{' '}
                <a href={decision.testUrl} target="_blank" rel="noreferrer">
                  {decision.testLabel ?? decision.testUrl}
                </a>
                . {decision.testNote}
              </p>
            )}
          </section>
        ))}
      </div>
    </article>
  )
}

export default App
