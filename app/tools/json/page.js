"use client"

import React, { useState, useCallback, useMemo } from 'react';
import { Copy, Minimize2, GitCompare, AlertCircle, Check, Sparkles, RotateCcw } from 'lucide-react';

export default function JsonPrettier() {
    const [inputJson, setInputJson] = useState('');
    const [trackingPoint, setTrackingPoint] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    // Validate and parse JSON
    const parseJson = useCallback((jsonString) => {
        if (!jsonString.trim()) return null;
        try {
            return JSON.parse(jsonString);
        } catch (e) {
            throw new Error(`Invalid JSON: ${e.message}`);
        }
    }, []);

    // Format JSON with different styles
    const formatJson = useCallback((obj, compact = false) => {
        if (!obj) return '';
        return JSON.stringify(obj, null, compact ? 0 : 2);
    }, []);

    // Deep comparison function to find differences
    const findDifferences = useCallback((obj1, obj2, path = '') => {
        const differences = [];

        const compareValues = (val1, val2, currentPath) => {
            if (val1 === val2) return;

            if (typeof val1 !== typeof val2) {
                differences.push({
                    path: currentPath,
                    type: 'type_change',
                    oldValue: val1,
                    newValue: val2,
                    oldType: typeof val1,
                    newType: typeof val2
                });
                return;
            }

            if (val1 === null || val2 === null) {
                differences.push({
                    path: currentPath,
                    type: 'value_change',
                    oldValue: val1,
                    newValue: val2
                });
                return;
            }

            if (Array.isArray(val1) && Array.isArray(val2)) {
                const maxLength = Math.max(val1.length, val2.length);
                for (let i = 0; i < maxLength; i++) {
                    const newPath = `${currentPath}[${i}]`;
                    if (i >= val1.length) {
                        differences.push({
                            path: newPath,
                            type: 'addition',
                            newValue: val2[i]
                        });
                    } else if (i >= val2.length) {
                        differences.push({
                            path: newPath,
                            type: 'deletion',
                            oldValue: val1[i]
                        });
                    } else {
                        compareValues(val1[i], val2[i], newPath);
                    }
                }
            } else if (typeof val1 === 'object' && typeof val2 === 'object') {
                const allKeys = new Set([...Object.keys(val1), ...Object.keys(val2)]);
                allKeys.forEach(key => {
                    const newPath = currentPath ? `${currentPath}.${key}` : key;
                    if (!(key in val1)) {
                        differences.push({
                            path: newPath,
                            type: 'addition',
                            newValue: val2[key]
                        });
                    } else if (!(key in val2)) {
                        differences.push({
                            path: newPath,
                            type: 'deletion',
                            oldValue: val1[key]
                        });
                    } else {
                        compareValues(val1[key], val2[key], newPath);
                    }
                });
            } else {
                differences.push({
                    path: currentPath,
                    type: 'value_change',
                    oldValue: val1,
                    newValue: val2
                });
            }
        };

        compareValues(obj1, obj2, path);
        return differences;
    }, []);

    // Process the JSON and generate outputs
    const processedData = useMemo(() => {
        setError('');

        try {
            const currentJson = parseJson(inputJson);
            const trackingJson = trackingPoint ? parseJson(trackingPoint) : null;

            const result = {
                prettified: '',
                compacted: '',
                differences: [],
                isValid: false
            };

            if (currentJson !== null) {
                result.prettified = formatJson(currentJson, false);
                result.compacted = formatJson(currentJson, true);
                result.isValid = true;

                if (trackingJson !== null) {
                    result.differences = findDifferences(trackingJson, currentJson);
                }
            }

            return result;
        } catch (e) {
            setError(e.message);
            return {
                prettified: '',
                compacted: '',
                differences: [],
                isValid: false
            };
        }
    }, [inputJson, trackingPoint, parseJson, formatJson, findDifferences]);

    // Copy to clipboard functionality
    const copyToClipboard = useCallback(async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }, []);

    // Set tracking point to current JSON
    const setTrackingPointToCurrent = useCallback(() => {
        if (processedData.isValid) {
            setTrackingPoint(inputJson);
        }
    }, [inputJson, processedData.isValid]);

    // Apply prettified JSON to main textarea
    const applyPrettified = useCallback(() => {
        if (processedData.prettified) {
            setInputJson(processedData.prettified);
        }
    }, [processedData.prettified]);

    // Apply compacted JSON to main textarea
    const applyCompacted = useCallback(() => {
        if (processedData.compacted) {
            setInputJson(processedData.compacted);
        }
    }, [processedData.compacted]);

    // Clear tracking point
    const clearTrackingPoint = useCallback(() => {
        setTrackingPoint('');
    }, []);

    // Render difference item
    const renderDifference = (diff, index) => {
        const getTypeColor = (type) => {
            switch (type) {
                case 'addition': return 'text-green-400 bg-green-900/30';
                case 'deletion': return 'text-red-400 bg-red-900/30';
                case 'value_change': return 'text-blue-400 bg-blue-900/30';
                case 'type_change': return 'text-purple-400 bg-purple-900/30';
                default: return 'text-gray-400 bg-gray-800';
            }
        };

        const getTypeLabel = (type) => {
            switch (type) {
                case 'addition': return 'Added';
                case 'deletion': return 'Deleted';
                case 'value_change': return 'Changed';
                case 'type_change': return 'Type Changed';
                default: return 'Modified';
            }
        };

        return (
            <div key={index} className="border border-gray-700 rounded-lg pl-3">
                <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(diff.type)}`}>
                        {getTypeLabel(diff.type)}
                    </span>
                    <code className="text-sm font-mono text-gray-300 px-2 py-1 rounded">
                        {diff.path || 'root'}
                    </code>
                </div>

                <div className="space-y-1 text-sm">
                    {diff.oldValue !== undefined && (
                        <div>
                            <span className="text-red-400 font-medium">- </span>
                            <code className="text-red-300 bg-red-900/30 px-1 rounded">
                                {JSON.stringify(diff.oldValue)}
                            </code>
                            {diff.oldType && <span className="text-xs text-gray-500 ml-2">({diff.oldType})</span>}
                        </div>
                    )}
                    {diff.newValue !== undefined && (
                        <div>
                            <span className="text-green-400 font-medium">+ </span>
                            <code className="text-green-300 bg-green-900/30 px-1 rounded">
                                {JSON.stringify(diff.newValue)}
                            </code>
                            {diff.newType && <span className="text-xs text-gray-500 ml-2">({diff.newType})</span>}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col w-full gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">JSON Prettier & Diff Tracker</h1>
            </div>

            {/* Side by side text boxes */}
            <div className="flex flex-col lg:flex-row gap-6 w-full h-[70vh]">
                {/* Main JSON Input */}
                <div className="flex flex-col flex-1 h-full">
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-mono text-zinc-500 uppercase tracking-wider">
                            JSON Editor
                        </label>
                        <div className="flex items-center gap-2">
                            {processedData.isValid && (
                                <>
                                    <button onClick={applyPrettified} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors" title="Prettify">
                                        <Sparkles size={16} />
                                    </button>
                                    <button onClick={applyCompacted} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors" title="Compact">
                                        <Minimize2 size={16} />
                                    </button>
                                    <button onClick={() => copyToClipboard(inputJson)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors" title="Copy">
                                        {copied ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                    <button onClick={setTrackingPointToCurrent} disabled={!processedData.isValid} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors" title="Set Tracking Point">
                                        <GitCompare size={16} />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex-1 relative">
                        <textarea
                            value={inputJson}
                            onChange={(e) => setInputJson(e.target.value)}
                            placeholder="Enter your JSON here..."
                            className="absolute inset-0 w-full h-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-zinc-500 font-mono text-sm resize-none text-zinc-200 placeholder-zinc-600"
                        />
                    </div>
                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg mt-2">
                            <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                            <span className="text-red-300 text-sm">{error}</span>
                        </div>
                    )}
                </div>

                {/* Tracking Point */}
                <div className="flex flex-col flex-1 h-full">
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-mono text-zinc-500 uppercase tracking-wider">
                            Tracking Point {trackingPoint ? '(Baseline)' : '(Not Set)'}
                        </label>
                        {trackingPoint && (
                            <div className="flex items-center gap-2">
                                <button onClick={clearTrackingPoint} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors" title="Clear">
                                    <RotateCcw size={16} />
                                </button>
                                <button onClick={() => copyToClipboard(trackingPoint)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors" title="Copy">
                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="flex-1 relative">
                        <textarea
                            value={trackingPoint}
                            onChange={(e) => setTrackingPoint(e.target.value)}
                            placeholder="Set a tracking point to compare changes..."
                            className="absolute inset-0 w-full h-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-zinc-500 font-mono text-sm resize-none text-zinc-200 placeholder-zinc-600"
                        />
                    </div>
                </div>
            </div>

            {/* Differences Section */}
            {trackingPoint && processedData.differences.length > 0 && (
                <div className="w-full rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-2 mb-4">
                        <GitCompare className="text-zinc-400" size={20} />
                        <h2 className="text-lg font-semibold text-white">
                            Changes Detected ({processedData.differences.length})
                        </h2>
                    </div>
                    <div className="grid gap-2">
                        {processedData.differences.map(renderDifference)}
                    </div>
                </div>
            )}

            {/* No Differences Message */}
            {trackingPoint && processedData.isValid && processedData.differences.length === 0 && (
                <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                    <div className="flex items-center gap-2 text-green-400">
                        <Check size={20} />
                        <span className="font-medium">No changes detected between tracking point and current JSON</span>
                    </div>
                </div>
            )}
        </div>
    );
};