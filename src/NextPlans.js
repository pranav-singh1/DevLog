import React, { useState, useEffect } from 'react';

function NextPlans() {
    const [plan, setPlan] = useState('');
    
    // Load initial data from localStorage or use empty array
    const [plans, setPlans] = useState(() => {
        const savedPlans = localStorage.getItem('nextPlans');
        return savedPlans ? JSON.parse(savedPlans) : [];
    });

    // Save to localStorage whenever plans change
    useEffect(() => {
        localStorage.setItem('nextPlans', JSON.stringify(plans));
    }, [plans]);

    const handlePlanChange = (e) => {
        setPlan(e.target.value);
    };

    const handleAddPlan = (e) => {
        e.preventDefault();
        if (plan.trim() !== '') {
            const newPlan = {
                id: Date.now(),
                text: plan,
                priority: plans.length + 1
            };
            setPlans([...plans, newPlan]);
            setPlan('');
        }
    };

    const handleDeletePlans = () => {
        const confirmed = window.confirm("Are you sure you want to delete all plans?");
        if (confirmed) {
            setPlans([]);
        }
    };

    const movePlanUp = (index) => {
        if (index === 0) return;
        const newPlans = [...plans];
        [newPlans[index], newPlans[index - 1]] = [newPlans[index - 1], newPlans[index]];
        setPlans(newPlans);
    };

    const movePlanDown = (index) => {
        if (index === plans.length - 1) return;
        const newPlans = [...plans];
        [newPlans[index], newPlans[index + 1]] = [newPlans[index + 1], newPlans[index]];
        setPlans(newPlans);
    };

    const deletePlan = (indexToDelete) => {
        const newPlans = plans.filter((_, index) => index !== indexToDelete);
        setPlans(newPlans);
    };

    return (
        <div className="p-4 w-full">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-xl p-4 text-white">
                <h2 className="text-lg font-bold flex items-center gap-2">
                    🎯 Next Plans
                </h2>
                <p className="text-blue-100 text-sm mt-1">Plan out next steps by priority</p>
            </div>

            {/* Form Section */}
            <div className="bg-white rounded-b-xl shadow-lg p-4 border-t-4 border-blue-500">
                <form onSubmit={handleAddPlan} className="space-y-3">
                    <div>
                        <label htmlFor="plan" className="block text-xs font-medium text-gray-700 mb-1">
                            What do you want to build next?
                        </label>
                        <textarea
                            id="plan"
                            className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none text-sm"
                            rows="3"
                            placeholder="Describe your next steps..."
                            value={plan}
                            onChange={handlePlanChange}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!plan.trim()}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg text-sm"
                    >
                        Add to Next Plans ✨
                    </button>
                </form>

                {/* Plans Section */}
                {plans.length > 0 && (
                    <div className="mt-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                📚 Your Next Plans
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                    {plans.length} {plans.length === 1 ? 'plan' : 'plans'}
                                </span>
                            </h3>
                            <button
                                onClick={handleDeletePlans}
                                className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition-colors"
                            >
                                Clear All
                            </button>
                        </div>

                        <div className="space-y-3">
                            {plans.map((planItem, index) => (
                                <div
                                    key={planItem.id}
                                    className="bg-white rounded-xl p-4 shadow-md border-l-4 border-green-400 hover:shadow-lg transition-shadow duration-200"
                                >
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex items-start gap-3 flex-1">
                                            {/* Priority Number */}
                                            <div className="flex-shrink-0">
                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-800 text-sm font-bold">
                                                    #{index + 1}
                                                </span>
                                            </div>
                                            
                                            {/* Plan Text */}
                                            <div className="flex-1">
                                                <p className="text-gray-800 leading-relaxed text-sm">{planItem.text}</p>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-col gap-1">
                                            <button
                                                onClick={() => movePlanUp(index)}
                                                disabled={index === 0}
                                                className="p-1 text-gray-500 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                                                title="Move up"
                                            >
                                                ↑
                                            </button>
                                            <button
                                                onClick={() => movePlanDown(index)}
                                                disabled={index === plans.length - 1}
                                                className="p-1 text-gray-500 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                                                title="Move down"
                                            >
                                                ↓
                                            </button>
                                            <button
                                                onClick={() => deletePlan(index)}
                                                className="p-1 text-gray-500 hover:text-red-600 text-xs"
                                                title="Delete"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {plans.length === 0 && (
                    <div className="mt-8 text-center p-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                        <div className="text-4xl mb-3">📝</div>
                        <h3 className="text-lg font-medium text-gray-600 mb-2">No plans yet</h3>
                        <p className="text-gray-500">Start planning your next steps by adding your first plan above!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NextPlans;