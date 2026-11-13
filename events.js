const searchInput = document.querySelector('#event-search');
const eventCards = [...document.querySelectorAll('#event-list article')];
const noEvents = document.querySelector('#no-events');
const todayParts = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
const today = ['year', 'month', 'day'].map(part => todayParts.find(item => item.type === part).value).join('-');

function updateEvents() {
  const term = searchInput.value.trim().toLowerCase();
  let visible = 0;
  eventCards.forEach(card => {
    const matches = card.dataset.eventDate >= today && card.textContent.toLowerCase().includes(term);
    card.hidden = !matches;
    if (matches) visible++;
  });
  noEvents.hidden = visible > 0;
}

searchInput.addEventListener('input', updateEvents);
updateEvents();
