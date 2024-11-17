import pandas as pd
import numpy as np

def find_similar_buildings(target_row, target_location, market_data, sqft_tolerance=0.2):
    target_size = target_row['size_sqft']
    similar_buildings = market_data[
        (market_data['location'] == target_location) &
        (np.abs(market_data['size_sqft'] - target_size) / target_size <= sqft_tolerance)
    ].drop('location', axis=1)
    return similar_buildings

def calculate_sentiment(user_value, avg_value):
    threshold = 0.10
    difference = user_value - avg_value
    if abs(difference) / avg_value < threshold:
        return 0  # Neutral sentiment
    elif difference < 0:
        return 1  # Positive sentiment
    else:
        return -1  # Negative sentiment

def process_data(filepath):
    user_data = pd.read_csv(filepath)
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
    
    similar_buildings_file = 'market_data.csv'
    similar_buildings_data = pd.read_csv(similar_buildings_file)
    similar_buildings = find_similar_buildings(user_totals.iloc[0], user_data['location'].iloc[0], similar_buildings_data)

    sentiment_results = {}
    if not similar_buildings.empty:
        similar_avg = similar_buildings.mean()
        for metric in ['total_expense', 'electricity_bill', 'electricity_usage', 'water_bill', 'water_usage', 'waste_produced', 'percent_waste_recycled', 'hvac_expenses', 'lighting_expenses', 'ghg_emissions']:
            user_value = user_totals[metric].iloc[0]
            avg_value = similar_avg[metric]
            sentiment = calculate_sentiment(user_value, avg_value)
            sentiment_results[f'{metric}_sentiment'] = sentiment

    result = {
        'monthly_data': user_data.to_dict(orient='records'),
        'sentiment_scores': sentiment_results
    }
    
    return result