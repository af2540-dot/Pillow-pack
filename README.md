[Uploading grilled-fish-dashboard.html…]()
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pillow Pack - แดชบอร์ดติดตามการผลิตปลาข้างเหลืองย่าง</title>
    <!-- Chart.js CDN -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Sarabun:wght@300;400;500;600;700&display=swap');

        :root {
            /* Base spacing */
            --spacing-xs: 0.5rem;
            --spacing-sm: 0.75rem;
            --spacing-md: 1.25rem;
            --spacing-lg: 2rem;
            --spacing-xl: 3rem;
            --border-radius: 16px;
            --border-radius-sm: 8px;
            --transition-fast: 0.2s ease;
            --transition-normal: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            
            /* Product Colors */
            --color-original: #f59e0b;
            --color-original-rgb: 245, 158, 11;
            --color-original-gradient: linear-gradient(135deg, #f59e0b, #d97706);
            
            --color-spicy: #ef4444;
            --color-spicy-rgb: 239, 68, 68;
            --color-spicy-gradient: linear-gradient(135deg, #ef4444, #b91c1c);
            
            --color-pepper: #8b5cf6;
            --color-pepper-rgb: 139, 92, 246;
            --color-pepper-gradient: linear-gradient(135deg, #8b5cf6, #6d28d9);

            /* Dark Mode variables (Default) */
            --bg-primary: #0b0f19;
            --bg-secondary: #131929;
            --card-bg: rgba(22, 30, 47, 0.7);
            --card-bg-hover: rgba(28, 38, 59, 0.85);
            --border-color: rgba(255, 255, 255, 0.08);
            --text-primary: #f8fafc;
            --text-secondary: #94a3b8;
            --text-muted: #64748b;
            --accent-color: #3b82f6;
            --accent-gradient: linear-gradient(135deg, #3b82f6, #6366f1);
            --success: #10b981;
            --warning: #f59e0b;
            --danger: #ef4444;
            --shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
            --shadow-hover: 0 12px 40px rgba(0, 0, 0, 0.45);
            --glow-opacity: 0.15;
        }

        [data-theme="light"] {
            /* Light Mode variables */
            --bg-primary: #f8fafc;
            --bg-secondary: #f1f5f9;
            --card-bg: rgba(255, 255, 255, 0.8);
            --card-bg-hover: rgba(255, 255, 255, 0.95);
            --border-color: rgba(15, 23, 42, 0.08);
            --text-primary: #0f172a;
            --text-secondary: #475569;
            --text-muted: #94a3b8;
            --accent-color: #2563eb;
            --accent-gradient: linear-gradient(135deg, #2563eb, #4f46e5);
            --shadow: 0 8px 30px rgba(15, 23, 42, 0.06);
            --shadow-hover: 0 12px 40px rgba(15, 23, 42, 0.12);
            --glow-opacity: 0.08;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', 'Sarabun', sans-serif;
            background-color: var(--bg-primary);
            color: var(--text-primary);
            min-height: 100vh;
            line-height: 1.6;
            transition: background-color var(--transition-normal), color var(--transition-normal);
            overflow-x: hidden;
        }

        /* Background Gradients decoration */
        .bg-glow-1, .bg-glow-2 {
            position: absolute;
            width: 600px;
            height: 600px;
            border-radius: 50%;
            filter: blur(150px);
            z-index: -1;
            pointer-events: none;
            opacity: var(--glow-opacity);
            transition: opacity var(--transition-normal);
        }

        .bg-glow-1 {
            top: -200px;
            right: -100px;
            background: radial-gradient(circle, var(--accent-color) 0%, rgba(0,0,0,0) 70%);
        }

        .bg-glow-2 {
            bottom: -200px;
            left: -100px;
            background: radial-gradient(circle, var(--color-pepper) 0%, rgba(0,0,0,0) 70%);
        }

        /* Layout container */
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: var(--spacing-md) var(--spacing-md) var(--spacing-xl) var(--spacing-md);
        }

        /* Header styling */
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: var(--spacing-md);
            margin-bottom: var(--spacing-md);
            border-bottom: 1px solid var(--border-color);
        }

        .brand-section h1 {
            font-size: 1.8rem;
            font-weight: 700;
            background: linear-gradient(135deg, var(--text-primary) 30%, var(--accent-color) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: flex;
            align-items: center;
            gap: var(--spacing-xs);
        }

        .brand-section p {
            font-size: 0.9rem;
            color: var(--text-secondary);
        }

        .actions-section {
            display: flex;
            gap: var(--spacing-sm);
            align-items: center;
        }

        /* Button styles */
        .btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 16px;
            border-radius: var(--border-radius-sm);
            border: 1px solid var(--border-color);
            font-family: inherit;
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            background-color: var(--bg-secondary);
            color: var(--text-primary);
            transition: all var(--transition-fast);
        }

        .btn:hover {
            background-color: var(--card-bg-hover);
            transform: translateY(-2px);
            box-shadow: var(--shadow);
        }

        .btn-primary {
            background: var(--accent-gradient);
            color: white;
            border: none;
        }

        .btn-primary:hover {
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
        }

        .btn-icon {
            width: 42px;
            height: 42px;
            padding: 0;
            justify-content: center;
            border-radius: 50%;
        }

        /* Summary Grid cards */
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-lg);
        }

        .card {
            background: var(--card-bg);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            padding: var(--spacing-md);
            box-shadow: var(--shadow);
            transition: all var(--transition-normal);
        }

        .card:hover {
            transform: translateY(-4px);
            border-color: rgba(255, 255, 255, 0.15);
            box-shadow: var(--shadow-hover);
        }

        .summary-card {
            position: relative;
            overflow: hidden;
        }

        .summary-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: var(--accent-color);
        }

        .summary-card.kpi-total::before { background: var(--accent-gradient); }
        .summary-card.kpi-yield::before { background: var(--success); }
        .summary-card.kpi-remaining::before { background: var(--warning); }

        .card-title {
            font-size: 0.85rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--text-secondary);
            margin-bottom: var(--spacing-xs);
        }

        .card-value {
            font-size: 2.2rem;
            font-weight: 700;
            line-height: 1.1;
            color: var(--text-primary);
        }

        .card-subtext {
            font-size: 0.85rem;
            color: var(--text-muted);
            margin-top: 4px;
            display: flex;
            justify-content: space-between;
        }

        /* Product Section grid */
        .products-section {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-lg);
        }

        .product-card {
            position: relative;
            border-top: 5px solid var(--p-color);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .product-card.original { --p-color: var(--color-original); }
        .product-card.spicy { --p-color: var(--color-spicy); }
        .product-card.pepper { --p-color: var(--color-pepper); }

        .product-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: var(--spacing-md);
        }

        .product-title {
            font-size: 1.3rem;
            font-weight: 600;
        }

        .badge {
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            color: #fff;
        }

        .badge-original { background-color: var(--color-original); }
        .badge-spicy { background-color: var(--color-spicy); }
        .badge-pepper { background-color: var(--color-pepper); }

        /* Progress bar */
        .progress-container {
            margin: var(--spacing-sm) 0 var(--spacing-md) 0;
        }

        .progress-info {
            display: flex;
            justify-content: space-between;
            font-size: 0.85rem;
            margin-bottom: 6px;
        }

        .progress-bar-bg {
            width: 100%;
            height: 10px;
            background-color: rgba(255,255,255,0.06);
            border-radius: 5px;
            overflow: hidden;
            position: relative;
        }

        [data-theme="light"] .progress-bar-bg {
            background-color: rgba(0,0,0,0.05);
        }

        .progress-bar-fill {
            height: 100%;
            border-radius: 5px;
            background: var(--p-gradient);
            width: 0%;
            transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .product-card.original .progress-bar-fill { --p-gradient: var(--color-original-gradient); }
        .product-card.spicy .progress-bar-fill { --p-gradient: var(--color-spicy-gradient); }
        .product-card.pepper .progress-bar-fill { --p-gradient: var(--color-pepper-gradient); }

        /* Metrics detail list inside card */
        .metrics-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-sm);
            border-top: 1px solid var(--border-color);
            padding-top: var(--spacing-sm);
            margin-top: auto;
        }

        .metric-item {
            display: flex;
            flex-direction: column;
        }

        .metric-label {
            font-size: 0.75rem;
            color: var(--text-muted);
        }

        .metric-value {
            font-size: 1rem;
            font-weight: 600;
        }

        /* Charts and Form layout grid */
        .main-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-lg);
        }

        @media (max-width: 1024px) {
            .main-grid {
                grid-template-columns: 1fr;
            }
        }

        .chart-card {
            min-height: 400px;
        }

        .chart-tabs {
            display: flex;
            gap: 8px;
            margin-bottom: var(--spacing-md);
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 8px;
        }

        .chart-tab {
            padding: 6px 12px;
            border-radius: var(--border-radius-sm);
            border: none;
            background: none;
            color: var(--text-secondary);
            font-weight: 500;
            cursor: pointer;
            font-size: 0.85rem;
            transition: all var(--transition-fast);
        }

        .chart-tab.active {
            background-color: var(--bg-secondary);
            color: var(--accent-color);
        }

        .chart-container {
            position: relative;
            height: 320px;
            width: 100%;
        }

        /* Logging Form Styling */
        .form-group {
            margin-bottom: var(--spacing-sm);
        }

        .form-group label {
            display: block;
            font-size: 0.85rem;
            margin-bottom: 6px;
            color: var(--text-secondary);
            font-weight: 500;
        }

        .form-control {
            width: 100%;
            padding: 10px 14px;
            border-radius: var(--border-radius-sm);
            border: 1px solid var(--border-color);
            background-color: var(--bg-secondary);
            color: var(--text-primary);
            font-family: inherit;
            font-size: 0.95rem;
            transition: border-color var(--transition-fast);
        }

        .form-control:focus {
            outline: none;
            border-color: var(--accent-color);
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-sm);
        }

        .form-helper {
            font-size: 0.75rem;
            color: var(--text-muted);
            margin-top: 3px;
        }

        /* History table styling */
        .history-section {
            width: 100%;
        }

        .table-header-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--spacing-sm);
        }

        .table-container {
            width: 100%;
            overflow-x: auto;
            border-radius: var(--border-radius-sm);
            border: 1px solid var(--border-color);
        }

        table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            font-size: 0.9rem;
        }

        th, td {
            padding: 12px 16px;
            border-bottom: 1px solid var(--border-color);
        }

        th {
            background-color: var(--bg-secondary);
            color: var(--text-secondary);
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.75rem;
            letter-spacing: 0.05em;
        }

        tr:last-child td {
            border-bottom: none;
        }

        tr:hover td {
            background-color: rgba(255, 255, 255, 0.02);
        }

        [data-theme="light"] tr:hover td {
            background-color: rgba(0, 0, 0, 0.01);
        }

        /* Table Footer / Summary Row */
        tfoot tr {
            background-color: rgba(255, 255, 255, 0.05);
            border-top: 2px solid var(--accent-color);
            font-weight: 700;
        }

        [data-theme="light"] tfoot tr {
            background-color: rgba(59, 130, 246, 0.06);
            border-top: 2px solid var(--accent-color);
        }

        tfoot td {
            padding: 12px 14px;
            color: var(--text-primary);
            border-bottom: none !important;
            font-size: 0.9rem;
        }

        .btn-delete {
            padding: 4px 8px;
            border-radius: var(--border-radius-sm);
            background-color: rgba(239, 68, 68, 0.1);
            color: var(--danger);
            border: 1px solid rgba(239, 68, 68, 0.2);
            cursor: pointer;
            font-size: 0.75rem;
            transition: all var(--transition-fast);
        }

        .btn-delete:hover {
            background-color: var(--danger);
            color: white;
        }

        /* Status Indicator classes */
        .yield-badge {
            display: inline-flex;
            align-items: center;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 600;
        }

        .yield-high { background-color: rgba(16, 185, 129, 0.15); color: #10b981; }
        .yield-mid { background-color: rgba(245, 158, 11, 0.15); color: #f59e0b; }
        .yield-low { background-color: rgba(239, 68, 68, 0.15); color: #ef4444; }

        /* Empty state styling */
        .empty-state {
            padding: var(--spacing-xl) 0;
            text-align: center;
            color: var(--text-muted);
        }

        .empty-state svg {
            margin-bottom: var(--spacing-sm);
            opacity: 0.5;
        }

        /* Float custom elements */
        .float-info {
            font-size: 0.8rem;
            color: var(--text-muted);
        }

        /* Toast Notification */
        .toast {
            position: fixed;
            bottom: 24px;
            right: 24px;
            padding: 12px 24px;
            border-radius: var(--border-radius-sm);
            background-color: var(--bg-secondary);
            color: var(--text-primary);
            border-left: 4px solid var(--accent-color);
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            z-index: 1000;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            pointer-events: none;
        }

        .toast.show {
            transform: translateY(0);
            opacity: 1;
        }

        .toast.success { border-left-color: var(--success); }
        .toast.error { border-left-color: var(--danger); }

        /* Report Metadata Card Styling */
        .report-meta-card {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: var(--spacing-sm);
            margin-bottom: var(--spacing-md);
            padding: 10px 16px;
            align-items: center;
        }

        .meta-group {
            display: flex;
            flex-wrap: wrap;
            gap: var(--spacing-md);
        }

        .meta-item {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.85rem;
        }

        .meta-label {
            font-weight: 600;
            color: var(--text-secondary);
        }

        .meta-value {
            color: var(--text-primary);
            background-color: rgba(255, 255, 255, 0.04);
            padding: 3px 10px;
            border-radius: var(--border-radius-sm);
            font-weight: 500;
            border: 1px solid var(--border-color);
        }

        [data-theme="light"] .meta-value {
            background-color: rgba(0, 0, 0, 0.03);
        }

        @media (max-width: 768px) {
            .report-meta-card {
                flex-direction: column;
                align-items: flex-start;
                gap: var(--spacing-xs);
            }
            
            .meta-group {
                flex-direction: column;
                gap: var(--spacing-xs);
                width: 100%;
            }
        }

        /* Edit Button Style */
        .btn-edit {
            padding: 4px 8px;
            border-radius: var(--border-radius-sm);
            background-color: rgba(59, 130, 246, 0.1);
            color: var(--accent-color);
            border: 1px solid rgba(59, 130, 246, 0.2);
            cursor: pointer;
            font-size: 0.75rem;
            transition: all var(--transition-fast);
        }
        .btn-edit:hover {
            background-color: var(--accent-color);
            color: white;
        }

        /* Modal Backdrop & Dialog */
        .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        }

        .modal-content {
            width: 90%;
            max-width: 520px;
            max-height: 90vh;
            overflow-y: auto;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            padding: var(--spacing-md);
            box-shadow: var(--shadow-hover);
            animation: modalFadeIn 0.25s ease-out;
        }

        @keyframes modalFadeIn {
            from { opacity: 0; transform: translateY(-20px) scale(0.96); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .badge-status-completed {
            background-color: rgba(16, 185, 129, 0.2);
            color: #10b981;
            border: 1px solid rgba(16, 185, 129, 0.4);
        }

        .badge-status-active {
            background-color: rgba(59, 130, 246, 0.2);
            color: #3b82f6;
            border: 1px solid rgba(59, 130, 246, 0.4);
        }

        .waste-badge {
            display: inline-flex;
            align-items: center;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        .waste-low { background-color: rgba(16, 185, 129, 0.15); color: #10b981; }
        .waste-mid { background-color: rgba(245, 158, 11, 0.15); color: #f59e0b; }
        .waste-high { background-color: rgba(239, 68, 68, 0.15); color: #ef4444; }

        /* Production Issue Badges */
        .issue-badge {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 2px 8px;
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 600;
        }
        .issue-none { background-color: rgba(16, 185, 129, 0.12); color: #10b981; }
        .issue-machine { background-color: rgba(245, 158, 11, 0.18); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); }
        .issue-material { background-color: rgba(239, 68, 68, 0.18); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); }
        .issue-packaging { background-color: rgba(139, 92, 246, 0.18); color: #8b5cf6; border: 1px solid rgba(139, 92, 246, 0.3); }
        .issue-labor { background-color: rgba(6, 182, 212, 0.18); color: #06b6d4; border: 1px solid rgba(6, 182, 212, 0.3); }
        .issue-other { background-color: rgba(234, 179, 8, 0.18); color: #eab308; border: 1px solid rgba(234, 179, 8, 0.3); }

        .issue-tag-chip {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 1px 6px;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 500;
            margin: 2px 2px 2px 0;
        }

        /* Ink Cartridge Badges & Modal Styling */
        .cartridge-badge {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 2px 8px;
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 600;
        }
        .cartridge-active { background-color: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); }
        .cartridge-completed { background-color: rgba(59, 130, 246, 0.15); color: #3b82f6; border: 1px solid rgba(59, 130, 246, 0.3); }

        .modal-tabs {
            display: flex;
            gap: 8px;
            border-bottom: 1px solid var(--border-color);
            margin-bottom: 16px;
            padding-bottom: 6px;
        }
        .modal-tab-btn {
            background: none;
            border: none;
            padding: 8px 14px;
            border-radius: var(--border-radius-sm);
            color: var(--text-secondary);
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            transition: all var(--transition-fast);
        }
        .modal-tab-btn:hover {
            color: var(--text-primary);
            background-color: var(--card-bg-hover);
        }
        .modal-tab-btn.active {
            background: var(--card-bg-hover);
            color: var(--accent-color);
            border-bottom: 2px solid var(--accent-color);
        }
        .analytics-card-stat {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius-sm);
            padding: 8px;
        }

        .invoice-select {
            background-color: var(--bg-secondary);
            color: var(--text-primary);
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius-sm);
            padding: 5px 10px;
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            outline: none;
            transition: border-color var(--transition-fast);
        }
        .invoice-select:focus {
            border-color: var(--accent-color);
        }

        /* Print Media Styles for PDF Saving */
        @media print {
            body {
                background-color: white !important;
                color: black !important;
                font-size: 11pt;
            }
            
            .bg-glow-1, .bg-glow-2, 
            .actions-section, 
            #prod-form, 
            #form-card,
            .btn-delete, 
            .btn-edit,
            th:last-child, 
            td:last-child,
            .toast,
            .modal-backdrop,
            #btn-open-new-invoice {
                display: none !important;
            }

            #invoice-print-label {
                display: inline-block !important;
            }
            
            .container {
                max-width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
            }
            
            .card {
                background: white !important;
                color: black !important;
                border: 1px solid #ccc !important;
                box-shadow: none !important;
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
                page-break-inside: avoid;
            }
            
            .summary-grid, .products-section {
                display: grid !important;
                grid-template-columns: repeat(3, 1fr) !important;
                gap: 10px !important;
            }
            
            .main-grid {
                grid-template-columns: 1fr !important;
            }
            
            .chart-card {
                min-height: 250px !important;
                page-break-inside: avoid;
            }
            
            .chart-tabs {
                display: none !important;
            }
            
            * {
                color: black !important;
                text-shadow: none !important;
            }
            
            .meta-value, .badge {
                border: 1px solid #777 !important;
                background-color: #f0f0f0 !important;
                color: black !important;
            }
            
            .progress-bar-bg {
                border: 1px solid #999 !important;
                background-color: #ddd !important;
            }
            
            .progress-bar-fill {
                background: #555 !important;
            }
        }
    </style>
</head>
<body data-theme="dark">
    <!-- Decorative Glowing Backgrounds -->
    <div class="bg-glow-1"></div>
    <div class="bg-glow-2"></div>

    <div class="container">
        <!-- Header -->
        <header>
            <div class="brand-section">
                <h1>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-color);">
                        <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"></path>
                        <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                        <path d="M12 2v2"></path>
                        <path d="M12 20v2"></path>
                        <path d="M20 12h2"></path>
                        <path d="M2 12h2"></path>
                    </svg>
                    Pillow Pack Dashboard
                </h1>
                <p>ระบบบันทึกและติดตามการผลิตปลาข้างเหลืองย่างรายวันอย่างแม่นยำ</p>
            </div>
            
            <div class="actions-section">
                <!-- Export/Import buttons -->
                <button id="btn-export" class="btn" title="ส่งออกข้อมูลสำรอง (JSON)">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    ส่งออกข้อมูล
                </button>
                <button id="btn-import-trigger" class="btn" title="นำเข้าข้อมูลจากไฟล์สำรอง">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    นำเข้าข้อมูล
                </button>
                <input type="file" id="import-file" accept=".json" style="display: none;">

                <!-- Print Report Button -->
                <button id="btn-print" class="btn btn-primary" title="บันทึกรายงานเป็น PDF">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V2h12v7"></path><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                    พิมพ์รายงาน PDF
                </button>

                <!-- Theme Toggle Button -->
                <button id="theme-toggle" class="btn btn-icon" title="เปลี่ยนโหมดสี">
                    <svg id="theme-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></svg>
                </button>
            </div>
        </header>

        <!-- Report Metadata Card -->
        <section class="card report-meta-card">
            <div class="meta-group">
                <div class="meta-item">
                    <span class="meta-label">ลูกค้า (Customer):</span>
                    <span id="meta-customer-name" class="meta-value">Shenzhen Yue Tai</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Invoice No.:</span>
                    <div id="invoice-selector-container" style="display: inline-flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                        <select id="invoice-selector" class="invoice-select" title="เลือกรอบการผลิต / ดูข้อมูลย้อนหลัง"></select>
                        <span id="invoice-status-badge" class="badge badge-status-active">กำลังผลิต</span>
                        <button id="btn-open-new-invoice" class="btn btn-primary" style="padding: 4px 10px; font-size: 0.8rem;" title="สร้างรอบการผลิต / Invoice ใหม่">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            + เพิ่ม Invoice ใหม่
                        </button>
                    </div>
                    <span id="invoice-print-label" class="meta-value" style="display: none;">-</span>
                </div>
            </div>
            <div class="meta-item">
                <span class="meta-label">วันที่รายงาน:</span>
                <span id="report-view-date" class="meta-value">-</span>
            </div>
        </section>

        <!-- KPI Summary Cards -->
        <section class="summary-grid">
            <!-- Total Production Progress -->
            <div class="card summary-card kpi-total">
                <div class="card-title">ความคืบหน้าการผลิตรวม</div>
                <div id="kpi-progress-percent" class="card-value">0%</div>
                <div class="card-subtext">
                    <span id="kpi-progress-text">ผลิตแล้ว 0 / 550 กล่อง</span>
                    <span id="kpi-progress-weight">0.0 / 495.0 kg (สำเร็จรูป)</span>
                </div>
            </div>

            <!-- Average Efficiency (Yield) -->
            <div class="card summary-card kpi-yield">
                <div class="card-title">ประสิทธิภาพการผลิตรวม (Yield)</div>
                <div id="kpi-yield-percent" class="card-value">0.0%</div>
                <div class="card-subtext">
                    <span>เป้าหมายเฉลี่ย ~90.0%</span>
                    <span id="kpi-yield-status" class="yield-badge">ไม่มีข้อมูล</span>
                </div>
            </div>

            <!-- Raw Material Remaining -->
            <div class="card summary-card kpi-remaining">
                <div class="card-title">วัตถุดิบปลาย่างที่ยังต้องใช้เพิ่ม</div>
                <div id="kpi-raw-remaining" class="card-value">550 kg</div>
                <div class="card-subtext">
                    <span id="kpi-days-left">กำลังผลิตเป้าหมาย 60 kg/วัน</span>
                </div>
            </div>
        </section>

        <!-- Product Cards (3 Flavors) -->
        <section class="products-section">
            <!-- Original Flavor -->
            <div class="card product-card original">
                <div>
                    <div class="product-header">
                        <div class="product-title">รสดั้งเดิม (Original)</div>
                        <span class="badge badge-original">เป้าหมาย 200 กล่อง</span>
                    </div>
                    
                    <div class="progress-container">
                        <div class="progress-info">
                            <span>ความสำเร็จ</span>
                            <span id="orig-progress-label">0%</span>
                        </div>
                        <div class="progress-bar-bg">
                            <div id="orig-progress-bar" class="progress-bar-fill"></div>
                        </div>
                    </div>

                    <div class="metrics-list">
                        <div class="metric-item">
                            <span class="metric-label">วัตถุดิบที่ใช้ไปแล้ว</span>
                            <span id="orig-raw-used" class="metric-value">0 / 200 kg</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">ผลิต/ส่งมอบสำเร็จ</span>
                            <span id="orig-boxes-prod" class="metric-value">0 / 200 กล่อง</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">วัตถุดิบที่ต้องใช้เพิ่ม</span>
                            <span id="orig-raw-rem" class="metric-value">200.0 kg</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">เวลาที่คาดว่าต้องใช้เพิ่ม</span>
                            <span id="orig-days-rem" class="metric-value">3.33 วัน</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">เบิกใช้ฟิล์มสะสม</span>
                            <span id="orig-film-used" class="metric-value">0.0 ม้วน</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">ของเสียสะสม (% เสีย)</span>
                            <span id="orig-waste-used" class="metric-value">0.00 kg (0.00%)</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Spicy Flavor -->
            <div class="card product-card spicy">
                <div>
                    <div class="product-header">
                        <div class="product-title">รสเผ็ด (Spicy)</div>
                        <span class="badge badge-spicy">เป้าหมาย 200 กล่อง</span>
                    </div>
                    
                    <div class="progress-container">
                        <div class="progress-info">
                            <span>ความสำเร็จ</span>
                            <span id="spicy-progress-label">0%</span>
                        </div>
                        <div class="progress-bar-bg">
                            <div id="spicy-progress-bar" class="progress-bar-fill"></div>
                        </div>
                    </div>

                    <div class="metrics-list">
                        <div class="metric-item">
                            <span class="metric-label">วัตถุดิบที่ใช้ไปแล้ว</span>
                            <span id="spicy-raw-used" class="metric-value">0 / 200 kg</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">ผลิต/ส่งมอบสำเร็จ</span>
                            <span id="spicy-boxes-prod" class="metric-value">0 / 200 กล่อง</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">วัตถุดิบที่ต้องใช้เพิ่ม</span>
                            <span id="spicy-raw-rem" class="metric-value">200.0 kg</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">เวลาที่คาดว่าต้องใช้เพิ่ม</span>
                            <span id="spicy-days-rem" class="metric-value">3.33 วัน</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">เบิกใช้ฟิล์มสะสม</span>
                            <span id="spicy-film-used" class="metric-value">0.0 ม้วน</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">ของเสียสะสม (% เสีย)</span>
                            <span id="spicy-waste-used" class="metric-value">0.00 kg (0.00%)</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Black Pepper Flavor -->
            <div class="card product-card pepper">
                <div>
                    <div class="product-header">
                        <div class="product-title">รสพริกไทยดำ (Pepper)</div>
                        <span class="badge badge-pepper">เป้าหมาย 150 กล่อง</span>
                    </div>
                    
                    <div class="progress-container">
                        <div class="progress-info">
                            <span>ความสำเร็จ</span>
                            <span id="pep-progress-label">0%</span>
                        </div>
                        <div class="progress-bar-bg">
                            <div id="pep-progress-bar" class="progress-bar-fill"></div>
                        </div>
                    </div>

                    <div class="metrics-list">
                        <div class="metric-item">
                            <span class="metric-label">วัตถุดิบที่ใช้ไปแล้ว</span>
                            <span id="pep-raw-used" class="metric-value">0 / 150 kg</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">ผลิต/ส่งมอบสำเร็จ</span>
                            <span id="pep-boxes-prod" class="metric-value">0 / 150 กล่อง</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">วัตถุดิบที่ต้องใช้เพิ่ม</span>
                            <span id="pep-raw-rem" class="metric-value">150.0 kg</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">เวลาที่คาดว่าต้องใช้เพิ่ม</span>
                            <span id="pep-days-rem" class="metric-value">2.50 วัน</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">เบิกใช้ฟิล์มสะสม</span>
                            <span id="pep-film-used" class="metric-value">0.0 ม้วน</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">ของเสียสะสม (% เสีย)</span>
                            <span id="pep-waste-used" class="metric-value">0.00 kg (0.00%)</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Main Chart and Form Panel -->
        <div class="main-grid">
            <!-- Chart Panel -->
            <div class="card chart-card">
                <div class="chart-tabs">
                    <button class="chart-tab active" data-chart="overall">ความคืบหน้าการผลิตจริงเทียบเป้าหมาย</button>
                    <button class="chart-tab" data-chart="daily-trend">แนวโน้มผลิตรายวัน (kg)</button>
                    <button class="chart-tab" data-chart="yield-rate">ประสิทธิภาพ Yield (%)</button>
                    <button class="chart-tab" data-chart="film-ratio">🎞️ สัดส่วนการใช้ฟิล์ม</button>
                    <button class="chart-tab" data-chart="ink-cartridge">🖨️ ตลับหมึกพิมพ์วันที่</button>
                    <button class="chart-tab" data-chart="invoice-compare">📦 เปรียบเทียบตู้สินค้า (Invoice No.)</button>
                </div>
                <div class="chart-container">
                    <canvas id="productionChart"></canvas>
                </div>
            </div>

            <!-- Data Logging Form -->
            <div class="card" id="form-card">
                <h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: var(--spacing-sm);">บันทึกข้อมูลการผลิตรายวัน</h3>
                <form id="prod-form" onsubmit="return false;">
                    <!-- Date Selection -->
                    <div class="form-group">
                        <label for="prod-date">วันที่ผลิต</label>
                        <input type="date" id="prod-date" class="form-control" required>
                    </div>

                    <!-- Flavor Selection -->
                    <div class="form-group">
                        <label for="prod-flavor">รสชาติสินค้า</label>
                        <select id="prod-flavor" class="form-control" required>
                            <option value="" disabled selected>-- เลือกโหมดรสชาติ --</option>
                            <option value="original">รสดั้งเดิม</option>
                            <option value="spicy">รสเผ็ด</option>
                            <option value="pepper">รสพริกไทยดำ</option>
                        </select>
                    </div>

                    <div class="form-row">
                        <!-- Raw Material Input -->
                        <div class="form-group">
                            <label for="prod-raw-weight">ใช้วัตถุดิบปลาย่าง (kg)</label>
                            <input type="number" id="prod-raw-weight" class="form-control" step="0.01" min="0.01" placeholder="ตัวอย่าง: 60" required>
                            <div class="form-helper">เป้าผลิตเฉลี่ย: 60 kg/วัน</div>
                        </div>

                        <!-- Box Produced Input -->
                        <div class="form-group">
                            <label for="prod-boxes">จำนวนผลิต/ส่งมอบจริง (กล่อง)</label>
                            <input type="number" id="prod-boxes" class="form-control" min="0" placeholder="ตัวอย่าง: 45" required>
                            <div class="form-helper" id="boxes-helper">บรรจุ: 75ก. × 12ถุง/กล่อง</div>
                        </div>
                    </div>

                    <div class="form-row">
                        <!-- Waste Input -->
                        <div class="form-group">
                            <label for="prod-waste-weight">ของเสีย (kg)</label>
                            <input type="number" id="prod-waste-weight" class="form-control" step="0.01" min="0" placeholder="ตัวอย่าง: 1.5">
                            <div class="form-helper" id="waste-helper">% ของเสียคำนวณอัตโนมัติ</div>
                        </div>

                        <!-- Film Used Input -->
                        <div class="form-group">
                            <label for="prod-film-used">จำนวนเบิกใช้ฟิล์ม (ม้วน)</label>
                            <input type="number" id="prod-film-used" class="form-control" step="0.1" min="0" placeholder="ตัวอย่าง: 1.0">
                            <div class="form-helper">บันทึกยอดฟิล์มที่เบิกใช้ในรสชาตินี้</div>
                        </div>
                    </div>

                    <!-- Computed Yield & Waste info (Helper overlay) -->
                    <div class="form-group" style="background-color: rgba(255,255,255,0.03); border-radius: var(--border-radius-sm); padding: 8px 12px; margin-top: 4px; display: none;" id="yield-preview-container">
                        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 4px;">
                            <span>น้ำหนักสินค้าสำเร็จรูป: <strong id="preview-fin-wt">0.00</strong> kg</span>
                            <span>Yield ประเมิน: <strong id="preview-yield">0.00%</strong></span>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; border-top: 1px dashed var(--border-color); padding-top: 4px;">
                            <span>ของเสียประเมิน: <strong id="preview-waste">0.00 kg</strong></span>
                            <span>อัตราของเสีย: <strong id="preview-waste-pct">0.00%</strong></span>
                        </div>
                    </div>

                    <!-- Ink Cartridge & Remarks -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="prod-cartridge-select">ตลับหมึกพิมพ์วันที่ (สะสมยอดกล่อง)</label>
                            <select id="prod-cartridge-select" class="form-control">
                                <!-- Populated dynamically by JS -->
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="prod-remarks">หมายเหตุ / บันทึกเพิ่มเติม</label>
                            <input type="text" id="prod-remarks" class="form-control" placeholder="เช่น บันทึกข้อสังเกตหรือรายละเอียดการผลิต">
                        </div>
                    </div>

                    <div style="display: flex; gap: 8px; margin-top: 8px;">
                        <button type="submit" id="btn-submit" class="btn btn-primary" style="flex: 1; justify-content: center;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                            <span id="submit-btn-text">บันทึกยอดการผลิต</span>
                        </button>
                        <button type="button" id="btn-cancel-edit" class="btn" style="display: none; background-color: rgba(239, 68, 68, 0.1); color: var(--danger); border-color: rgba(239, 68, 68, 0.2);">
                            ยกเลิก
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Film Proportion & Ink Cartridge Analytics Section -->
        <section class="card" style="margin-bottom: var(--spacing-lg);">
            <div class="table-header-wrapper" style="margin-bottom: var(--spacing-md);">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--accent-color);">
                        <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                        <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                    </svg>
                    <h3 style="font-size: 1.15rem; font-weight: 600;">การวิเคราะห์สัดส่วนฟิล์ม & สถิติตลับหมึกเครื่องพิมพ์วันที่</h3>
                </div>
                <div style="display: flex; gap: 8px;">
                    <button type="button" id="btn-open-cartridge-modal" class="btn btn-primary" style="font-size: 0.85rem; padding: 6px 14px;">
                        🖨️ บันทึกยอดสะสม / จัดการตลับหมึก
                    </button>
                </div>
            </div>

            <div class="analytics-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: var(--spacing-md);">
                <!-- Film Proportion Card -->
                <div class="card" style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); padding: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <h4 style="font-size: 0.95rem; font-weight: 600; display: flex; align-items: center; gap: 6px;">
                            🎞️ สัดส่วนการใช้ฟิล์มแต่ละรสชาติ
                        </h4>
                        <span id="film-total-badge" class="badge" style="background: rgba(59, 130, 246, 0.15); color: #3b82f6;">รวม 0.0 ม้วน</span>
                    </div>
                    <div style="position: relative; height: 220px; width: 100%;">
                        <canvas id="filmDoughnutChart"></canvas>
                    </div>
                    <div id="film-stats-container" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 14px; text-align: center;">
                        <!-- Dynamic film flavor stat boxes -->
                    </div>
                </div>

                <!-- Ink Cartridge Usage Card -->
                <div class="card" style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); padding: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <h4 style="font-size: 0.95rem; font-weight: 600; display: flex; align-items: center; gap: 6px;">
                            🖨️ อัตราการใช้งานตลับหมึกเครื่องพิมพ์วันที่
                        </h4>
                        <span id="cartridge-active-badge" class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">ตลับที่ 2 กำลังใช้งาน</span>
                    </div>
                    <div style="position: relative; height: 220px; width: 100%;">
                        <canvas id="cartridgeBarChart"></canvas>
                    </div>
                    <div id="cartridge-stats-container" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 14px; text-align: center;">
                        <!-- Dynamic cartridge KPI summary boxes -->
                    </div>
                </div>
            </div>
        </section>

        <!-- Invoice / Container Production Comparison Section -->
        <section class="card invoice-section" id="invoice-comparison-section" style="margin-bottom: var(--spacing-lg);">
            <div class="table-header-wrapper" style="margin-bottom: var(--spacing-sm);">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--accent-color);">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                    <h3 style="font-size: 1.15rem; font-weight: 600;">รายงานเปรียบเทียบการผลิตรายตู้สินค้า (Invoice No. / Container Comparison)</h3>
                </div>
                <div class="float-info" id="invoice-compare-count">0 ตู้สินค้า</div>
            </div>

            <!-- Invoice Highlights Summary Cards -->
            <div class="monthly-kpi-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin-bottom: 16px;">
                <div class="card" style="padding: 12px; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2);">
                    <div style="font-size: 0.8rem; color: var(--text-secondary);">ตู้สินค้าที่ Yield สูงสุด 🏆</div>
                    <div id="best-yield-inv" style="font-size: 1.15rem; font-weight: 700; color: #10b981; margin: 4px 0;">-</div>
                    <div id="best-yield-inv-val" style="font-size: 0.8rem; color: var(--text-muted);">-</div>
                </div>
                <div class="card" style="padding: 12px; background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.2);">
                    <div style="font-size: 0.8rem; color: var(--text-secondary);">ตู้สินค้าที่ของเสียน้อยที่สุด 📉</div>
                    <div id="lowest-waste-inv" style="font-size: 1.15rem; font-weight: 700; color: #3b82f6; margin: 4px 0;">-</div>
                    <div id="lowest-waste-inv-val" style="font-size: 0.8rem; color: var(--text-muted);">-</div>
                </div>
                <div class="card" style="padding: 12px; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2);">
                    <div style="font-size: 0.8rem; color: var(--text-secondary);">ปัญหาที่พบระหว่างผลิตสะสม ⚠️</div>
                    <div id="total-inv-issues-count" style="font-size: 1.15rem; font-weight: 700; color: #ef4444; margin: 4px 0;">0 ครั้ง</div>
                    <div id="most-common-inv-issue" style="font-size: 0.8rem; color: var(--text-muted);">-</div>
                </div>
            </div>

            <!-- Invoice Comparison Table -->
            <div class="table-container">
                <table id="invoice-compare-table">
                    <thead>
                        <tr>
                            <th>ตู้สินค้า / Invoice No.</th>
                            <th>สถานะตู้</th>
                            <th>ใช้วัตถุดิบปลาย่าง (kg)</th>
                            <th>ผลิตได้จริง (กล่อง)</th>
                            <th>น้ำหนักสำเร็จรูป (kg)</th>
                            <th>% การผลิต (Yield)</th>
                            <th>ของเสีย (kg)</th>
                            <th>% ของเสีย</th>
                            <th>เบิกใช้ฟิล์ม (ม้วน)</th>
                            <th style="min-width: 250px;">ปัญหาระหว่างการผลิต</th>
                            <th style="width: 100px; text-align: center;">ดูข้อมูลตู้</th>
                        </tr>
                    </thead>
                    <tbody id="invoice-compare-tbody">
                        <!-- Dynamic Invoice Comparison Content -->
                    </tbody>
                    <tfoot id="invoice-compare-tfoot">
                        <!-- Dynamic Invoice Total Row -->
                    </tfoot>
                </table>
            </div>
        </section>

        <!-- History Records Table -->
        <section class="card history-section">
            <div class="table-header-wrapper">
                <h3 style="font-size: 1.1rem; font-weight: 600;">ประวัติการผลิตรายวัน</h3>
                <div class="float-info" id="history-count">พบ 0 รายการ</div>
            </div>
            
            <div class="table-container">
                <table id="history-table">
                    <thead>
                        <tr>
                            <th>วันที่ผลิต</th>
                            <th>รสชาติ</th>
                            <th>ใช้วัตถุดิบปลาย่าง (kg)</th>
                            <th>ผลิต/ส่งมอบ (กล่อง)</th>
                            <th>น้ำหนักสำเร็จรูป (kg)</th>
                            <th>% Yield จริง</th>
                            <th>ของเสีย (kg)</th>
                            <th>% ของเสีย</th>
                            <th>เบิกใช้ฟิล์ม (ม้วน)</th>
                            <th>ตลับหมึก / หมายเหตุ</th>
                            <th style="width: 140px; text-align: center;">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody id="history-tbody">
                        <!-- Dynamic content -->
                    </tbody>
                    <tfoot id="history-tfoot">
                        <!-- Dynamic grand total row -->
                    </tfoot>
                </table>
            </div>
        </section>
    </div>

    <!-- Modal for Creating New Invoice -->
    <div id="new-invoice-modal" class="modal-backdrop" style="display: none;">
        <div class="modal-content card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-sm); border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">
                <h3 style="font-size: 1.15rem; font-weight: 600; display: flex; align-items: center; gap: 8px;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
                    สร้างรอบการผลิต / Invoice ใหม่
                </h3>
                <button type="button" id="btn-close-invoice-modal" class="btn btn-icon" style="width: 32px; height: 32px; padding: 0;">✕</button>
            </div>
            <form id="new-invoice-form" onsubmit="return false;">
                <div class="form-group">
                    <label for="inv-no-input">เลขที่ Invoice No. <span style="color: var(--danger);">*</span></label>
                    <input type="text" id="inv-no-input" class="form-control" placeholder="เช่น SSPEP-SES-021/2026" required>
                </div>
                <div class="form-group">
                    <label for="inv-customer-input">ชื่อลูกค้า (Customer Name)</label>
                    <input type="text" id="inv-customer-input" class="form-control" value="Shenzhen Yue Tai" required>
                </div>

                <div style="margin-top: 14px; margin-bottom: 6px; font-size: 0.85rem; font-weight: 600; color: var(--accent-color);">
                    🎯 กำหนดเป้าหมายการผลิตสำหรับ Invoice นี้:
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="inv-orig-boxes">รสดั้งเดิม (กล่อง)</label>
                        <input type="number" id="inv-orig-boxes" class="form-control" value="200" required min="1">
                    </div>
                    <div class="form-group">
                        <label for="inv-orig-raw">วัตถุดิบดั้งเดิม (kg)</label>
                        <input type="number" id="inv-orig-raw" class="form-control" value="200" required min="1" step="0.1">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="inv-spicy-boxes">รสเผ็ด (กล่อง)</label>
                        <input type="number" id="inv-spicy-boxes" class="form-control" value="200" required min="1">
                    </div>
                    <div class="form-group">
                        <label for="inv-spicy-raw">วัตถุดิบเผ็ด (kg)</label>
                        <input type="number" id="inv-spicy-raw" class="form-control" value="200" required min="1" step="0.1">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="inv-pep-boxes">รสพริกไทยดำ (กล่อง)</label>
                        <input type="number" id="inv-pep-boxes" class="form-control" value="150" required min="1">
                    </div>
                    <div class="form-group">
                        <label for="inv-pep-raw">วัตถุดิบพริกไทยดำ (kg)</label>
                        <input type="number" id="inv-pep-raw" class="form-control" value="150" required min="1" step="0.1">
                    </div>
                </div>
                <div class="form-group">
                    <label for="inv-daily-rate">เป้าหมายกำลังผลิตเฉลี่ย (kg/วัน)</label>
                    <input type="number" id="inv-daily-rate" class="form-control" value="60" required min="1" step="0.1">
                </div>
                
                <div style="display: flex; gap: 8px; margin-top: 18px;">
                    <button type="submit" id="btn-save-new-invoice" class="btn btn-primary" style="flex: 1; justify-content: center;">
                        บันทึกและเริ่ม Invoice นี้
                    </button>
                    <button type="button" id="btn-cancel-invoice-modal" class="btn">
                        ยกเลิก
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Ink Cartridge Management Modal -->
    <div id="cartridge-modal" class="modal-backdrop" style="display: none;">
        <div class="modal-content card" style="max-width: 650px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-sm); border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 1.3rem;">🖨️</span>
                    <div>
                        <h3 style="font-size: 1.15rem; font-weight: 600; margin: 0;">จัดการตลับหมึกเครื่องพิมพ์วันที่</h3>
                        <div style="font-size: 0.8rem; color: var(--text-muted);">บันทึกยอดสะสมรายวัน และติดตามอัตราการใช้งาน</div>
                    </div>
                </div>
                <button type="button" id="btn-close-cartridge-modal" class="btn btn-icon" style="width: 32px; height: 32px; padding: 0;">✕</button>
            </div>

            <!-- Modal Tabs -->
            <div class="modal-tabs">
                <button type="button" class="modal-tab-btn active" data-cartridge-tab="daily">➕ บันทึกยอดสะสมรายวัน</button>
                <button type="button" class="modal-tab-btn" data-cartridge-tab="new">🆕 เปิดตลับหมึกใหม่</button>
                <button type="button" class="modal-tab-btn" data-cartridge-tab="list">📋 ประวัติตลับหมึกทั้งหมด</button>
            </div>

            <!-- Tab 1: Daily Log / Accumulate Form -->
            <div id="cartridge-tab-daily" class="modal-tab-content">
                <form id="cartridge-daily-form" onsubmit="return false;">
                    <div class="form-group">
                        <label for="cartridge-select-target">เลือกตลับหมึกที่ต้องการบันทึก</label>
                        <select id="cartridge-select-target" class="form-control" required>
                            <!-- populated by JS -->
                        </select>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cartridge-log-date">วันที่พิมพ์</label>
                            <input type="date" id="cartridge-log-date" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="cartridge-log-boxes">จำนวนกล่องที่พิมพ์ได้ในวันนั้น (กล่อง)</label>
                            <input type="number" id="cartridge-log-boxes" class="form-control" min="1" placeholder="เช่น 55" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="cartridge-log-note">หมายเหตุการพิมพ์ / ความคมชัด</label>
                        <input type="text" id="cartridge-log-note" class="form-control" placeholder="เช่น พิมพ์วันที่ผลิต/หมดอายุ ชัดเจนดี">
                    </div>

                    <!-- Direct Total Override option -->
                    <details style="margin: 12px 0; font-size: 0.85rem; color: var(--text-secondary);">
                        <summary style="cursor: pointer; font-weight: 500;">⚙️ ปรับแก้/กำหนดยอดสะสมรวมโดยตรง (Override Total)</summary>
                        <div style="margin-top: 8px; padding: 10px; background: rgba(255,255,255,0.03); border-radius: var(--border-radius-sm);">
                            <label for="cartridge-override-total">กำหนดยอดสะสมรวมของตลับนี้ (กล่อง):</label>
                            <input type="number" id="cartridge-override-total" class="form-control" min="0" placeholder="เว้นว่างไว้หากต้องการบวกสะสมตามปกติ">
                            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">* หากระบุ ระบบจะปรับยอดสะสมรวมเป็นค่านี้ทันที (เช่น ตลับที่ 1 กำหนดเป็น 846 กล่อง)</div>
                        </div>
                    </details>

                    <div style="display: flex; gap: 8px; margin-top: 16px;">
                        <button type="submit" id="btn-save-cartridge-log" class="btn btn-primary" style="flex: 1; justify-content: center;">
                            บันทึกยอดสะสม
                        </button>
                        <button type="button" id="btn-cancel-cartridge-daily" class="btn">
                            ปิด
                        </button>
                    </div>
                </form>
            </div>

            <!-- Tab 2: New Cartridge Form -->
            <div id="cartridge-tab-new" class="modal-tab-content" style="display: none;">
                <form id="cartridge-new-form" onsubmit="return false;">
                    <div class="form-group">
                        <label for="cartridge-new-name">ชื่อตลับหมึก</label>
                        <input type="text" id="cartridge-new-name" class="form-control" placeholder="เช่น ตลับที่ 3" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cartridge-new-date">วันที่เริ่มใช้งาน</label>
                            <input type="date" id="cartridge-new-date" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="cartridge-new-initial-boxes">ยอดกล่องเริ่มต้น (ถ้ามี)</label>
                            <input type="number" id="cartridge-new-initial-boxes" class="form-control" min="0" value="0">
                        </div>
                    </div>
                    <div class="form-group">
                        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 0.9rem;">
                            <input type="checkbox" id="cartridge-close-previous" checked>
                            <span>ปิดตลับเดิม (ทำเครื่องหมายตลับที่กำลังใช้งานอยู่ว่า "ใช้งานเสร็จสิ้นแล้ว")</span>
                        </label>
                    </div>
                    <div style="display: flex; gap: 8px; margin-top: 16px;">
                        <button type="submit" id="btn-save-new-cartridge" class="btn btn-primary" style="flex: 1; justify-content: center;">
                            เปิดใช้งานตลับใหม่
                        </button>
                        <button type="button" id="btn-cancel-cartridge-new" class="btn">
                            ปิด
                        </button>
                    </div>
                </form>
            </div>

            <!-- Tab 3: Cartridge List / History -->
            <div id="cartridge-tab-list" class="modal-tab-content" style="display: none;">
                <div style="max-height: 320px; overflow-y: auto;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
                        <thead>
                            <tr style="border-bottom: 1px solid var(--border-color); text-align: left;">
                                <th style="padding: 8px;">ตลับหมึก</th>
                                <th style="padding: 8px;">สถานะ</th>
                                <th style="padding: 8px;">วันที่เริ่ม - สิ้นสุด</th>
                                <th style="padding: 8px; text-align: right;">ผลิตได้สะสม (กล่อง)</th>
                                <th style="padding: 8px; text-align: center;">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody id="cartridge-list-tbody">
                            <!-- populated by JS -->
                        </tbody>
                    </table>
                </div>
                <div style="display: flex; justify-content: flex-end; margin-top: 16px;">
                    <button type="button" id="btn-close-cartridge-list" class="btn">
                        ปิดหน้าต่าง
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Toast Notification -->
    <div id="toast" class="toast">ข้อความแจ้งเตือน</div>

    <script>
        const BOX_TO_KG_FACTOR = 0.9; // 1 box = 12 bags * 75g = 900g = 0.9kg

        // Production Issue Configuration & Labels
        const ISSUE_CONFIG = {
            none: { label: 'ปกติ', icon: '✅', badgeClass: 'issue-none' },
            machine: { label: 'เครื่องจักร/เตาย่าง', icon: '⚙️', badgeClass: 'issue-machine' },
            material: { label: 'วัตถุดิบไม่ได้เกณฑ์', icon: '🐟', badgeClass: 'issue-material' },
            packaging: { label: 'ซอง/ฟิล์ม/ซีล', icon: '📦', badgeClass: 'issue-packaging' },
            labor: { label: 'กำลังคน/บรรจุล่าช้า', icon: '👥', badgeClass: 'issue-labor' },
            other: { label: 'ปัญหาอื่นๆ', icon: '⚠️', badgeClass: 'issue-other' }
        };

        // Initial default targets (Target capacity: 60 kg/day)
        const defaultTargetsTemplate = {
            original: {
                name: "รสดั้งเดิม",
                targetBoxes: 200,
                targetRawKg: 200,
                dailyTargetRawKg: 60,
                targetYield: 90.00,
                color: '#f59e0b',
                colorRgb: '245, 158, 11'
            },
            spicy: {
                name: "รสเผ็ด",
                targetBoxes: 200,
                targetRawKg: 200,
                dailyTargetRawKg: 60,
                targetYield: 90.00,
                color: '#ef4444',
                colorRgb: '239, 68, 68'
            },
            pepper: {
                name: "รสพริกไทยดำ",
                targetBoxes: 150,
                targetRawKg: 150,
                dailyTargetRawKg: 60,
                targetYield: 90.00,
                color: '#8b5cf6',
                colorRgb: '139, 92, 246'
            }
        };

        // Sample data for multi-container / invoice setup
        const defaultSampleInvoices = [
            {
                id: "SSPEP-SES-020/2026",
                customer: "Shenzhen Yue Tai",
                createdAt: "2026-08-18",
                targets: JSON.parse(JSON.stringify(defaultTargetsTemplate)),
                logs: [
                    { id: 1, date: "2026-08-18", flavor: "original", rawWeight: 60.0, boxes: 55, wasteWeight: 1.2, filmUsed: 1.0, issueType: "none", remarks: "เปิดรอบตู้ที่ 1 Yield ได้ 82.5%" },
                    { id: 2, date: "2026-08-19", flavor: "spicy", rawWeight: 60.0, boxes: 53, wasteWeight: 1.8, filmUsed: 1.0, issueType: "machine", remarks: "ปรับอุณหภูมิเตาย่างรสเผ็ดรอบเช้า" },
                    { id: 3, date: "2026-08-20", flavor: "pepper", rawWeight: 60.0, boxes: 55, wasteWeight: 1.1, filmUsed: 1.0, issueType: "none", remarks: "การผลิตเสถียรตามเป้าหมาย" },
                    { id: 4, date: "2026-08-21", flavor: "original", rawWeight: 60.0, boxes: 52, wasteWeight: 2.1, filmUsed: 1.0, issueType: "packaging", remarks: "ฟิล์มซองติดขัดเล็กน้อยรอบบ่าย" }
                ]
            },
            {
                id: "SSPEP-SES-021/2026",
                customer: "Shenzhen Yue Tai",
                createdAt: "2026-09-01",
                targets: JSON.parse(JSON.stringify(defaultTargetsTemplate)),
                logs: [
                    { id: 5, date: "2026-09-02", flavor: "original", rawWeight: 60.0, boxes: 56, wasteWeight: 0.9, filmUsed: 1.0, issueType: "none", remarks: "เปิดตู้ที่ 2 เดินเครื่องราบรื่น" },
                    { id: 6, date: "2026-09-03", flavor: "spicy", rawWeight: 60.0, boxes: 55, wasteWeight: 1.1, filmUsed: 1.0, issueType: "none", remarks: "ได้ผลผลิตสูง คุณภาพตามมาตรฐาน" },
                    { id: 7, date: "2026-09-04", flavor: "pepper", rawWeight: 60.0, boxes: 53, wasteWeight: 2.3, filmUsed: 1.0, issueType: "material", remarks: "ขนาดปลาย่างไม่ได้เกณฑ์บางส่วนทำให้เสียเวลาคัดแยก" },
                    { id: 8, date: "2026-09-05", flavor: "spicy", rawWeight: 60.0, boxes: 56, wasteWeight: 1.0, filmUsed: 1.0, issueType: "none", remarks: "กำลังผลิตสม่ำเสมอ 60 kg/วัน" }
                ]
            }
        ];

        // Legacy sample logs fallback
        const sampleLogs = defaultSampleInvoices[0].logs;

        // Sample data for Date Coder Ink Cartridges (User requirement: ตลับที่ 1 ผลิตได้ 846 กล่อง, ตลับที่ 2 สะสมยอด)
        const defaultSampleCartridges = [
            {
                id: "cartridge-1",
                name: "ตลับที่ 1",
                status: "completed",
                startDate: "2026-08-15",
                endDate: "2026-09-02",
                totalBoxes: 846,
                logs: [
                    { date: "2026-08-18", boxes: 200, note: "รสดั้งเดิม ตู้ 1" },
                    { date: "2026-08-19", boxes: 200, note: "รสเผ็ด ตู้ 1" },
                    { date: "2026-08-20", boxes: 200, note: "รสพริกไทยดำ ตู้ 1" },
                    { date: "2026-08-21", boxes: 246, note: "รสดั้งเดิม ปิดตลับที่ 1 (รวม 846 กล่อง)" }
                ]
            },
            {
                id: "cartridge-2",
                name: "ตลับที่ 2",
                status: "active",
                startDate: "2026-09-03",
                endDate: null,
                totalBoxes: 530,
                logs: [
                    { date: "2026-09-03", boxes: 180, note: "เปิดใช้ตลับที่ 2 ตู้ 2" },
                    { date: "2026-09-04", boxes: 175, note: "รสเผ็ด ตู้ 2" },
                    { date: "2026-09-05", boxes: 175, note: "รสพริกไทยดำ ตู้ 2" }
                ]
            }
        ];

        // App State
        let invoices = [];
        let cartridges = [];
        let currentInvoiceId = "SSPEP-SES-020/2026";
        let editingId = null;
        let chartInstance = null;
        let filmChartInstance = null;
        let cartridgeChartInstance = null;
        let currentChartTab = 'overall';

        // DOM Elements
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        const prodForm = document.getElementById('prod-form');
        const prodDateInput = document.getElementById('prod-date');
        const prodFlavorSelect = document.getElementById('prod-flavor');
        const prodRawWeightInput = document.getElementById('prod-raw-weight');
        const prodBoxesInput = document.getElementById('prod-boxes');
        const prodWasteWeightInput = document.getElementById('prod-waste-weight');
        const prodFilmUsedInput = document.getElementById('prod-film-used');
        const prodCartridgeSelect = document.getElementById('prod-cartridge-select');
        const prodRemarksInput = document.getElementById('prod-remarks');
        
        const yieldPreviewContainer = document.getElementById('yield-preview-container');
        const previewFinWt = document.getElementById('preview-fin-wt');
        const previewYield = document.getElementById('preview-yield');
        const previewWaste = document.getElementById('preview-waste');
        const previewWastePct = document.getElementById('preview-waste-pct');

        const historyTbody = document.getElementById('history-tbody');
        const historyTfoot = document.getElementById('history-tfoot');
        const historyCount = document.getElementById('history-count');
        const toastEl = document.getElementById('toast');

        const btnExport = document.getElementById('btn-export');
        const btnImportTrigger = document.getElementById('btn-import-trigger');
        const importFileInput = document.getElementById('import-file');

        // Invoice DOM Elements
        const invoiceSelector = document.getElementById('invoice-selector');
        const invoiceStatusBadge = document.getElementById('invoice-status-badge');
        const invoicePrintLabel = document.getElementById('invoice-print-label');
        const metaCustomerName = document.getElementById('meta-customer-name');
        const btnOpenNewInvoice = document.getElementById('btn-open-new-invoice');
        const newInvoiceModal = document.getElementById('new-invoice-modal');
        const btnCloseInvoiceModal = document.getElementById('btn-close-invoice-modal');
        const btnCancelInvoiceModal = document.getElementById('btn-cancel-invoice-modal');
        const newInvoiceForm = document.getElementById('new-invoice-form');

        // Cartridge DOM Elements
        const cartridgeModal = document.getElementById('cartridge-modal');
        const btnOpenCartridgeModal = document.getElementById('btn-open-cartridge-modal');
        const btnCloseCartridgeModal = document.getElementById('btn-close-cartridge-modal');
        const btnCancelCartridgeDaily = document.getElementById('btn-cancel-cartridge-daily');
        const btnCancelCartridgeNew = document.getElementById('btn-cancel-cartridge-new');
        const btnCloseCartridgeList = document.getElementById('btn-close-cartridge-list');
        const cartridgeDailyForm = document.getElementById('cartridge-daily-form');
        const cartridgeNewForm = document.getElementById('cartridge-new-form');
        const cartridgeSelectTarget = document.getElementById('cartridge-select-target');
        const cartridgeListTbody = document.getElementById('cartridge-list-tbody');

        // Icons constants
        const sunIcon = `<path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path><path d="M3 12h1"></path><path d="M20 12h1"></path><path d="M12 3v1"></path><path d="M12 20v1"></path><path d="M5.6 5.6l.7 .7"></path><path d="M17.7 17.7l.7 .7"></path><path d="M17.7 5.6l-.7 .7"></path><path d="M5.6 17.7l-.7 .7"></path>`;
        const moonIcon = `<path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>`;

        // Helper to get active invoice
        function getActiveInvoice() {
            let inv = invoices.find(i => i.id === currentInvoiceId);
            if (!inv && invoices.length > 0) {
                inv = invoices[0];
                currentInvoiceId = inv.id;
            }
            return inv;
        }

        // Helper to save all invoices
        function saveInvoices() {
            localStorage.setItem('grilled_fish_invoices_v2', JSON.stringify(invoices));
            localStorage.setItem('grilled_fish_active_inv', currentInvoiceId);
            const activeInv = getActiveInvoice();
            if (activeInv) {
                localStorage.setItem('grilled_fish_prod_logs', JSON.stringify(activeInv.logs));
            }
        }

        // Initialize Application
        document.addEventListener('DOMContentLoaded', () => {
            // Internet check warning for charts
            if (typeof Chart === 'undefined') {
                alert("ระบบตรวจพบว่าเครื่องนี้ไม่ได้เชื่อมต่ออินเทอร์เน็ต กราฟวิเคราะห์ประวัติจะไม่สามารถแสดงผลได้ แต่คุณยังคงสามารถกรอกข้อมูล บันทึกข้อมูล และดูข้อมูลประวัติในตารางได้ตามปกติครับ (แนะนำให้เชื่อมต่อเน็ตเพื่อให้กราฟทำงานสมบูรณ์)");
            }

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

            // Load invoices & data (with backward compatibility)
            loadInvoicesData();
            loadCartridgesData();

            // Set up listeners
            themeToggle.addEventListener('click', toggleTheme);
            prodForm.addEventListener('submit', handleFormSubmit);
            
            // Print listener
            document.getElementById('btn-print').addEventListener('click', () => window.print());

            // Cancel Edit listener
            document.getElementById('btn-cancel-edit').addEventListener('click', cancelEdit);
            
            // Auto-calculate Yield & Waste in form preview
            prodRawWeightInput.addEventListener('input', updateFormYieldPreview);
            prodBoxesInput.addEventListener('input', updateFormYieldPreview);
            prodWasteWeightInput.addEventListener('input', updateFormYieldPreview);
            prodFlavorSelect.addEventListener('change', updateFormYieldPreview);

            // Export/Import listeners
            btnExport.addEventListener('click', exportData);
            btnImportTrigger.addEventListener('click', () => importFileInput.click());
            importFileInput.addEventListener('change', importData);

            // Invoice switching & creation listeners
            invoiceSelector.addEventListener('change', (e) => {
                currentInvoiceId = e.target.value;
                localStorage.setItem('grilled_fish_active_inv', currentInvoiceId);
                cancelEdit();
                updateDashboard();
                showToast(`เปลี่ยนมุมมองเป็น Invoice: ${currentInvoiceId}`);
            });

            btnOpenNewInvoice.addEventListener('click', () => {
                newInvoiceForm.reset();
                document.getElementById('inv-customer-input').value = "Shenzhen Yue Tai";
                document.getElementById('inv-orig-boxes').value = "200";
                document.getElementById('inv-orig-raw').value = "200";
                document.getElementById('inv-spicy-boxes').value = "200";
                document.getElementById('inv-spicy-raw').value = "200";
                document.getElementById('inv-pep-boxes').value = "150";
                document.getElementById('inv-pep-raw').value = "150";
                document.getElementById('inv-daily-rate').value = "60";
                newInvoiceModal.style.display = 'flex';
                document.getElementById('inv-no-input').focus();
            });

            btnCloseInvoiceModal.addEventListener('click', () => {
                newInvoiceModal.style.display = 'none';
            });
            btnCancelInvoiceModal.addEventListener('click', () => {
                newInvoiceModal.style.display = 'none';
            });

            document.getElementById('btn-save-new-invoice').addEventListener('click', handleCreateInvoice);

            // Cartridge Modal listeners
            if (btnOpenCartridgeModal) btnOpenCartridgeModal.addEventListener('click', openCartridgeModal);
            if (btnCloseCartridgeModal) btnCloseCartridgeModal.addEventListener('click', closeCartridgeModal);
            if (btnCancelCartridgeDaily) btnCancelCartridgeDaily.addEventListener('click', closeCartridgeModal);
            if (btnCancelCartridgeNew) btnCancelCartridgeNew.addEventListener('click', closeCartridgeModal);
            if (btnCloseCartridgeList) btnCloseCartridgeList.addEventListener('click', closeCartridgeModal);

            // Modal Tabs switching
            document.querySelectorAll('.modal-tab-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const targetTab = e.target.dataset.cartridgeTab;
                    document.querySelectorAll('.modal-tab-btn').forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');

                    const tabDaily = document.getElementById('cartridge-tab-daily');
                    const tabNew = document.getElementById('cartridge-tab-new');
                    const tabList = document.getElementById('cartridge-tab-list');
                    if (tabDaily) tabDaily.style.display = targetTab === 'daily' ? 'block' : 'none';
                    if (tabNew) tabNew.style.display = targetTab === 'new' ? 'block' : 'none';
                    if (tabList) tabList.style.display = targetTab === 'list' ? 'block' : 'none';
                    if (targetTab === 'list') {
                        renderCartridgeListTable();
                    }
                });
            });

            // Cartridge Modal Form Submit Listeners
            const btnSaveCartridgeLog = document.getElementById('btn-save-cartridge-log');
            if (btnSaveCartridgeLog) btnSaveCartridgeLog.addEventListener('click', handleSaveCartridgeDaily);
            const btnSaveNewCartridge = document.getElementById('btn-save-new-cartridge');
            if (btnSaveNewCartridge) btnSaveNewCartridge.addEventListener('click', handleSaveNewCartridge);

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

        // Load or Migrate Cartridges Data
        function saveCartridges() {
            localStorage.setItem('grilled_fish_cartridges_v1', JSON.stringify(cartridges));
        }

        function loadCartridgesData() {
            const saved = localStorage.getItem('grilled_fish_cartridges_v1');
            if (saved) {
                try {
                    cartridges = JSON.parse(saved);
                } catch (e) {
                    cartridges = [];
                }
            }
            if (!cartridges || cartridges.length === 0) {
                cartridges = JSON.parse(JSON.stringify(defaultSampleCartridges));
                saveCartridges();
            } else {
                // Ensure Cartridge 1 has 846 boxes if not set
                const c1 = cartridges.find(c => c.id === 'cartridge-1' || c.name === 'ตลับที่ 1');
                if (c1 && (!c1.totalBoxes || c1.totalBoxes === 0)) {
                    c1.totalBoxes = 846;
                    saveCartridges();
                }
            }
        }

        function openCartridgeModal() {
            renderCartridgeSelect();
            const today = new Date().toISOString().split('T')[0];
            const logDateInput = document.getElementById('cartridge-log-date');
            const newDateInput = document.getElementById('cartridge-new-date');
            if (logDateInput) logDateInput.value = today;
            if (newDateInput) newDateInput.value = today;
            const logBoxes = document.getElementById('cartridge-log-boxes');
            if (logBoxes) logBoxes.value = '';
            const logNote = document.getElementById('cartridge-log-note');
            if (logNote) logNote.value = '';
            const overrideInput = document.getElementById('cartridge-override-total');
            if (overrideInput) overrideInput.value = '';
            renderCartridgeListTable();
            if (cartridgeModal) cartridgeModal.style.display = 'flex';
        }

        function closeCartridgeModal() {
            if (cartridgeModal) cartridgeModal.style.display = 'none';
        }

        function renderCartridgeListTable() {
            if (!cartridgeListTbody) return;
            cartridgeListTbody.innerHTML = '';
            cartridges.forEach((c) => {
                const tr = document.createElement('tr');
                tr.style.borderBottom = '1px solid var(--border-color)';
                const statusBadge = c.status === 'active' 
                    ? `<span class="cartridge-badge cartridge-active">🟢 กำลังใช้</span>`
                    : `<span class="cartridge-badge cartridge-completed">⚪ เสร็จสิ้น</span>`;
                const dateRange = `${c.startDate || '-'}${c.endDate ? ' ถึง ' + c.endDate : ' (ปัจจุบัน)'}`;
                
                tr.innerHTML = `
                    <td style="padding: 10px 8px; font-weight: 600;">🖨️ ${escapeHtml(c.name)}</td>
                    <td style="padding: 10px 8px;">${statusBadge}</td>
                    <td style="padding: 10px 8px; font-size: 0.8rem; color: var(--text-muted);">${dateRange}</td>
                    <td style="padding: 10px 8px; text-align: right; font-weight: 700; color: var(--accent-color); font-size: 0.95rem;">
                        ${(c.totalBoxes || 0).toLocaleString()} กล่อง
                    </td>
                    <td style="padding: 10px 8px; text-align: center;">
                        <button type="button" class="btn" style="padding: 3px 8px; font-size: 0.75rem;" onclick="toggleCartridgeStatus('${c.id}')">
                            ${c.status === 'active' ? 'ปิดตลับ' : 'เปิดใช้'}
                        </button>
                    </td>
                `;
                cartridgeListTbody.appendChild(tr);
            });
        }

        function toggleCartridgeStatus(id) {
            const c = cartridges.find(item => item.id === id);
            if (!c) return;
            if (c.status === 'active') {
                c.status = 'completed';
                c.endDate = new Date().toISOString().split('T')[0];
            } else {
                cartridges.forEach(item => { item.status = 'completed'; });
                c.status = 'active';
                c.endDate = null;
            }
            saveCartridges();
            updateDashboard();
            renderCartridgeListTable();
            showToast(`อัปเดตสถานะ ${c.name} เรียบร้อยแล้ว`);
        }

        function handleSaveCartridgeDaily() {
            const targetId = cartridgeSelectTarget ? cartridgeSelectTarget.value : null;
            const c = cartridges.find(item => item.id === targetId);
            if (!c) {
                showToast('กรุณาเลือกตลับหมึก', 'error');
                return;
            }
            const date = document.getElementById('cartridge-log-date').value;
            const boxes = parseInt(document.getElementById('cartridge-log-boxes').value);
            const note = document.getElementById('cartridge-log-note').value.trim();
            const overrideVal = document.getElementById('cartridge-override-total').value;

            if (overrideVal !== '' && !isNaN(parseInt(overrideVal))) {
                c.totalBoxes = parseInt(overrideVal);
            } else {
                if (isNaN(boxes) || boxes <= 0) {
                    showToast('กรุณากรอกจำนวนกล่องที่พิมพ์ได้', 'error');
                    return;
                }
                c.totalBoxes = (c.totalBoxes || 0) + boxes;
            }

            if (!c.logs) c.logs = [];
            c.logs.push({
                date,
                boxes: !isNaN(boxes) ? boxes : 0,
                note: note || 'บันทึกยอดสะสม'
            });

            saveCartridges();
            updateDashboard();
            closeCartridgeModal();
            showToast(`บันทึกยอดสะสม ${c.name} รวมเป็น ${c.totalBoxes.toLocaleString()} กล่อง สำเร็จแล้ว`);
        }

        function handleSaveNewCartridge() {
            const name = document.getElementById('cartridge-new-name').value.trim();
            const date = document.getElementById('cartridge-new-date').value;
            const initialBoxes = parseInt(document.getElementById('cartridge-new-initial-boxes').value) || 0;
            const closePrev = document.getElementById('cartridge-close-previous').checked;

            if (!name) {
                showToast('กรุณาระบุชื่อตลับหมึก', 'error');
                return;
            }

            if (closePrev) {
                cartridges.forEach(c => {
                    if (c.status === 'active') {
                        c.status = 'completed';
                        if (!c.endDate) c.endDate = date;
                    }
                });
            }

            const newC = {
                id: `cartridge-${Date.now()}`,
                name: name,
                status: 'active',
                startDate: date,
                endDate: null,
                totalBoxes: initialBoxes,
                logs: initialBoxes > 0 ? [{ date, boxes: initialBoxes, note: 'ยอดยกมาเริ่มต้น' }] : []
            };

            cartridges.push(newC);
            saveCartridges();
            updateDashboard();
            closeCartridgeModal();
            showToast(`เปิดใช้งาน ${name} เรียบร้อยแล้ว`);
        }

        // Render options for Cartridge Dropdowns
        function renderCartridgeSelect() {
            if (!prodCartridgeSelect) return;
            const currentVal = prodCartridgeSelect.value;
            prodCartridgeSelect.innerHTML = '';
            
            cartridges.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c.id;
                const statusText = c.status === 'active' ? '🟢 กำลังใช้' : '⚪ เสร็จสิ้น';
                opt.textContent = `${c.name} (${(c.totalBoxes || 0).toLocaleString()} กล่อง) - ${statusText}`;
                prodCartridgeSelect.appendChild(opt);
            });

            // Keep selected or default to active cartridge
            if (currentVal && cartridges.some(c => c.id === currentVal)) {
                prodCartridgeSelect.value = currentVal;
            } else {
                const activeC = cartridges.find(c => c.status === 'active') || cartridges[cartridges.length - 1];
                if (activeC) {
                    prodCartridgeSelect.value = activeC.id;
                }
            }

            // Also update modal target select if exists
            if (cartridgeSelectTarget) {
                cartridgeSelectTarget.innerHTML = '';
                cartridges.forEach(c => {
                    const opt = document.createElement('option');
                    opt.value = c.id;
                    const statusText = c.status === 'active' ? '🟢 กำลังใช้' : '⚪ เสร็จสิ้น';
                    opt.textContent = `${c.name} (${(c.totalBoxes || 0).toLocaleString()} กล่อง) - ${statusText}`;
                    cartridgeSelectTarget.appendChild(opt);
                });
                const activeC = cartridges.find(c => c.status === 'active') || cartridges[cartridges.length - 1];
                if (activeC) {
                    cartridgeSelectTarget.value = activeC.id;
                }
            }
        }

        // Load or Migrate Invoices Data
        function loadInvoicesData() {
            const savedInvoices = localStorage.getItem('grilled_fish_invoices_v2');
            const savedActiveInv = localStorage.getItem('grilled_fish_active_inv');

            if (savedInvoices) {
                try {
                    invoices = JSON.parse(savedInvoices);
                } catch (e) {
                    invoices = [];
                }
            }

            if (!invoices || invoices.length === 0) {
                invoices = JSON.parse(JSON.stringify(defaultSampleInvoices));
                currentInvoiceId = "SSPEP-SES-020/2026";
                saveInvoices();
            } else {
                let needsSave = false;

                // If user only has 1 container, add SSPEP-SES-021/2026 for immediate comparison demo
                if (invoices.length === 1 && invoices[0].id === "SSPEP-SES-020/2026") {
                    invoices.push(JSON.parse(JSON.stringify(defaultSampleInvoices[1])));
                    needsSave = true;
                }

                // Migrate legacy 50 kg/day targets to 60 kg/day and add issueType if missing
                invoices.forEach(inv => {
                    if (inv.targets) {
                        Object.keys(inv.targets).forEach(k => {
                            if (inv.targets[k].dailyTargetRawKg === 50) {
                                inv.targets[k].dailyTargetRawKg = 60;
                                needsSave = true;
                            }
                        });
                    }
                    if (Array.isArray(inv.logs)) {
                        inv.logs.forEach(log => {
                            if (!log.issueType) {
                                log.issueType = 'none';
                                needsSave = true;
                            }
                        });
                    }
                });
                if (needsSave) {
                    saveInvoices();
                }

                if (savedActiveInv && invoices.some(i => i.id === savedActiveInv)) {
                    currentInvoiceId = savedActiveInv;
                } else {
                    currentInvoiceId = invoices[0].id;
                }
            }
        }

        // Helper: Select and switch to specific container/invoice
        function selectInvoice(invoiceId) {
            if (invoices.some(i => i.id === invoiceId)) {
                currentInvoiceId = invoiceId;
                localStorage.setItem('grilled_fish_active_inv', currentInvoiceId);
                cancelEdit();
                updateDashboard();
                showToast(`สลับไปดูข้อมูลตู้สินค้า: ${invoiceId}`);
                const metaCard = document.querySelector('.report-meta-card');
                if (metaCard) {
                    metaCard.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }

        // Handle Creation of New Invoice
        function handleCreateInvoice() {
            const invNo = document.getElementById('inv-no-input').value.trim();
            const customer = document.getElementById('inv-customer-input').value.trim();
            const origBoxes = parseInt(document.getElementById('inv-orig-boxes').value) || 200;
            const origRaw = parseFloat(document.getElementById('inv-orig-raw').value) || 200;
            const spicyBoxes = parseInt(document.getElementById('inv-spicy-boxes').value) || 200;
            const spicyRaw = parseFloat(document.getElementById('inv-spicy-raw').value) || 200;
            const pepBoxes = parseInt(document.getElementById('inv-pep-boxes').value) || 150;
            const pepRaw = parseFloat(document.getElementById('inv-pep-raw').value) || 150;
            const dailyRate = parseFloat(document.getElementById('inv-daily-rate').value) || 60;

            if (!invNo) {
                showToast('กรุณาระบุเลขที่ Invoice No.', 'error');
                return;
            }

            if (invoices.some(i => i.id.toLowerCase() === invNo.toLowerCase())) {
                showToast(`เลขที่ Invoice "${invNo}" มีอยู่ในระบบแล้ว กรุณาใช้เลขอื่น`, 'error');
                return;
            }

            const newTargets = {
                original: {
                    name: "รสดั้งเดิม",
                    targetBoxes: origBoxes,
                    targetRawKg: origRaw,
                    dailyTargetRawKg: dailyRate,
                    targetYield: parseFloat(((origBoxes * BOX_TO_KG_FACTOR / origRaw) * 100).toFixed(2)),
                    color: '#f59e0b',
                    colorRgb: '245, 158, 11'
                },
                spicy: {
                    name: "รสเผ็ด",
                    targetBoxes: spicyBoxes,
                    targetRawKg: spicyRaw,
                    dailyTargetRawKg: dailyRate,
                    targetYield: parseFloat(((spicyBoxes * BOX_TO_KG_FACTOR / spicyRaw) * 100).toFixed(2)),
                    color: '#ef4444',
                    colorRgb: '239, 68, 68'
                },
                pepper: {
                    name: "รสพริกไทยดำ",
                    targetBoxes: pepBoxes,
                    targetRawKg: pepRaw,
                    dailyTargetRawKg: dailyRate,
                    targetYield: parseFloat(((pepBoxes * BOX_TO_KG_FACTOR / pepRaw) * 100).toFixed(2)),
                    color: '#8b5cf6',
                    colorRgb: '139, 92, 246'
                }
            };

            const newInv = {
                id: invNo,
                customer: customer || "Shenzhen Yue Tai",
                createdAt: new Date().toISOString().split('T')[0],
                targets: newTargets,
                logs: []
            };

            invoices.unshift(newInv);
            currentInvoiceId = invNo;
            saveInvoices();

            newInvoiceModal.style.display = 'none';
            cancelEdit();
            updateDashboard();
            showToast(`เปิดรอบการผลิตใหม่สำหรับ Invoice: ${invNo} เรียบร้อยแล้ว`);
        }

        // Set Theme function
        function setTheme(theme) {
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('grilled_fish_theme', theme);
            if (theme === 'light') {
                themeIcon.innerHTML = moonIcon;
            } else {
                themeIcon.innerHTML = sunIcon;
            }
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
            }, 3200);
        }

        // Form Yield & Waste Preview calculations
        function updateFormYieldPreview() {
            const rawWt = parseFloat(prodRawWeightInput.value);
            const boxes = parseInt(prodBoxesInput.value);
            const wasteWt = parseFloat(prodWasteWeightInput.value) || 0;
            const flavor = prodFlavorSelect.value;
            const activeInv = getActiveInvoice();
            const targets = activeInv ? activeInv.targets : defaultTargetsTemplate;

            if (!isNaN(rawWt) && rawWt > 0 && !isNaN(boxes) && boxes >= 0) {
                const finishedWt = boxes * BOX_TO_KG_FACTOR;
                const yieldPercent = (finishedWt / rawWt) * 100;
                const wastePercent = (wasteWt / rawWt) * 100;
                
                previewFinWt.textContent = finishedWt.toFixed(2);
                previewYield.textContent = yieldPercent.toFixed(2) + '%';
                previewWaste.textContent = wasteWt.toFixed(2) + ' kg';
                previewWastePct.textContent = wastePercent.toFixed(2) + '%';
                yieldPreviewContainer.style.display = 'block';

                // Styling based on yield quality
                if (flavor && targets[flavor]) {
                    const targetYield = targets[flavor].targetYield;
                    if (yieldPercent >= targetYield) {
                        previewYield.style.color = 'var(--success)';
                    } else if (yieldPercent < targetYield - 8) {
                        previewYield.style.color = 'var(--danger)';
                    } else {
                        previewYield.style.color = 'var(--warning)';
                    }
                }

                // Styling for waste
                if (wastePercent <= 2.5) {
                    previewWastePct.style.color = 'var(--success)';
                } else if (wastePercent <= 5.0) {
                    previewWastePct.style.color = 'var(--warning)';
                } else {
                    previewWastePct.style.color = 'var(--danger)';
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
            const wasteWeight = parseFloat(prodWasteWeightInput.value) || 0;
            const filmUsed = parseFloat(prodFilmUsedInput.value) || 0;
            const cartridgeId = prodCartridgeSelect ? prodCartridgeSelect.value : null;
            const remarks = prodRemarksInput.value.trim();

            const activeInv = getActiveInvoice();
            if (!activeInv) return;

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

            if (editingId !== null) {
                // Update existing entry
                const entryIndex = activeInv.logs.findIndex(log => log.id === editingId);
                if (entryIndex !== -1) {
                    activeInv.logs[entryIndex].date = date;
                    activeInv.logs[entryIndex].flavor = flavor;
                    activeInv.logs[entryIndex].rawWeight = rawWeight;
                    activeInv.logs[entryIndex].boxes = boxes;
                    activeInv.logs[entryIndex].wasteWeight = wasteWeight;
                    activeInv.logs[entryIndex].filmUsed = filmUsed;
                    activeInv.logs[entryIndex].cartridgeId = cartridgeId;
                    activeInv.logs[entryIndex].remarks = remarks;
                }
                cancelEdit();
                showToast('แก้ไขข้อมูลการผลิตสำเร็จแล้ว');
            } else {
                // Add entry
                const newEntry = {
                    id: Date.now(),
                    date,
                    flavor,
                    rawWeight,
                    boxes,
                    wasteWeight,
                    filmUsed,
                    cartridgeId,
                    remarks
                };

                activeInv.logs.push(newEntry);

                // Accumulate to target ink cartridge
                if (cartridgeId) {
                    const targetCartridge = cartridges.find(c => c.id === cartridgeId);
                    if (targetCartridge) {
                        targetCartridge.totalBoxes = (targetCartridge.totalBoxes || 0) + boxes;
                        if (!targetCartridge.logs) targetCartridge.logs = [];
                        const targets = activeInv.targets || defaultTargetsTemplate;
                        const flavorName = targets[flavor] ? targets[flavor].name : flavor;
                        targetCartridge.logs.push({
                            date,
                            boxes,
                            note: `${flavorName} (${boxes} กล่อง)`
                        });
                        saveCartridges();
                    }
                }

                showToast('บันทึกข้อมูลการผลิตและสะสมยอดตลับหมึกสำเร็จแล้ว');
            }

            // Sort logs by date ascending
            activeInv.logs.sort((a, b) => new Date(a.date) - new Date(b.date));

            // Save
            saveInvoices();
            
            // Reset Form fields (except date)
            prodFlavorSelect.value = '';
            prodRawWeightInput.value = '';
            prodBoxesInput.value = '';
            prodWasteWeightInput.value = '';
            prodFilmUsedInput.value = '';
            prodRemarksInput.value = '';
            yieldPreviewContainer.style.display = 'none';
            renderCartridgeSelect();

            // Refresh UI
            updateDashboard();
        }

        // Delete Log Entry
        function deleteLog(id) {
            const activeInv = getActiveInvoice();
            if (!activeInv) return;

            if (confirm('คุณต้องการลบรายการบันทึกนี้ใช่หรือไม่?')) {
                activeInv.logs = activeInv.logs.filter(log => log.id !== id);
                saveInvoices();
                updateDashboard();
                showToast('ลบรายการผลิตเรียบร้อยแล้ว', 'error');
            }
        }

        // Start Editing Log Entry
        function startEdit(id) {
            const activeInv = getActiveInvoice();
            if (!activeInv) return;

            const log = activeInv.logs.find(item => item.id === id);
            if (!log) return;

            editingId = id;
            prodDateInput.value = log.date;
            prodFlavorSelect.value = log.flavor;
            prodRawWeightInput.value = log.rawWeight;
            prodBoxesInput.value = log.boxes;
            prodWasteWeightInput.value = log.wasteWeight !== undefined ? log.wasteWeight : '';
            prodFilmUsedInput.value = log.filmUsed !== undefined ? log.filmUsed : '';
            if (prodCartridgeSelect && log.cartridgeId) {
                prodCartridgeSelect.value = log.cartridgeId;
            }
            prodRemarksInput.value = log.remarks || '';

            // Update submit button styles & text
            document.getElementById('submit-btn-text').textContent = 'บันทึกการแก้ไข';
            document.getElementById('btn-cancel-edit').style.display = 'block';

            // Scroll to form card
            document.getElementById('form-card').scrollIntoView({ behavior: 'smooth' });

            // Trigger preview recalculation
            updateFormYieldPreview();
        }

        // Cancel Editing
        function cancelEdit() {
            editingId = null;
            prodFlavorSelect.value = '';
            prodRawWeightInput.value = '';
            prodBoxesInput.value = '';
            prodWasteWeightInput.value = '';
            prodFilmUsedInput.value = '';
            prodRemarksInput.value = '';
            yieldPreviewContainer.style.display = 'none';
            renderCartridgeSelect();

            // Revert submit button
            document.getElementById('submit-btn-text').textContent = 'บันทึกยอดการผลิต';
            document.getElementById('btn-cancel-edit').style.display = 'none';
        }

        // Aggregate stats and update KPI Cards, Product Cards & Invoice Selector
        function updateDashboard() {
            const activeInv = getActiveInvoice();
            if (!activeInv) return;

            const logs = activeInv.logs || [];
            const targets = activeInv.targets || defaultTargetsTemplate;

            // 1. Update Invoice Selector Dropdown & Customer Info
            metaCustomerName.textContent = activeInv.customer || "Shenzhen Yue Tai";
            invoicePrintLabel.textContent = `${activeInv.id} (${activeInv.customer})`;

            invoiceSelector.innerHTML = '';
            invoices.forEach(inv => {
                let invBoxes = 0;
                let invTargetBoxes = 0;
                Object.keys(inv.targets || {}).forEach(k => {
                    invTargetBoxes += (inv.targets[k].targetBoxes || 0);
                });
                (inv.logs || []).forEach(l => invBoxes += (l.boxes || 0));

                const isDone = invTargetBoxes > 0 && invBoxes >= invTargetBoxes;
                const statusTag = isDone ? ' (ผลิตครบแล้ว ✅)' : ' (กำลังผลิต)';
                const opt = document.createElement('option');
                opt.value = inv.id;
                opt.textContent = `${inv.id}${statusTag}`;
                if (inv.id === currentInvoiceId) {
                    opt.selected = true;
                }
                invoiceSelector.appendChild(opt);
            });

            // 2. Calculations by flavor (including waste & film)
            const summary = {
                original: { rawUsed: 0, boxesProd: 0, wasteUsed: 0, filmUsed: 0 },
                spicy: { rawUsed: 0, boxesProd: 0, wasteUsed: 0, filmUsed: 0 },
                pepper: { rawUsed: 0, boxesProd: 0, wasteUsed: 0, filmUsed: 0 }
            };

            logs.forEach(log => {
                if (summary[log.flavor]) {
                    summary[log.flavor].rawUsed += (log.rawWeight || 0);
                    summary[log.flavor].boxesProd += (log.boxes || 0);
                    summary[log.flavor].wasteUsed += (log.wasteWeight || 0);
                    summary[log.flavor].filmUsed += (log.filmUsed || 0);
                }
            });

            // 3. Global KPIs
            let totalBoxesProd = 0;
            let totalRawUsed = 0;
            let totalWasteUsed = 0;
            let totalFilmUsed = 0;
            let targetTotalBoxes = 0;
            let targetTotalRaw = 0;
            
            Object.keys(targets).forEach(flavor => {
                targetTotalBoxes += targets[flavor].targetBoxes;
                targetTotalRaw += targets[flavor].targetRawKg;
            });

            Object.keys(summary).forEach(flavor => {
                totalBoxesProd += summary[flavor].boxesProd;
                totalRawUsed += summary[flavor].rawUsed;
                totalWasteUsed += summary[flavor].wasteUsed;
                totalFilmUsed += summary[flavor].filmUsed;
            });

            // Invoice status badge update
            const isCompleted = targetTotalBoxes > 0 && totalBoxesProd >= targetTotalBoxes;
            if (isCompleted) {
                invoiceStatusBadge.textContent = "ผลิตครบแล้ว ✅";
                invoiceStatusBadge.className = "badge badge-status-completed";
            } else {
                invoiceStatusBadge.textContent = "กำลังผลิต ⏳";
                invoiceStatusBadge.className = "badge badge-status-active";
            }

            const totalFinishedWt = totalBoxesProd * BOX_TO_KG_FACTOR;
            
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
                if (combinedYield >= 90.0) {
                    yieldStatusEl.textContent = "ดีเยี่ยม";
                    yieldStatusEl.className = "yield-badge yield-high";
                } else if (combinedYield >= 85.0) {
                    yieldStatusEl.textContent = "ปานกลาง";
                    yieldStatusEl.className = "yield-badge yield-mid";
                } else {
                    yieldStatusEl.textContent = "ต่ำกว่ามาตรฐาน";
                    yieldStatusEl.className = "yield-badge yield-low";
                }
            }

            // Remaining Raw
            const rawRemaining = Math.max(0, targetTotalRaw - totalRawUsed);
            document.getElementById('kpi-raw-remaining').textContent = `${rawRemaining.toFixed(1)} kg`;
            const totalDaysRem = rawRemaining > 0 ? (rawRemaining / 60) : 0;
            document.getElementById('kpi-days-left').textContent = `กำลังผลิตเป้าหมาย 60 kg/วัน (เหลืออีก ~${totalDaysRem.toFixed(1)} วัน)`;

            // 4. Update individual Product Cards
            updateProductCard('orig', summary.original, targets.original);
            updateProductCard('spicy', summary.spicy, targets.spicy);
            updateProductCard('pep', summary.pepper, targets.pepper);

            // 5. Update Invoice / Container Comparison Table & Summary
            renderInvoiceComparison();

            // 6. Update History Table
            renderHistoryTable();

            // 7. Update Chart
            renderChart();

            // 8. Update Film & Cartridge Analytics
            renderFilmAnalytics();
            renderCartridgeAnalytics();
            renderCartridgeSelect();
        }

        // Utility function to update single Product Card
        function updateProductCard(prefix, data, targetConfig) {
            const targetBoxes = targetConfig.targetBoxes;
            const targetRaw = targetConfig.targetRawKg;
            const dailyRate = targetConfig.dailyTargetRawKg;

            const progressPercent = Math.min(100, (data.boxesProd / targetBoxes) * 100);
            
            document.getElementById(`${prefix}-progress-label`).textContent = `${progressPercent.toFixed(1)}%`;
            document.getElementById(`${prefix}-progress-bar`).style.width = `${progressPercent}%`;
            document.getElementById(`${prefix}-raw-used`).textContent = `${data.rawUsed.toFixed(1)} / ${targetRaw} kg`;
            document.getElementById(`${prefix}-boxes-prod`).textContent = `${data.boxesProd} / ${targetBoxes} กล่อง`;
            
            const rawRem = Math.max(0, targetRaw - data.rawUsed);
            document.getElementById(`${prefix}-raw-rem`).textContent = `${rawRem.toFixed(1)} kg`;

            const daysRem = rawRem > 0 ? (rawRem / dailyRate) : 0;
            document.getElementById(`${prefix}-days-rem`).textContent = `${daysRem.toFixed(2)} วัน`;

            // Film Used and Waste metrics per flavor
            const filmEl = document.getElementById(`${prefix}-film-used`);
            if (filmEl) {
                filmEl.textContent = `${data.filmUsed.toFixed(1)} ม้วน`;
            }

            const wasteEl = document.getElementById(`${prefix}-waste-used`);
            if (wasteEl) {
                const wastePct = data.rawUsed > 0 ? ((data.wasteUsed / data.rawUsed) * 100).toFixed(2) : '0.00';
                wasteEl.textContent = `${data.wasteUsed.toFixed(2)} kg (${wastePct}%)`;
            }
        }

        // Render Invoice / Container Production Comparison Section
        function renderInvoiceComparison() {
            const invoiceTbody = document.getElementById('invoice-compare-tbody');
            const invoiceTfoot = document.getElementById('invoice-compare-tfoot');
            const invoiceCountEl = document.getElementById('invoice-compare-count');

            if (!invoiceTbody) return;

            if (invoiceCountEl) {
                invoiceCountEl.textContent = `${invoices.length} ตู้สินค้า`;
            }

            if (!invoices || invoices.length === 0) {
                invoiceTbody.innerHTML = `
                    <tr>
                        <td colspan="11" class="empty-state">
                            <p>ยังไม่มีข้อมูลตู้สินค้าในระบบ</p>
                        </td>
                    </tr>
                `;
                if (invoiceTfoot) invoiceTfoot.innerHTML = '';
                document.getElementById('best-yield-inv').textContent = '-';
                document.getElementById('best-yield-inv-val').textContent = '-';
                document.getElementById('lowest-waste-inv').textContent = '-';
                document.getElementById('lowest-waste-inv-val').textContent = '-';
                document.getElementById('total-inv-issues-count').textContent = '0 ครั้ง';
                document.getElementById('most-common-inv-issue').textContent = '-';
                return;
            }

            let totRawAll = 0;
            let totBoxesAll = 0;
            let totWasteAll = 0;
            let totFilmAll = 0;
            let totalIssuesAll = 0;
            const globalIssueCounts = {};

            let bestYieldInvId = null;
            let bestYieldVal = -1;
            let lowestWasteInvId = null;
            let lowestWasteVal = 999999;

            invoiceTbody.innerHTML = '';

            invoices.forEach(inv => {
                const logs = inv.logs || [];
                const targets = inv.targets || defaultTargetsTemplate;

                let invRaw = 0;
                let invBoxes = 0;
                let invWaste = 0;
                let invFilm = 0;
                let targetBoxes = 0;
                let targetRaw = 0;
                const invIssues = {};

                Object.keys(targets).forEach(k => {
                    targetBoxes += (targets[k].targetBoxes || 0);
                    targetRaw += (targets[k].targetRawKg || 0);
                });

                logs.forEach(log => {
                    invRaw += (log.rawWeight || 0);
                    invBoxes += (log.boxes || 0);
                    invWaste += (log.wasteWeight || 0);
                    invFilm += (log.filmUsed || 0);

                    const issueKey = log.issueType || 'none';
                    if (issueKey !== 'none') {
                        invIssues[issueKey] = (invIssues[issueKey] || 0) + 1;
                    }
                });

                const finWt = invBoxes * BOX_TO_KG_FACTOR;
                const yieldPct = invRaw > 0 ? (finWt / invRaw) * 100 : 0;
                const wastePct = invRaw > 0 ? (invWaste / invRaw) * 100 : 0;
                const isCompleted = targetBoxes > 0 && invBoxes >= targetBoxes;
                const isActive = inv.id === currentInvoiceId;

                totRawAll += invRaw;
                totBoxesAll += invBoxes;
                totWasteAll += invWaste;
                totFilmAll += invFilm;

                if (yieldPct > bestYieldVal && invRaw > 0) {
                    bestYieldVal = yieldPct;
                    bestYieldInvId = inv.id;
                }
                if (wastePct < lowestWasteVal && invRaw > 0) {
                    lowestWasteVal = wastePct;
                    lowestWasteInvId = inv.id;
                }

                // Issue badges
                let issuesHtml = '';
                const issueKeys = Object.keys(invIssues);
                if (issueKeys.length === 0) {
                    issuesHtml = '<span class="issue-badge issue-none">✅ ไม่พบปัญหา</span>';
                } else {
                    issuesHtml = '<div style="display: flex; flex-wrap: wrap; gap: 4px;">';
                    issueKeys.forEach(k => {
                        const count = invIssues[k];
                        totalIssuesAll += count;
                        globalIssueCounts[k] = (globalIssueCounts[k] || 0) + count;
                        const cfg = ISSUE_CONFIG[k] || ISSUE_CONFIG.other;
                        issuesHtml += `<span class="issue-badge ${cfg.badgeClass}">${cfg.icon} ${cfg.label} (${count})</span>`;
                    });
                    issuesHtml += '</div>';
                }

                let yieldBadge = 'yield-badge';
                if (yieldPct >= 90.0) yieldBadge += ' yield-high';
                else if (yieldPct >= 85.0) yieldBadge += ' yield-mid';
                else yieldBadge += ' yield-low';

                let wasteBadge = 'waste-badge';
                if (wastePct <= 2.5) wasteBadge += ' waste-low';
                else if (wastePct <= 5.0) wasteBadge += ' waste-mid';
                else wasteBadge += ' waste-high';

                const statusBadge = isCompleted 
                    ? '<span class="badge badge-status-completed">ผลิตครบแล้ว ✅</span>'
                    : `<span class="badge badge-status-active">กำลังผลิต ⏳ (${targetBoxes > 0 ? ((invBoxes / targetBoxes) * 100).toFixed(0) : 0}%)</span>`;

                const activeTag = isActive ? '<span style="font-size: 0.75rem; color: var(--accent-color); margin-left: 6px; font-weight: 600;">(ตู้นี้)</span>' : '';

                const tr = document.createElement('tr');
                if (isActive) {
                    tr.style.backgroundColor = 'rgba(59, 130, 246, 0.08)';
                }
                tr.innerHTML = `
                    <td>
                        <strong style="color: var(--accent-color);">${escapeHtml(inv.id)}</strong>${activeTag}
                        <div style="font-size: 0.75rem; color: var(--text-muted);">${escapeHtml(inv.customer || 'Shenzhen Yue Tai')} | ${formatDate(inv.createdAt || '')}</div>
                    </td>
                    <td>${statusBadge}</td>
                    <td>${invRaw.toFixed(2)} / ${targetRaw} kg</td>
                    <td style="font-weight: 600;">${invBoxes.toLocaleString()} / ${targetBoxes.toLocaleString()} กล่อง</td>
                    <td>${finWt.toFixed(2)} kg</td>
                    <td><span class="${yieldBadge}">${yieldPct.toFixed(2)}%</span></td>
                    <td>${invWaste.toFixed(2)} kg</td>
                    <td><span class="${wasteBadge}">${wastePct.toFixed(2)}%</span></td>
                    <td>${invFilm.toFixed(1)} ม้วน</td>
                    <td>${issuesHtml}</td>
                    <td style="text-align: center;">
                        <button class="btn-edit" onclick="selectInvoice('${escapeHtml(inv.id)}')">${isActive ? 'กำลังดูอยู่' : 'เปิดดูตู้นี้'}</button>
                    </td>
                `;
                invoiceTbody.appendChild(tr);
            });

            // Summary Highlight Cards
            if (bestYieldInvId) {
                document.getElementById('best-yield-inv').textContent = bestYieldInvId;
                document.getElementById('best-yield-inv-val').textContent = `Yield: ${bestYieldVal.toFixed(2)}%`;
            }
            if (lowestWasteInvId) {
                document.getElementById('lowest-waste-inv').textContent = lowestWasteInvId;
                document.getElementById('lowest-waste-inv-val').textContent = `ของเสียต่ำสุด: ${lowestWasteVal.toFixed(2)}%`;
            }
            document.getElementById('total-inv-issues-count').textContent = `${totalIssuesAll} ครั้ง`;
            
            // Most common issue
            let mostCommonKey = null;
            let mostCommonCount = 0;
            Object.keys(globalIssueCounts).forEach(k => {
                if (globalIssueCounts[k] > mostCommonCount) {
                    mostCommonCount = globalIssueCounts[k];
                    mostCommonKey = k;
                }
            });
            if (mostCommonKey) {
                const topCfg = ISSUE_CONFIG[mostCommonKey] || ISSUE_CONFIG.other;
                document.getElementById('most-common-inv-issue').textContent = `พบ ${topCfg.label} บ่อยสุด (${mostCommonCount} ครั้ง)`;
            } else {
                document.getElementById('most-common-inv-issue').textContent = `ทุกตู้ผลิตราบรื่น ไม่มีปัญหา`;
            }

            // Footer (Grand Total Row)
            const totFinAll = totBoxesAll * BOX_TO_KG_FACTOR;
            const overallYieldAll = totRawAll > 0 ? (totFinAll / totRawAll) * 100 : 0;
            const overallWastePctAll = totRawAll > 0 ? (totWasteAll / totRawAll) * 100 : 0;

            let totYieldBadge = 'yield-badge';
            if (overallYieldAll >= 90.0) totYieldBadge += ' yield-high';
            else if (overallYieldAll >= 85.0) totYieldBadge += ' yield-mid';
            else totYieldBadge += ' yield-low';

            let totWasteBadge = 'waste-badge';
            if (overallWastePctAll <= 2.5) totWasteBadge += ' waste-low';
            else if (overallWastePctAll <= 5.0) totWasteBadge += ' waste-mid';
            else totWasteBadge += ' waste-high';

            if (invoiceTfoot) {
                invoiceTfoot.innerHTML = `
                    <tr>
                        <td style="color: var(--accent-color); font-weight: 800; white-space: nowrap;">
                            <span style="display: inline-flex; align-items: center; gap: 4px;">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
                                รวมทุกตู้ (${invoices.length} ตู้สินค้า)
                            </span>
                        </td>
                        <td style="color: var(--text-secondary); font-size: 0.85rem;">ยอดสะสมรวม</td>
                        <td style="font-weight: 800;">${totRawAll.toFixed(2)} kg</td>
                        <td style="font-weight: 800; color: var(--accent-color);">${totBoxesAll.toLocaleString()} กล่อง</td>
                        <td style="font-weight: 800;">${totFinAll.toFixed(2)} kg</td>
                        <td><span class="${totYieldBadge}">${overallYieldAll.toFixed(2)}%</span></td>
                        <td style="font-weight: 800;">${totWasteAll.toFixed(2)} kg</td>
                        <td><span class="${totWasteBadge}">${overallWastePctAll.toFixed(2)}%</span></td>
                        <td style="font-weight: 800; color: var(--accent-color);">${totFilmAll.toFixed(1)} ม้วน</td>
                        <td style="font-size: 0.85rem; color: var(--text-muted);">ปัญหาที่บันทึกสะสม ${totalIssuesAll} ครั้ง</td>
                        <td style="text-align: center; color: var(--text-muted);">-</td>
                    </tr>
                `;
            }
        }

        // Render History Log Table (with waste, film and issue columns)
        function renderHistoryTable() {
            const activeInv = getActiveInvoice();
            if (!activeInv) return;

            const logs = activeInv.logs || [];
            const targets = activeInv.targets || defaultTargetsTemplate;

            historyTbody.innerHTML = '';
            
            if (logs.length === 0) {
                historyTbody.innerHTML = `
                    <tr>
                        <td colspan="11" class="empty-state">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            <p>ยังไม่มีบันทึกข้อมูลการผลิตใน Invoice นี้</p>
                        </td>
                    </tr>
                `;
                if (historyTfoot) historyTfoot.innerHTML = '';
                historyCount.textContent = "พบ 0 รายการ";
                return;
            }

            historyCount.textContent = `พบ ${logs.length} รายการ`;

            let totRaw = 0;
            let totBoxes = 0;
            let totWaste = 0;
            let totFilm = 0;

            logs.slice().reverse().forEach(log => {
                const tr = document.createElement('tr');
                const finishedWeight = (log.boxes || 0) * BOX_TO_KG_FACTOR;
                const yieldPercent = (log.rawWeight || 0) > 0 ? (finishedWeight / log.rawWeight) * 100 : 0;
                const wasteKg = log.wasteWeight !== undefined ? log.wasteWeight : 0;
                const wastePercent = (log.rawWeight || 0) > 0 ? (wasteKg / log.rawWeight) * 100 : 0;
                const filmRolls = log.filmUsed !== undefined ? log.filmUsed : 0;

                totRaw += (log.rawWeight || 0);
                totBoxes += (log.boxes || 0);
                totWaste += wasteKg;
                totFilm += filmRolls;
                
                let yieldClass = 'yield-badge';
                if (yieldPercent >= 90.0) yieldClass += ' yield-high';
                else if (yieldPercent >= 85.0) yieldClass += ' yield-mid';
                else yieldClass += ' yield-low';

                let wasteBadgeClass = 'waste-badge';
                if (wastePercent <= 2.5) wasteBadgeClass += ' waste-low';
                else if (wastePercent <= 5.0) wasteBadgeClass += ' waste-mid';
                else wasteBadgeClass += ' waste-high';

                const flavorConfig = targets[log.flavor] || { name: log.flavor, color: '#f59e0b' };

                // Cartridge & Remarks display
                let cartridgeDisplay = '';
                if (log.cartridgeId) {
                    const c = cartridges.find(item => item.id === log.cartridgeId);
                    const cName = c ? c.name : 'ตลับหมึก';
                    cartridgeDisplay = `<span class="cartridge-badge cartridge-active" style="margin-right: 6px;">🖨️ ${escapeHtml(cName)}</span>`;
                }
                const remarksText = log.remarks ? escapeHtml(log.remarks) : (!cartridgeDisplay ? '-' : '');
                const fullTooltip = [log.cartridgeId ? `ตลับหมึก: ${log.cartridgeId}` : '', log.remarks || ''].filter(Boolean).join(' | ');

                tr.innerHTML = `
                    <td>${formatDate(log.date)}</td>
                    <td><strong style="color: ${flavorConfig.color}">${flavorConfig.name}</strong></td>
                    <td>${log.rawWeight.toFixed(2)} kg</td>
                    <td>${log.boxes.toLocaleString()} กล่อง</td>
                    <td>${finishedWeight.toFixed(2)} kg</td>
                    <td><span class="${yieldClass}">${yieldPercent.toFixed(2)}%</span></td>
                    <td>${wasteKg.toFixed(2)} kg</td>
                    <td><span class="${wasteBadgeClass}">${wastePercent.toFixed(2)}%</span></td>
                    <td>${filmRolls.toFixed(1)} ม้วน</td>
                    <td style="max-width: 260px;" title="${escapeHtml(fullTooltip)}">${cartridgeDisplay}<span>${remarksText}</span></td>
                    <td style="text-align: center; display: flex; gap: 4px; justify-content: center;">
                        <button class="btn-edit" onclick="startEdit(${log.id})">แก้ไข</button>
                        <button class="btn-delete" onclick="deleteLog(${log.id})">ลบ</button>
                    </td>
                `;
                historyTbody.appendChild(tr);
            });

            // Calculate & Render Table Footer (Grand Total Row)
            const totFinished = totBoxes * BOX_TO_KG_FACTOR;
            const overallYield = totRaw > 0 ? (totFinished / totRaw) * 100 : 0;
            const overallWastePct = totRaw > 0 ? (totWaste / totRaw) * 100 : 0;

            let totYieldClass = 'yield-badge';
            if (overallYield >= 90.0) totYieldClass += ' yield-high';
            else if (overallYield >= 85.0) totYieldClass += ' yield-mid';
            else totYieldClass += ' yield-low';

            let totWasteClass = 'waste-badge';
            if (overallWastePct <= 2.5) totWasteClass += ' waste-low';
            else if (overallWastePct <= 5.0) totWasteClass += ' waste-mid';
            else totWasteClass += ' waste-high';

            if (historyTfoot) {
                historyTfoot.innerHTML = `
                    <tr>
                        <td style="color: var(--accent-color); font-weight: 800; white-space: nowrap;">
                            <span style="display: inline-flex; align-items: center; gap: 4px;">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                                รวมทั้งหมด
                            </span>
                        </td>
                        <td style="color: var(--text-secondary); font-size: 0.85rem;">${logs.length} รอบการผลิต</td>
                        <td style="font-weight: 800;">${totRaw.toFixed(2)} kg</td>
                        <td style="font-weight: 800; color: var(--accent-color);">${totBoxes.toLocaleString()} กล่อง</td>
                        <td style="font-weight: 800;">${totFinished.toFixed(2)} kg</td>
                        <td><span class="${totYieldClass}">${overallYield.toFixed(2)}%</span></td>
                        <td style="font-weight: 800;">${totWaste.toFixed(2)} kg</td>
                        <td><span class="${totWasteClass}">${overallWastePct.toFixed(2)}%</span></td>
                        <td style="font-weight: 800; color: var(--accent-color);">${totFilm.toFixed(1)} ม้วน</td>
                        <td style="color: var(--text-muted); font-size: 0.8rem;">ยอดสะสมรวม</td>
                        <td style="text-align: center; color: var(--text-muted);">-</td>
                    </tr>
                `;
            }
        }

        // Render Film Proportion Analytics (Dedicated Doughnut Chart & Summary)
        function renderFilmAnalytics() {
            if (typeof Chart === 'undefined') return;
            const activeInv = getActiveInvoice();
            const logs = activeInv ? (activeInv.logs || []) : [];

            let origFilm = 0;
            let spicyFilm = 0;
            let pepFilm = 0;
            let origBoxes = 0;
            let spicyBoxes = 0;
            let pepBoxes = 0;

            logs.forEach(l => {
                const rolls = l.filmUsed || 0;
                const b = l.boxes || 0;
                if (l.flavor === 'original') {
                    origFilm += rolls;
                    origBoxes += b;
                } else if (l.flavor === 'spicy') {
                    spicyFilm += rolls;
                    spicyBoxes += b;
                } else if (l.flavor === 'pepper') {
                    pepFilm += rolls;
                    pepBoxes += b;
                }
            });

            const totalFilm = origFilm + spicyFilm + pepFilm;
            const totalBoxes = origBoxes + spicyBoxes + pepBoxes;

            // Update badge
            const filmTotalBadge = document.getElementById('film-total-badge');
            if (filmTotalBadge) {
                filmTotalBadge.textContent = `รวม ${totalFilm.toFixed(1)} ม้วน (${totalBoxes.toLocaleString()} กล่อง)`;
            }

            // Stats breakdown container
            const statsContainer = document.getElementById('film-stats-container');
            if (statsContainer) {
                const origPct = totalFilm > 0 ? ((origFilm / totalFilm) * 100).toFixed(1) : '0.0';
                const spicyPct = totalFilm > 0 ? ((spicyFilm / totalFilm) * 100).toFixed(1) : '0.0';
                const pepPct = totalFilm > 0 ? ((pepFilm / totalFilm) * 100).toFixed(1) : '0.0';

                const origRatio = origFilm > 0 ? (origBoxes / origFilm).toFixed(0) : '-';
                const spicyRatio = spicyFilm > 0 ? (spicyBoxes / spicyFilm).toFixed(0) : '-';
                const pepRatio = pepFilm > 0 ? (pepBoxes / pepFilm).toFixed(0) : '-';

                statsContainer.innerHTML = `
                    <div class="analytics-card-stat" style="border-left: 3px solid #f59e0b;">
                        <div style="font-size: 0.75rem; color: var(--text-secondary);">รสดั้งเดิม</div>
                        <div style="font-size: 1rem; font-weight: 700; color: #f59e0b;">${origFilm.toFixed(1)} ม้วน</div>
                        <div style="font-size: 0.7rem; color: var(--text-muted);">${origPct}% (~${origRatio} กล่อง/ม้วน)</div>
                    </div>
                    <div class="analytics-card-stat" style="border-left: 3px solid #ef4444;">
                        <div style="font-size: 0.75rem; color: var(--text-secondary);">รสเผ็ด</div>
                        <div style="font-size: 1rem; font-weight: 700; color: #ef4444;">${spicyFilm.toFixed(1)} ม้วน</div>
                        <div style="font-size: 0.7rem; color: var(--text-muted);">${spicyPct}% (~${spicyRatio} กล่อง/ม้วน)</div>
                    </div>
                    <div class="analytics-card-stat" style="border-left: 3px solid #8b5cf6;">
                        <div style="font-size: 0.75rem; color: var(--text-secondary);">รสพริกไทยดำ</div>
                        <div style="font-size: 1rem; font-weight: 700; color: #8b5cf6;">${pepFilm.toFixed(1)} ม้วน</div>
                        <div style="font-size: 0.7rem; color: var(--text-muted);">${pepPct}% (~${pepRatio} กล่อง/ม้วน)</div>
                    </div>
                `;
            }

            // Render Doughnut Chart
            const canvas = document.getElementById('filmDoughnutChart');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');

            if (filmChartInstance) {
                filmChartInstance.destroy();
            }

            const theme = document.body.getAttribute('data-theme') || 'dark';
            const textColor = theme === 'dark' ? '#94a3b8' : '#475569';

            filmChartInstance = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['รสดั้งเดิม', 'รสเผ็ด', 'รสพริกไทยดำ'],
                    datasets: [{
                        data: [origFilm, spicyFilm, pepFilm],
                        backgroundColor: [
                            'rgba(245, 158, 11, 0.85)',
                            'rgba(239, 68, 68, 0.85)',
                            'rgba(139, 92, 246, 0.85)'
                        ],
                        borderColor: [
                            '#f59e0b',
                            '#ef4444',
                            '#8b5cf6'
                        ],
                        borderWidth: 2,
                        hoverOffset: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '62%',
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: textColor,
                                font: { size: 11 },
                                boxWidth: 12
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(item) {
                                    const val = item.raw || 0;
                                    const pct = totalFilm > 0 ? ((val / totalFilm) * 100).toFixed(1) : 0;
                                    return ` ${item.label}: ${val.toFixed(1)} ม้วน (${pct}%)`;
                                }
                            }
                        }
                    }
                }
            });
        }

        // Render Ink Cartridge Analytics (Dedicated Bar Chart & Summary)
        function renderCartridgeAnalytics() {
            if (typeof Chart === 'undefined') return;
            
            const labels = cartridges.map(c => c.name);
            const data = cartridges.map(c => c.totalBoxes || 0);
            const backgroundColors = cartridges.map(c => c.status === 'active' ? 'rgba(16, 185, 129, 0.75)' : 'rgba(59, 130, 246, 0.75)');
            const borderColors = cartridges.map(c => c.status === 'active' ? '#10b981' : '#3b82f6');

            let totalBoxesPrinted = data.reduce((a, b) => a + b, 0);
            let activeCartridge = cartridges.find(c => c.status === 'active') || cartridges[cartridges.length - 1];
            let avgBoxes = cartridges.length > 0 ? (totalBoxesPrinted / cartridges.length).toFixed(0) : 0;

            // Active badge
            const activeBadge = document.getElementById('cartridge-active-badge');
            if (activeBadge && activeCartridge) {
                activeBadge.textContent = `${activeCartridge.name} (${(activeCartridge.totalBoxes || 0).toLocaleString()} กล่อง) กำลังใช้งาน`;
            }

            // Stats breakdown container
            const statsContainer = document.getElementById('cartridge-stats-container');
            if (statsContainer) {
                statsContainer.innerHTML = `
                    <div class="analytics-card-stat" style="border-left: 3px solid #10b981;">
                        <div style="font-size: 0.75rem; color: var(--text-secondary);">ตลับที่ใช้งานอยู่</div>
                        <div style="font-size: 1rem; font-weight: 700; color: #10b981;">${activeCartridge ? (activeCartridge.totalBoxes || 0).toLocaleString() : 0} กล่อง</div>
                        <div style="font-size: 0.7rem; color: var(--text-muted);">${activeCartridge ? activeCartridge.name : '-'}</div>
                    </div>
                    <div class="analytics-card-stat" style="border-left: 3px solid #3b82f6;">
                        <div style="font-size: 0.75rem; color: var(--text-secondary);">ยอดพิมพ์สะสมรวม</div>
                        <div style="font-size: 1rem; font-weight: 700; color: #3b82f6;">${totalBoxesPrinted.toLocaleString()} กล่อง</div>
                        <div style="font-size: 0.7rem; color: var(--text-muted);">รวม ${cartridges.length} ตลับ</div>
                    </div>
                    <div class="analytics-card-stat" style="border-left: 3px solid #f59e0b;">
                        <div style="font-size: 0.75rem; color: var(--text-secondary);">ค่าเฉลี่ยผลผลิต</div>
                        <div style="font-size: 1rem; font-weight: 700; color: #f59e0b;">${avgBoxes} กล่อง</div>
                        <div style="font-size: 0.7rem; color: var(--text-muted);">เฉลี่ยต่อตลับ</div>
                    </div>
                `;
            }

            // Render Bar Chart
            const canvas = document.getElementById('cartridgeBarChart');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');

            if (cartridgeChartInstance) {
                cartridgeChartInstance.destroy();
            }

            const theme = document.body.getAttribute('data-theme') || 'dark';
            const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
            const textColor = theme === 'dark' ? '#94a3b8' : '#475569';

            cartridgeChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'ยอดผลิตสะสม (กล่อง)',
                        data: data,
                        backgroundColor: backgroundColors,
                        borderColor: borderColors,
                        borderWidth: 1.5,
                        borderRadius: 6
                    }]
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
                                text: 'จำนวนกล่องที่ผลิตได้ (กล่อง)',
                                color: textColor
                            }
                        }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                afterBody: function(items) {
                                    const idx = items[0].dataIndex;
                                    const c = cartridges[idx];
                                    const statusStr = c.status === 'active' ? '🟢 กำลังใช้งาน' : '⚪ ใช้งานเสร็จสิ้นแล้ว';
                                    const days = (c.logs && c.logs.length) ? `${c.logs.length} วันที่บันทึก` : '-';
                                    return `สถานะ: ${statusStr}\nเริ่มใช้: ${c.startDate || '-'}\nประวัติ: ${days}`;
                                }
                            }
                        }
                    }
                }
            });
        }

        // Chart.js rendering
        function renderChart() {
            if (typeof Chart === 'undefined') return;
            
            const activeInv = getActiveInvoice();
            if (!activeInv) return;

            const logs = activeInv.logs || [];
            const targets = activeInv.targets || defaultTargetsTemplate;

            const ctx = document.getElementById('productionChart').getContext('2d');
            
            if (chartInstance) {
                chartInstance.destroy();
            }

            const theme = document.body.getAttribute('data-theme') || 'dark';
            const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
            const textColor = theme === 'dark' ? '#94a3b8' : '#475569';

            if (currentChartTab === 'overall') {
                const data = {
                    original: { raw: 0, boxes: 0 },
                    spicy: { raw: 0, boxes: 0 },
                    pepper: { raw: 0, boxes: 0 }
                };

                logs.forEach(log => {
                    if (data[log.flavor]) {
                        data[log.flavor].raw += (log.rawWeight || 0);
                        data[log.flavor].boxes += (log.boxes || 0);
                    }
                });

                const rawTargets = [
                    targets.original.targetRawKg,
                    targets.spicy.targetRawKg,
                    targets.pepper.targetRawKg
                ];

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
                                data: rawTargets,
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
                                        const rawTarget = rawTargets[index];
                                        const rawUsed = data[flavor].raw;
                                        const boxes = data[flavor].boxes;
                                        const pct = rawTarget > 0 ? (rawUsed / rawTarget * 100).toFixed(1) : 0;
                                        return `ผลิตได้สำเร็จ: ${boxes} กล่อง\nความคืบหน้า: ${pct}%`;
                                    }
                                }
                            }
                        }
                    }
                });

            } else if (currentChartTab === 'daily-trend') {
                const uniqueDates = [...new Set(logs.map(log => log.date))].sort();
                
                const datasets = {
                    original: uniqueDates.map(d => 0),
                    spicy: uniqueDates.map(d => 0),
                    pepper: uniqueDates.map(d => 0)
                };

                logs.forEach(log => {
                    const dateIdx = uniqueDates.indexOf(log.date);
                    if (dateIdx !== -1 && datasets[log.flavor]) {
                        datasets[log.flavor][dateIdx] += (log.rawWeight || 0);
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
                const chartLogs = logs.filter(log => log.rawWeight > 0);
                
                const labels = chartLogs.map(log => {
                    const flvName = targets[log.flavor] ? targets[log.flavor].name.substring(2) : log.flavor;
                    return `${formatDateShort(log.date)} (${flvName})`;
                });
                const yields = chartLogs.map(log => {
                    const finishedWeight = (log.boxes || 0) * BOX_TO_KG_FACTOR;
                    return ((finishedWeight / log.rawWeight) * 100);
                });

                const colors = chartLogs.map(log => (targets[log.flavor] ? targets[log.flavor].color : '#f59e0b'));

                chartInstance = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Yield การผลิตจริง (%)',
                                data: yields,
                                backgroundColor: colors.map(c => c + 'cc'),
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
                                display: false
                            },
                            tooltip: {
                                callbacks: {
                                    afterBody: function(items) {
                                        const index = items[0].dataIndex;
                                        const log = chartLogs[index];
                                        const finKg = log.boxes * BOX_TO_KG_FACTOR;
                                        const waste = log.wasteWeight || 0;
                                        const film = log.filmUsed || 0;
                                        return `วัตถุดิบ: ${log.rawWeight.toFixed(1)} kg | ของเสีย: ${waste.toFixed(2)} kg\nได้สินค้า: ${log.boxes} กล่อง (${finKg.toFixed(1)} kg)\nฟิล์มที่เบิกใช้: ${film.toFixed(1)} ม้วน`;
                                    }
                                }
                            }
                        }
                    }
                });
            } else if (currentChartTab === 'invoice-compare') {
                const labels = invoices.map(inv => inv.id);
                const boxesData = [];
                const yieldData = [];
                const wastePctData = [];
                const invDetails = [];

                invoices.forEach(inv => {
                    const logs = inv.logs || [];
                    let invRaw = 0;
                    let invBoxes = 0;
                    let invWaste = 0;
                    let invIssues = 0;

                    logs.forEach(l => {
                        invRaw += (l.rawWeight || 0);
                        invBoxes += (l.boxes || 0);
                        invWaste += (l.wasteWeight || 0);
                        if (l.issueType && l.issueType !== 'none') invIssues++;
                    });

                    const finWt = invBoxes * BOX_TO_KG_FACTOR;
                    const yieldPct = invRaw > 0 ? parseFloat(((finWt / invRaw) * 100).toFixed(2)) : 0;
                    const wastePct = invRaw > 0 ? parseFloat(((invWaste / invRaw) * 100).toFixed(2)) : 0;

                    boxesData.push(invBoxes);
                    yieldData.push(yieldPct);
                    wastePctData.push(wastePct);
                    invDetails.push({ raw: invRaw, waste: invWaste, issues: invIssues, customer: inv.customer || '' });
                });

                chartInstance = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                type: 'bar',
                                label: 'ผลผลิตตู้สินค้า (กล่อง)',
                                data: boxesData,
                                backgroundColor: 'rgba(59, 130, 246, 0.7)',
                                borderColor: '#3b82f6',
                                borderWidth: 1.5,
                                borderRadius: 6,
                                yAxisID: 'y'
                            },
                            {
                                type: 'line',
                                label: '% การผลิต (Yield %)',
                                data: yieldData,
                                borderColor: '#10b981',
                                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                                borderWidth: 3,
                                pointRadius: 5,
                                pointHoverRadius: 7,
                                tension: 0.25,
                                yAxisID: 'y1'
                            },
                            {
                                type: 'line',
                                label: '% ของเสีย (%)',
                                data: wastePctData,
                                borderColor: '#ef4444',
                                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                                borderWidth: 2.5,
                                pointRadius: 5,
                                pointHoverRadius: 7,
                                borderDash: [4, 4],
                                tension: 0.25,
                                yAxisID: 'y1'
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        interaction: {
                            mode: 'index',
                            intersect: false
                        },
                        scales: {
                            x: {
                                grid: { display: false },
                                ticks: { color: textColor }
                            },
                            y: {
                                type: 'linear',
                                position: 'left',
                                grid: { color: gridColor },
                                ticks: { color: textColor },
                                title: {
                                    display: true,
                                    text: 'จำนวนผลิตได้ต่อตู้ (กล่อง)',
                                    color: textColor
                                }
                            },
                            y1: {
                                type: 'linear',
                                position: 'right',
                                grid: { drawOnChartArea: false },
                                ticks: { 
                                    color: textColor,
                                    callback: function(v) { return v + '%'; }
                                },
                                min: 0,
                                max: 100,
                                title: {
                                    display: true,
                                    text: 'อัตราส่วน Yield / ของเสีย (%)',
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
                                        const idx = items[0].dataIndex;
                                        const det = invDetails[idx];
                                        return `ลูกค้า: ${det.customer}\nวัตถุดิบปลาย่าง: ${det.raw.toFixed(1)} kg\nของเสียสะสม: ${det.waste.toFixed(2)} kg\nปัญหาที่พบ: ${det.issues} ครั้ง`;
                                    }
                                }
                            }
                        }
                    }
                });
            } else if (currentChartTab === 'film-ratio') {
                let origFilm = 0, spicyFilm = 0, pepFilm = 0;
                let origBoxes = 0, spicyBoxes = 0, pepBoxes = 0;
                logs.forEach(l => {
                    const rolls = l.filmUsed || 0;
                    const b = l.boxes || 0;
                    if (l.flavor === 'original') { origFilm += rolls; origBoxes += b; }
                    else if (l.flavor === 'spicy') { spicyFilm += rolls; spicyBoxes += b; }
                    else if (l.flavor === 'pepper') { pepFilm += rolls; pepBoxes += b; }
                });
                const totalFilm = origFilm + spicyFilm + pepFilm;

                chartInstance = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['รสดั้งเดิม', 'รสเผ็ด', 'รสพริกไทยดำ'],
                        datasets: [{
                            data: [origFilm, spicyFilm, pepFilm],
                            backgroundColor: [
                                'rgba(245, 158, 11, 0.85)',
                                'rgba(239, 68, 68, 0.85)',
                                'rgba(139, 92, 246, 0.85)'
                            ],
                            borderColor: ['#f59e0b', '#ef4444', '#8b5cf6'],
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: '55%',
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: { color: textColor, font: { size: 12 } }
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(item) {
                                        const val = item.raw || 0;
                                        const pct = totalFilm > 0 ? ((val / totalFilm) * 100).toFixed(1) : 0;
                                        return ` ${item.label}: ${val.toFixed(1)} ม้วน (${pct}%)`;
                                    }
                                }
                            }
                        }
                    }
                });

            } else if (currentChartTab === 'ink-cartridge') {
                const labels = cartridges.map(c => c.name);
                const data = cartridges.map(c => c.totalBoxes || 0);
                const bgColors = cartridges.map(c => c.status === 'active' ? 'rgba(16, 185, 129, 0.75)' : 'rgba(59, 130, 246, 0.75)');
                const borderColors = cartridges.map(c => c.status === 'active' ? '#10b981' : '#3b82f6');

                chartInstance = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'ผลผลิตสะสมต่อตลับหมึก (กล่อง)',
                            data: data,
                            backgroundColor: bgColors,
                            borderColor: borderColors,
                            borderWidth: 1.5,
                            borderRadius: 6
                        }]
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
                                    text: 'จำนวนกล่องที่ผลิตได้สะสม (กล่อง)',
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
                                        const idx = items[0].dataIndex;
                                        const c = cartridges[idx];
                                        const st = c.status === 'active' ? '🟢 กำลังใช้งาน' : '⚪ ใช้งานเสร็จสิ้นแล้ว';
                                        return `สถานะ: ${st}\nช่วงเวลา: ${c.startDate || '-'}${c.endDate ? ' ถึง ' + c.endDate : ''}\nยอดรวม: ${(c.totalBoxes || 0).toLocaleString()} กล่อง`;
                                    }
                                }
                            }
                        }
                    }
                });
            }
        }

        // Backup & Restore: Export Data to JSON (Multi-Invoice Support)
        function exportData() {
            const backupData = {
                version: "2.1",
                currentInvoiceId,
                invoices,
                cartridges
            };
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
            const downloadAnchor = document.createElement('a');
            const todayStr = new Date().toISOString().split('T')[0];
            
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", `pillow_pack_production_backup_${todayStr}.json`);
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
            showToast('ดาวน์โหลดไฟล์ข้อมูลผลิตสำรองครบทุก Invoice และข้อมูลตลับหมึกเรียบร้อยแล้ว');
        }

        // Backup & Restore: Import Data from JSON (Supports both v1 and v2 formats)
        function importData(e) {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(evt) {
                try {
                    const imported = JSON.parse(evt.target.result);
                    
                    if (imported && imported.version && Array.isArray(imported.invoices)) {
                        if (confirm(`พบข้อมูลระบบ Multi-Invoice จำนวน ${imported.invoices.length} Invoice ต้องการนำเข้าแทนที่ข้อมูลปัจจุบันใช่หรือไม่?`)) {
                            invoices = imported.invoices;
                            currentInvoiceId = imported.currentInvoiceId || invoices[0].id;
                            if (imported.cartridges && Array.isArray(imported.cartridges)) {
                                cartridges = imported.cartridges;
                                saveCartridges();
                            }
                            saveInvoices();
                            updateDashboard();
                            showToast(`นำเข้าสำเร็จ ${invoices.length} Invoice`);
                        }
                    } else if (Array.isArray(imported)) {
                        // Legacy single logs import
                        if (confirm(`พบข้อมูลประวัติการผลิตจำนวน ${imported.length} รายการ ต้องการนำเข้าใส่ใน Invoice ปัจจุบันใช่หรือไม่?`)) {
                            const activeInv = getActiveInvoice();
                            if (activeInv) {
                                activeInv.logs = imported;
                                activeInv.logs.sort((a, b) => new Date(a.date) - new Date(b.date));
                                saveInvoices();
                                updateDashboard();
                                showToast(`นำเข้าข้อมูลประวัติสำเร็จ ${imported.length} รายการ`);
                            }
                        }
                    } else {
                        throw new Error("โครงสร้างไฟล์ข้อมูลไม่ถูกต้อง");
                    }
                } catch (err) {
                    alert(`ข้อผิดพลาดในการโหลดไฟล์: ${err.message}`);
                    showToast('ไฟล์สำรองไม่ถูกต้อง', 'error');
                }
                importFileInput.value = '';
            };
            reader.readAsText(file);
        }

        // Helper: Format month year string (YYYY-MM -> เดือน ปีกรอก)
        function formatMonthYearThai(ymStr) {
            if (!ymStr) return '-';
            const parts = ymStr.split('-');
            if (parts.length < 2) return ymStr;
            const months = [
                "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
                "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
            ];
            const mIdx = parseInt(parts[1], 10) - 1;
            const thYear = parseInt(parts[0], 10) + 543;
            return `${months[mIdx] || parts[1]} ${thYear}`;
        }

        // Helper: Format date string (YYYY-MM-DD -> DD/MM/YYYY)
        function formatDate(dateStr) {
            if (!dateStr) return '';
            const parts = dateStr.split('-');
            if (parts.length !== 3) return dateStr;
            return `${parts[2]}/${parts[1]}/${parseInt(parts[0]) + 543}`;
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
    </script>
</body>
</html>
