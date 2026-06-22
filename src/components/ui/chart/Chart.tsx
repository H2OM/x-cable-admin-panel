import React, {useRef, useEffect, useCallback} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    type ChartData,
    type ChartOptions,
    type ChartTypeRegistry,
} from 'chart.js';

import annotationPlugin from 'chartjs-plugin-annotation';
import zoomPlugin from 'chartjs-plugin-zoom';
import {DoughnutController, PieController, BarController, LineController} from 'chart.js';

// Регистрация ВСЕХ необходимых компонентов Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    annotationPlugin,
    zoomPlugin,
    DoughnutController,
    PieController,
    BarController,
    LineController
);

export interface ChartProps {
    type: keyof ChartTypeRegistry
    data?: ChartData,
    options?: ChartOptions,
    height?: number,
    width?: number,
    className?: string,
    title?: string,
    showLegend?: boolean,
    showTooltips?: boolean,
    responsive?: boolean,
    onChartClick?: (event: never, elements: never[]) => void,
    loading?: boolean,
    datasets?: object
}

// Цветовая палитра для графиков
const CHART_COLORS = {
    primary: '#4dc9f6',
    secondary: '#f67019',
    success: '#00a950',
    danger: '#f53794',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40',
};

const Chart: React.FC<ChartProps> = ({
    type,
    data,
    options = {},
    height = 300,
    width,
    className = '',
    title = '',
    showLegend = true,
    showTooltips = true,
    responsive = true,
    onChartClick,
    loading = false
}) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<ChartJS | null>(null);

    // Дефолтные опции
    const getDefaultOptions = useCallback((): ChartOptions => {
        const isLineOrBar = type === 'line' || type === 'bar';
        const isDoughnutOrPie = type === 'doughnut' || type === 'pie';

        const baseOptions: ChartOptions = {
            responsive,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: showLegend,
                    position: 'top' as const,
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        color: '#495057',
                        font: {
                            family: "'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                            size: 12,
                        },
                    },
                },
                title: {
                    display: !!title,
                    text: title,
                    color: '#495057',
                    font: {
                        family: "'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                        size: 16,
                        weight: 'bold',
                    },
                    padding: {
                        top: 10,
                        bottom: 30,
                    },
                },
                tooltip: {
                    enabled: showTooltips,
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    padding: 12,
                    cornerRadius: 6,
                    displayColors: true,
                },
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false,
            },
            animation: {
                duration: 750,
                easing: 'easeInOutQuart',
            },
        };

        if (isLineOrBar) {
            return {
                ...baseOptions,
                scales: {
                    x: {
                        grid: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.05)',
                        },
                        ticks: {
                            color: '#6c757d',
                            maxRotation: 45,
                        },
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.05)',
                        },
                        ticks: {
                            color: '#6c757d',
                            callback: (value) => {
                                if (typeof value === 'number') {
                                    // Для денежных значений
                                    if (value >= 1000) {
                                        return new Intl.NumberFormat('ru-RU', {
                                            notation: 'compact',
                                            compactDisplay: 'short',
                                        }).format(value);
                                    }
                                }

                                return value;
                            },
                        },
                    },
                },
            };
        }

        if (isDoughnutOrPie) {
            return {
                ...baseOptions,
                plugins: {
                    ...baseOptions.plugins,
                    legend: {
                        ...baseOptions.plugins?.legend,
                        position: 'right' as const,
                    },
                    tooltip: {
                        ...baseOptions.plugins?.tooltip,
                        callbacks: {
                            label: (context) => {
                                const label = context.label || '';
                                const value = context.parsed;
                                const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: ${new Intl.NumberFormat('ru-RU').format(value)} (${percentage}%)`;
                            },
                        },
                    },
                },
            };
        }

        return baseOptions;
    }, [type, showLegend, showTooltips, title, responsive]);

    // Инициализация и обновление графика
    useEffect(() => {
        if (!chartRef.current || loading) return;

        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;

        const preparedData = {...data} as ChartData;

        // Автоматическое назначение цветов если не указаны
        if (preparedData.datasets && preparedData.datasets.length > 0) {
            preparedData.datasets = preparedData.datasets.map((dataset, index) => {
                if (!dataset.backgroundColor) {
                    const color = Object.values(CHART_COLORS)[index % Object.values(CHART_COLORS).length];

                    return {
                        ...dataset,
                        backgroundColor: type === 'line' || type === 'bar'
                            ? color + '20'
                            : color,
                        borderColor: color,
                        borderWidth: type === 'line' || type === 'bar' ? 2 : 1,
                    };
                }

                return dataset;
            });
        }

        const mergedOptions = {
            ...getDefaultOptions(),
            ...options,
            onClick: onChartClick,
        };

        if (chartInstance.current) {
            chartInstance.current.data = preparedData;
            chartInstance.current.options = mergedOptions;
            chartInstance.current.update();
        } else {
            chartInstance.current = new ChartJS(ctx, {
                type,
                data: preparedData,
                options: mergedOptions,
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, [type, data, options, height, title, loading, getDefaultOptions, onChartClick]);

    return (
        <div
            className={`chart-container position-relative ${className}`}
            style={{height: `${height}px`, width: width ? `${width}px` : '100%'}}
        >
            {loading && (
                <div
                    className="chart-loading-overlay d-flex align-items-center justify-content-center"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        zIndex: 10,
                        borderRadius: 'inherit',
                    }}
                >
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </div>
                </div>
            )}

            <canvas ref={chartRef}/>

        </div>
    );
};

export default Chart;