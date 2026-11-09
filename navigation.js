const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#paavalikko');
const servicesDropdown = document.querySelector('.services-dropdown');

if (servicesDropdown) {
  const servicesSummary = servicesDropdown.querySelector('summary');
  document.addEventListener('click', (event) => {
    if (!servicesDropdown.contains(event.target)) servicesDropdown.open = false;
  });
  servicesDropdown.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && servicesDropdown.open) {
      event.stopPropagation();
      servicesDropdown.open = false;
      servicesSummary.focus();
    }
  });
  servicesDropdown.addEventListener('focusout', (event) => {
    if (!servicesDropdown.contains(event.relatedTarget)) servicesDropdown.open = false;
  });
  servicesDropdown.addEventListener('click', (event) => {
    if (event.target.closest('a')) servicesDropdown.open = false;
  });
}

if (toggle && navigation) {
  const label = toggle.querySelector('.menu-label');
  const smallScreen = window.matchMedia('(max-width: 900px)');
  const setOpen = (open) => {
    if (!open && servicesDropdown) servicesDropdown.open = false;
    toggle.setAttribute('aria-expanded', String(open));
    label.textContent = open ? 'Sulje valikko' : 'Valikko';
    navigation.hidden = smallScreen.matches && !open;
  };

  const syncLayout = () => {
    const focusInMenu = navigation.contains(document.activeElement);
    const focusOnToggle = document.activeElement === toggle;
    toggle.hidden = !smallScreen.matches;
    setOpen(false);
    if (smallScreen.matches && focusInMenu) toggle.focus();
    if (!smallScreen.matches && focusOnToggle) navigation.querySelector('a').focus();
  };
  syncLayout();
  smallScreen.addEventListener('change', syncLayout);
  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && smallScreen.matches && !navigation.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (smallScreen.matches && !event.target.closest('.navigation') && !navigation.hidden) {
      if (navigation.contains(document.activeElement)) toggle.focus();
      setOpen(false);
    }
  });
  navigation.addEventListener('click', (event) => {
    if (smallScreen.matches && event.target.closest('a')) {
      setOpen(false);
      toggle.focus();
    }
  });
}
