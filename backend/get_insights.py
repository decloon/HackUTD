import pandas as pd
import numpy as np

# Load the user's building data (monthly values)
user_data_file = 'temp.csv'
user_data = pd.read_csv(user_data_file)

# Load the dataset of other buildings (annual totals)
similar_buildings_file = 'market_data.csv'
similar_buildings_data = pd.read_csv(similar_buildings_file)

# Step 1: Process user's building data to calculate totals
user_totals = pd.DataFrame({
    'size_sqft': user_data['size_sqft'].iloc[0],
    'total_expense': user_data['total_expense'].sum(),
    'electricity_bill': user_data['electricity_bill'].sum(),
    'electricity_usage': user_data['electricity_usage'].sum(),
    'water_bill': user_data['water_bill'].sum(),
    'water_usage': user_data['water_usage'].sum(),
    'waste_produced': user_data['waste_produced'].sum(),
    'percent_waste_recycled': user_data['percent_waste_recycled'].mean(),
    'hvac_expenses': user_data['hvac_expenses'].sum(),
    'lighting_expenses': user_data['lighting_expenses'].sum(),
    'ghg_emissions': user_data['ghg_emissions'].sum()
}, index=[0])

# Step 2: Define a function to find similar buildings
def find_similar_buildings(target_row, target_location, market_data, sqft_tolerance=0.2):
    target_size = target_row['size_sqft']

    # Filter by location and size tolerance
    similar_buildings = market_data[
        (market_data['location'] == target_location) &
        (np.abs(market_data['size_sqft'] - target_size) / target_size <= sqft_tolerance)
    ].drop('location', axis=1)

    return similar_buildings

# Step 3: Calculate sentiment scores
def calculate_sentiment(user_value, avg_value):
    threshold = 0.10
    difference = user_value - avg_value
    
    if abs(difference) / (avg_value) < threshold:
        return 0  # Neutral sentiment
    elif difference < 0:
        return 1  # Positive sentiment
    else:
        return -1  # Negative sentiment

# Step 4: Generate insights
similar_buildings = find_similar_buildings(user_totals.iloc[0], user_data['location'].iloc[0], similar_buildings_data)

sentiment_results = {}
# Calculate averages for similar buildings
if not similar_buildings.empty:   # you are here, can't get mean because of string values
    similar_avg = similar_buildings.mean()
    
    # Compare metrics and calculate sentiment scores
    for metric in ['total_expense', 'electricity_bill', 'electricity_usage', 'water_bill', 'water_usage', 'waste_produced', 'percent_waste_recycled', 'hvac_expenses', 'lighting_expenses', 'ghg_emissions']:
        user_value = user_totals[metric].iloc[0] 
        avg_value = similar_avg[metric]
        sentiment = calculate_sentiment(user_value, avg_value)
        sentiment_results[f'{metric}_sentiment'] = sentiment

# Convert sentiment results to a DataFrame
sentiment_df = pd.DataFrame([sentiment_results])

# Step 5: Save results to a CSV file
output_file = 'sentiment_scores.csv'
sentiment_df.to_csv(output_file, index=False)

# Display the DataFrame
print(sentiment_df)