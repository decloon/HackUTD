import pandas as pd
import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

# Step 1: Parse the CSV
csv_file = "sample_data.csv" 
data = pd.read_csv(csv_file)

# Step 2: Connect to PostgreSQL
connection = psycopg2.connect(
    dbname="sustainability_data",
    user=os.environ['POSTGRES_USERNAME'],
    password=os.environ['POSTGRES_PASSWORD'],
    host="localhost",
    port="5432"
)
cursor = connection.cursor()

# Check connection
cursor.execute("SELECT version();")
db_version = cursor.fetchone()
print(f"Connected to PostgreSQL database. Version: {db_version}")

# Step 3: Insert CSV Data into the Table
for index, row in data.iterrows():
    cursor.execute(
        """
        INSERT INTO property_metrics (month, location, size_sqft, total_expense, electricity_bill, electricity_usage, water_bill, water_usage, waste_produced, percent_waste_recycled, hvac_expenses, lighting_expenses, ghg_emissions)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """,
        (
            row['month'],
            row['location'],
            row['size_sqft'],
            row['total_expense'],
            row['electricity_bill'],
            row['electricity_usage'],
            row['water_bill'],
            row['water_usage'],
            row['waste_produced'],
            row['percent_waste_recycled'],
            row['hvac_expenses'],
            row['lighting_expenses'],
            row['ghg_emissions']
        )
    )

# Commit changes and close connection
connection.commit()
cursor.close()
connection.close()

print("User data inserted successfully!")
