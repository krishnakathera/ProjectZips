const PLANT = { lat: 17.2092, lng: 78.4764 }

/** Haversine distance in km */
export function distanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

/** Road distance estimate (~1.35× straight line for Hyderabad ORR routes) */
export function roadDistanceKm(straightKm) {
  return Math.round(straightKm * 1.35 * 10) / 10
}

/** Drive time at avg 60 km/h (ORR / expressway corridor) */
export function driveTimeMin(roadKm) {
  return Math.round((roadKm / 60) * 60)
}

export function getPlantCoords() {
  return PLANT
}

export function enrichLocation(feature) {
  const [lng, lat] = feature.geometry.coordinates
  const straight = distanceKm(PLANT.lat, PLANT.lng, lat, lng)
  const roadKm = roadDistanceKm(straight)
  const driveMin = driveTimeMin(roadKm)
  return {
    ...feature,
    properties: {
      ...feature.properties,
      distanceStraightKm: Math.round(straight * 10) / 10,
      distanceRoadKm: roadKm,
      driveTimeMin: driveMin,
    },
  }
}

export const LOCATION_META = {
  'flag-001': {
    incomeTier: 'Premium–IT',
    avgHouseholdIncome: '₹1.2L–2.5L/mo',
    visibility: 'High — AIG/KIMS hospital + IT corridor',
    anchors: ['AIG Hospitals', 'KIMS Gachibowli', '300+ PG/hostels'],
  },
  'flag-002': {
    incomeTier: 'Premium–IT',
    avgHouseholdIncome: '₹1L–2.2L/mo',
    visibility: 'Highest — HITEC City core footfall',
    anchors: ['Raheja Mindspace', 'Inorbit Mall', 'The Hosteller HITEC'],
  },
  'flag-003': {
    incomeTier: 'Upper-middle',
    avgHouseholdIncome: '₹90k–1.8L/mo',
    visibility: 'High — medical + residential hub',
    anchors: ['KIMS Kondapur', 'Care Hospital', 'Apollo Cradle'],
  },
  'flag-004': {
    incomeTier: 'Elite corporate',
    avgHouseholdIncome: '₹1.5L–3.5L/mo',
    visibility: 'Premium — Nanakramguda towers',
    anchors: ['Google / Microsoft campuses', 'Continental Hospital', 'My Home Avatar'],
  },
  'flag-005': {
    incomeTier: 'Mass-premium',
    avgHouseholdIncome: '₹45k–95k/mo',
    visibility: 'High density — metro + middle class',
    anchors: ['KPHB Metro', 'JNTU student belt', '500+ apartments'],
  },
  'flag-006': {
    incomeTier: 'Elite',
    avgHouseholdIncome: '₹2L–5L+/mo',
    visibility: 'Premium lifestyle corridor',
    anchors: ['Jubilee Hills Checkpost', 'Film Nagar', 'Designer retail zone'],
  },
  'flag-007': {
    incomeTier: 'Mass / student',
    avgHouseholdIncome: '₹25k–50k/mo',
    visibility: 'High volume — Osmania University belt',
    anchors: ['Osmania Medical College', 'Afzalgunj hostels', 'Nayapul market'],
  },
  'flag-008': {
    incomeTier: 'Middle — airport corridor',
    avgHouseholdIncome: '₹35k–75k/mo',
    visibility: 'Airport + hotel staff hub',
    anchors: ['RGIA Terminal', 'GMR Aero City', 'Hotel clusters'],
  },
  'add-001': {
    incomeTier: 'Premium residential',
    avgHouseholdIncome: '₹1L–2L/mo',
    nearbyCommunities: ['My Home Bhooja', 'Aparna CyberZon', 'Rajapushpa Atria'],
  },
  'add-002': {
    incomeTier: 'Upper-middle villas',
    avgHouseholdIncome: '₹80k–1.5L/mo',
    nearbyCommunities: ['SMR Vinay Iconia', 'Aditya Capitol Heights', 'Villa plots ORR west'],
  },
  'add-003': {
    incomeTier: 'Upper-middle gated',
    avgHouseholdIncome: '₹75k–1.4L/mo',
    nearbyCommunities: ['Prestige High Fields', 'Gated villas Narsingi', 'Aparna Senor Valley'],
  },
  'add-004': {
    incomeTier: 'Mass-premium',
    avgHouseholdIncome: '₹50k–90k/mo',
    nearbyCommunities: ['SMR Vinay Galaxy', 'Praneeth Pranav Iva', '300+ apartment blocks'],
  },
  'add-005': {
    incomeTier: 'Middle–upper',
    avgHouseholdIncome: '₹60k–1.1L/mo',
    nearbyCommunities: ['Alkapur Township', 'Green Valley Layout', 'Shaikpet spillover'],
  },
  'add-006': {
    incomeTier: 'IT workforce',
    avgHouseholdIncome: '₹40k–80k/mo',
    nearbyCommunities: ['TCS Adibatla SEZ PGs', 'TATA Aerospace housing', 'Sark Green Homes'],
  },
  'add-007': {
    incomeTier: 'Middle villa',
    avgHouseholdIncome: '₹55k–1L/mo',
    nearbyCommunities: ['Risinia Skyon', 'Gothic Homes', 'Villa communities Bachupally'],
  },
  'add-008': {
    incomeTier: 'Mass-premium',
    avgHouseholdIncome: '₹50k–85k/mo',
    nearbyCommunities: ['Aparna Sarovar', 'Ramky One Kosmos', 'Chandanagar metro belt'],
  },
  'add-009': {
    incomeTier: 'Middle — student mix',
    avgHouseholdIncome: '₹45k–80k/mo',
    nearbyCommunities: ['Nizampet housing colonies', 'JNTU-adjacent PGs', 'Gated apartments'],
  },
  'add-010': {
    incomeTier: 'Suburban rising',
    avgHouseholdIncome: '₹40k–70k/mo',
    nearbyCommunities: ['Vishal Sanjivini villas', 'Vertex Viraat', 'Local gated plots'],
  },
  'add-011': {
    incomeTier: 'Industrial corridor',
    avgHouseholdIncome: '₹35k–65k/mo',
    nearbyCommunities: ['Maheshwaram EMC housing', 'SEZ worker quarters', 'New townships'],
  },
  'add-012': {
    incomeTier: 'Future growth',
    avgHouseholdIncome: '₹30k–55k/mo',
    nearbyCommunities: ['Pharma City worker housing', 'Future City plots', 'Amazon DC vicinity'],
  },
}
