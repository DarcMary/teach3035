import { ClientStorage }       from './storage.js';
import { formatDate, sanitizeText, generateId, createIcon } from './utils.js';
import { validateForm }        from './validation.js';
import { Modal }               from './modal.js';
import { Toast }               from './toast.js';
import { SELECTORS }           from './constants.js';
import { UI }                  from './ui.js';

const HOME_TAB_TARGET     = 'home-section';
const CLIENTS_TAB_TARGET  = 'clients-section';

const sortByDateDesc = (a, b) => new Date(b.serviceDate) - new Date(a.serviceDate);

const buildClientFromForm = (form) => ({
  id:           generateId(),
  tutorName:    form.elements.tutorName.value.trim(),
  tutorPhone:   form.elements.tutorPhone.value.trim(),
  tutorAddress: form.elements.tutorAddress.value.trim(),
  serviceDate:  form.elements.serviceDate.value,
  petName:      form.elements.petName.value.trim(),
  petAge:       form.elements.petAge.value.trim(),
  petSize:      form.elements.petSize.value,
});

const createClientCard = (client, index) => {
  const safePetName = sanitizeText(client.petName);

  const iconWrapper = Object.assign(document.createElement('div'), { className: 'card-icon' });
  iconWrapper.setAttribute('aria-hidden', 'true');
  iconWrapper.appendChild(createIcon('ph-fill ph-paw-print'));

  const h4 = Object.assign(document.createElement('h4'), { textContent: safePetName });

  const dateBadge = Object.assign(document.createElement('span'), { className: 'date-badge' });
  dateBadge.append(createIcon('ph ph-calendar'), ` ${formatDate(client.serviceDate)}`);

  const textWrapper = document.createElement('div');
  textWrapper.append(h4, dateBadge);

  const header = Object.assign(document.createElement('div'), { className: 'card-header' });
  header.append(iconWrapper, textWrapper);

  const tutorLine = Object.assign(document.createElement('p'), { className: 'card-tutor' });
  tutorLine.append(createIcon('ph ph-user'), ` ${sanitizeText(client.tutorName)}`);

  const card = Object.assign(document.createElement('article'), { className: 'client-card fade-in' });
  card.style.animationDelay = `${index * 0.05}s`;
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Ver detalhes de ${safePetName}`);

  card.append(header, tutorLine);
  
  card.addEventListener('click', () => Modal.open(client));
  card.addEventListener('keydown', ({ key }) => {
    if (key === 'Enter' || key === ' ') Modal.open(client);
  });

  return card;
};

const createEmptyState = () => {
  const div = Object.assign(document.createElement('div'), { className: 'clients-empty-state' });
  const p = Object.assign(document.createElement('p'), { textContent: 'Nenhum atendimento agendado no momento.' });
  
  const btn = Object.assign(document.createElement('button'), { className: 'btn-primary', textContent: 'Agendar Agora' });
  btn.addEventListener('click', () => UI.navigateTo(HOME_TAB_TARGET));

  div.append(createIcon('ph ph-folder-open'), p, btn);
  return div;
};

const renderClients = () => {
  const grid = document.querySelector(SELECTORS.CLIENTS_GRID);
  if (!grid) return;
  const clients = ClientStorage.getAll().sort(sortByDateDesc);
  grid.innerHTML = '';

  if (clients.length === 0) {
    grid.appendChild(createEmptyState());
    return;
  }

  const fragment = document.createDocumentFragment();
  clients.forEach((client, i) => fragment.appendChild(createClientCard(client, i)));
  grid.appendChild(fragment);
};

let currentForm = null;

const resetFormState = () => {
  currentForm.reset();
  currentForm.removeAttribute('data-editing-id');
  
  const submitText = document.querySelector(SELECTORS.FORM_SUBMIT_TEXT);
  if (submitText) submitText.textContent = 'Agendar Atendimento';
  
  document.querySelector(SELECTORS.FORM_CANCEL_BTN)?.classList.add('hidden');
};

const editClient = (client) => {
  Modal.close();
  UI.navigateTo(HOME_TAB_TARGET);
  
  currentForm.elements.tutorName.value = client.tutorName;
  currentForm.elements.tutorPhone.value = client.tutorPhone;
  currentForm.elements.tutorAddress.value = client.tutorAddress;
  currentForm.elements.serviceDate.value = client.serviceDate;
  currentForm.elements.petName.value = client.petName;
  currentForm.elements.petAge.value = client.petAge;
  currentForm.elements.petSize.value = client.petSize;
  
  currentForm.setAttribute('data-editing-id', client.id);
  
  const submitText = document.querySelector(SELECTORS.FORM_SUBMIT_TEXT);
  if (submitText) submitText.textContent = 'Salvar Alterações';
  
  document.querySelector(SELECTORS.FORM_CANCEL_BTN)?.classList.remove('hidden');
};

const deleteClient = (client) => {
  if (window.confirm(`Tem certeza que deseja excluir o agendamento de ${client.petName}?`)) {
    ClientStorage.remove(client.id);
    renderClients();
    Modal.close();
    Toast.show('Agendamento excluído com sucesso.');
  }
};

export const Clients = Object.freeze({
  init(form) {
    currentForm = form;
    form.setAttribute('novalidate', 'true');
    
    document.querySelector(SELECTORS.FORM_CANCEL_BTN)?.addEventListener('click', resetFormState);
    
    Modal.onEdit(editClient);
    Modal.onDelete(deleteClient);
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateForm(form)) {
        Toast.show('Por favor, corrija os erros no formulário.', 'error');
        return;
      }
      
      const clientData = buildClientFromForm(form);
      const editingId = form.getAttribute('data-editing-id');
      
      if (editingId) {
        ClientStorage.update(editingId, clientData);
        Toast.show('Atendimento atualizado com sucesso!');
      } else {
        ClientStorage.add(clientData);
        Toast.show('Atendimento agendado com sucesso!');
      }
      
      resetFormState();
      renderClients();
      UI.navigateTo(CLIENTS_TAB_TARGET);
    });
  },

  render: renderClients,
});
