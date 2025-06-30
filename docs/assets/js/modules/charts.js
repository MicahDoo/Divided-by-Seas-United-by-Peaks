import { DOM } from '../utils/dom-helpers.js';

export class ChartManager {
    constructor() {
        this.costChart = null;
        this.grievancesChart = null;
        this.internalConflictsChart = null;
        this.comparisonChart = null;
        
        this.initCharts();
    }
    
    initCharts() {
        this.initCostChart();
        this.initDossierCharts();
        this.initComparisonChart();
    }
    
    initCostChart() {
        const ctx = DOM.findById('costChart')?.getContext('2d');
        if (!ctx) return;
        
        this.costChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['European Classic (Chamonix)', 'US Glacier School (PNW)', 'Budget Club (Colorado)'],
                datasets: [{
                    label: 'Estimated Trip Cost (€)',
                    data: [2300, 2400, 930],
                    backgroundColor: ['#2F4F4F', '#A0522D', '#7f8c8d']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                // ... your existing options
            }
        });
    }
    
    initDossierCharts() {
        // Grievances chart
        const grievancesCtx = DOM.findById('grievancesChart')?.getContext('2d');
        if (grievancesCtx) {
            this.grievancesChart = new Chart(grievancesCtx, {
                // ... your existing grievances chart config
            });
        }
        
        // Internal conflicts chart
        const internalCtx = DOM.findById('internalConflictsChart')?.getContext('2d');
        if (internalCtx) {
            this.internalConflictsChart = new Chart(internalCtx, {
                // ... your existing internal conflicts chart config
            });
        }
    }
    
    initComparisonChart() {
        // For the list page comparison chart
        const comparisonCtx = DOM.findById('comparison-chart')?.getContext('2d');
        if (comparisonCtx) {
            this.comparisonChart = new Chart(comparisonCtx, {
                // ... your existing comparison chart config
            });
        }
    }
    
    updateLanguage(lang) {
        // Update chart labels when language changes in dossier
        if (this.grievancesChart) {
            // Update grievances chart for new language
        }
        if (this.internalConflictsChart) {
            // Update internal conflicts chart for new language
        }
    }
    
    destroy() {
        [this.costChart, this.grievancesChart, this.internalConflictsChart, this.comparisonChart]
            .forEach(chart => chart?.destroy());
    }
}
