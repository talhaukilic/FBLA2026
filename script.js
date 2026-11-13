const resources = [
  { name: 'Office for Local Assistance', category: 'Family', icon: 'hand-heart', description: 'Get help connecting with local services, education, jobs, and other community resources.', url: 'https://www.orlando.gov/Our-Government/Departments-Offices/Executive-Offices/Communications-and-Neighborhood-Relations/Neighborhood-Relations/Office-For-Local-Assistance-OLA', keywords: 'support government assistance benefits food' },
  { name: 'Orlando Public Library', category: 'Learning', icon: 'book-open', description: 'Explore books, public computers, classes, events, and other library services.', detail: '101 E. Central Blvd., Orlando · (407) 835-7323', url: 'https://ocls.org/locations-hours/orlando-public-library/', keywords: 'books classes computers wifi education events downtown' },
  { name: 'CareerSource Central Florida', category: 'Jobs', icon: 'briefcase-business', description: 'Find job-search support and explore career and employment resources in Central Florida.', url: 'https://careersourcecentralflorida.com/find-a-job/', keywords: 'career work employment training' },
  { name: 'Second Harvest Food Bank', category: 'Food', icon: 'utensils', description: 'Search for food assistance through community partners across Central Florida.', detail: 'Search by ZIP code · Call ahead to confirm', url: 'https://feedhopenow.org/find-help/food-finder/', keywords: 'meals pantry hunger groceries zip' },
  { name: 'City of Orlando Housing', category: 'Housing', icon: 'house', description: 'Explore the city’s housing programs and information for residents.', url: 'https://www.orlando.gov/Our-Government/Departments-Offices/Housing-and-Community-Development', keywords: 'rent home affordable assistance' },
  { name: 'LYNX Central Florida', category: 'Getting around', icon: 'bus-front', description: 'Find local public transportation routes, schedules, fares, and trip-planning information.', detail: '(407) 841-5969 · Central Florida', url: 'https://www.golynx.com/', keywords: 'bus transit transportation routes' },
  { name: 'Library classes and events', category: 'Learning', icon: 'calendar-days', description: 'Browse in-person and online classes, activities, and events across the library system.', detail: 'Orange County · Online and in person', url: 'https://ocls.org/calendar/', keywords: 'education workshops technology family activities' },
  { name: 'Downtown Recreation Center', category: 'Family', icon: 'users', description: 'Discover recreation programs and a community center operated by the City of Orlando.', detail: 'Orlando · Check the city page for details', url: 'https://www.orlando.gov/Parks-the-Environment/Directory/Downtown-Recreation-Center', keywords: 'sports programs activities community recreation' }
];

const cards = document.querySelector('#cards');
const search = document.querySelector('#search');
const count = document.querySelector('#results-count');
const empty = document.querySelector('#empty');
const filters = [...document.querySelectorAll('.filter')];
let activeFilter = 'All';

function renderResources() {
  const query = search.value.trim().toLowerCase();
  const matches = resources.filter(resource => {
    const matchesCategory = activeFilter === 'All' || resource.category === activeFilter;
    const matchesSearch = `${resource.name} ${resource.category} ${resource.description} ${resource.keywords}`.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });
  count.textContent = `${String(matches.length).padStart(2, '0')} ${matches.length === 1 ? 'RESOURCE' : 'RESOURCES'} FOUND`;
  cards.replaceChildren();
  matches.forEach(resource => {
    const card = document.createElement('article'); card.className = 'card';
    const top = document.createElement('div'); top.className = 'card-top';
    const icon = document.createElement('span'); icon.className = 'card-icon'; icon.setAttribute('aria-hidden', 'true');
    const iconImage = document.createElement('img'); iconImage.src = `icons/${resource.icon}.svg`; iconImage.alt = ''; icon.append(iconImage);
    top.append(icon);
    const title = document.createElement('h3'); title.textContent = resource.name;
    const description = document.createElement('p'); description.textContent = resource.description;
    const detail = document.createElement('p'); detail.className = 'resource-detail'; detail.textContent = resource.detail || 'Central Florida · See organization for details';
    const link = document.createElement('a'); link.href = resource.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = 'VISIT ORGANIZATION'; link.setAttribute('aria-label', `Visit ${resource.name} website (opens in a new tab)`);
    card.append(top, title, description, detail, link); cards.append(card);
  });
  empty.hidden = matches.length !== 0;
}

function selectFilter(value) {
  activeFilter = value;
  filters.forEach(button => { const selected = button.dataset.filter === value; button.classList.toggle('active', selected); button.setAttribute('aria-pressed', String(selected)); });
  renderResources();
}
filters.forEach(button => button.addEventListener('click', () => selectFilter(button.dataset.filter)));
document.querySelectorAll('[data-category]').forEach(link => link.addEventListener('click', () => {
  search.value = '';
  selectFilter(link.dataset.category);
}));
search.addEventListener('input', renderResources);
document.querySelector('#clear-filters').addEventListener('click', () => { search.value = ''; selectFilter('All'); search.focus(); });
renderResources();

