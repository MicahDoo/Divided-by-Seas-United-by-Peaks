// docs/js/gpx-tracker.js

export class GPXProgressTracker {
    constructor(options = {}) {
        this.options = {
            containerId: 'progress-bar-container-wrapper',
            pathId: 'gpx-path-progress',
            labelsContainerId: 'gpx-labels',
            activePageClass: 'plan-active', // Only show on plan page
            ...options
        };
        
        this.container = null;
        this.gpxPath = null;
        this.gpxLabelsContainer = null;
        this.pathLength = 0;
        this.currentProgress = 0;
        this.targetProgress = 0;
        this.gpxLabels = [];
        this.animationId = null;
        this.isInitialized = false;
        
        // Label configuration
        this.labelData = [
            { id: 'home-plan', text: '🚶‍♂️', xPercent: 0.04, class: 'text-lg', progress: 0 },
            { id: 'foundations', text: 'Foundations', xPercent: 0.208, class: 'text-xs font-bold', progress: 0.18 },
            { id: 'courses', text: 'Courses', xPercent: 0.5, class: 'text-xs font-bold', progress: 0.50 },
            { id: 'online', text: 'Online Prep', xPercent: 0.66, class: 'text-xs font-bold', progress: 0.70},
            { id: 'budget', text: 'Budget', xPercent: 0.83, class: 'text-xs font-bold', progress: 0.82 },
            { id: 'finish', text: '🏔️', xPercent: 0.96, class: 'text-lg', progress: 1.0 }
        ];
        
        this.boundScrollHandler = this.handleScroll.bind(this);
    }
    
    init() {
        if (this.isInitialized) return;
        
        this.container = document.getElementById(this.options.containerId);
        this.gpxPath = document.getElementById(this.options.pathId);
        this.gpxLabelsContainer = document.getElementById(this.options.labelsContainerId);
        
        if (!this.container || !this.gpxPath || !this.gpxLabelsContainer) {
            console.warn('GPXProgressTracker: Required DOM elements not found');
            return false;
        }
        
        this.setupPath();
        this.createLabels();
        this.attachScrollListener();
        
        this.isInitialized = true;
        return true;
    }
    
    setupPath() {
        this.pathLength = this.gpxPath.getTotalLength();
        this.gpxPath.style.strokeDasharray = this.pathLength;
        this.gpxPath.style.strokeDashoffset = this.pathLength;
    }
    
    createLabels() {
        // Clear existing labels
        this.gpxLabelsContainer.innerHTML = '';
        this.gpxLabels = [];
        
        const basePath = document.getElementById('gpx-path-base');
        const svgWidth = 1200;
        
        this.labelData.forEach(data => {
            const label = document.createElement('a');
            label.href = `#${data.id}`;
            label.id = `label-${data.id}`;
            label.className = `gpx-label hidden md:block ${data.class}`;
            label.textContent = data.text;
            
            const point = basePath.getPointAtLength(data.xPercent * this.pathLength);
            label.style.left = `${(point.x / svgWidth) * 100}%`;
            label.dataset.pos = data.progress;

            this.gpxLabelsContainer.appendChild(label);
            this.gpxLabels.push(label);
        });
    }
    
    attachScrollListener() {
        window.addEventListener('scroll', this.boundScrollHandler);
    }
    
    detachScrollListener() {
        window.removeEventListener('scroll', this.boundScrollHandler);
    }
    
    handleScroll() {
        // Only update if on the plan page
        if (!document.body.classList.contains(this.options.activePageClass)) {
            return;
        }
        
        let currentSection = 'home-plan';
        const scrollPosition = window.pageYOffset;
        
        // Find current section
        document.querySelectorAll('#plan-page main section[id]').forEach(section => {
            if (scrollPosition >= section.offsetTop - 120) {
                currentSection = section.id;
            }
        });
        
        let newProgress = this.labelData.find(l => l.id === currentSection)?.progress || 0;
        
        // Check if at bottom of page
        const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollPosition + window.innerHeight >= document.body.scrollHeight - 2) {
            newProgress = 1.0;
        }
        
        // Only animate if progress has changed significantly
        if (Math.abs(newProgress - this.targetProgress) > 0.001) {
            this.targetProgress = newProgress;
            this.startAnimation();
        }
    }
    
    startAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.animateProgress();
    }
    
    animateProgress() {
        if (Math.abs(this.currentProgress - this.targetProgress) < 0.001) {
            this.animationId = null;
            return;
        }
        
        // Smooth interpolation (lerp)
        this.currentProgress += (this.targetProgress - this.currentProgress) * 0.15;
        
        const drawLength = this.pathLength * this.currentProgress;
        this.gpxPath.style.strokeDashoffset = this.pathLength - drawLength;
        
        // Update label states
        this.gpxLabels.forEach(label => {
            const isActive = this.currentProgress >= parseFloat(label.dataset.pos);
            label.classList.toggle('gpx-label-active', isActive);
        });
        
        this.animationId = requestAnimationFrame(() => this.animateProgress());
    }
    
    // Method to manually set progress (useful for testing or direct control)
    setProgress(progress) {
        this.targetProgress = Math.max(0, Math.min(1, progress));
        this.startAnimation();
    }
    
    // Method to show/hide the tracker based on page
    updateVisibility(isVisible) {
        if (this.container) {
            this.container.style.display = isVisible ? 'block' : 'none';
        }
    }
    
    // Clean up method
    destroy() {
        this.detachScrollListener();
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.isInitialized = false;
    }
    
    // Reset progress (useful when switching pages)
    reset() {
        this.currentProgress = 0;
        this.targetProgress = 0;
        if (this.gpxPath) {
            this.gpxPath.style.strokeDashoffset = this.pathLength;
        }
        this.gpxLabels.forEach(label => {
            label.classList.remove('gpx-label-active');
        });
    }
}
