
function load() {
    const allProducts = [...JokerTabak];
    renderItems(allProducts);
}


function renderCategory(type) {
    let data = [];

    switch (type) {
        case 'joker':
            data = JokerTabak;
            break;
        case 'swiss':
            data = SwissSmokeTabak;
            break;
        case 'kohle':
            data = Kohle;
            break;
        case 'shishas':
            data = Shishas;
            break;
        case 'zubehör':
            data = Zubehör;
            break;
        case 'schläuche':
            data = Schläuche;
            break;
        case 'köpfe':
            data = Shishaköpfe;
            break;
    }

  
    const categories = document.querySelectorAll('.categorys');
    categories.forEach(cat => {
        const catType = cat.dataset.type;
        if (catType === type) {
            cat.classList.add('active');
        } else {
            cat.classList.remove('active');
        }
    });

    renderItems(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


function renderItems(array) {
    const rendering = document.getElementById('content');
    rendering.innerHTML = '';

    array.forEach(item => {
        const image = item.tabakimg || item.kohleimg || item.schlauchimg || item.topfimg || item.zubehörimg || '';
        const gramm = item.gramms ? item.gramms.join(', ') : '';
        const price = item.price ? item.price.map(p => p + ' CHF').join(' / ') : '';
        const imgClass = item.category === 'Shisha' ? 'shisha-img' : 'product-img';
        const cardClass = item.category === 'Shisha' ? 'product-card-shisha' : 'product-card';

        const card = document.createElement('div');
        card.className = cardClass;

        card.innerHTML = `
            <img src="${image}" alt="${item.name}" class="${imgClass}">
            <h3>${item.name}</h3>
            <p>${gramm}</p>
            <p>${price}</p>
            <a href="https://wa.me/41779291999?text=Ich%20interessiere%20mich%20für%20${encodeURIComponent(item.name)}"
               target="_blank" class="whatsapp-btn" onclick="event.stopPropagation()">Jetzt anfragen</a>
        `;

        card.addEventListener('click', () => {
            openModal(item.name, image, price, gramm);
        });

        rendering.appendChild(card);
    });
}


function openModal(name, img, price, gramm) {
    const modal = document.getElementById('productModal');
    const modalDetails = document.getElementById('modalDetails');

    let grammInfo = gramm ? `<p><strong>Gramm:</strong> ${gramm}</p>` : '';

    modalDetails.innerHTML = `
        <img src="${img}" alt="${name}" style="width: 100%; border-radius: 8px; margin-bottom: 16px;">
        <h2>${name}</h2>
        ${grammInfo}
        <p><strong>Preis:</strong> ${price}</p>
    `;

    modal.classList.remove('hidden');
}


document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('productModal').classList.add('hidden');
});


document.getElementById('productModal').addEventListener('click', (e) => {
    if (e.target.id === 'productModal') {
        document.getElementById('productModal').classList.add('hidden');
    }
});

document.querySelectorAll('.categorys').forEach(el => {
  el.addEventListener('click', () => {
    const type = el.dataset.type;
    renderCategory(type);
  });
});

window.openImpressum = function() {
  document.getElementById('impressumModal').classList.remove('hidden');
}

window.closeImpressum = function() {
  document.getElementById('impressumModal').classList.add('hidden');
}


document.getElementById('impressumModal').addEventListener('click', (e) => {
  if (e.target.id === 'impressumModal') {
    closeImpressum();
  }
});

function acceptCookies() {
  localStorage.setItem('cookiesAccepted', 'true');
  document.getElementById('cookieNotice').classList.add('hidden');
}


window.openLocationModal = function() {
  document.getElementById('locationModal').classList.remove('hidden');
}

window.closeLocationModal = function() {
  document.getElementById('locationModal').classList.add('hidden');
}

document.getElementById('locationModal').addEventListener('click', (e) => {
  if (e.target.id === 'locationModal') {
    closeLocationModal();
  }
});

function checkAge() {
  const ageModal = document.getElementById('ageModal');
  const ageYes = document.getElementById('ageYes');
  const ageNo = document.getElementById('ageNo');

  
  ageModal.style.display = 'flex';

  ageYes.onclick = () => {
    ageModal.style.display = 'none';
    localStorage.setItem('isOver18', 'true');
    if (typeof load === 'function') load();
  };

  ageNo.onclick = () => {
    alert('Du musst mindestens 18 Jahre alt sein, um diese Seite zu betreten.');
    window.location.href = 'https://google.com';
  };
}


window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('isOver18') !== 'true') {
    checkAge(); // Erst Altersprüfung, dann ggf. Seite laden!
  } else {
    document.getElementById('ageModal').style.display = 'none';
    if (typeof load === 'function') load(); 
  }

  
  if (!localStorage.getItem('cookiesAccepted')) {
    document.getElementById('cookieNotice').classList.remove('hidden');
  }
});


window.acceptCookies = function() {
  localStorage.setItem('cookiesAccepted', 'true');
  document.getElementById('cookieNotice').classList.add('hidden');
}