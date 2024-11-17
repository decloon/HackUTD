import { useState } from 'react';

export const Form = () => {
  const [message, setMessage] = useState('');  // The input message
  const [reply, setReply] = useState('Responses will appear here...');  // Placeholder for API responses
  const [loading, setLoading] = useState(false);  // Loading state during API call
  const [error, setError] = useState('');  // Error state for any failed calls

  // Function to handle form submission
  const handleSubmit = async (e) => {
      e.preventDefault();  // Prevent page refresh on submit
      setLoading(true);  // Show loading state
      setError('');  // Clear any previous error messages

      try {
          // Make a POST request to the Flask backend
          const response = await fetch('http://localhost:5000/api/nutrition', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ query: message }),  // Send the message (query) as JSON
          });

          // Check if the response is okay (status 200)
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }

          // Parse the JSON response from the server
          const data = await response.json();
          setReply(JSON.stringify(data, null, 2));  // Display the response data
          setMessage('');  // Clear the input field
      } catch (setError) {
          setError('Failed to get a reply. Please try again.');  // Set an error message
      } finally {
          setLoading(false);  // Reset loading state
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative opacity-80" id="form" style={{
        backgroundImage: 'url(https://media.glamour.com/photos/662c0ebb298e37f5d479b30c/16:9/w_2240%2Cc_limit/0425_bookclub.gif)',
    }}>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md hover:scale-105">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Get Nutrition Info</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                        Enter a food item
                    </label>
                    <textarea
                        id="message"
                        className="w-full h-24 px-3 py-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="e.g., apple, pizza"
                        maxLength={140}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}  // Update the message state
                    />
                </div>

                <div className="mb-4">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        disabled={loading}  // Disable the button while loading
                    >
                        {loading ? 'Fetching...' : 'Submit'}
                    </button>
                </div>
            </form>

            {error && <p className="text-red-500">{error}</p>}

            <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-800">Nutrition Info:</h3>
                <div className="border border-gray-300 rounded-lg p-4 h-32 overflow-y-auto">
                    <pre className="text-gray-600">{reply}</pre>  {/* Display JSON response */}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Form;
