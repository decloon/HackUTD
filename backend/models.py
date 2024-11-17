import os
import openai
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

from dotenv import load_dotenv  # Ensure you have installed python-dotenv package

load_dotenv()

#setsup the sambanova api
client = openai.OpenAI(
    api_key=os.environ.get("SAMBANOVA_API_KEY"),
    base_url="https://api.sambanova.ai/v1",
)

#makes a response to the user about general energy consumption advice
def response(text):
    response = client.chat.completions.create(
        model='Meta-Llama-3.1-8B-Instruct',
        messages=[{"role":"Energy Consumption Analyst","content":"You are an expert on energy consumption and the user is trying to gain insight on how to make it so that their corporate building consumes less waste"},{"role":"user","content":text}],
        temperature =  0.1,
        top_p = 0.1
    )
    ans = response.choices[0].message.content
    return ans

#linear regression model that predicts future energy consumption
def analyze_csv(data):
    # Create a pandas DataFrame from the data
    df = pd.DataFrame(list(data.items()), columns=['Month', 'Usage'])

    # Convert the 'Month' column to a numerical value (1-12)
    df['Month'] = pd.Categorical(df['Month']).codes + 1

    # Split the data into training and testing sets
    X = df[['Month']]
    y = df['Usage']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Create and train a linear regression model
    model = LinearRegression()
    model.fit(X_train, y_train)

    # Make predictions on the testing set
    y_pred = model.predict(X_test)

    # Evaluate the model using mean squared error
    mse = mean_squared_error(y_test, y_pred)

    # Predict future usage for the next 12 months
    future_months = pd.DataFrame({'Month': range(1, 13)})
    future_predictions = model.predict(future_months)

    # Find the predictions for each month
    month_predictions = {}
    for month, prediction in zip(future_months['Month'], future_predictions):
        month_predictions[month] = prediction
    return month_predictions

def analyze_csv(months):
    response = client.chat.completions.create(
        model='Meta-Llama-3.1-8B-Instruct',
        messages=[{"role":"prediction model","content":"You are Trying to estimate how much a company will lose overtime based on a set of values corresponding to dates, with inputs being dictionaries with dates as the keys and usage as the value, dont tell me how to do it just give me values based on a line of best fit"},{"role":"user","content":months}],
        temperature =  0.1,
        top_p = 0.1
    )
    ans = response.choices[0].message.content
    return ans
