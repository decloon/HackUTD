CREATE TABLE property_metrics (
    id SERIAL PRIMARY KEY,
    month VARCHAR(50),
    location VARCHAR(255),
    size_sqft INTEGER,
    total_expense NUMERIC,
    electricity_bill NUMERIC,
    electricity_usage NUMERIC,
    water_bill NUMERIC,
    water_usage NUMERIC,
    waste_produced NUMERIC,
    percent_waste_recycled NUMERIC,
    hvac_expenses NUMERIC,
    lighting_expenses NUMERIC,
    ghg_emissions NUMERIC
);