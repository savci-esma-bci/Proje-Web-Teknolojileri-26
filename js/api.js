// PubMed API
const spinner   = document.getElementById('loading-spinner');
const errorMsg  = document.getElementById('error-msg');
const container = document.getElementById('papers-container');

async function fetchPapers(query) {
    spinner.style.display = 'block';
    errorMsg.style.display = 'none';
    container.innerHTML = '';

    try {
        // Ara ve PMID listesi al
        const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(query)}&retmax=6&sort=date&retmode=json`;
        const searchRes = await fetch(searchUrl);
        if (!searchRes.ok) throw new Error('Arama hatasi');
        const searchData = await searchRes.json();
        const ids = searchData.esearchresult.idlist;

        if (!ids || ids.length === 0) {
            container.innerHTML = '<p class="text-muted">Sonuç bulunamadı.</p>';
            return;
        }

        // PMID lerden makale detaylarini al
        const fetchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(',')}&retmode=json`;
        const fetchRes = await fetch(fetchUrl);
        if (!fetchRes.ok) throw new Error('Detay hatasi');
        const fetchData = await fetchRes.json();

        ids.forEach(id => {
            const paper = fetchData.result[id];
            if (!paper) return;

            const title   = paper.title || 'Başlık yok';
            const authors = paper.authors
                ? paper.authors.slice(0, 3).map(a => a.name).join(', ') + (paper.authors.length > 3 ? ' ve diğerleri' : '')
                : 'Yazar bilgisi yok';
            const journal = paper.source || '';
            const year    = paper.pubdate ? paper.pubdate.substring(0, 4) : '';
            const link    = `https://pubmed.ncbi.nlm.nih.gov/${id}/`;

            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-4';
            
            col.innerHTML = `
                <div class="card paper-card h-100">
                    <div class="card-body">
                        <div class="mb-2"><span class="badge-api">PubMed</span></div>
                        <h4 class="card-title text-white mb-3">${title}</h4>
                        <p class="authors text-white-50 mb-2"><i class="bi bi-vector-pen"></i> ${authors}</p>
                        <p class="abstract text-muted">${journal}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between align-items-center border-top-0 pt-0">
                        <small class="text-white"><i class="bi bi-calendar4-week"></i> ${year}</small>
                        <a href="${link}" target="_blank" class="btn btn-sm btn-outline-light">Makaleye Git <i class="bi bi-arrow-right"></i></a>
                    </div>
                </div>`;
            container.appendChild(col);
        });

    } catch (e) {
        console.error(e);
        errorMsg.style.display = 'block';
    } finally {
        spinner.style.display = 'none';
    }
}

// Filtre butonlari
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        fetchPapers(btn.dataset.query);
    });
});

// Sayfa acilinca yukle
fetchPapers('brain computer interface');
