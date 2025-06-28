import { DOM } from '../utils/dom-helpers.js';

export class CourseManager {
    constructor(coursesData) {
        this.courses = coursesData;
        this.comparisonList = [];
        this.filters = Array.from(DOM.findAll('#courses select'));
        
        this.courseListEl = DOM.findById('course-list');
        this.noResultsEl = DOM.findById('no-results');
        this.compareTray = DOM.findById('compare-tray');
        
        this.initEventListeners();
        this.renderCourses();
    }
    
    initEventListeners() {
        // Filter changes
        this.filters.forEach(filter => {
            filter.addEventListener('change', () => this.renderCourses());
        });
        
        // Course interactions
        this.courseListEl?.addEventListener('click', (e) => {
            if (e.target.matches('.btn-details')) {
                this.openDetailsModal(parseInt(e.target.dataset.id));
            }
            if (e.target.matches('.btn-compare')) {
                this.toggleCompare(parseInt(e.target.dataset.id));
            }
        });
        
        // Comparison tray
        DOM.findById('compare-now-btn')?.addEventListener('click', () => {
            this.openCompareModal();
        });
        
        DOM.findById('clear-compare-btn')?.addEventListener('click', () => {
            this.clearCompare();
        });
    }
    
    renderCourses() {
        try {
            const filtered = this.getFilteredCourses();
            this.courseListEl.innerHTML = '';
            
            DOM.toggle(this.noResultsEl, 'hidden', filtered.length > 0);
            
            filtered.forEach(course => {
                this.courseListEl.appendChild(this.createCourseCard(course));
            });
        } catch (error) {
            console.error('Failed to render courses:', error);
            this.courseListEl.innerHTML = '<p class="text-center text-red-500">Failed to load courses. Please refresh the page.</p>';
        }
    }
    
    getFilteredCourses() {
        const values = this.filters.map(f => f.value);
        return this.courses.filter(course => {
            return this.matchesRegion(course, values[0]) &&
                   this.matchesStyle(course, values[1]) &&
                   this.matchesDuration(course, values[2]) &&
                   this.matchesPrice(course, values[3]);
        });
    }
    
    matchesRegion(course, regionFilter) {
        return regionFilter === 'all' || course.region === regionFilter;
    }
    
    matchesStyle(course, styleFilter) {
        return styleFilter === 'all' || course.style === styleFilter;
    }
    
    matchesDuration(course, durationFilter) {
        if (durationFilter === 'all') return true;
        if (durationFilter === '1-3') return course.duration <= 3;
        if (durationFilter === '4-6') return course.duration >= 4 && course.duration <= 6;
        if (durationFilter === '7+') return course.duration >= 7;
        return false;
    }
    
    matchesPrice(course, priceFilter) {
        return priceFilter === 'all' || course.price <= parseInt(priceFilter);
    }
    
    createCourseCard(course) {
        const card = document.createElement('div');
        card.className = 'bg-white border border-slate-200 rounded-lg shadow-md p-6 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300';
        
        const isAdded = this.comparisonList.includes(course.id);
        const isFull = !isAdded && this.comparisonList.length >= 3;
        
        card.innerHTML = this.getCourseCardHTML(course, isAdded, isFull);
        return card;
    }
    
    getCourseCardHTML(course, isAdded, isFull) {
        return `
            <div>
                <h3 class="text-xl font-bold text-navy-dark">${course.name}</h3>
                <p class="text-slate-600 text-sm font-medium">${course.school}</p>
                <p class="text-slate-500 text-sm mt-1">${course.location}</p>
            </div>
            <div class="mt-4 flex-grow">
                <span class="inline-block bg-navy-dark/10 text-navy-dark text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                    ${course.duration > 89 ? 'Season' : course.duration + ' Days'}
                </span>
                <span class="inline-block bg-dirt/10 text-dirt text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                    ${course.style.replace('-', ' ')}
                </span>
            </div>
            <div class="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center">
                <span class="text-2xl font-bold text-navy-dark">€${course.price.toLocaleString()}</span>
                <div class="flex space-x-2">
                    <button class="btn-details text-sm text-navy-dark font-semibold hover:text-dirt" data-id="${course.id}">Details</button>
                    <button class="btn-compare text-sm text-white font-semibold py-1 px-3 rounded transition-colors ${isAdded ? 'added' : isFull ? 'full' : 'accent-dirt hover:bg-opacity-90'}" 
                            data-id="${course.id}" ${isFull ? 'disabled' : ''}>
                        ${isAdded ? '✓ Added' : 'Compare'}
                    </button>
                </div>
            </div>
        `;
    }
    
    // ... rest of your course methods (toggleCompare, openDetailsModal, etc.)
}
