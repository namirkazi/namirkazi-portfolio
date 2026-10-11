'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
function closeMenu() {
  navigation?.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    closeMenu(); menuButton.focus();
  }
});
navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
window.matchMedia('(min-width: 901px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

const projectRows = [...document.querySelectorAll('.project-row')];
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const searchInput = document.querySelector('#project-search');
let selectedFilter = 'All';
function filterProjects() {
  const query = searchInput.value.trim().toLowerCase();
  let count = 0;
  projectRows.forEach(row => {
    const visible = (selectedFilter === 'All' || row.dataset.category === selectedFilter)
      && row.dataset.search.toLowerCase().includes(query);
    row.hidden = !visible;
    if (visible) count++;
  });
  filterButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === selectedFilter)));
  document.querySelector('#project-count').textContent = String(count);
  document.querySelector('#no-results').hidden = count !== 0;
}
filterButtons.forEach(button => button.addEventListener('click', () => {
  selectedFilter = button.dataset.filter;
  filterProjects();
}));
searchInput?.addEventListener('input', filterProjects);
document.querySelector('#reset-search')?.addEventListener('click', () => {
  selectedFilter = 'All'; searchInput.value = ''; filterProjects(); searchInput.focus();
});
function showLinkedProject() {
  if (!projectRows.length || !location.hash) return;
  let id;
  try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
  const project = projectRows.find(row => row.id === id);
  if (!project) return;
  selectedFilter = 'All'; searchInput.value = ''; filterProjects();
  const details = project.querySelector('details');
  if (details) details.open = true;
  requestAnimationFrame(() => project.scrollIntoView({block: 'start', behavior: 'instant'}));
}
showLinkedProject();
window.addEventListener('hashchange', showLinkedProject);

document.querySelector('.copy-email')?.addEventListener('click', async () => {
  const status = document.querySelector('.copy-status');
  try {
    await navigator.clipboard.writeText('namir2004@gmail.com');
    status.textContent = 'Email copied.';
  } catch {
    status.textContent = 'Select the email address above to copy it.';
  }
});
