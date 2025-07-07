// docs/js/course-finder.js

// 1. Course Data
const courses = [
    { id: 1, school: 'Compagnie des Guides', name: 'Beginner Course (3-Day)', location: 'Chamonix, France', region: 'europe', duration: 3, price: 630, currency: 'EUR', style: 'all-round', ratio: '1:4', fitness: 'Good general fitness, regular sports activity.', curriculum: ['Rock climbing basics', 'Knot tying', 'Belaying', 'Rappelling', 'Glacier travel', 'Crampon/Ice axe use'], inclusions: ['Guide fees', 'Group safety gear'], exclusions: ['Accommodation', 'Lifts', 'Food', 'Personal gear', 'Insurance'] },
    { id: 2, school: 'Compagnie des Guides', name: 'Beginner Course (5-Day)', location: 'Chamonix, France', region: 'europe', duration: 5, price: 1145, currency: 'EUR', style: 'all-round', ratio: '1:4', fitness: 'Good general fitness, comfortable with multi-hour hikes.', curriculum: ['All 3-day skills', 'Crevasse rescue basics', 'Multi-pitch climbing intro', 'Night in a mountain hut'], inclusions: ['Guide fees', 'Group safety gear', 'Hut half-board'], exclusions: ['Valley accommodation', 'Lifts', 'Food (lunches)', 'Personal gear', 'Insurance'] },
    { id: 6, school: 'Zermatters', name: 'Basic Course: Ice & Rock', location: 'Zermatt, Switzerland', region: 'europe', duration: 2, price: 500, currency: 'EUR', style: 'summit-goal', ratio: '1:6', fitness: 'Able to hike 4-5 hours at a steady pace.', curriculum: ['Glacier travel', 'Crampon/Ice axe use', 'Self-arrest', 'Basic rope work', 'Ascent of Breithorn (4164m)'], inclusions: ['Guide fees', 'Group gear', 'Lift pass'], exclusions: ['Accommodation', 'Food', 'Personal gear'] },
    { id: 7, school: 'Mountain Guides Italy', name: 'BASIC Mountaineering', location: 'Dolomites, Italy', region: 'europe', duration: 3, price: 900, currency: 'EUR', style: 'rock-focus', ratio: '1:2', fitness: 'Very good fitness, comfortable on exposed terrain.', curriculum: ['Customizable', 'Rock climbing skills', 'Multi-pitch routes', 'Via ferrata techniques'], inclusions: ['Guide fees', 'Group gear'], exclusions: ['All accommodation', 'Food', 'Lifts', 'Client/guide expenses'] },
    { id: 9, school: 'Colorado Mtn Club', name: 'Boulder Mtn School', location: 'Boulder, CO, USA', region: 'usa', duration: 90, price: 560, currency: 'EUR', style: 'budget-club', ratio: 'Varies', fitness: 'Must complete conditioning hikes (e.g., Green Mountain).', curriculum: ['Comprehensive curriculum over a season', 'Rock, Snow, and High-Altitude sections', 'Navigation', 'First aid'], inclusions: ['Instruction'], exclusions: ['All gear', 'Transportation', 'Park fees', 'CMC Membership'] },
    { id: 10, school: 'Colorado Mtn School', name: 'Intro to Mountaineering', location: 'Estes Park, CO, USA', region: 'usa', duration: 2, price: 605, currency: 'EUR', style: 'all-round', ratio: '1:4', fitness: 'Moderate fitness, able to hike for 5-8 hours with a pack.', curriculum: ['Self-arrest', 'Ice axe/crampon use', 'Glacier travel basics', 'Rope team travel', 'Basic knots'], inclusions: ['Guide fees', 'Group gear'], exclusions: ['Accommodation', 'Food', 'Personal gear', 'Park entry'] },
    { id: 12, school: 'American Alpine Inst.', name: 'Alpinism 1', location: 'Mt. Baker, WA, USA', region: 'usa', duration: 6, price: 1700, currency: 'EUR', style: 'glacier-skills', ratio: '1:5', fitness: 'Excellent fitness, able to carry 40-50 lbs pack for many hours.', curriculum: ['Expedition camping', 'Glacier travel', 'Crevasse rescue', 'Ice climbing basics', 'Navigation', 'Snow anchors'], inclusions: ['Guide fees', 'Group gear', 'Food on mountain'], exclusions: ['Transportation', 'Hotel nights', 'Personal gear'] },
    { id: 13, school: 'Mountain Madness', name: 'Alpine Climbing Course', location: 'North Cascades, WA', region: 'usa', duration: 8, price: 1860, currency: 'EUR', style: 'glacier-skills', ratio: '1:4', fitness: 'Excellent fitness, ability to carry a heavy pack is crucial.', curriculum: ['All AAI skills plus', 'Advanced crevasse rescue', 'Multi-pitch rock/alpine ice climbing'], inclusions: ['Guide fees', 'Group gear', 'All food on mountain'], exclusions: ['Transportation', 'Hotels', 'Personal gear'] },
    { id: 15, school: 'Japan Outdoor Inst.', name: 'Mountaineering LVL 1', location: 'Yatsugatake, Japan', region: 'japan', duration: 2, price: 375, currency: 'EUR', style: 'all-round', ratio: '1:5', fitness: 'Good hiking fitness, comfortable with 6-8 hour days.', curriculum: ['Map/compass navigation', 'Basic rope work', 'Mountain weather', 'Trip planning', 'Scrambling on rock'], inclusions: ['Instruction', 'Group gear'], exclusions: ['Lodge fees (~€75/night)', 'Food', 'Transportation', 'Insurance'] }
];

// 2. Export the initialization function
export function initCourseFinder() {
    const courseListEl = document.getElementById('course-list');
    const noResultsEl = document.getElementById('no-results');
    const filters = Array.from(document.querySelectorAll('#courses select'));
    let comparisonList = [];

    function renderCourses() {
        const values = filters.map(f => f.value);
        const filtered = courses.filter(c =>(values[0] === 'all' || c.region === values[0]) &&(values[1] === 'all' || c.style === values[1]) &&(values[2] === 'all' || (values[2] === '1-3' && c.duration <= 3) || (values[2] === '4-6' && c.duration >= 4 && c.duration <= 6) || (values[2] === '7+' && c.duration >= 7)) &&(values[3] === 'all' || c.price <= parseInt(values[3])));
        courseListEl.innerHTML = '';
        noResultsEl.classList.toggle('hidden', filtered.length > 0);
        filtered.forEach(course => {
            const card = document.createElement('div');
            card.className = 'bg-white border border-slate-200 rounded-lg shadow-md p-6 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300';
            const isAdded = comparisonList.includes(course.id);
            const isFull = !isAdded && comparisonList.length >= 3;
            card.innerHTML = `<div><h3 class="text-xl font-bold text-navy-dark">${course.name}</h3><p class="text-slate-600 text-sm font-medium">${course.school}</p><p class="text-slate-500 text-sm mt-1">${course.location}</p></div><div class="mt-4 flex-grow"><span class="inline-block bg-navy-dark/10 text-navy-dark text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">${course.duration > 89 ? 'Season' : course.duration + ' Days'}</span><span class="inline-block bg-dirt/10 text-dirt text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">${course.style.replace('-', ' ')}</span></div><div class="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center"><span class="text-2xl font-bold text-navy-dark">€${course.price.toLocaleString()}</span><div class="flex space-x-2"><button class="btn-details text-sm text-navy-dark font-semibold hover:text-dirt" data-id="${course.id}">Details</button><button class="btn-compare text-sm text-white font-semibold py-1 px-3 rounded transition-colors ${isAdded ? 'added' : isFull ? 'full' : 'accent-dirt hover:bg-opacity-90'}" data-id="${course.id}" ${isFull ? 'disabled' : ''}>${isAdded ? '✓ Added' : 'Compare'}</button></div></div>`;
            courseListEl.appendChild(card);
        });
    }

    const detailsModal = document.getElementById('details-modal');
    const compareModal = document.getElementById('compare-modal');
    function openDetailsModal(courseId) {
        const course = courses.find(c => c.id === courseId);
        if (!course) return;
        detailsModal.innerHTML = `<div class="modal-content bg-wood-panel rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transform scale-95 p-6 text-header-dark"><div class="flex justify-between items-start mb-4"><h2 class="text-2xl md:text-3xl font-bold">${course.name}</h2><button class="btn-close-modal text-3xl hover:text-white cursor-pointer">&times;</button></div><div class="flex border-b border-yellow-800/20 mb-4"><button class="modal-tab p-4 font-semibold active" data-tab="overview">Overview</button><button class="modal-tab p-4 font-semibold" data-tab="curriculum">Curriculum</button><button class="modal-tab p-4 font-semibold" data-tab="reviews">Reviews</button><button class="modal-tab p-4 font-semibold" data-tab="prereqs">Prerequisites</button></div><div id="modal-tab-content"></div></div>`;
        
        const modalTabContent = detailsModal.querySelector('#modal-tab-content');

        const tabContents = {
            overview: `<div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center my-6"><div class="bg-stone/50 p-3 rounded-lg shadow-sm"><div class="text-xs text-header-dark/80">Price</div><div class="font-bold text-lg text-header-dark">€${course.price}</div></div><div class="bg-stone/50 p-3 rounded-lg shadow-sm"><div class="text-xs text-header-dark/80">Duration</div><div class="font-bold text-lg text-header-dark">${course.duration > 89 ? 'Season' : course.duration + ' Days'}</div></div><div class="bg-stone/50 p-3 rounded-lg shadow-sm"><div class="text-xs text-header-dark/80">Ratio</div><div class="font-bold text-lg text-header-dark">${course.ratio}</div></div><div class="bg-stone/50 p-3 rounded-lg shadow-sm"><div class="text-xs text-header-dark/80">Style</div><div class="font-bold text-lg text-header-dark capitalize">${course.style.replace('-', ' ')}</div></div></div><div class="grid md:grid-cols-2 gap-6 mt-6"><div><h3 class="text-xl font-bold border-b border-yellow-800/20 pb-2 mb-3">✅ What's Included</h3><ul class="list-disc list-inside space-y-1">${course.inclusions.map(item => `<li>${item}</li>`).join('')}</ul></div><div><h3 class="text-xl font-bold border-b border-yellow-800/20 pb-2 mb-3">❌ What You Provide</h3><ul class="list-disc list-inside space-y-1">${course.exclusions.map(item => `<li>${item}</li>`).join('')}</ul></div></div>`,
            curriculum: `<div class="prose max-w-none prose-headings:text-header-dark prose-li:text-header-dark/90"><h3 class="text-xl font-bold mb-3">Detailed Itinerary</h3><ul class="list-disc list-inside space-y-2">${course.curriculum.map(item => `<li>${item}</li>`).join('')}</ul></div>`,
            reviews: `<div class="prose max-w-none prose-headings:text-header-dark prose-p:text-header-dark/90"><h3 class="text-xl font-bold mb-3">Participant Feedback</h3><blockquote class="border-l-4 border-dirt pl-4 italic">"An incredible experience. The guides were extremely knowledgeable and patient, especially with beginners. I felt safe the entire time."</blockquote><p class="mt-4">Summary: Consistently praised for professional, safety-conscious guides who create a positive learning environment. The comprehensive curriculum is a major plus for those serious about building a strong skill set.</p></div>`,
            prereqs: `<div class="prose max-w-none prose-headings:text-header-dark prose-p:text-header-dark/90"><h3 class="text-xl font-bold mb-3">Fitness & Experience</h3><p class="bg-stone/50 p-4 rounded-lg shadow-sm">${course.fitness}</p></div>`
        };

        function switchModalTab(tabName) {
            modalTabContent.innerHTML = tabContents[tabName];
            detailsModal.querySelectorAll('.modal-tab').forEach(t => {
                t.classList.remove('active', 'text-dirt', 'border-dirt');
                t.classList.add('hover:text-dirt');
            });
            const activeTab = detailsModal.querySelector(`.modal-tab[data-tab="${tabName}"]`);
            activeTab.classList.add('active', 'text-dirt', 'border-dirt');
            activeTab.classList.remove('hover:text-dirt');
        }
        
        detailsModal.querySelectorAll('.modal-tab').forEach(tab => {
            tab.addEventListener('click', () => switchModalTab(tab.dataset.tab));
        });

        switchModalTab('overview');
        detailsModal.classList.remove('hidden'); document.body.style.overflow = 'hidden';
    }
    function openCompareModal() {
        if (comparisonList.length < 2) return;
        const selected = comparisonList.map(id => courses.find(c => c.id === id));
        let tableHTML = `<div class="modal-content bg-wood-panel rounded-lg shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto transform scale-95 mt-8 p-4 sm:p-6"><div class="flex justify-between items-center mb-4"><h2 class="text-2xl md:text-3xl font-bold text-header-dark">Course Comparison</h2><button class="btn-close-modal text-3xl text-slate-500 hover:text-white cursor-pointer">&times;</button></div><div class="overflow-x-auto"><table class="w-full text-left border-collapse"><thead><tr class="bg-header-dark/10"><th class="p-3 font-semibold text-header-dark">Feature</th>${selected.map(c => `<th class="p-3 font-semibold text-header-dark">${c.name}</th>`).join('')}</tr></thead><tbody><tr class="border-b border-yellow-800/20"><td class="p-3 font-semibold">Price</td>${selected.map(c => `<td class="p-3">€${c.price}</td>`).join('')}</tr><tr class="border-b border-yellow-800/20"><td class="p-3 font-semibold">Duration</td>${selected.map(c => `<td class="p-3">${c.duration > 89 ? 'Season' : c.duration + ' Days'}</td>`).join('')}</tr><tr class="border-b border-yellow-800/20"><td class="p-3 font-semibold">Ratio</td>${selected.map(c => `<td class="p-3">${c.ratio}</td>`).join('')}</tr><tr class="border-b border-yellow-800/20"><td class="p-3 font-semibold">Key Skills</td>${selected.map(c => `<td class="p-3 text-xs">${c.curriculum.slice(0,3).join(', ')}...</td>`).join('')}</tr></tbody></table></div></div>`;
        compareModal.innerHTML = tableHTML; 
        compareModal.classList.remove('hidden'); 
        document.body.style.overflow = 'hidden';
    }

    const toastEl = document.getElementById('toast-notification');
    function showToast(message) { toastEl.textContent = message; toastEl.classList.remove('opacity-0'); setTimeout(() => toastEl.classList.add('opacity-0'), 3000); }
    function toggleCompare(courseId) {
        const index = comparisonList.indexOf(courseId);
        if (index > -1) { comparisonList.splice(index, 1); } else { if (comparisonList.length < 3) { comparisonList.push(courseId); } else { showToast("Max 3 courses to compare."); } }
        renderCourses(); updateCompareTray();
    }

    const compareTray = document.getElementById('compare-tray');
    const compareItemsContainer = document.getElementById('compare-items');
    function updateCompareTray() {
        compareTray.classList.toggle('show', comparisonList.length > 0);
        compareItemsContainer.innerHTML = comparisonList.map(id => `<div class="bg-stone text-header-dark text-sm font-semibold px-2 py-1 rounded">${courses.find(c=>c.id===id).school}</div>`).join('');
        document.getElementById('compare-now-btn').disabled = comparisonList.length < 2;
    }
    function clearCompare() { comparisonList = []; renderCourses(); updateCompareTray(); }

    courseListEl.addEventListener('click', (e) => { if (e.target.matches('.btn-details')) openDetailsModal(parseInt(e.target.dataset.id)); if (e.target.matches('.btn-compare')) toggleCompare(parseInt(e.target.dataset.id)); });
    function closeModal(modal) { modal.classList.add('hidden'); document.body.style.overflow = ''; }
    detailsModal.addEventListener('click', (e) => { if (e.target.matches('.btn-close-modal') || e.target.classList.contains('modal-overlay')) closeModal(detailsModal); });
    compareModal.addEventListener('click', (e) => { if (e.target.matches('.btn-close-modal') || e.target.classList.contains('modal-overlay')) closeModal(compareModal); });
    document.getElementById('compare-now-btn').addEventListener('click', openCompareModal);
    document.getElementById('clear-compare-btn').addEventListener('click', clearCompare);
    filters.forEach(filter => filter.addEventListener('change', renderCourses));

    // Initial render
    renderCourses();
}
