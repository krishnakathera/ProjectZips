/** Unit economics calculator — aligned to DCP business plan */

export function calcBreakEvenDaily(fixedMonthly, avgPrice, costPerGarment, workingDays = 26) {
  const margin = avgPrice - costPerGarment
  if (margin <= 0) return Infinity
  return fixedMonthly / margin / workingDays
}

export function calcFromInputs({
  pickupPoints = 120,
  garmentsPerPoint = 40,
  garmentsPerDay = null,
  avgPrice = 80,
  costPerGarment = 50,
  fixedMonthlyCost = 4500000,
  workingDays = 26,
}) {
  const dailyGarments =
    garmentsPerDay ?? Math.round(pickupPoints * garmentsPerPoint)
  const dailyRevenue = dailyGarments * avgPrice
  const dailyVariableCost = dailyGarments * costPerGarment
  const dailyContribution = dailyRevenue - dailyVariableCost

  const monthlyRevenue = dailyRevenue * workingDays
  const monthlyVariableCost = dailyVariableCost * workingDays
  const monthlyContribution = monthlyRevenue - monthlyVariableCost
  const ebitda = monthlyContribution - fixedMonthlyCost

  const breakEvenDaily = calcBreakEvenDaily(
    fixedMonthlyCost,
    avgPrice,
    costPerGarment,
    workingDays,
  )
  const marginPerGarment = avgPrice - costPerGarment
  const marginPct = avgPrice > 0 ? (marginPerGarment / avgPrice) * 100 : 0
  const ebitdaMarginPct = monthlyRevenue > 0 ? (ebitda / monthlyRevenue) * 100 : 0
  const aboveBreakEven = dailyGarments >= breakEvenDaily
  const gapToBreakEven = dailyGarments - breakEvenDaily

  return {
    dailyGarments,
    dailyRevenue,
    dailyVariableCost,
    dailyContribution,
    monthlyRevenue,
    monthlyVariableCost,
    monthlyContribution,
    ebitda,
    breakEvenDaily,
    marginPerGarment,
    marginPct,
    ebitdaMarginPct,
    aboveBreakEven,
    gapToBreakEven,
    annualRevenue: monthlyRevenue * 12,
    annualEbitda: ebitda * 12,
  }
}

/** Generate profit curve for chart: garments/day vs monthly EBITDA */
export function generateProfitCurve({
  avgPrice,
  costPerGarment,
  fixedMonthlyCost,
  workingDays,
  minGarments = 500,
  maxGarments = 12000,
  steps = 24,
}) {
  const points = []
  const step = (maxGarments - minGarments) / steps
  for (let g = minGarments; g <= maxGarments; g += step) {
    const rounded = Math.round(g)
    const { ebitda, breakEvenDaily } = calcFromInputs({
      garmentsPerDay: rounded,
      avgPrice,
      costPerGarment,
      fixedMonthlyCost,
      workingDays,
    })
    points.push({
      garments: rounded,
      ebitda: Math.round(ebitda),
      revenue: Math.round(rounded * avgPrice * workingDays),
      costs: Math.round(rounded * costPerGarment * workingDays + fixedMonthlyCost),
      breakEven: breakEvenDaily,
    })
  }
  return points
}

export function formatINR(value) {
  if (Math.abs(value) >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`
  }
  if (Math.abs(value) >= 100000) {
    return `₹${(value / 100000).toFixed(2)} L`
  }
  return `₹${value.toLocaleString('en-IN')}`
}
