# Calculator of Waste Energy emissions based on Australian National Greenhouse Account Factors 2022


# Solid Waste - weight known
def solid(Q, EF):
    solid_e = Q * EF
    return solid_e

# Solid Waste - weight unknown


def solid_unknown(n, m, CF, EF):
    solid_e = n * m * CF * EF
    return solid_e


# Example 8 - 140t Food, 50t Paper, 10t Garden and 40t Inert Waste
Q = [140, 50, 10, 40]
EF = [2.1, 3.3, 1.6, 0.0]
Q_EF = [Q[i] * EF[i] for i in range(len(Q))]  # Multiply each element

print("Total Greenhouse Gas Emissions from Example 8 (t CO2e): ", sum(Q_EF))

# Example 9 - Commercial and industrial waste
ex_9 = solid(1000, 1.3)
print("Total Greenhouse Gas Emissions from Example 9 (t CO2e): ", ex_9)

# Example 10 - 24 collections of 3m3
ex_10 = solid_unknown(24, 3, 0.5, 2.1)
print("Total Greenhouse Gas Emissions from Example 10 (t CO2e): ", ex_10)

# Waste water treatment


def wastewater(P, EF):
    waste_e = P * EF
    return waste_e


ex_11 = wastewater(20000, 0.3276)
print("Total Greenhouse Gas Emissions from Example 11 (t CO2e): ", ex_11)

# Waste incineration


def incineration(Q, EF):
    waste_e = Q * EF
    return waste_e


ex_12 = incineration(2, 0.879)
print("Total Greenhouse Gas Emissions from Example 12 (t CO2e): ", ex_12)

# Composting and anaerobic digestion


def compost(Q, EF, R):
    waste_e = Q * EF - R
    return waste_e


ex_13 = compost(0.13, 0.046, 0)
print("Total Greenhouse Gas Emissions from Example 13    (t CO2e): ", ex_13)
