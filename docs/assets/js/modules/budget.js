import { DOM } from '../utils/dom-helpers.js';

export class BudgetCalculator {
    constructor() {
        this.budgetPathway = DOM.findById('budget-pathway');
        this.budgetInputs = {
            course: DOM.findById('cost-course'),
            accom: DOM.findById('cost-accom'),
            food: DOM.findById('cost-food'),
            gear: DOM.findById('cost-gear')
        };
        this.totalCostEl = DOM.findById('total-cost');
        
        this.budgetData = {
            chamonix: { course: 1145, accom: 600, food: 300, gear: 250 },
            pnw: { course: 1700, accom: 280, food: 230, gear: 185 },
            colorado: { course: 560, accom: 0, food: 185, gear: 185 }
        };
        
        this.initEventListeners();
        this.updateCalculator();
    }
    
    initEventListeners() {
        this.budgetPathway?.addEventListener('change', () => this.updateCalculator());
        Object.values(this.budgetInputs).forEach(input => {
            input?.addEventListener('input', () => this.calculateTotal());
        });
    }
    
    updateCalculator() {
        const selectedData = this.budgetData[this.budgetPathway?.value];
        if (!selectedData) return;
        
        Object.entries(selectedData).forEach(([key, value]) => {
            const input = this.budgetInputs[key];
            if (input) {
                input.value = value;
            }
        });
        
        this.calculateTotal();
    }
    
    calculateTotal() {
        const total = Object.values(this.budgetInputs).reduce((sum, input) => {
            return sum + (Number(input?.value) || 0);
        }, 0);
        
        if (this.totalCostEl) {
            this.totalCostEl.textContent = '€' + total.toLocaleString();
        }
    }
}
