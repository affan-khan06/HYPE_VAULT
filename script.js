const sneakers = [
    { id: 1, name: "Jordan 1 High Chicago", price: 165000, category: "nike", img: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=600&q=80" }, 
    { id: 2, name: "Travis Scott x Fragment", price: 145000, category: "nike", img: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=600&q=80" }, 
    { id: 3, name: "Converse Chuck 70 High", price: 8500, category: "converse", img: "https://images.unsplash.com/photo-1617606002779-51d866bdd1d1?auto=format&fit=crop&w=600&q=80" }, 
    { id: 4, name: "Off-White Presto", price: 180000, category: "nike", img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80" }, 
    { id: 5, name: "Dior x Air Jordan 1", price: 750000, category: "luxury", img: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=600&q=80" }, 
    { id: 6, name: "Nike Dunk Low Panda", price: 18000, category: "nike", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80" }, 
    { id: 7, name: "Aime Leon Dore 550", price: 42000, category: "luxury", img: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80" }, 
    { id: 8, name: "Rick Owens Geobasket", price: 98000, category: "luxury", img: "https://cdn.rickowens.eu/products/198175/large/RU02E1868_LCO_09ALL_01.jpg?1748334145" }, 
    { id: 9, name: "Red Octobers", price: 1200000, category: "nike", img: "https://i.redd.it/lf0qdjvzs0741.jpg" }, 
    { id: 10, name: "Union LA Jordan 4", price: 85000, category: "nike", img: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&w=600&q=80" }, 
    { id: 11, name: "Balenciaga Triple S", price: 90000, category: "luxury", img: "https://u-mercari-images.mercdn.net/photos/m22431922103_1.jpg" }, 
    { id: 12, name: "Nike Mag", price: 3500000, category: "nike", img: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=600&q=80" }, 
    { id: 13, name: "Kobe 6 Grinch", price: 65000, category: "nike", img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=600&q=80" }, 
    { id: 14, name: "Salehe Bembury Pollex", price: 32000, category: "luxury", img: "https://media-assets.grailed.com/prd/listing/temp/ed86ca11a87243a985759b60bf659554" }, 
    { id: 15, name: "Adidas Samba Wales Bonner", price: 55000, category: "adidas", img: "https://media.gq-magazine.co.uk/photos/65c3688c6c21523ab3881c91/16:9/w_2560%2Cc_limit/Wales-Bonner-x-Adidas.jpg" }, 
];

let myStash = JSON.parse(localStorage.getItem('hypeVaultStash')) || [];
let activeModalChart = null; 
function saveStash() {
    localStorage.setItem('hypeVaultStash', JSON.stringify(myStash));
    updateNav();
}

function updateNav() {
    const badge = document.getElementById('stash-count');
    if(badge) badge.innerText = myStash.length;
}
function initDashboardChart() {
    const ctx = document.getElementById('sneakerChart');
    if(!ctx) return;

    const counts = sneakers.reduce((acc, s) => {
        acc[s.category] = (acc[s.category] || 0) + 1;
        return acc;
    }, {});
    Chart.defaults.font.family = "'Space Mono', monospace";
    Chart.defaults.color = "#666";

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(counts).map(c => c.toUpperCase()),
            datasets: [{
                data: Object.values(counts),
                backgroundColor: ['#d4af37', '#1a1a1a', '#404040', '#757575'], // Gold & Grays
                borderColor: '#0a0a0a',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right', labels: { color: '#b0b0b0', boxWidth: 15 } }
            }
        }
    });
}

function renderPriceChart(price) {
    const ctx = document.getElementById('priceChart');
    if(!ctx) return;

    if(activeModalChart) activeModalChart.destroy();

    const dataPoints = Array.from({length: 6}, () => price * (0.9 + Math.random() * 0.2));

    activeModalChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],
            datasets: [{
                label: 'Resale Value',
                data: dataPoints,
                borderColor: '#d4af37', 
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                borderWidth: 2,
                pointBackgroundColor: '#0a0a0a',
                pointBorderColor: '#d4af37',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { display: false },
                x: { 
                    ticks: { color: '#666', font: { size: 10 } }, 
                    grid: { display: false } 
                }
            },
            plugins: { legend: { display: false } }
        }
    });
}
// --- NEW CHART LOGIC ENDS HERE ---

function initShop(data = sneakers) {
    const container = document.getElementById('sneaker-container');
    if(!container) return;
    
    container.innerHTML = data.map(shoe => `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="card h-100">
                <div style="cursor: pointer; overflow: hidden;" onclick="openModal(${shoe.id})">
                    <img src="${shoe.img}" class="card-img-top" alt="${shoe.name}" onerror="this.src='https://placehold.co/600x400/222/c5a059?text=Image+Not+Found'">
                </div>
                <div class="card-body d-flex flex-column justify-content-between p-3">
                    <div>
                        <h6 class="card-title text-truncate">${shoe.name}</h6>
                        <small class="font-tech text-gray text-uppercase" style="font-size: 0.7rem;">${shoe.category}</small>
                    </div>
                    <div class="mt-3">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <span class="price-tag">₹${shoe.price.toLocaleString('en-IN')}</span>
                        </div>
                        <button class="btn btn-stash" onclick="addToStash(${shoe.id})">
                            Add to Stash
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function addToStash(id) {
    const shoe = sneakers.find(s => s.id === id);
    myStash.push(shoe);
    saveStash();
    alert(`${shoe.name} secured.`);
}

function filterShoes(cat) {
    document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
        const active = Array.from(document.querySelectorAll('.btn-filter')).find(b => b.innerText.toLowerCase() === cat || (cat === 'all' && b.innerText === 'ALL'));
    if(active) active.classList.add('active');

    initShop(cat === 'all' ? sneakers : sneakers.filter(s => s.category === cat));
}

function openModal(id) {
    const shoe = sneakers.find(s => s.id === id);
    document.getElementById('modalTitle').innerText = shoe.name;
    document.getElementById('modalPrice').innerText = "₹" + shoe.price.toLocaleString('en-IN');
    document.getElementById('modalImg').src = shoe.img;
    renderPriceChart(shoe.price);

    document.getElementById('modalStashBtn').onclick = () => addToStash(shoe.id);
    new bootstrap.Modal(document.getElementById('productModal')).show();
}

function initPayment() {
    const container = document.getElementById('stash-list');
    const totalEl = document.getElementById('total-amount');
    if(!container) return;

    container.innerHTML = "";
    let total = 0;

    if(myStash.length === 0) {
        container.innerHTML = "<div class='text-gray font-tech p-3 text-center'>VAULT EMPTY</div>";
    } else {
        myStash.forEach((shoe, idx) => {
            total += shoe.price;
            container.innerHTML += `
                <div class="d-flex justify-content-between align-items-center stash-item">
                    <div class="d-flex align-items-center">
                        <img src="${shoe.img}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px; margin-right: 15px; border: 1px solid #333;">
                        <div>
                            <h6 class="mb-0 text-white" style="font-family: 'Montserrat'; font-weight: 600;">${shoe.name}</h6>
                            <small class="font-tech text-gold">₹${shoe.price.toLocaleString('en-IN')}</small>
                        </div>
                    </div>
                    <button class="btn btn-sm text-danger font-tech" style="font-size: 0.8rem; text-decoration: underline;" onclick="removeFromStash(${idx})">REMOVE</button>
                </div>
            `;
        });
    }
    
    if(totalEl) totalEl.innerText = "₹" + total.toLocaleString('en-IN');
}

function removeFromStash(idx) {
    myStash.splice(idx, 1);
    saveStash();
    initPayment();
}

function processPayment() {
    if(myStash.length === 0) return alert("Stash is empty.");
    myStash = [];
    saveStash();
    alert("Payment Authenticated. Assets Transferred.");
    window.location.href = "index.html";
}

document.addEventListener('DOMContentLoaded', () => {
    updateNav();
    initShop();
    initPayment();
    initDashboardChart(); 
});
