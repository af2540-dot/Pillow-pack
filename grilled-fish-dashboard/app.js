// Configuration targets
const targets = {
    original: {
        name: "รสดั้งเดิม",
        targetBoxes: 200,
        targetRawKg: 220,
        dailyTargetRawKg: 60,
        targetYield: 81.82, // (200 * 0.9) / 220 * 100
        color: '#f59e0b',
        colorRgb: '245, 158, 11'
    },
    spicy: {
        name: "รสเผ็ด",
        targetBoxes: 200,
        targetRawKg: 220,
        dailyTargetRawKg: 60,
        targetYield: 81.82, // (200 * 0.9) / 220 * 100
        color: '#ef4444',
        colorRgb: '239, 68, 68'
    },
    pepper: {
        name: "รสพริกไทยดำ",
        targetBoxes: 150,
        targetRawKg: 170,
        dailyTargetRawKg: 60,
        targetYield: 79.41, // (150 * 0.9) / 170 * 100
        color: '#8b5cf6',
        colorRgb: '139, 92, 246'
    }
};

const BOX_TO_KG_FACTOR = 0.9; // 1 box = 12 bags * 75g = 900g = 0.9kg

// Sample data for initial empty state
const sampleLogs = [
    { id: 1, date: "2026-08-18", flavor: "original", rawWeight: 60.0, boxes: 55, remarks: "วันแรกของการผลิต ได้ Yield สูงกว่าคาด" },
    { id: 2, date: "2026-08-18", flavor: "spicy", rawWeight: 60.0, boxes: 53, remarks: "ปรับปรุงเตาย่างรอบสอง" },
    { id: 3, date: "2026-08-19", flavor: "original", rawWeight: 60.0, boxes: 56, remarks: "การผลิตปกติ" },
    { id: 4, date: "2026-08-19", flavor: "pepper", rawWeight: 50.0, boxes: 44, remarks: "รอบแรกของพริกไทยดำ ปรับสูตรเครื่องเทศ" },
    { id: 5, date: "2026-08-20", flavor: "spicy", rawWeight: 60.0, boxes: 54, remarks: "การผลิตเสถียร" },
    { id: 6, date: "2026-08-20", flavor: "pepper", rawWeight: 60.0, boxes: 53, remarks: "Yield เพิ่มขึ้นเล็กน้อยหลังปรับเตา" }
];

// App State
let logs = [];
let chartInstance = null;
let currentChartTab = 'overall';

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const prodForm = document.getElementById('prod-form');
const prodDateInput = document.getElementById('prod-date');
const prodFlavorSelect = document.getElementById('prod-flavor');
const prodRawWeightInput = document.getElementById('prod-raw-weight');
const prodBoxesInput = document.getElementById('prod-boxes');
const prodRemarksInput = document.getElementById('prod-remarks');
const yieldPreviewContainer = document.getElementById('yield-preview-container');
const previewFinWt = document.getElementById('preview-fin-wt');
const previewYield = document.getElementById('preview-yield');
const historyTbody = document.getElementById('history-tbody');
const historyCount = document.getElementById('history-count');
const toastEl = document.getElementById('toast');

const btnExport = document.getElementById('btn-export');
const btnImportTrigger = document.getElementById('btn-import-trigger');
const importFileInput = document.getElementById('import-file');

// Icons constants
const sunIcon = `<path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path><path d="M3 12h1"></path><path d="M20 12h1"></path><path d="M12 3v1"></path><path d="M12 20v1"></path><path d="M5.6 5.6l.7 .7"></path><path d="M17.7 17.7l.7 .7"></path><path d="M17.7 5.6l-.7 .7"></path><path d="M5.6 17.7l-.7 .7"></path>`;
const moonIcon = `<path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>`;

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Set report view date dynamically (Thai Buddhist Era format)
    const reportDateEl = document.getElementById('report-view-date');
    if (reportDateEl) {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        reportDateEl.textContent = now.toLocaleDateString('th-TH', options);
    }

    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    prodDateInput.value = today;

    // Load theme setting
    const savedTheme = localStorage.getItem('grilled_fish_theme') || 'dark';
    setTheme(savedTheme);

    // Load logs
    const savedLogs = localStorage.getItem('grilled_fish_prod_logs');
    if (savedLogs) {
        logs = JSON.parse(savedLogs);
    } else {
        logs = [...sampleLogs];
        localStorage.setItem('grilled_fish_prod_logs', JSON.stringify(logs));
    }

    // Set up listeners
    themeToggle.addEventListener('click', toggleTheme);
    prodForm.addEventListener('submit', handleFormSubmit);
    
    // Auto-calculate Yield in form preview
    prodRawWeightInput.addEventListener('input', updateFormYieldPreview);
    prodBoxesInput.addEventListener('input', updateFormYieldPreview);
    prodFlavorSelect.addEventListener('change', updateFormYieldPreview);

    // Export/Import listeners
    btnExport.addEventListener('click', exportData);
    btnImportTrigger.addEventListener('click', () => importFileInput.click());
    importFileInput.addEventListener('change', importData);

    // Set up Chart Tabs
    document.querySelectorAll('.chart-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.chart-tab').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            currentChartTab = e.target.dataset.chart;
            renderChart();
        });
    });

    // Render Dashboard UI
    updateDashboard();
});

// Set Theme function
function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('grilled_fish_theme', theme);
    if (theme === 'light') {
        themeIcon.innerHTML = moonIcon;
    } else {
        themeIcon.innerHTML = sunIcon;
    }
    // Update chart colors if chart exists
    if (chartInstance) {
        renderChart();
    }
}

// Toggle Theme
function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
}

// Show Alert Toast
function showToast(message, type = 'success') {
    toastEl.textContent = message;
    toastEl.className = `toast show ${type}`;
    setTimeout(() => {
        toastEl.classList.remove('show');
    }, 3000);
}

// Form Yield Preview calculations
function updateFormYieldPreview() {
    const rawWt = parseFloat(prodRawWeightInput.value);
    const boxes = parseInt(prodBoxesInput.value);
    const flavor = prodFlavorSelect.value;

    if (!isNaN(rawWt) && rawWt > 0 && !isNaN(boxes) && boxes >= 0) {
        const finishedWt = boxes * BOX_TO_KG_FACTOR;
        const yieldPercent = (finishedWt / rawWt) * 100;
        
        previewFinWt.textContent = finishedWt.toFixed(2);
        previewYield.textContent = yieldPercent.toFixed(2) + '%';
        yieldPreviewContainer.style.display = 'block';

        // Styling based on yield quality
        if (flavor && targets[flavor]) {
            const targetYield = targets[flavor].targetYield;
            if (yieldPercent > targetYield + 5) {
                previewYield.style.color = 'var(--success)';
            } else if (yieldPercent < targetYield - 8) {
                previewYield.style.color = 'var(--danger)';
            } else {
                previewYield.style.color = 'var(--warning)';
            }
        }
    } else {
        yieldPreviewContainer.style.display = 'none';
    }
}

// Handle Form Submission
function handleFormSubmit(e) {
    e.preventDefault();

    const date = prodDateInput.value;
    const flavor = prodFlavorSelect.value;
    const rawWeight = parseFloat(prodRawWeightInput.value);
    const boxes = parseInt(prodBoxesInput.value);
    const remarks = prodRemarksInput.value.trim();

    if (!flavor) {
        showToast('กรุณาเลือกรสชาติสินค้า', 'error');
        return;
    }

    if (isNaN(rawWeight) || rawWeight <= 0) {
        showToast('กรุณากรอกน้ำหนักวัตถุดิบที่ถูกต้อง', 'error');
        return;
    }

    if (isNaN(boxes) || boxes < 0) {
        showToast('กรุณากรอกจำนวนกล่องที่ถูกต้อง', 'error');
        return;
    }

    // Add entry
    const newEntry = {
        id: Date.now(),
        date,
        flavor,
        rawWeight,
        boxes,
        remarks
    };

    logs.push(newEntry);
    // Sort logs by date ascending
    logs.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Save to localStorage
    localStorage.setItem('grilled_fish_prod_logs', JSON.stringify(logs));
    
    // Reset Form fields (except date)
    prodFlavorSelect.value = '';
    prodRawWeightInput.value = '';
    prodBoxesInput.value = '';
    prodRemarksInput.value = '';
    yieldPreviewContainer.style.display = 'none';

    // Refresh UI
    updateDashboard();
    showToast('บันทึกข้อมูลการผลิตสำเร็จแล้ว');
}

// Delete Log Entry
function deleteLog(id) {
    if (confirm('คุณต้องการลบรายการบันทึกนี้ใช่หรือไม่?')) {
        logs = logs.filter(log => log.id !== id);
        localStorage.setItem('grilled_fish_prod_logs', JSON.stringify(logs));
        updateDashboard();
        showToast('ลบรายการผลิตเรียบร้อยแล้ว', 'error');
    }
}

// Aggregate stats and update KPI Cards + Product Cards
function updateDashboard() {
    // 1. Calculations by flavor
    const summary = {
        original: { rawUsed: 0, boxesProd: 0 },
        spicy: { rawUsed: 0, boxesProd: 0 },
        pepper: { rawUsed: 0, boxesProd: 0 }
    };

    logs.forEach(log => {
        if (summary[log.flavor]) {
            summary[log.flavor].rawUsed += log.rawWeight;
            summary[log.flavor].boxesProd += log.boxes;
        }
    });

    // 2. Global KPIs
    let totalBoxesProd = 0;
    let totalRawUsed = 0;
    
    Object.keys(summary).forEach(flavor => {
        totalBoxesProd += summary[flavor].boxesProd;
        totalRawUsed += summary[flavor].rawUsed;
    });

    const totalFinishedWt = totalBoxesProd * BOX_TO_KG_FACTOR;
    const targetTotalBoxes = 550; // 200 + 200 + 150
    const targetTotalRaw = 610; // 220 + 220 + 170
    
    // Overall Progress %
    const progressPercent = targetTotalBoxes > 0 ? (totalBoxesProd / targetTotalBoxes) * 100 : 0;
    document.getElementById('kpi-progress-percent').textContent = progressPercent.toFixed(1) + '%';
    document.getElementById('kpi-progress-text').textContent = `ผลิตแล้ว ${totalBoxesProd.toLocaleString()} / ${targetTotalBoxes} กล่อง`;
    document.getElementById('kpi-progress-weight').textContent = `${totalFinishedWt.toFixed(1)} / ${(targetTotalBoxes * BOX_TO_KG_FACTOR).toFixed(1)} kg (สำเร็จรูป)`;

    // Combined Yield %
    const combinedYield = totalRawUsed > 0 ? (totalFinishedWt / totalRawUsed) * 100 : 0;
    document.getElementById('kpi-yield-percent').textContent = combinedYield.toFixed(2) + '%';
    
    const yieldStatusEl = document.getElementById('kpi-yield-status');
    if (totalRawUsed === 0) {
        yieldStatusEl.textContent = "ไม่มีข้อมูล";
        yieldStatusEl.className = "yield-badge";
    } else {
        // Average expected yield is ~81.31% (495kg finished/610kg raw)
        if (combinedYield >= 81.3) {
            yieldStatusEl.textContent = "ดีเยี่ยม";
            yieldStatusEl.className = "yield-badge yield-high";
        } else if (combinedYield >= 77.0) {
            yieldStatusEl.textContent = "ปานกลาง";
            yieldStatusEl.className = "yield-badge yield-mid";
        } else {
            yieldStatusEl.textContent = "ต่ำกว่ามาตรฐาน";
            yieldStatusEl.className = "yield-badge yield-low";
        }
    }

    // Remaining Raw & Days Left
    const rawRemaining = Math.max(0, targetTotalRaw - totalRawUsed);
    document.getElementById('kpi-raw-remaining').textContent = `${rawRemaining.toFixed(1)} kg`;

    // 3. Update individual Product Cards
    // Original
    updateProductCard(
        'orig', 
        summary.original, 
        targets.original.targetBoxes, 
        targets.original.targetRawKg, 
        targets.original.dailyTargetRawKg
    );
    // Spicy
    updateProductCard(
        'spicy', 
        summary.spicy, 
        targets.spicy.targetBoxes, 
        targets.spicy.targetRawKg, 
        targets.spicy.dailyTargetRawKg
    );
    // Pepper
    updateProductCard(
        'pep', 
        summary.pepper, 
        targets.pepper.targetBoxes, 
        targets.pepper.targetRawKg, 
        targets.pepper.dailyTargetRawKg
    );

    // 4. Update History Table
    renderHistoryTable();

    // 5. Update Chart
    renderChart();
}

// Utility function to update single Product Card
function updateProductCard(prefix, data, targetBoxes, targetRaw, dailyRate) {
    const progressPercent = Math.min(100, (data.boxesProd / targetBoxes) * 100);
    
    document.getElementById(`${prefix}-progress-label`).textContent = `${progressPercent.toFixed(1)}%`;
    document.getElementById(`${prefix}-progress-bar`).style.width = `${progressPercent}%`;
    document.getElementById(`${prefix}-raw-used`).textContent = `${data.rawUsed.toFixed(1)} / ${targetRaw} kg`;
    document.getElementById(`${prefix}-boxes-prod`).textContent = `${data.boxesProd} / ${targetBoxes} กล่อง`;
    
    const rawRem = Math.max(0, targetRaw - data.rawUsed);
    document.getElementById(`${prefix}-raw-rem`).textContent = `${rawRem.toFixed(1)} kg`;

    // Remaining production days estimation based on 60kg/day
    const daysRem = rawRem > 0 ? (rawRem / dailyRate) : 0;
    document.getElementById(`${prefix}-days-rem`).textContent = `${daysRem.toFixed(2)} วัน`;
}

// Render History Log Table
function renderHistoryTable() {
    historyTbody.innerHTML = '';
    
    if (logs.length === 0) {
        historyTbody.innerHTML = `
            <tr>
                <td colspan="8" class="empty-state">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <p>ยังไม่มีบันทึกข้อมูลการผลิตในประวัติ</p>
                </td>
            </tr>
        `;
        historyCount.textContent = "พบ 0 รายการ";
        return;
    }

    historyCount.textContent = `พบ ${logs.length} รายการ`;

    logs.slice().reverse().forEach(log => {
        const tr = document.createElement('tr');
        const finishedWeight = log.boxes * BOX_TO_KG_FACTOR;
        const yieldPercent = log.rawWeight > 0 ? (finishedWeight / log.rawWeight) * 100 : 0;
        
        let yieldClass = 'yield-badge';
        if (yieldPercent >= 81.3) yieldClass += ' yield-high';
        else if (yieldPercent >= 77.0) yieldClass += ' yield-mid';
        else yieldClass += ' yield-low';

        tr.innerHTML = `
            <td>${formatDate(log.date)}</td>
            <td><strong style="color: ${targets[log.flavor].color}">${targets[log.flavor].name}</strong></td>
            <td>${log.rawWeight.toFixed(2)} kg</td>
            <td>${log.boxes.toLocaleString()} กล่อง</td>
            <td>${finishedWeight.toFixed(2)} kg</td>
            <td><span class="${yieldClass}">${yieldPercent.toFixed(2)}%</span></td>
            <td style="max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${escapeHtml(log.remarks || '')}">${escapeHtml(log.remarks || '-')}</td>
            <td style="text-align: center;">
                <button class="btn-delete" onclick="deleteLog(${log.id})">ลบ</button>
            </td>
        `;
        historyTbody.appendChild(tr);
    });
}

// Chart.js rendering
function renderChart() {
    const ctx = document.getElementById('productionChart').getContext('2d');
    
    // Destroy previous chart if exists
    if (chartInstance) {
        chartInstance.destroy();
    }

    const theme = document.body.getAttribute('data-theme') || 'dark';
    const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
    const textColor = theme === 'dark' ? '#94a3b8' : '#475569';

    if (currentChartTab === 'overall') {
        // Tab 1: Overall Progress Bar comparison
        const data = {
            original: { raw: 0 },
            spicy: { raw: 0 },
            pepper: { raw: 0 }
        };

        logs.forEach(log => {
            if (data[log.flavor]) {
                data[log.flavor].raw += log.rawWeight;
            }
        });

        chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['รสดั้งเดิม', 'รสเผ็ด', 'รสพริกไทยดำ'],
                datasets: [
                    {
                        label: 'ใช้วัตถุดิบไปแล้ว (kg)',
                        data: [data.original.raw, data.spicy.raw, data.pepper.raw],
                        backgroundColor: [
                            'rgba(245, 158, 11, 0.75)',
                            'rgba(239, 68, 68, 0.75)',
                            'rgba(139, 92, 246, 0.75)'
                        ],
                        borderColor: [
                            '#f59e0b',
                            '#ef4444',
                            '#8b5cf6'
                        ],
                        borderWidth: 1.5,
                        borderRadius: 6
                    },
                    {
                        label: 'เป้าหมายวัตถุดิบรวม (kg)',
                        data: [220, 220, 170],
                        backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(15, 23, 42, 0.04)',
                        borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(15, 23, 42, 0.2)',
                        borderWidth: 1,
                        borderDash: [5, 5],
                        borderRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: textColor }
                    },
                    y: {
                        grid: { color: gridColor },
                        ticks: { color: textColor },
                        title: {
                            display: true,
                            text: 'น้ำหนัก (kg)',
                            color: textColor
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: textColor }
                    },
                    tooltip: {
                        callbacks: {
                            afterBody: function(items) {
                                const index = items[0].dataIndex;
                                const keys = ['original', 'spicy', 'pepper'];
                                const flavor = keys[index];
                                const rawTarget = [220, 220, 170][index];
                                let rawUsed = 0;
                                let boxes = 0;
                                logs.forEach(log => {
                                    if (log.flavor === flavor) {
                                        rawUsed += log.rawWeight;
                                        boxes += log.boxes;
                                    }
                                });
                                return `ผลิตได้สำเร็จ: ${boxes} กล่อง\nความคืบหน้า: ${(rawUsed / rawTarget * 100).toFixed(1)}%`;
                            }
                        }
                    }
                }
            }
        });

    } else if (currentChartTab === 'daily-trend') {
        // Tab 2: Daily production trend line chart
        const uniqueDates = [...new Set(logs.map(log => log.date))].sort();
        
        const datasets = {
            original: uniqueDates.map(d => 0),
            spicy: uniqueDates.map(d => 0),
            pepper: uniqueDates.map(d => 0)
        };

        logs.forEach(log => {
            const dateIdx = uniqueDates.indexOf(log.date);
            if (dateIdx !== -1 && datasets[log.flavor]) {
                datasets[log.flavor][dateIdx] += log.rawWeight;
            }
        });

        chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: uniqueDates.map(d => formatDateShort(d)),
                datasets: [
                    {
                        label: 'รสดั้งเดิม',
                        data: datasets.original,
                        borderColor: '#f59e0b',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        borderWidth: 3,
                        tension: 0.3,
                        pointRadius: 4,
                        fill: true
                    },
                    {
                        label: 'รสเผ็ด',
                        data: datasets.spicy,
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderWidth: 3,
                        tension: 0.3,
                        pointRadius: 4,
                        fill: true
                    },
                    {
                        label: 'รสพริกไทยดำ',
                        data: datasets.pepper,
                        borderColor: '#8b5cf6',
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        borderWidth: 3,
                        tension: 0.3,
                        pointRadius: 4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: textColor }
                    },
                    y: {
                        grid: { color: gridColor },
                        ticks: { color: textColor },
                        title: {
                            display: true,
                            text: 'วัตถุดิบปลาย่างที่ใช้ต่อวัน (kg)',
                            color: textColor
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: textColor }
                    }
                }
            }
        });

    } else if (currentChartTab === 'yield-rate') {
        // Tab 3: Yield percentage over time
        // We will show yield values chronologically
        const chartLogs = logs.filter(log => log.rawWeight > 0);
        
        const labels = chartLogs.map(log => `${formatDateShort(log.date)} (${targets[log.flavor].name.substring(2)})`);
        const yields = chartLogs.map(log => {
            const finishedWeight = log.boxes * BOX_TO_KG_FACTOR;
            return ((finishedWeight / log.rawWeight) * 100);
        });

        const colors = chartLogs.map(log => targets[log.flavor].color);

        chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Yield การผลิตจริง (%)',
                        data: yields,
                        backgroundColor: colors.map(c => c + 'cc'), // add opacity
                        borderColor: colors,
                        borderWidth: 1.5,
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { 
                            color: textColor,
                            font: { size: 10 }
                        }
                    },
                    y: {
                        grid: { color: gridColor },
                        ticks: { color: textColor },
                        min: 50,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Yield (%)',
                            color: textColor
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false // hide legend since colors represent flavors directly
                    },
                    tooltip: {
                        callbacks: {
                            afterBody: function(items) {
                                const index = items[0].dataIndex;
                                const log = chartLogs[index];
                                const finKg = log.boxes * BOX_TO_KG_FACTOR;
                                return `วัตถุดิบ: ${log.rawWeight.toFixed(1)} kg\nได้สินค้า: ${log.boxes} กล่อง (${finKg.toFixed(1)} kg)`;
                            }
                        }
                    }
                }
            }
        });
    }
}

// Backup & Restore: Export Data to JSON
function exportData() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    const todayStr = new Date().toISOString().split('T')[0];
    
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `pillow_pack_production_backup_${todayStr}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('ดาวน์โหลดไฟล์ข้อมูลผลิตสำรองเรียบร้อยแล้ว');
}

// Backup & Restore: Import Data from JSON
function importData(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
        try {
            const importedLogs = JSON.parse(evt.target.result);
            
            // Basic schema validation
            if (!Array.isArray(importedLogs)) {
                throw new Error("โครงสร้างไฟล์ไม่ใช่ Array");
            }

            const isValid = importedLogs.every(log => {
                return log.date && log.flavor && !isNaN(log.rawWeight) && !isNaN(log.boxes);
            });

            if (!isValid) {
                throw new Error("ข้อมูลบางแถวไม่ครบถ้วนหรือไม่ถูกต้องตามฟอร์แมต");
            }

            if (confirm(`คุณต้องการแทนที่ข้อมูลปัจจุบันด้วยข้อมูลนำเข้าจำนวน ${importedLogs.length} รายการใช่หรือไม่?`)) {
                logs = importedLogs;
                logs.sort((a, b) => new Date(a.date) - new Date(b.date));
                localStorage.setItem('grilled_fish_prod_logs', JSON.stringify(logs));
                updateDashboard();
                showToast(`นำเข้าข้อมูลสำเร็จ ${logs.length} รายการ`);
            }
        } catch (err) {
            alert(`ข้อผิดพลาดในการโหลดไฟล์: ${err.message}`);
            showToast('ไฟล์สำรองไม่ถูกต้อง', 'error');
        }
        // clear file input
        importFileInput.value = '';
    };
    reader.readAsText(file);
}

// Helper: Format date string (YYYY-MM-DD -> DD/MM/YYYY)
function formatDate(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return `${parts[2]}/${parts[1]}/${parseInt(parts[0]) + 543}`; // Convert to Buddhist Era year for local Thais
}

// Helper: Format date string short (YYYY-MM-DD -> DD/MM)
function formatDateShort(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return `${parts[2]}/${parts[1]}`;
}

// Helper: Escape HTML
function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
