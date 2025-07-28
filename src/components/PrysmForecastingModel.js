import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const PrysmForecastingModel = () => {
  const FORECAST_DATA = {
    'May 25': { 'EU&A': 2676, 'GC': 7654, 'Japan': 5858, 'Korea': 2871, 'Latin America': 2811, 'North America': 3086, 'SEAPAC': 4198 },
    'Jun 25': { 'EU&A': 2710, 'GC': 8096, 'Japan': 5823, 'Korea': 3408, 'Latin America': 3217, 'North America': 3001, 'SEAPAC': 4046 },
    'Jul 25': { 'EU&A': 2684, 'GC': 8071, 'Japan': 6361, 'Korea': 3117, 'Latin America': 2901, 'North America': 3100, 'SEAPAC': 4208 },
    'Aug 25': { 'EU&A': 2566, 'GC': 7265, 'Japan': 6426, 'Korea': 2847, 'Latin America': 3149, 'North America': 2919, 'SEAPAC': 4109 },
    'Sep 25': { 'EU&A': 2476, 'GC': 6896, 'Japan': 6783, 'Korea': 3024, 'Latin America': 3629, 'North America': 2716, 'SEAPAC': 4064 },
    'Oct 25': { 'EU&A': 2375, 'GC': 6405, 'Japan': 6515, 'Korea': 2551, 'Latin America': 3881, 'North America': 2497, 'SEAPAC': 3825 },
    'Nov 25': { 'EU&A': 2392, 'GC': 6427, 'Japan': 6338, 'Korea': 2160, 'Latin America': 4309, 'North America': 2341, 'SEAPAC': 3724 },
    'Dec 25': { 'EU&A': 2425, 'GC': 6031, 'Japan': 6244, 'Korea': 1975, 'Latin America': 4157, 'North America': 2291, 'SEAPAC': 3635 },
    'Jan 26': { 'EU&A': 2207, 'GC': 4612, 'Japan': 5719, 'Korea': 1820, 'Latin America': 3804, 'North America': 2022, 'SEAPAC': 3308 },
    'Feb 26': { 'EU&A': 2102, 'GC': 4168, 'Japan': 5680, 'Korea': 1711, 'Latin America': 3840, 'North America': 1854, 'SEAPAC': 2996 },
    'Mar 26': { 'EU&A': 2061, 'GC': 4225, 'Japan': 5747, 'Korea': 1891, 'Latin America': 3996, 'North America': 1771, 'SEAPAC': 3162 },
    'Apr 26': { 'EU&A': 2022, 'GC': 4317, 'Japan': 5716, 'Korea': 1785, 'Latin America': 3789, 'North America': 1686, 'SEAPAC': 3111 }
  };

  const SALES_DATA = {
    'May 25': { 'EU&A': 11682239, 'GC': 26635625, 'Japan': 14958555, 'Korea': 10949371, 'Latin America': 7891241, 'North America': 17779568, 'SEAPAC': 18594935 },
    'Jun 25': { 'EU&A': 13168848, 'GC': 32602743, 'Japan': 15870500, 'Korea': 12427313, 'Latin America': 8996433, 'North America': 14797707, 'SEAPAC': 16841034 },
    'Jul 25': { 'EU&A': 12662570, 'GC': 25430962, 'Japan': 15017441, 'Korea': 11061065, 'Latin America': 9175170, 'North America': 16221023, 'SEAPAC': 18768733 },
    'Aug 25': { 'EU&A': 11272829, 'GC': 22816411, 'Japan': 15969115, 'Korea': 10389521, 'Latin America': 9565122, 'North America': 13602176, 'SEAPAC': 16870274 },
    'Sep 25': { 'EU&A': 11415329, 'GC': 23947435, 'Japan': 16364407, 'Korea': 13906886, 'Latin America': 9846090, 'North America': 13441921, 'SEAPAC': 16485605 },
    'Oct 25': { 'EU&A': 10246444, 'GC': 20982913, 'Japan': 15140192, 'Korea': 8952865, 'Latin America': 9272962, 'North America': 12172501, 'SEAPAC': 15935546 },
    'Nov 25': { 'EU&A': 15714053, 'GC': 25087188, 'Japan': 14938196, 'Korea': 8800813, 'Latin America': 13802811, 'North America': 13365930, 'SEAPAC': 16512420 },
    'Dec 25': { 'EU&A': 11768614, 'GC': 23045099, 'Japan': 16069663, 'Korea': 8238569, 'Latin America': 9859442, 'North America': 12859431, 'SEAPAC': 16546827 },
    'Jan 26': { 'EU&A': 9585529, 'GC': 18920599, 'Japan': 13249284, 'Korea': 7970331, 'Latin America': 7953178, 'North America': 7977695, 'SEAPAC': 13979346 },
    'Feb 26': { 'EU&A': 10066497, 'GC': 19315086, 'Japan': 13570675, 'Korea': 7722133, 'Latin America': 8871324, 'North America': 8832935, 'SEAPAC': 12405957 },
    'Mar 26': { 'EU&A': 10479117, 'GC': 22416760, 'Japan': 14683931, 'Korea': 9868267, 'Latin America': 8948067, 'North America': 9293830, 'SEAPAC': 15736489 },
    'Apr 26': { 'EU&A': 10860298, 'GC': 20797347, 'Japan': 14437100, 'Korea': 7743580, 'Latin America': 8994436, 'North America': 9296550, 'SEAPAC': 14504136 }
  };

  const REGIONS = [
    { name: 'North America', retention: 65.2 },
    { name: 'Latin America', retention: 59.4 },
    { name: 'SEAPAC', retention: 48.7 },
    { name: 'EU&A', retention: 67.8 },
    { name: 'GC', retention: 54.1 },
    { name: 'Japan', retention: 81.3 },
    { name: 'Korea', retention: 72.6 }
  ];

  const FORECAST_MONTHS = [
    'May 25', 'Jun 25', 'Jul 25', 'Aug 25', 'Sep 25', 'Oct 25',
    'Nov 25', 'Dec 25', 'Jan 26', 'Feb 26', 'Mar 26', 'Apr 26'
  ];

  const [deviceSchedule, setDeviceSchedule] = useState({
    'North America': [0, 0, 0, 0, 0, 0, 300, 2000, 0, 0, 10000, 10000],
    'Latin America': [0, 0, 0, 0, 0, 0, 500, 0, 0, 3500, 0, 10000],
    'EU&A': [0, 0, 0, 0, 0, 0, 230, 0, 0, 2600, 0, 10000],
    'GC': [0, 0, 0, 0, 0, 0, 1000, 0, 1300, 0, 0, 2750],
    'Japan': [0, 0, 0, 0, 0, 0, 200, 0, 0, 0, 0, 300],
    'Korea': [0, 0, 0, 0, 0, 0, 0, 100, 0, 622, 0, 4426],
    'SEAPAC': [0, 0, 0, 0, 0, 0, 600, 3000, 0, 2000, 0, 0]
  });

  const [selectedRegion, setSelectedRegion] = useState('Global');

  const [params, setParams] = useState({
    devicePrice: 300,
    scansPerDevice: 20,
    scanConversionRate: 10,
    cannibalizationRate: 50,
    monthlySubscriptionRevenue: 140,
    subscriberToNewSLConversionRate: 5,
    subscriberToRetainedSLRate: 5
  });

  // Multi-factor adoption rates based on: 50% SCS Sales, 30% Retention, 20% Subscription Sales
  // Data source: May-June 2025 regional performance analysis with log normalization
  const REGIONAL_ADOPTION_RATES = {
    'North America': 0.538,
    'Latin America': 0.559,
    'SEAPAC': 0.483,
    'EU&A': 0.500,
    'GC': 0.569,
    'Japan': 0.771,
    'Korea': 0.462
  };

  // Regional sales leader averages (from dataset analysis)
  const REGIONAL_SL_AVERAGES = {
    'North America': { newSL: 2047, existingSL: 5065 },
    'Latin America': { newSL: 1321, existingSL: 3078 },
    'SEAPAC': { newSL: 2329, existingSL: 4665 },
    'EU&A': { newSL: 1556, existingSL: 4616 },
    'GC': { newSL: 1045, existingSL: 4002 },
    'Japan': { newSL: 735, existingSL: 2599 },
    'Korea': { newSL: 943, existingSL: 3936 }
  };

  const calculateLikelihood = (region) => region.retention;
  
  const getAdoptionRate = (regionName) => {
    return REGIONAL_ADOPTION_RATES[regionName] || 0.3;
  };

  const getFirstDeviceMonth = (regionName) => {
    return deviceSchedule[regionName].findIndex(devices => devices > 0);
  };

  const isInExcitementPeriod = (regionName, monthIndex) => {
    const firstMonth = getFirstDeviceMonth(regionName);
    if (firstMonth === -1) return false;
    const monthsSinceFirst = monthIndex - firstMonth;
    return monthsSinceFirst >= 0 && monthsSinceFirst < 3;
  };

  // Custom formatters
  const formatSalesAxis = (value) => `${value.toFixed(1)}M`;
  const formatThousandsAxis = (value) => (Math.round(value / 1000) * 1000).toLocaleString();
  const format250Axis = (value) => (Math.round(value / 250) * 250).toLocaleString();

  // Custom tick component
  const CustomYAxisTick = ({ x, y, payload }) => {
    const formattedValue = format250Axis(payload.value);
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={4} textAnchor="end" fill="#666" fontSize="12">
          {formattedValue}
        </text>
      </g>
    );
  };

  // Helper function to generate tick array for 250 increments
  const generate250Ticks = (data, field) => {
    const values = data.map(d => d[field]).filter(v => v != null);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const domainMin = 0; // Always start at 0 for count data
    const domainMax = Math.ceil((max + 250) / 250) * 250; // Round up to next 250
    
    const ticks = [];
    for (let i = domainMin; i <= domainMax; i += 250) {
      ticks.push(i);
    }
    
    return { domain: [domainMin, domainMax], ticks };
  };

  const forecastData = useMemo(() => {
    // Track temporal effects across months
    const temporalEffects = FORECAST_MONTHS.map(() => ({
      additionalSales: 0,
      additionalLeaders: 0,
      additionalNewLeaders: 0
    }));

    // Determine which regions to process
    const regionsToProcess = selectedRegion === 'Global' 
      ? REGIONS 
      : REGIONS.filter(region => region.name === selectedRegion);

    // First pass: calculate temporal impacts
    FORECAST_MONTHS.forEach((month, monthIndex) => {
      regionsToProcess.forEach(region => {
        const expectedLeaders = FORECAST_DATA[month][region.name] || 0;
        const devicesAvailable = deviceSchedule[region.name][monthIndex] || 0;

        if (devicesAvailable > 0 && expectedLeaders > 0) {
          const baseAdoptionRate = getAdoptionRate(region.name);
          
          const excitementMultiplier = isInExcitementPeriod(region.name, monthIndex) ? 2.5 : 1.0;
          const maxAdoption = isInExcitementPeriod(region.name, monthIndex) ? 0.95 : 0.8;
          const finalAdoptionRate = Math.min(baseAdoptionRate * excitementMultiplier, maxAdoption);
          
          const deviceDemand = Math.round(expectedLeaders * finalAdoptionRate);
          const devicesSold = Math.min(deviceDemand, devicesAvailable);

          if (devicesSold > 0) {
            const totalScans = devicesSold * params.scansPerDevice;
            const newSubscribers = Math.round(totalScans * (params.scanConversionRate / 100));
            
            const newSLFromSubscribers = Math.round(newSubscribers * (params.subscriberToNewSLConversionRate / 100));
            const retainedSLFromSubscribers = Math.round(newSubscribers * (params.subscriberToRetainedSLRate / 100));
            
            // Apply temporal effects for new SLs (4 months)
            if (newSLFromSubscribers > 0) {
              // Month 1: New SL sales
              if (monthIndex < FORECAST_MONTHS.length) {
                temporalEffects[monthIndex].additionalSales += newSLFromSubscribers * REGIONAL_SL_AVERAGES[region.name].newSL;
                temporalEffects[monthIndex].additionalLeaders += newSLFromSubscribers;
                temporalEffects[monthIndex].additionalNewLeaders += newSLFromSubscribers;
              }
              
              // Months 2-4: Existing SL sales
              for (let i = 1; i <= 3; i++) {
                const futureMonth = monthIndex + i;
                if (futureMonth < FORECAST_MONTHS.length) {
                  temporalEffects[futureMonth].additionalSales += newSLFromSubscribers * REGIONAL_SL_AVERAGES[region.name].existingSL;
                  temporalEffects[futureMonth].additionalLeaders += newSLFromSubscribers;
                }
              }
            }
            
            // Apply temporal effects for retained SLs (1 month)
            if (retainedSLFromSubscribers > 0) {
              const nextMonth = monthIndex + 1;
              if (nextMonth < FORECAST_MONTHS.length) {
                temporalEffects[nextMonth].additionalSales += retainedSLFromSubscribers * REGIONAL_SL_AVERAGES[region.name].existingSL;
                temporalEffects[nextMonth].additionalLeaders += retainedSLFromSubscribers;
              }
            }
          }
        }
      });
    });

    // Second pass: generate final forecast data
    return FORECAST_MONTHS.map((month, monthIndex) => {
      let totalExpectedLeaders = 0;
      let totalExpectedSales = 0;
      let totalPrysmDevicesSold = 0;
      let totalPrysmDeviceRevenue = 0;
      let totalPrysmSubRevenue = 0;
      let totalPrysmAdditionalSales = 0;

      regionsToProcess.forEach(region => {
        const expectedLeaders = FORECAST_DATA[month][region.name] || 0;
        const expectedSales = SALES_DATA[month][region.name] || 0;
        const devicesAvailable = deviceSchedule[region.name][monthIndex] || 0;

        totalExpectedLeaders += expectedLeaders;
        totalExpectedSales += expectedSales;

        if (devicesAvailable > 0 && expectedLeaders > 0) {
          const baseAdoptionRate = getAdoptionRate(region.name);
          
          const excitementMultiplier = isInExcitementPeriod(region.name, monthIndex) ? 2.5 : 1.0;
          const maxAdoption = isInExcitementPeriod(region.name, monthIndex) ? 0.95 : 0.8;
          const finalAdoptionRate = Math.min(baseAdoptionRate * excitementMultiplier, maxAdoption);
          
          const deviceDemand = Math.round(expectedLeaders * finalAdoptionRate);
          const devicesSold = Math.min(deviceDemand, devicesAvailable);

          totalPrysmDevicesSold += devicesSold;
          totalPrysmDeviceRevenue += devicesSold * params.devicePrice;

          const totalScans = devicesSold * params.scansPerDevice;
          const newSubscribers = Math.round(totalScans * (params.scanConversionRate / 100));
          const remainingMonths = 12 - monthIndex;
          totalPrysmSubRevenue += newSubscribers * params.monthlySubscriptionRevenue * remainingMonths;

          const gsv = expectedSales / expectedLeaders;
          totalPrysmAdditionalSales += devicesSold * gsv * 0.1;
        }
      });

      const temporalSales = temporalEffects[monthIndex].additionalSales;
      const temporalLeaders = temporalEffects[monthIndex].additionalLeaders;
      const temporalNewLeaders = temporalEffects[monthIndex].additionalNewLeaders;

      // Apply Cannibalization to Device, Subscription, and Product sales only (NOT temporal sales)
      const cannibalizedDevice = totalPrysmDeviceRevenue * (1 - params.cannibalizationRate / 100);
      const cannibalizedSub = totalPrysmSubRevenue * (1 - params.cannibalizationRate / 100);
      const cannibalizedAdd = totalPrysmAdditionalSales * (1 - params.cannibalizationRate / 100);
      
      const totalSalesWithPrysm = totalExpectedSales + cannibalizedDevice + cannibalizedSub + cannibalizedAdd + temporalSales;
      
      const additionalLeadersFromDevices = Math.round(totalPrysmDevicesSold * 0.1);
      const totalLeadersWithPrysm = totalExpectedLeaders + additionalLeadersFromDevices + temporalLeaders;
      
      const baseNewLeaders = Math.round(totalExpectedLeaders * 0.115);
      const enhancedNewLeaders = Math.round(additionalLeadersFromDevices * 0.15);
      const totalNewLeadersWithPrysm = baseNewLeaders + enhancedNewLeaders + temporalNewLeaders;

      // Total Incremental Sales includes: Device + Subs + Product + New SL + Retained SL sales
      const totalIncrementalSales = cannibalizedDevice + cannibalizedSub + cannibalizedAdd + temporalSales;

      return {
        month,
        expectedSales: totalExpectedSales / 1000000,
        expectedLeaders: totalExpectedLeaders,
        expectedNewLeaders: baseNewLeaders,
        expectedGSV: totalExpectedLeaders > 0 ? totalExpectedSales / totalExpectedLeaders : 0,
        totalSalesWithPrysm: totalSalesWithPrysm / 1000000,
        totalLeadersWithPrysm: totalLeadersWithPrysm,
        totalNewLeadersWithPrysm: totalNewLeadersWithPrysm,
        averageGSVWithPrysm: totalLeadersWithPrysm > 0 ? totalSalesWithPrysm / totalLeadersWithPrysm : 0,
        prysmDevicesSold: totalPrysmDevicesSold,
        prysmDeviceRevenue: cannibalizedDevice / 1000000,
        prysmSubRevenue: cannibalizedSub / 1000000,
        prysmAdditionalSales: cannibalizedAdd / 1000000,
        totalPrysmRevenue: (cannibalizedDevice + cannibalizedSub + cannibalizedAdd) / 1000000,
        totalIncrementalSales: totalIncrementalSales / 1000000,
        temporalSales: temporalSales / 1000000
      };
    });
  }, [deviceSchedule, params, selectedRegion]);

  const summaryMetrics = useMemo(() => {
    const deviceRevenue = forecastData.reduce((sum, month) => sum + month.prysmDeviceRevenue, 0);
    const subscriptionRevenue = forecastData.reduce((sum, month) => sum + month.prysmSubRevenue, 0);
    const additionalSales = forecastData.reduce((sum, month) => sum + month.prysmAdditionalSales, 0);
    
    return {
      deviceRevenue,
      subscriptionRevenue,
      additionalSales,
      totalPrysmImpact: deviceRevenue + subscriptionRevenue + additionalSales
    };
  }, [forecastData]);

  const updateDeviceSchedule = (region, monthIndex, value) => {
    const validatedValue = Math.max(0, parseInt(value) || 0);
    setDeviceSchedule(prev => ({
      ...prev,
      [region]: prev[region].map((val, idx) => idx === monthIndex ? validatedValue : val)
    }));
  };

  const updateParam = (key, value) => {
    setParams(prev => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Prysm Device Launch Forecasting Model</h1>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Region:</label>
        <select 
          value={selectedRegion} 
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Global">Global (All Regions)</option>
          {REGIONS.map(region => (
            <option key={region.name} value={region.name}>{region.name}</option>
          ))}
        </select>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-gray-600">Device Revenue</h3>
          <p className="text-2xl font-bold text-green-600">${summaryMetrics.deviceRevenue.toFixed(1)}M</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-gray-600">Subscription Revenue</h3>
          <p className="text-2xl font-bold text-purple-600">${summaryMetrics.subscriptionRevenue.toFixed(1)}M</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-gray-600">Incremental Product Sales</h3>
          <p className="text-2xl font-bold text-orange-600">${summaryMetrics.additionalSales.toFixed(1)}M</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-gray-600">Total Prysm Impact</h3>
          <p className="text-2xl font-bold text-indigo-600">${summaryMetrics.totalPrysmImpact.toFixed(1)}M</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Total Sales</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={forecastData}>
              <XAxis dataKey="month" tick={{fontSize: 12}} />
              <YAxis 
                tick={{fontSize: 12}} 
                domain={['dataMin - 5', 'dataMax + 5']}
                tickFormatter={formatSalesAxis}
                width={35}
              />
              <Tooltip formatter={(value) => [`$${value.toFixed(1)}M`, '']} />
              <Legend wrapperStyle={{fontSize: '8px'}} />
              <Line type="monotone" dataKey="expectedSales" stroke="#8884d8" strokeWidth={2} name="Baseline Forecast Sales" />
              <Line type="monotone" dataKey="totalSalesWithPrysm" stroke="#82ca9d" strokeWidth={2} name="Sales With Prysm" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Sales Leader Counts</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={forecastData}>
              <XAxis dataKey="month" tick={{fontSize: 12}} />
              <YAxis 
                tick={{fontSize: 12}} 
                domain={['dataMin - 500', 'dataMax + 500']}
                tickFormatter={formatThousandsAxis}
                width={40}
              />
              <Tooltip formatter={(value) => [`${value.toLocaleString()} leaders`, '']} />
              <Legend wrapperStyle={{fontSize: '8px'}} />
              <Line type="monotone" dataKey="expectedLeaders" stroke="#8884d8" strokeWidth={2} name="Baseline SL Forecast" />
              <Line type="monotone" dataKey="totalLeadersWithPrysm" stroke="#82ca9d" strokeWidth={2} name="SL Count With Prysm" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">New Sales Leader Counts</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={forecastData}>
              <XAxis dataKey="month" tick={{fontSize: 12}} />
              <YAxis 
                domain={generate250Ticks(forecastData, 'expectedNewLeaders').domain}
                ticks={generate250Ticks(forecastData, 'expectedNewLeaders').ticks}
                tick={<CustomYAxisTick />}
                width={40}
              />
              <Tooltip formatter={(value) => [`${value.toLocaleString()} new leaders`, '']} />
              <Legend wrapperStyle={{fontSize: '8px'}} />
              <Line type="monotone" dataKey="expectedNewLeaders" stroke="#8884d8" strokeWidth={2} name="Baseline New SL Forecast" />
              <Line type="monotone" dataKey="totalNewLeadersWithPrysm" stroke="#82ca9d" strokeWidth={2} name="New SL Count With Prysm" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Total Incremental Sales Chart</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={forecastData}>
              <XAxis dataKey="month" tick={{fontSize: 12}} />
              <YAxis 
                tick={{fontSize: 12}}
                tickFormatter={formatSalesAxis}
                width={35}
              />
              <Tooltip formatter={(value) => [`${value.toFixed(1)}M`, '']} />
              <Legend wrapperStyle={{fontSize: '8px'}} />
              <Line 
                type="monotone" 
                dataKey="totalIncrementalSales" 
                stroke="#f59e0b" 
                strokeWidth={2} 
                name="Total Incremental Sales" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Device Sold Count</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={forecastData}>
              <XAxis dataKey="month" tick={{fontSize: 12}} />
              <YAxis 
                domain={generate250Ticks(forecastData.map(month => ({
                  ...month,
                  incrementalRetainedSLs: month.totalLeadersWithPrysm - month.expectedLeaders,
                  incrementalNewSLs: month.totalNewLeadersWithPrysm - month.expectedNewLeaders
                })), 'incrementalRetainedSLs').domain}
                ticks={generate250Ticks(forecastData.map(month => ({
                  ...month,
                  incrementalRetainedSLs: month.totalLeadersWithPrysm - month.expectedLeaders,
                  incrementalNewSLs: month.totalNewLeadersWithPrysm - month.expectedNewLeaders
                })), 'incrementalRetainedSLs').ticks}
                tick={<CustomYAxisTick />}
                width={40}
              />
              <Tooltip formatter={(value) => [`${value.toLocaleString()} devices`, '']} />
              <Legend wrapperStyle={{fontSize: '8px'}} />
              <Line type="monotone" dataKey="prysmDevicesSold" stroke="#ff7300" strokeWidth={2} name="Devices Sold" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Incremental SL's</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={forecastData.map(month => ({
              ...month,
              incrementalRetainedSLs: month.totalLeadersWithPrysm - month.expectedLeaders,
              incrementalNewSLs: month.totalNewLeadersWithPrysm - month.expectedNewLeaders
            }))}>
              <XAxis dataKey="month" tick={{fontSize: 12}} />
              <YAxis 
                domain={generate250Ticks(forecastData.map(month => ({
                  ...month,
                  incrementalRetainedSLs: month.totalLeadersWithPrysm - month.expectedLeaders,
                  incrementalNewSLs: month.totalNewLeadersWithPrysm - month.expectedNewLeaders
                })), 'incrementalRetainedSLs').domain}
                ticks={generate250Ticks(forecastData.map(month => ({
                  ...month,
                  incrementalRetainedSLs: month.totalLeadersWithPrysm - month.expectedLeaders,
                  incrementalNewSLs: month.totalNewLeadersWithPrysm - month.expectedNewLeaders
                })), 'incrementalRetainedSLs').ticks}
                tick={<CustomYAxisTick />}
                width={40}
              />
              <Tooltip formatter={(value) => [`${value.toLocaleString()} leaders`, '']} />
              <Legend wrapperStyle={{fontSize: '8px'}} />
              <Line type="monotone" dataKey="incrementalRetainedSLs" stroke="#8b5cf6" strokeWidth={2} name="Incremental Retained SLs" />
              <Line type="monotone" dataKey="incrementalNewSLs" stroke="#f59e0b" strokeWidth={2} name="Incremental New SLs" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-white p-3 rounded-lg shadow">
          <h3 className="text-md font-semibold mb-3">Sales With Prysm</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-1 text-left">Month</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">Total ($M)</th>
                </tr>
              </thead>
              <tbody>
                {forecastData.map((month) => (
                  <tr key={month.month}>
                    <td className="border border-gray-300 px-2 py-1 font-medium">{month.month}</td>
                    <td className="border border-gray-300 px-2 py-1 text-center">${month.totalSalesWithPrysm.toFixed(1)}M</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-1 text-xs text-gray-600">
            Baseline sales + all Prysm revenue streams
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg shadow">
          <h3 className="text-md font-semibold mb-3">Total Incremental Sales</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-1 text-left">Month</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">Total ($M)</th>
                </tr>
              </thead>
              <tbody>
                {forecastData.map((month) => (
                  <tr key={month.month}>
                    <td className="border border-gray-300 px-2 py-1 font-medium">{month.month}</td>
                    <td className="border border-gray-300 px-2 py-1 text-center">${month.totalIncrementalSales.toFixed(1)}M</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-1 text-xs text-gray-600">
            Device + Subs + Product + New SL + Retained SL sales
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg shadow">
          <h3 className="text-md font-semibold mb-3">Sales Leader Counts</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-1 text-left">Month</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">Leaders</th>
                </tr>
              </thead>
              <tbody>
                {forecastData.map((month) => (
                  <tr key={month.month}>
                    <td className="border border-gray-300 px-2 py-1 font-medium">{month.month}</td>
                    <td className="border border-gray-300 px-2 py-1 text-center">{month.totalLeadersWithPrysm.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-1 text-xs text-gray-600">
            From "SL Count With Prysm" chart
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg shadow">
          <h3 className="text-md font-semibold mb-3">New Sales Leader Count</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-1 text-left">Month</th>
                  <th className="border border-gray-300 px-2 py-1 text-center">New Leaders</th>
                </tr>
              </thead>
              <tbody>
                {forecastData.map((month) => (
                  <tr key={month.month}>
                    <td className="border border-gray-300 px-2 py-1 font-medium">{month.month}</td>
                    <td className="border border-gray-300 px-2 py-1 text-center">{month.totalNewLeadersWithPrysm.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-1 text-xs text-gray-600">
            From "New SL Count With Prysm" chart
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-3">Device Utilization Rates by Month</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-1 text-left">Month</th>
                <th className="border border-gray-300 px-2 py-1 text-center">Available</th>
                <th className="border border-gray-300 px-2 py-1 text-center">Demand</th>
                <th className="border border-gray-300 px-2 py-1 text-center">Sold</th>
                <th className="border border-gray-300 px-2 py-1 text-center">Util %</th>
              </tr>
            </thead>
            <tbody>
              {forecastData.map((month, index) => {
                const regionsToCheck = selectedRegion === 'Global' 
                  ? REGIONS 
                  : REGIONS.filter(region => region.name === selectedRegion);
                  
                const available = selectedRegion === 'Global'
                  ? Object.values(deviceSchedule).reduce((sum, schedule) => sum + schedule[index], 0)
                  : deviceSchedule[selectedRegion][index];
                
                let totalDemand = 0;
                regionsToCheck.forEach(region => {
                  const expectedLeaders = FORECAST_DATA[month.month][region.name] || 0;
                  const baseAdoptionRate = getAdoptionRate(region.name);
                  
                  const excitementMultiplier = isInExcitementPeriod(region.name, index) ? 2.5 : 1.0;
                  const maxAdoption = isInExcitementPeriod(region.name, index) ? 0.95 : 0.8;
                  const finalAdoptionRate = Math.min(baseAdoptionRate * excitementMultiplier, maxAdoption);
                  
                  totalDemand += Math.round(expectedLeaders * finalAdoptionRate);
                });
                
                const sold = month.prysmDevicesSold;
                const utilization = available > 0 ? (sold / available) * 100 : 0;
                
                let utilizationColor = 'text-green-600';
                if (utilization >= 80) utilizationColor = 'text-yellow-600';
                if (sold >= available && available > 0) utilizationColor = 'text-red-600';
                
                return (
                  <tr key={month.month}>
                    <td className="border border-gray-300 px-2 py-1 font-medium">{month.month}</td>
                    <td className="border border-gray-300 px-2 py-1 text-center">{available.toLocaleString()}</td>
                    <td className="border border-gray-300 px-2 py-1 text-center">{totalDemand.toLocaleString()}</td>
                    <td className="border border-gray-300 px-2 py-1 text-center">{sold.toLocaleString()}</td>
                    <td className={`border border-gray-300 px-2 py-1 text-center font-semibold ${utilizationColor}`}>
                      {utilization.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-2 text-xs text-gray-600">
          <span className="text-red-600">■ Red: Sold out</span> | 
          <span className="text-yellow-600"> Yellow: High util</span> | 
          <span className="text-green-600"> Green: Available</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <details className="group">
          <summary className="cursor-pointer list-none select-none">
            <div className="flex items-center text-lg font-semibold text-gray-800 hover:text-blue-600">
              <span className="inline-block transition-transform duration-200 group-open:rotate-90 mr-2">▶</span>
              User Inputs
            </div>
          </summary>
          
          <div className="mt-6 space-y-6">
            <div>
              <h4 className="text-md font-semibold mb-4 text-gray-700">Device Availability Schedule</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-3 py-2 text-left">Region</th>
                      {FORECAST_MONTHS.map((month, index) => (
                        <th key={index} className="border border-gray-300 px-2 py-2 text-center text-xs">{month}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {REGIONS.map((region) => (
                      <tr key={region.name}>
                        <td className="border border-gray-300 px-3 py-2 font-medium text-sm">{region.name}</td>
                        {FORECAST_MONTHS.map((month, monthIndex) => (
                          <td key={monthIndex} className="border border-gray-300 px-1 py-1">
                            <input
                              type="number"
                              min="0"
                              value={deviceSchedule[region.name][monthIndex]}
                              onChange={(e) => updateDeviceSchedule(region.name, monthIndex, e.target.value)}
                              className="w-full px-1 py-1 border-0 text-center text-xs focus:outline-none focus:bg-blue-50"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 className="text-md font-semibold mb-4 text-gray-700">Model Parameters</h4>
              <div className="grid grid-cols-4 gap-3 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Device Price ($)</label>
                  <input
                    type="number"
                    value={params.devicePrice}
                    onChange={(e) => updateParam('devicePrice', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Scans/Device</label>
                  <input
                    type="number"
                    value={params.scansPerDevice}
                    onChange={(e) => updateParam('scansPerDevice', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subs Conversion Rate (%)</label>
                  <input
                    type="number"
                    value={params.scanConversionRate}
                    onChange={(e) => updateParam('scanConversionRate', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Subs Value ($)</label>
                  <input
                    type="number"
                    value={params.monthlySubscriptionRevenue}
                    onChange={(e) => updateParam('monthlySubscriptionRevenue', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subs to New SL Conversion Rate (%)</label>
                  <input
                    type="number"
                    value={params.subscriberToNewSLConversionRate}
                    onChange={(e) => updateParam('subscriberToNewSLConversionRate', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subs to Retained SL Rate (%)</label>
                  <input
                    type="number"
                    value={params.subscriberToRetainedSLRate}
                    onChange={(e) => updateParam('subscriberToRetainedSLRate', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cannibalization (%)</label>
                  <input
                    type="number"
                    value={params.cannibalizationRate}
                    onChange={(e) => updateParam('cannibalizationRate', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </details>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <details className="group">
          <summary className="cursor-pointer list-none select-none">
            <div className="flex items-center text-lg font-semibold text-gray-800 hover:text-blue-600">
              <span className="inline-block transition-transform duration-200 group-open:rotate-90 mr-2">▶</span>
              Appendix Charts
            </div>
          </summary>
          
          <div className="mt-6 space-y-6">
            <div>
              <h4 className="text-md font-semibold mb-4 text-gray-700">Average Group Sales (USD)</h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={forecastData}>
                  <XAxis dataKey="month" tick={{fontSize: 12}} />
                  <YAxis 
                    domain={generate250Ticks(forecastData, 'expectedGSV').domain}
                    ticks={generate250Ticks(forecastData, 'expectedGSV').ticks}
                    tick={<CustomYAxisTick />}
                    width={40}
                  />
                  <Tooltip formatter={(value) => [`${Math.round(value).toLocaleString()} per leader`, '']} />
                      <Legend wrapperStyle={{fontSize: '8px'}} />
                  <Line type="monotone" dataKey="expectedGSV" stroke="#8884d8" strokeWidth={2} name="Expected GSV" />
                  <Line type="monotone" dataKey="averageGSVWithPrysm" stroke="#82ca9d" strokeWidth={2} name="GSV with Prysm" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h4 className="text-md font-semibold mb-4 text-gray-700">Regional Adoption Rates</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-3 py-2 text-left">Region</th>
                      <th className="border border-gray-300 px-3 py-2 text-center">Adoption Rate</th>
                      <th className="border border-gray-300 px-3 py-2 text-center">Primary Factor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-medium">Japan</td>
                      <td className="border border-gray-300 px-3 py-2 text-center font-semibold text-green-600">77.1%</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-xs">High SCS + Retention</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-medium">GC</td>
                      <td className="border border-gray-300 px-3 py-2 text-center font-semibold text-green-600">56.9%</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-xs">Massive Subscription Sales</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-medium">Latin America</td>
                      <td className="border border-gray-300 px-3 py-2 text-center font-semibold text-blue-600">55.9%</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-xs">Excellent SCS Sales</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-medium">North America</td>
                      <td className="border border-gray-300 px-3 py-2 text-center font-semibold">53.8%</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-xs">Balanced Performance</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-medium">EU&A</td>
                      <td className="border border-gray-300 px-3 py-2 text-center font-semibold">50.0%</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-xs">Average Across Factors</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-medium">SEAPAC</td>
                      <td className="border border-gray-300 px-3 py-2 text-center font-semibold text-blue-600">48.3%</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-xs">Better Than Retention Only</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 font-medium">Korea</td>
                      <td className="border border-gray-300 px-3 py-2 text-center font-semibold text-red-600">46.2%</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-xs">Weak SCS Sales Hurt</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-2 text-xs text-gray-600">
                Multi-factor analysis: 50% SCS Sales + 30% Retention + 20% Subscription Sales. 
                Data from May-June 2025 with log normalization for right-skewed sales distributions.
              </div>
            </div>
          </div>
        </details>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Model Notes - How It Works</h3>
        <div className="text-sm text-gray-700 space-y-3">
          <div>
            <strong>Baseline Integration:</strong> Uses real business forecast data (May 2025 - Apr 2026) showing natural decline from 30,301 to 22,426 leaders. Prysm impact is calculated incrementally on top of this baseline.
          </div>
          <div>
            <strong>Regional Adoption:</strong> Each region has different adoption rates based on multi-factor analysis: 50% Scanner Certified Supplement (SCS) sales, 30% retention performance, 20% subscription sales. Data normalized using log transformation to handle right-skewed sales distributions. Japan leads at 77.1%, followed by GC at 56.9%.
          </div>
          <div>
            <strong>Excitement Period:</strong> First 3 months after device launch in each region get 2.5x adoption multiplier (capped at 95%). This models initial enthusiasm and FOMO effects.
          </div>
          <div>
            <strong>Revenue Streams:</strong> (1) Device sales - cannibalized at 50%, (2) Subscription revenue - monthly recurring from scans, cannibalized at 50%, (3) Product sales - 10% performance boost from device users, cannibalized at 50%, (4) New SL sales - temporal effects from subscribers becoming new sales leaders, NOT cannibalized, (5) Retained SL sales - temporal effects from subscribers helping retain existing leaders, NOT cannibalized.
          </div>
          <div>
            <strong>Temporal Sales Leader Effects:</strong> Subscribers who become sales leaders generate regional-specific sales over time: New SLs get 4 months of sales (month 1 at new SL rate, months 2-4 at existing SL rate). Retained SLs get 1 additional month of existing SL sales.
          </div>
          <div>
            <strong>Supply Constraints:</strong> Device demand can exceed supply. Utilization table shows supply/demand balance with color coding (red: sold out, yellow: high utilization, green: available capacity).
          </div>
          <div>
            <strong>Cannibalization:</strong> 50% default rate applied to device, subscription, and product revenue, representing the portion that replaces existing business rather than creating net new revenue.
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold mb-2 text-blue-800">Real Business Forecast Integration</h3>
        <div className="text-sm text-blue-700">
          <p><strong>Data Source:</strong> Comprehensive business model with seasonal patterns and business shocks</p>
          <p><strong>Baseline:</strong> June 2025: 30,301 leaders, $114.7M sales → April 2026: 22,426 leaders (-26.3% decline)</p>
          <p><strong>Model Confidence:</strong> High confidence in baseline data, medium confidence in adoption rates and performance improvements</p>
        </div>
      </div>
    </div>
  );
};

export default PrysmForecastingModel;
