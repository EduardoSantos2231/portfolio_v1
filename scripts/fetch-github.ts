const TOKEN = process.env.GITHUB_TOKEN;
const USER = 'EduardoSantos2231';
const PROJECTS_DIR = 'src/content/projects';

const humanize = (name: string) =>
  name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();

const fmtDate = (iso: string) => {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

async function fetchRepos() {
  const query = `
    query {
      user(login: "${USER}") {
        repositories(first: 50, privacy: PUBLIC, orderBy: {field: PUSHED_AT, direction: DESC}) {
          nodes {
            name
            description
            pushedAt
            url
            languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
              nodes { name }
            }
            repositoryTopics(first: 20) {
              nodes { topic { name } }
            }
          }
        }
      }
    }
  `;

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('GraphQL query failed');
  }

  return json.data.user.repositories.nodes;
}

async function generateProjectFiles() {
  if (!TOKEN) {
    console.log('[fetch-github] GITHUB_TOKEN not set. Skipping GitHub fetch — using existing project files.');
    return;
  }

  console.log('[fetch-github] Fetching repositories from GitHub...');
  const repos = await fetchRepos();

  const portfolioRepos = repos.filter((repo: any) =>
    repo.repositoryTopics.nodes.some((t: any) => t.topic.name === 'portfolio'),
  );

  console.log(`[fetch-github] Found ${portfolioRepos.length} repos with topic "portfolio".`);

  const { mkdirSync, writeFileSync, rmSync } = await import('fs');
  const { resolve } = await import('path');

  const dir = resolve(process.cwd(), PROJECTS_DIR);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  portfolioRepos.forEach((repo: any, i: number) => {
    const topics = repo.repositoryTopics.nodes.map((t: any) => t.topic.name);
    const technologies = topics.filter((t: string) => t !== 'portfolio');

    const frontmatter = {
      title: humanize(repo.name),
      date: fmtDate(repo.pushedAt),
      technologies,
      description: repo.description || `Repositorio: ${repo.name}`,
      image: {
        src: '/images/project-placeholder.svg',
        alt: humanize(repo.name),
      },
      order: i + 1,
    };

    const yaml = [
      '---',
      `title: "${frontmatter.title}"`,
      `date: "${frontmatter.date}"`,
      `technologies: [${frontmatter.technologies.join(', ')}]`,
      frontmatter.description ? `description: "${frontmatter.description.replace(/"/g, '\\"')}"` : '',
      'image:',
      `  src: ${frontmatter.image.src}`,
      `  alt: "${frontmatter.image.alt}"`,
      `order: ${frontmatter.order}`,
      '---',
    ].filter(Boolean).join('\n');

    const slug = repo.name.replace(/[^a-z0-9-]/g, '-').toLowerCase();
    const filename = `${String(i + 1).padStart(3, '0')}-${slug}.md`;

    writeFileSync(resolve(dir, filename), yaml);
    console.log(`[fetch-github]   Generated ${filename}`);
  });
}

generateProjectFiles().catch((err) => {
  console.error('[fetch-github]', err.message);
  process.exit(1);
});
