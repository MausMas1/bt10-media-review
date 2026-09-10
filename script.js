'use strict';
document.documentElement.classList.add('js');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const mobileViewport = window.matchMedia('(max-width: 700px)');

// Op touchscreens is hover niet beschikbaar. Laat de hero-foto daarom kleur
// krijgen zodra de bezoeker begint te scrollen, maar alleen op mobiel.
function revealMobileHeroColour() {
  if (mobileViewport.matches && window.scrollY > 12) {
    document.documentElement.classList.add('mobile-scrolled');
    window.removeEventListener('scroll', revealMobileHeroColour);
  }
}
window.addEventListener('scroll', revealMobileHeroColour, { passive: true });
revealMobileHeroColour();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.07 });
document.querySelectorAll('.reveal').forEach(el => reducedMotion ? el.classList.add('visible') : observer.observe(el));

const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open'); }
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.matchMedia('(min-width: 701px)').addEventListener('change', closeMenu);

// Placeholderteksten zijn bewust herkenbaar: Bruce kan hier zijn eigen bijdrage en verhaal invullen.
const projects = {
  jeugdjournaal: {
    title: 'Jeugdjournaal', category: 'NOS / Nieuws & televisie', image: 'jeugdjournaal',
    description: 'Jeugdjournaal — een selectie van beelden op locatie en een videofragment.',
    stories: [{title: 'Mijn werk voor het Jeugdjournaal', prompt: 'Welke onderwerpen of uitzendingen heb je gemaakt? Vertel hier over jouw rol, hoe je nieuws begrijpelijk maakt voor jonge kijkers en een moment dat je is bijgebleven.'}],
    gallery: [{image: 'jeugdjournaal', caption: 'Opname op locatie'}, {image: 'jeugdjournaal-backstage', caption: 'Achter de schermen'}], video: 'jeugdjournaal'
  },
  lowlands: {
    title: 'Lowlands', category: 'Muziek & cultuur / Op locatie', image: 'lowlands',
    description: 'Lowlands — muziek, mensen en verhalen op het festivalterrein.',
    stories: [{title: 'Mijn werk op Lowlands', prompt: 'Voor welke productie was je op Lowlands en wat deed je daar? Vertel hier over jouw bijdrage en een bijzonder gesprek of moment op het festival.'}],
    gallery: [{image: 'lowlands', caption: 'Op het festivalterrein'}]
  },
  espn: {
    title: 'ESPN', category: 'Sport / Televisie', image: 'skybox',
    description: 'De Voetbalkantine en The Skybox rond het WK voetbal 2026.',
    stories: [
      {title: 'De Voetbalkantine', prompt: 'Wat is jouw rol bij De Voetbalkantine? Vertel hier hoe je een uitzending voorbereidt, welke redactionele keuzes je maakt en welk gesprek je is bijgebleven.'},
      {title: 'The Skybox · WK voetbal 2026', prompt: 'Hoe werk je mee aan The Skybox? Beschrijf hier jouw bijdrage rond het WK en een moment waarop voorbereiding, inhoud en live televisie samenkwamen.'}
    ],
    gallery: [{image: 'voetbalkantine', caption: 'De Voetbalkantine'}, {image: 'skybox', caption: 'The Skybox'}, {image: 'skybox-team', caption: 'Het team van The Skybox'}]
  },
  eurosport: {
    title: 'Eurosport', category: 'Sport / Live', image: 'olympisch',
    description: 'Olympische Spelen Parijs 2024 en Winterspelen 2026.',
    stories: [
      {title: 'Olympische Spelen · Parijs 2024', prompt: 'Wat deed je tijdens de Spelen in Parijs? Vertel hier over jouw rol, de samenwerking met het team en een sportverhaal dat je bijzonder vond.'},
      {title: 'Winterspelen · 2026', prompt: 'Welke bijdrage leverde je aan de verslaggeving van de Winterspelen? Beschrijf hier jouw werkzaamheden en een uitdaging of moment achter de schermen.'}
    ],
    gallery: [{image: 'olympisch', caption: 'Olympische Spelen in Parijs'}, {image: 'regie', caption: 'Achter de schermen bij de Winterspelen'}]
  },
  feyenoord: {
    title: 'Feyenoord TV', category: 'Hartman / Documentaire', image: 'hartman',
    description: 'Hartman — een documentaire voor Feyenoord TV.',
    stories: [{title: 'Het verhaal achter de documentaire', prompt: 'Wat was jouw rol bij Hartman? Vertel hier over het maken van de documentaire, een inhoudelijke keuze en wat dit project voor jou bijzonder maakt.'}],
    gallery: [{image: 'hartman', caption: 'Hartman · Feyenoord TV'}]
  }
};
let currentProject;
const projectDialog = document.querySelector('#project-dialog');
const videoDialog = document.querySelector('#video-dialog');
const player = document.querySelector('#video-player');
function openDialog(dialog) { dialog.showModal(); document.body.classList.add('modal-open'); }
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelectorAll('.dialog-close, [data-close]').forEach(button => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if (!document.querySelector('dialog[open]')) document.body.classList.remove('modal-open');
    if (dialog === videoDialog) { player.pause(); player.removeAttribute('src'); player.load(); }
  });
});
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  currentProject = project;
  document.querySelector('#project-dialog-title').textContent = project.title;
  document.querySelector('#project-dialog-category').textContent = project.category;
  document.querySelector('#project-dialog-description').textContent = project.description;
  const stories = document.querySelector('#project-stories');
  stories.replaceChildren();
  project.stories.forEach(story => {
    const section = document.createElement('section'); section.className = 'project-story';
    const heading = document.createElement('h3'); heading.textContent = story.title;
    const label = document.createElement('p'); label.className = 'placeholder-label'; label.textContent = 'Jouw verhaal · nog in te vullen';
    const prompt = document.createElement('p'); prompt.className = 'placeholder-prompt'; prompt.textContent = story.prompt;
    section.append(heading, label, prompt); stories.append(section);
  });
  const gallery = document.querySelector('#project-gallery'); gallery.replaceChildren();
  project.gallery.forEach((photo, index) => {
    const figure = document.createElement('figure');
    const image = document.createElement('img'); image.src = `assets/${photo.image}.webp`; image.alt = photo.caption; image.loading = 'lazy';
    const caption = document.createElement('figcaption'); caption.textContent = photo.caption;
    const open = document.createElement('button'); open.className = 'photo-open';
    open.setAttribute('aria-label', `Vergroot foto: ${photo.caption}`);
    const hint = document.createElement('span'); hint.className = 'photo-hint'; hint.textContent = 'Vergroot';
    open.append(image, hint); open.addEventListener('click', () => openPhotos(index));
    figure.append(open, caption); gallery.append(figure);
  });
  const image = document.querySelector('#project-dialog-image'); image.src = `assets/${project.image}.webp`; image.alt = button.querySelector('img').alt;
  const play = document.querySelector('#project-video-button'); play.hidden = !project.video;
  play.onclick = project.video ? () => openVideo(project.video) : null;
  openDialog(projectDialog);
  projectDialog.scrollTop = 0;
}));
const videos = { broederliefde: { title: 'Broederliefde op het WK', file: 'broederliefde.mp4' }, jeugdjournaal: { title: 'Jeugdjournaal', file: 'jeugdjournaal.mp4' } };
function openVideo(key) {
  const video = videos[key];
  document.querySelector('#video-dialog-title').textContent = video.title;
  document.querySelector('.video-error').hidden = true;
  document.querySelector('#video-download').href = `assets/${video.file}`;
  player.src = `assets/${video.file}`;
  openDialog(videoDialog);
  player.play().catch(() => { /* Native controls remain available when autoplay is blocked. */ });
}
player.addEventListener('error', () => { if (player.hasAttribute('src')) document.querySelector('.video-error').hidden = false; });
document.querySelectorAll('[data-video]').forEach(button => button.addEventListener('click', () => openVideo(button.dataset.video)));
document.querySelector('#year').textContent = new Date().getFullYear();

// Schermvullende galerij blijft boven het projectvenster; sluiten herstelt de focus.
const photoDialog = document.querySelector('#photo-dialog');
let photoIndex = 0;
function showPhoto(index) {
  const photos = currentProject.gallery;
  photoIndex = (index + photos.length) % photos.length;
  const photo = photos[photoIndex];
  const image = document.querySelector('#photo-full');
  image.src = `assets/${photo.image}.webp`; image.alt = photo.caption;
  document.querySelector('#photo-caption').textContent = photo.caption;
  document.querySelector('#photo-count').textContent = `${photoIndex + 1} / ${photos.length}`;
  photoDialog.querySelectorAll('.photo-nav').forEach(button => { button.hidden = photos.length < 2; });
}
function openPhotos(index) {
  document.querySelector('#photo-title').textContent = currentProject.title;
  showPhoto(index); openDialog(photoDialog);
}
document.querySelector('.project-cover').addEventListener('click', () => {
  openPhotos(Math.max(0, currentProject.gallery.findIndex(photo => photo.image === currentProject.image)));
});
document.querySelector('.photo-prev').addEventListener('click', () => showPhoto(photoIndex - 1));
document.querySelector('.photo-next').addEventListener('click', () => showPhoto(photoIndex + 1));
photoDialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault(); showPhoto(photoIndex + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
let touchStart;
const photoStage = document.querySelector('.photo-stage');
photoStage.addEventListener('touchstart', event => {
  touchStart = event.touches.length === 1 ? {x:event.touches[0].clientX,y:event.touches[0].clientY} : null;
}, {passive:true});
photoStage.addEventListener('touchend', event => {
  if (!touchStart) return;
  const dx = event.changedTouches[0].clientX - touchStart.x;
  const dy = event.changedTouches[0].clientY - touchStart.y;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) showPhoto(photoIndex + (dx < 0 ? 1 : -1));
  touchStart = null;
}, {passive:true});
photoStage.addEventListener('touchcancel', () => { touchStart = null; }, {passive:true});
