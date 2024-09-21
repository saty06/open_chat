export const sendMsgToAI = async (msg) => {
  const API_URL = "https://x8ki-letl-twmt.n7.xano.io/api:EB-5HL6O/chatgpt";

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input_test: msg,
    }),
  };

  try {
    const response = await (await fetch(API_URL, requestOptions)).json();
    console.log(response); // Inspect the full response to check its structure.
    return response; // Adjust this based on how the API response is structured.
  } catch (error) {
    console.log("Error:", error);
  }
};
